import type { DayKey } from './types';

/**
 * Days of the week in order (Sunday = 0 to match JavaScript Date.getDay())
 */
export const DAYS_ORDER: DayKey[] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

/**
 * Short day labels for display
 */
export const DAY_LABELS: Record<DayKey, string> = {
  sunday: 'Sun',
  monday: 'Mon',
  tuesday: 'Tue',
  wednesday: 'Wed',
  thursday: 'Thu',
  friday: 'Fri',
  saturday: 'Sat',
};

/**
 * Number of 30-minute slots per day
 */
export const SLOTS_PER_DAY = 48;

/**
 * Number of 30-minute slots per period (AM or PM)
 */
export const SLOTS_PER_PERIOD = 24;

/**
 * Generate time labels for all 48 slots
 */
export function generateTimeLabels(): string[] {
  const labels: string[] = [];
  for (let slot = 0; slot < SLOTS_PER_DAY; slot++) {
    const hour = Math.floor(slot / 2);
    const minute = (slot % 2) * 30;
    labels.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
  }
  return labels;
}

/**
 * Get the current slot index (0-47) based on current time
 */
export function getCurrentSlotIndex(): number {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return hours * 2 + (minutes >= 30 ? 1 : 0);
}

/**
 * Get the current day key
 */
export function getCurrentDay(): DayKey {
  return DAYS_ORDER[new Date().getDay()];
}

/**
 * Convert slot index to time string (e.g., "14:30")
 */
export function slotToTime(slotIndex: number): string {
  const hour = Math.floor(slotIndex / 2);
  const minute = (slotIndex % 2) * 30;
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

/**
 * Determine if a slot index is in the AM period (0-23) or PM period (24-47)
 */
export function isAmSlot(slotIndex: number): boolean {
  return slotIndex < SLOTS_PER_PERIOD;
}

/**
 * Get the bit index (0-23) for a given slot index (0-47)
 */
export function slotToBitIndex(slotIndex: number): number {
  return slotIndex % SLOTS_PER_PERIOD;
}

/**
 * Default colors
 */
export const DEFAULT_ACTIVE_COLOR = '#00bcd4';
export const DEFAULT_INACTIVE_COLOR = '#e0e0e0';
