import type { HomeAssistant } from './types';
import { DAYS_ORDER } from './constants';

const SUFFIX = '_sunday_am';

/**
 * Find every schedule entity prefix in Home Assistant: a `number.` prefix
 * that has all 14 `<prefix>_<day>_<am|pm>` entities. DHW first, since it is
 * the schedule most installs have, then alphabetical.
 */
export function findSchedulePrefixes(hass?: HomeAssistant): string[] {
  if (!hass?.states) return [];

  const prefixes = Object.keys(hass.states)
    .filter(entityId => entityId.startsWith('number.') && entityId.endsWith(SUFFIX))
    .map(entityId => entityId.slice(0, -SUFFIX.length))
    .filter(prefix =>
      DAYS_ORDER.every(
        day => `${prefix}_${day}_am` in hass.states && `${prefix}_${day}_pm` in hass.states
      )
    );

  const isDhw = (prefix: string) => (prefix.includes('dhw') ? 0 : 1);
  return prefixes.sort((a, b) => isDhw(a) - isDhw(b) || a.localeCompare(b));
}

/** Readable name for a prefix, from its Sunday AM entity's friendly name. */
export function describePrefix(hass: HomeAssistant | undefined, prefix: string): string {
  const name = hass?.states[`${prefix}${SUFFIX}`]?.attributes?.friendly_name;
  if (typeof name !== 'string') return prefix;
  const words = name.replace(/\s*sunday\s*am\s*$/i, '').trim().split(/\s+/).filter(Boolean);
  // Friendly names are "<device> <entity>", which repeats for entities named
  // after their device ("DHW DHW schedule"); drop the repeated leading words.
  for (let k = Math.floor(words.length / 2); k >= 1; k--) {
    const head = words.slice(0, k).join(' ').toLowerCase();
    if (head === words.slice(k, 2 * k).join(' ').toLowerCase()) {
      words.splice(0, k);
      break;
    }
  }
  return words.join(' ') || prefix;
}
