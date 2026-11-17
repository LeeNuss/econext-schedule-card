import { LitElement, css, html, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type { EconextScheduleCardConfig, HomeAssistant } from './types';
import { describePrefix, findSchedulePrefixes } from './discovery';

type FormValueChangedEvent = CustomEvent<{ value: Partial<EconextScheduleCardConfig> }>;

/**
 * Home Assistant's graphical card editor.
 *
 * Keeping the schema here (rather than maintaining a second set of controls)
 * means every supported card option is available from the visual editor as
 * well as YAML mode.
 */
@customElement('econext-schedule-card-editor')
export class EconextScheduleCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config: Partial<EconextScheduleCardConfig> = {};

  public setConfig(config: EconextScheduleCardConfig): void {
    this._config = { ...config };
  }

  /**
   * The config as the form shows it: card defaults filled in so an omitted
   * YAML property does not look switched off. Only values the user changes
   * are written back, so the saved YAML stays minimal.
   */
  private get _formData(): Partial<EconextScheduleCardConfig> {
    return { ...EDITOR_DEFAULTS, ...this._config };
  }

  protected render(): TemplateResult {
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._formData}
        .schema=${this._schema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="colour-pickers">
        ${this._renderColourPicker('active_color', 'Active cell colour', '#00bcd4')}
        ${this._renderColourPicker('inactive_color', 'Inactive cell colour', '#e0e0e0')}
        ${this._config.layout === 'weekly'
          ? this._renderColourPicker('grid_line_color', 'Grid-line colour', '#e0e0e0')
          : ''}
        ${this._config.layout === 'weekly' &&
        this._config.weekly_orientation === 'tall' &&
        (this._config.weekly_cell_label_mode ?? 'none') !== 'none'
          ? html`
              ${this._renderColourPicker('active_text_color', 'Active text colour', '#ffffff')}
              ${this._renderColourPicker('inactive_text_color', 'Inactive text colour', '#212121')}
            `
          : ''}
      </div>
    `;
  }

  static override styles = css`
    .colour-pickers {
      display: grid;
      gap: 16px;
      margin-top: 16px;
    }
  `;

  /** Offer the schedules found in HA as a dropdown; any prefix can still be typed. */
  private _schema() {
    const prefixes = findSchedulePrefixes(this.hass);
    const current = this._config.schedule_entity_prefix;
    if (current && !prefixes.includes(current)) prefixes.unshift(current);
    if (prefixes.length === 0) return EDITOR_SCHEMA;

    return [
      {
        name: 'schedule_entity_prefix',
        required: true,
        selector: {
          select: {
            mode: 'dropdown',
            custom_value: true,
            options: prefixes.map(prefix => ({
              value: prefix,
              label: `${describePrefix(this.hass, prefix)} (${prefix})`,
            })),
          },
        },
      },
      ...EDITOR_SCHEMA.slice(1),
    ];
  }

  private _computeLabel = (schema: { name: string }): string => EDITOR_LABELS[schema.name] ?? schema.name;

  private _valueChanged(event: FormValueChangedEvent): void {
    event.stopPropagation();
    const value = event.detail.value as Record<string, unknown>;
    const shown = this._formData as Record<string, unknown>;
    const next = { ...this._config } as Record<string, unknown>;

    for (const [key, newValue] of Object.entries(value)) {
      if (newValue === shown[key]) continue;
      if (newValue === undefined || newValue === '') {
        delete next[key];
      } else {
        next[key] = newValue;
      }
    }
    this._config = next as Partial<EconextScheduleCardConfig>;
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _renderColourPicker(
    key: keyof EconextScheduleCardConfig,
    label: string,
    fallback: string
  ): TemplateResult {
    return html`
      <ha-selector
        .hass=${this.hass}
        .label=${label}
        .selector=${{ color_rgb: {} }}
        .value=${this._colourToRgb(this._config[key] as string | undefined, fallback)}
        @value-changed=${(event: CustomEvent<{ value: number[] }>) => this._colourChanged(key, event)}
      ></ha-selector>
    `;
  }

  private _colourChanged(
    key: keyof EconextScheduleCardConfig,
    event: CustomEvent<{ value: number[] }>
  ): void {
    const [red, green, blue] = event.detail.value;
    if (![red, green, blue].every(Number.isFinite)) return;
    this._config = {
      ...this._config,
      [key]: `#${[red, green, blue].map(value => value.toString(16).padStart(2, '0')).join('')}`,
    };
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _colourToRgb(value: string | undefined, fallback: string): number[] {
    const hex = (value ?? fallback).trim().replace(/^#/, '');
    if (!/^[0-9a-f]{6}$/i.test(hex)) return this._colourToRgb(fallback, '#000000');
    return [0, 2, 4].map(index => parseInt(hex.slice(index, index + 2), 16));
  }
}

const EDITOR_DEFAULTS: Partial<EconextScheduleCardConfig> = {
  layout: 'tabs',
  editable: true,
  show_time_labels: true,
  highlight_current_day: true,
  highlight_current_slot: true,
  weekly_orientation: 'wide',
  weekly_time_label_mode: 'hour',
  weekly_cell_label_mode: 'none',
};

// ha-form `visible` conditions need HA 2026.8+; older versions show every field.
const WEEKLY_TALL_VISIBLE = [
  { field: 'layout', value: 'weekly' },
  { field: 'weekly_orientation', value: 'tall' },
];

const WEEKLY_LABELS_VISIBLE = [
  ...WEEKLY_TALL_VISIBLE,
  { field: 'weekly_cell_label_mode', operator: 'not_eq', value: 'none' },
];

const EDITOR_SCHEMA = [
  { name: 'schedule_entity_prefix', required: true, selector: { text: {} } },
  { name: 'title', selector: { text: {} } },
  {
    name: 'layout',
    selector: {
      select: {
        mode: 'dropdown',
        options: [
          { value: 'tabs', label: 'One day at a time' },
          { value: 'weekly', label: 'Weekly grid' },
        ],
      },
    },
  },
  { name: 'editable', selector: { boolean: {} } },
  {
    name: 'show_copy_controls',
    selector: { boolean: {} },
    visible: { field: 'editable', value: true },
  },
  {
    name: 'weekly_orientation',
    selector: {
      select: {
        mode: 'dropdown',
        options: [
          { value: 'wide', label: 'Wide: days as rows (compact)' },
          { value: 'tall', label: 'Tall: days as columns' },
        ],
      },
    },
    visible: { field: 'layout', value: 'weekly' },
  },
  {
    name: 'show_time_labels',
    selector: { boolean: {} },
    visible: {
      condition: 'or',
      conditions: [
        { field: 'layout', value: 'tabs' },
        { field: 'weekly_orientation', value: 'wide' },
      ],
    },
  },
  {
    name: 'weekly_time_label_mode',
    selector: {
      select: {
        mode: 'dropdown',
        options: [
          { value: 'hour', label: 'Hour labels' },
          { value: 'all', label: 'All slot labels' },
        ],
      },
    },
    visible: WEEKLY_TALL_VISIBLE,
  },
  {
    name: 'weekly_cell_label_mode',
    selector: {
      select: {
        mode: 'dropdown',
        options: [
          { value: 'none', label: 'No cell labels' },
          { value: 'state', label: 'Show state labels' },
          { value: 'icon', label: 'Show state icons' },
          { value: 'state_icon', label: 'Show state labels and icons' },
        ],
      },
    },
    visible: WEEKLY_TALL_VISIBLE,
  },
  { name: 'active_label', selector: { text: {} }, visible: WEEKLY_LABELS_VISIBLE },
  { name: 'inactive_label', selector: { text: {} }, visible: WEEKLY_LABELS_VISIBLE },
  { name: 'active_icon', selector: { icon: {} }, visible: WEEKLY_LABELS_VISIBLE },
  { name: 'inactive_icon', selector: { icon: {} }, visible: WEEKLY_LABELS_VISIBLE },
  { name: 'highlight_current_day', selector: { boolean: {} } },
  { name: 'highlight_current_slot', selector: { boolean: {} } },
];

const EDITOR_LABELS: Record<string, string> = {
  schedule_entity_prefix: 'Schedule entity prefix',
  title: 'Title',
  layout: 'Layout',
  weekly_orientation: 'Weekly grid shape',
  editable: 'Allow editing',
  show_copy_controls: 'Show copy controls',
  show_time_labels: 'Show time labels',
  weekly_time_label_mode: 'Time-label mode',
  weekly_cell_label_mode: 'Cell-label mode',
  active_label: 'Active label',
  inactive_label: 'Inactive label',
  active_icon: 'Active icon',
  inactive_icon: 'Inactive icon',
  highlight_current_day: 'Highlight current day',
  highlight_current_slot: 'Highlight current time slot',
};
