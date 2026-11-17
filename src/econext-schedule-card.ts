import { LitElement, html, nothing, type CSSResultGroup, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { live } from 'lit/directives/live.js';

import type {
  HomeAssistant,
  EconextScheduleCardConfig,
  DayKey,
  DaySchedule,
} from './types';
import { combineAmPm, toggleBit } from './bitfield';
import {
  DAYS_ORDER,
  displayDays,
  DAY_LABELS,
  SLOTS_PER_DAY,
  getCurrentSlotIndex,
  getCurrentDay,
  slotToTime,
  isAmSlot,
  slotToBitIndex,
  DEFAULT_ACTIVE_COLOR,
  DEFAULT_INACTIVE_COLOR,
} from './constants';

import { cardStyles } from './styles';
import { describePrefix, findSchedulePrefixes } from './discovery';

interface WeeklyCellContext {
  currentDay: DayKey;
  currentSlot: number;
  activeColor: string;
  inactiveColor: string;
  editable: boolean;
  showLabels: boolean;
  showIcons: boolean;
  schedules: Map<DayKey, DaySchedule | null>;
}

@customElement('econext-schedule-card')
export class EconextScheduleCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config?: EconextScheduleCardConfig;
  @state() private _selectedDay: DayKey = getCurrentDay();
  @state() private _pendingValues: Map<string, number> = new Map();
  @state() private _errorEntityIds: Set<string> = new Set();
  @state() private _inFlight: Set<string> = new Set();

  private _debounceTimers: Map<string, ReturnType<typeof setTimeout>> = new Map();

  private static readonly DEBOUNCE_MS = 500;
  private static readonly MAX_RETRIES = 2;
  private static readonly RETRY_BASE_MS = 1000;

  static get styles(): CSSResultGroup {
    return cardStyles;
  }

  public setConfig(config: EconextScheduleCardConfig): void {
    if (!config.schedule_entity_prefix) {
      throw new Error('Please define schedule_entity_prefix');
    }

    this._config = {
      editable: true,
      show_time_labels: true,
      highlight_current_day: true,
      highlight_current_slot: true,
      active_color: DEFAULT_ACTIVE_COLOR,
      inactive_color: DEFAULT_INACTIVE_COLOR,
      ...config,
    };
  }

  public getCardSize(): number {
    // Masonry view, in 50px units
    const extras = (this._config?.title ? 1 : 0) + (this._config?.show_copy_controls ? 1 : 0);
    if (this._config?.layout === 'weekly') {
      return (this._config.weekly_orientation === 'tall' ? 11 : 4) + extras;
    }
    // Tabs + schedule row + time labels + padding
    return 3 + extras;
  }

  public getGridOptions() {
    // Sections view: span the whole section (a 48-slot strip wants the
    // width, and a section can be several columns wide) and size the
    // height to the content, which varies with title, copy controls,
    // orientation and the error banner.
    return { columns: 'full', rows: 'auto', min_columns: 6 };
  }

  public getLayoutOptions() {
    // Pre-2024.11 sections API
    return { grid_columns: 'full', grid_rows: 'auto', grid_min_columns: 2 };
  }

  public static getStubConfig(hass?: HomeAssistant): Partial<EconextScheduleCardConfig> {
    // Point the card picker preview at a schedule that actually exists.
    const prefix = findSchedulePrefixes(hass)[0];
    return {
      schedule_entity_prefix: prefix ?? 'number.dhw_dhw_schedule',
      title: prefix ? describePrefix(hass, prefix) : 'Schedule',
    };
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('econext-schedule-card-editor');
  }

  private _displayDays(): DayKey[] {
    return displayDays(this.hass?.locale?.first_weekday);
  }

  private _getEntityId(day: DayKey, period: 'am' | 'pm'): string {
    return `${this._config!.schedule_entity_prefix}_${day}_${period}`;
  }

  private _getEntityValue(entityId: string): number | null {
    const entity = this.hass?.states[entityId];
    if (!entity) return null;
    const value = parseFloat(entity.state);
    return isNaN(value) ? null : value;
  }

  private _getEffectiveValue(entityId: string): number | null {
    const pending = this._pendingValues.get(entityId);
    if (pending !== undefined) return pending;
    return this._getEntityValue(entityId);
  }

  private _buildDaySchedule(day: DayKey): DaySchedule | null {
    const amEntityId = this._getEntityId(day, 'am');
    const pmEntityId = this._getEntityId(day, 'pm');
    const amValue = this._getEffectiveValue(amEntityId);
    const pmValue = this._getEffectiveValue(pmEntityId);

    if (amValue === null || pmValue === null) {
      return null;
    }

    return {
      day,
      amEntityId,
      pmEntityId,
      amValue,
      pmValue,
      slots: combineAmPm(amValue, pmValue),
    };
  }

  private _handleCellClick(day: DayKey, slotIndex: number): void {
    if (!this._config?.editable || !this.hass) return;

    const isAm = isAmSlot(slotIndex);
    const bitIndex = slotToBitIndex(slotIndex);
    const entityId = this._getEntityId(day, isAm ? 'am' : 'pm');

    const currentBitfield = this._pendingValues.get(entityId) ?? this._getEntityValue(entityId);
    if (currentBitfield === null) return;

    const newValue = toggleBit(currentBitfield, bitIndex);

    this._pendingValues = new Map(this._pendingValues);
    this._pendingValues.set(entityId, newValue);

    this._scheduleSend(entityId);
  }

  private _copySelectedDayTo(targetDays: DayKey[]): void {
    if (!this._config?.editable || !this.hass) return;

    const sourceDay = this._buildDaySchedule(this._selectedDay);
    if (!sourceDay) return;

    const pending = new Map(this._pendingValues);
    const entityIdsToSend: string[] = [];

    for (const day of targetDays) {
      if (day === this._selectedDay) continue;

      const amEntityId = this._getEntityId(day, 'am');
      const pmEntityId = this._getEntityId(day, 'pm');

      // Avoid unnecessary writes when the target already matches the source.
      if (this._getEffectiveValue(amEntityId) !== sourceDay.amValue) {
        pending.set(amEntityId, sourceDay.amValue);
        entityIdsToSend.push(amEntityId);
      }
      if (this._getEffectiveValue(pmEntityId) !== sourceDay.pmValue) {
        pending.set(pmEntityId, sourceDay.pmValue);
        entityIdsToSend.push(pmEntityId);
      }
    }

    if (entityIdsToSend.length === 0) return;

    this._pendingValues = pending;
    // Send every value at once. The ecoNEXT integration coalesces service
    // calls that arrive together into one gateway batch (one bus token
    // hold), so a full-week copy takes a few seconds rather than one token
    // wait per value.
    for (const entityId of entityIdsToSend) {
      this._flush(entityId);
    }
  }

  private _scheduleSend(entityId: string): void {
    const existing = this._debounceTimers.get(entityId);
    if (existing !== undefined) {
      clearTimeout(existing);
    }

    const timer = setTimeout(() => this._flush(entityId), EconextScheduleCard.DEBOUNCE_MS);
    this._debounceTimers.set(entityId, timer);
  }

  /** Send an entity's pending value now, cancelling any debounce. */
  private _flush(entityId: string): void {
    const timer = this._debounceTimers.get(entityId);
    if (timer !== undefined) {
      clearTimeout(timer);
      this._debounceTimers.delete(entityId);
    }
    // A write already on its way re-checks the pending value when it
    // finishes and sends again if it changed, so never run two at once.
    if (this._inFlight.has(entityId)) return;
    void this._send(entityId);
  }

  private async _send(entityId: string): Promise<void> {
    let value = this._pendingValues.get(entityId);
    if (value === undefined) return;

    this._inFlight = new Set([...this._inFlight, entityId]);
    try {
      for (;;) {
        const sent = await this._executeServiceCall(entityId, value);
        if (sent === null) {
          const updated = new Map(this._pendingValues);
          updated.delete(entityId);
          this._pendingValues = updated;
          this._showError(entityId);
          return;
        }

        // Edited again while this write was running: send the newer value,
        // unless a debounce timer is about to do that.
        const latest = this._pendingValues.get(entityId);
        if (latest === undefined || latest === sent || this._debounceTimers.has(entityId)) {
          return;
        }
        value = latest;
      }
    } finally {
      const inFlight = new Set(this._inFlight);
      inFlight.delete(entityId);
      this._inFlight = inFlight;
    }
  }

  /** Call number.set_value with retries; resolves to the value sent, or null on failure. */
  private async _executeServiceCall(entityId: string, value: number): Promise<number | null> {
    for (let attempt = 0; attempt <= EconextScheduleCard.MAX_RETRIES; attempt++) {
      try {
        await this.hass.callService('number', 'set_value', {
          entity_id: entityId,
          value,
        });
        return value;
      } catch (error) {
        console.error(
          `Failed to update ${entityId} (attempt ${attempt + 1}/${EconextScheduleCard.MAX_RETRIES + 1}):`,
          error
        );

        if (attempt < EconextScheduleCard.MAX_RETRIES) {
          const delay = EconextScheduleCard.RETRY_BASE_MS * Math.pow(2, attempt);
          await new Promise<void>(resolve => setTimeout(resolve, delay));

          // Cleared means Home Assistant already reports the value.
          const latestValue = this._pendingValues.get(entityId);
          if (latestValue === undefined) return value;
          value = latestValue;
        }
      }
    }
    return null;
  }

  private _showError(entityId: string): void {
    this._errorEntityIds = new Set([...this._errorEntityIds, entityId]);

    setTimeout(() => {
      const updated = new Set(this._errorEntityIds);
      updated.delete(entityId);
      this._errorEntityIds = updated;
    }, 5000);
  }

  private _hasErrorForDay(day: DayKey): boolean {
    const amId = this._getEntityId(day, 'am');
    const pmId = this._getEntityId(day, 'pm');
    return this._errorEntityIds.has(amId) || this._errorEntityIds.has(pmId);
  }

  protected override willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);

    // When hass state updates, clear pending values that HA has confirmed
    if (changedProperties.has('hass') && this._pendingValues.size > 0) {
      const toRemove: string[] = [];
      for (const [entityId, pendingValue] of this._pendingValues) {
        if (!this._debounceTimers.has(entityId)) {
          const haValue = this._getEntityValue(entityId);
          if (haValue === pendingValue) {
            toRemove.push(entityId);
          }
        }
      }
      if (toRemove.length > 0) {
        const updated = new Map(this._pendingValues);
        for (const id of toRemove) {
          updated.delete(id);
        }
        this._pendingValues = updated;
      }
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    // Send edits still waiting on their debounce instead of dropping them.
    // Service calls already sent run to completion in Home Assistant even
    // after the card is gone.
    for (const entityId of [...this._debounceTimers.keys()]) {
      this._flush(entityId);
    }
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) {
      return html``;
    }

    const currentDay = getCurrentDay();
    const currentSlot = getCurrentSlotIndex();
    const selectedDaySchedule = this._buildDaySchedule(this._selectedDay);

    // Check if entities exist
    if (!selectedDaySchedule) {
      // Try to find any valid day
      const anyValidDay = DAYS_ORDER.find(day => this._buildDaySchedule(day) !== null);
      if (!anyValidDay) {
        return html`
          <ha-card>
            <div class="warning">
              No schedule entities found for prefix:
              ${this._config.schedule_entity_prefix}
            </div>
          </ha-card>
        `;
      }
    }

    const activeColor = this._config.active_color || DEFAULT_ACTIVE_COLOR;
    const inactiveColor = this._config.inactive_color || DEFAULT_INACTIVE_COLOR;

    return html`
      <ha-card>
        ${this._config.title
          ? html`
              <div class="card-header">
                <div class="title">${this._config.title}</div>
              </div>
            `
          : nothing}

        ${this._config.layout !== 'weekly'
          ? html`
              <div class="day-tabs">
                ${this._displayDays().map(day => html`
                  <button
                    class="day-tab ${classMap({
                      active: day === this._selectedDay,
                      'current-day': this._config!.highlight_current_day !== false && day === currentDay,
                      error: this._hasErrorForDay(day),
                    })}"
                    @click=${() => { this._selectedDay = day; }}
                  >
                    ${DAY_LABELS[day]}
                  </button>
                `)}
              </div>
            `
          : nothing}

        ${this._renderErrorBanner()}

        ${this._config.show_copy_controls && this._config.editable !== false
          ? this._renderCopyControls()
          : nothing}

        ${this._config.layout === 'weekly'
          ? this._renderWeeklyGrid(currentDay, currentSlot, activeColor, inactiveColor)
          : html`
              <div class="schedule-container">
                <div class="schedule-row-wrapper">
                  ${selectedDaySchedule
                    ? this._renderScheduleRow(
                        selectedDaySchedule,
                        this._selectedDay === currentDay,
                        currentSlot,
                        activeColor,
                        inactiveColor
                      )
                    : this._renderEmptyRow()}

                  ${this._config.show_time_labels !== false
                    ? this._renderTimeLabels()
                    : nothing}
                </div>
              </div>
            `}
      </ha-card>
    `;
  }

  private _renderErrorBanner(): TemplateResult | typeof nothing {
    const failedDays = this._displayDays().filter(day => this._hasErrorForDay(day));
    if (failedDays.length === 0) return nothing;
    return html`
      <div class="error-banner">
        Failed to save ${failedDays.map(day => DAY_LABELS[day]).join(', ')}. Changes were reverted.
      </div>
    `;
  }

  private _renderCopyControls(): TemplateResult {
    const sourceLabel = DAY_LABELS[this._selectedDay];
    const weekdays: DayKey[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    const weekend: DayKey[] = ['saturday', 'sunday'];

    return html`
      <div class="copy-controls" role="group" aria-label="Copy ${sourceLabel} schedule">
        <label class="copy-label" for="copy-source">Copy</label>
        <select
          id="copy-source"
          class="copy-source"
          @change=${(event: Event) => {
            this._selectedDay = (event.target as HTMLSelectElement).value as DayKey;
          }}
        >
          ${this._displayDays().map(day => html`
            <option value=${day} .selected=${live(day === this._selectedDay)}>${DAY_LABELS[day]}</option>
          `)}
        </select>
        <span class="copy-label">to</span>
        <button class="copy-button" @click=${() => this._copySelectedDayTo(DAYS_ORDER)}>
          All days
        </button>
        <button class="copy-button" @click=${() => this._copySelectedDayTo(weekdays)}>
          Weekdays
        </button>
        <button class="copy-button" @click=${() => this._copySelectedDayTo(weekend)}>
          Weekend
        </button>
        ${this._inFlight.size > 0 || this._debounceTimers.size > 0
          ? html`<span class="copy-status" role="status">Saving...</span>`
          : nothing}
      </div>
    `;
  }

  private _renderWeeklyGrid(
    currentDay: DayKey,
    currentSlot: number,
    activeColor: string,
    inactiveColor: string
  ): TemplateResult {
    const tall = this._config?.weekly_orientation === 'tall';
    // Cells in the wide grid are a few pixels wide, too narrow for text.
    const labelMode = tall ? this._config?.weekly_cell_label_mode : 'none';
    const ctx: WeeklyCellContext = {
      currentDay,
      currentSlot,
      activeColor,
      inactiveColor,
      editable: this._config?.editable !== false,
      showLabels: labelMode === 'state' || labelMode === 'state_icon',
      showIcons: labelMode === 'icon' || labelMode === 'state_icon',
      schedules: new Map(DAYS_ORDER.map(day => [day, this._buildDaySchedule(day)])),
    };
    const gridStyle = styleMap(
      this._config?.grid_line_color ? { '--weekly-grid-line-color': this._config.grid_line_color } : {}
    );
    const days = this._displayDays();

    return html`
      <div class="weekly-grid-wrapper">
        <div
          class="weekly-grid ${classMap({
            tall,
            wide: !tall,
            labelled: ctx.showLabels || ctx.showIcons,
          })}"
          aria-label="Weekly schedule"
          style=${gridStyle}
        >
          ${tall ? this._renderTallGrid(days, ctx) : this._renderWideGrid(days, ctx)}
        </div>
      </div>
    `;
  }

  /** Days as columns, time running down: one row per half hour. */
  private _renderTallGrid(days: DayKey[], ctx: WeeklyCellContext): TemplateResult {
    const timeLabelMode = this._config?.weekly_time_label_mode ?? 'hour';

    return html`
      <div class="weekly-time-header" style="grid-row: 1; grid-column: 1"></div>
      ${days.map((day, dayIndex) => this._renderDayHeader(day, 1, dayIndex + 2))}
      ${Array.from({ length: SLOTS_PER_DAY }, (_, slotIndex) => {
        // Hour mode: one label per hour spanning both half-hour rows.
        const label =
          timeLabelMode === 'all'
            ? html`<div class="weekly-time-label" style="grid-row: ${slotIndex + 2}; grid-column: 1">
                ${slotToTime(slotIndex)}
              </div>`
            : slotIndex % 2 === 0
              ? html`<div class="weekly-time-label hour" style="grid-row: ${slotIndex + 2} / span 2; grid-column: 1">
                  ${slotToTime(slotIndex)}
                </div>`
              : nothing;

        return html`
          ${label}
          ${days.map((day, dayIndex) => this._renderWeeklyCell(day, slotIndex, slotIndex + 2, dayIndex + 2, ctx))}
        `;
      })}
    `;
  }

  /** Days as rows, time running across: the tabs layout's strip for every day. */
  private _renderWideGrid(days: DayKey[], ctx: WeeklyCellContext): TemplateResult {
    const labelRow = days.length + 1;

    return html`
      ${days.map((day, dayIndex) => html`
        ${this._renderDayHeader(day, dayIndex + 1, 1)}
        ${Array.from({ length: SLOTS_PER_DAY }, (_, slotIndex) =>
          this._renderWeeklyCell(day, slotIndex, dayIndex + 1, slotIndex + 2, ctx)
        )}
      `)}
      ${this._config?.show_time_labels !== false
        ? Array.from({ length: SLOTS_PER_DAY / 2 }, (_, hour) => html`
            <div class="weekly-hour-label" style="grid-row: ${labelRow}; grid-column: ${hour * 2 + 2} / span 2">
              ${hour}
            </div>
          `)
        : nothing}
    `;
  }

  private _renderDayHeader(day: DayKey, row: number, column: number): TemplateResult {
    return html`
      <button
        class="weekly-day-header ${classMap({
          'current-day': this._config!.highlight_current_day !== false && day === getCurrentDay(),
          'copy-source': day === this._selectedDay,
          error: this._hasErrorForDay(day),
        })}"
        style="grid-row: ${row}; grid-column: ${column}"
        aria-pressed=${day === this._selectedDay ? 'true' : 'false'}
        @click=${() => { this._selectedDay = day; }}
      >
        ${DAY_LABELS[day]}
      </button>
    `;
  }

  private _renderWeeklyCell(
    day: DayKey,
    slotIndex: number,
    row: number,
    column: number,
    ctx: WeeklyCellContext
  ): TemplateResult {
    const schedule = ctx.schedules.get(day) ?? null;
    const active = schedule?.slots[slotIndex] ?? false;
    const isCurrentSlotHighlight =
      this._config?.highlight_current_slot !== false &&
      day === ctx.currentDay &&
      slotIndex === ctx.currentSlot;
    const cellLabel = active
      ? this._config?.active_label ?? 'On'
      : this._config?.inactive_label ?? 'Off';
    const textColor = active
      ? this._config?.active_text_color ?? '#ffffff'
      : this._config?.inactive_text_color ?? '#212121';
    const icon = active
      ? this._config?.active_icon ?? 'mdi:weather-sunny'
      : this._config?.inactive_icon ?? 'mdi:weather-night';
    const disabled = !ctx.editable || !schedule;

    return html`
      <button
        class="weekly-cell ${classMap({
          active,
          inactive: !active,
          'hour-end': slotIndex % 2 === 1,
          'current-slot': isCurrentSlotHighlight,
          readonly: disabled,
        })}"
        style=${styleMap({
          gridRow: String(row),
          gridColumn: String(column),
          backgroundColor: active ? ctx.activeColor : ctx.inactiveColor,
          color: textColor,
        })}
        title="${DAY_LABELS[day]} ${slotToTime(slotIndex)} - ${active ? 'Active' : 'Inactive'}"
        ?disabled=${disabled}
        @click=${() => schedule && this._handleCellClick(day, slotIndex)}
      >${ctx.showLabels || ctx.showIcons
        ? html`<span class="weekly-cell-content">
            ${ctx.showIcons ? html`<ha-icon .icon=${icon}></ha-icon>` : nothing}
            ${ctx.showLabels ? html`<span>${cellLabel}</span>` : nothing}
          </span>`
        : nothing}</button>
    `;
  }

  private _renderTimeLabels(): TemplateResult {
    return html`
      <div class="time-labels">
        ${Array.from({ length: SLOTS_PER_DAY }, (_, i) => {
          const hour = Math.floor(i / 2);
          const isHalfHour = i % 2 !== 0;

          return html`
            <div class="time-label">
              ${isHalfHour ? '' : hour}
            </div>
          `;
        })}
      </div>
    `;
  }

  private _renderScheduleRow(
    daySchedule: DaySchedule,
    isCurrentDay: boolean,
    currentSlot: number,
    activeColor: string,
    inactiveColor: string
  ): TemplateResult {
    const editable = this._config?.editable !== false;

    return html`
      <div class="schedule-row">
        ${daySchedule.slots.map((active, slotIndex) => {
          const isCurrentSlotHighlight =
            this._config?.highlight_current_slot !== false &&
            isCurrentDay &&
            slotIndex === currentSlot;

          return html`
            <div
              class="schedule-cell ${classMap({
                active,
                inactive: !active,
                'current-slot': isCurrentSlotHighlight,
                readonly: !editable,
              })}"
              style=${styleMap({
                backgroundColor: active ? activeColor : inactiveColor,
              })}
              title="${slotToTime(slotIndex)} - ${active ? 'Active' : 'Inactive'}"
              @click=${() =>
                this._handleCellClick(daySchedule.day, slotIndex)}
            ></div>
          `;
        })}
      </div>
    `;
  }

  private _renderEmptyRow(): TemplateResult {
    return html`
      <div class="schedule-row">
        ${Array.from({ length: SLOTS_PER_DAY }, () => html`
          <div
            class="schedule-cell inactive readonly"
            style="opacity: 0.3"
            title="No data"
          ></div>
        `)}
      </div>
    `;
  }
}

// Register with custom card picker
declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
  interface HTMLElementTagNameMap {
    'econext-schedule-card': EconextScheduleCard;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'econext-schedule-card',
  name: 'ecoNEXT Schedule Card',
  description: 'Display and edit weekly schedules from ecoNEXT integration',
  preview: true,
});
