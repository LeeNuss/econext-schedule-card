# ecoNET Schedule Card

A Home Assistant Lovelace card for displaying and editing weekly schedules from the ecoNET-300 integration.

## Installation

1. Copy `dist/econet-schedule-card.js` to your Home Assistant `/config/www/` directory
2. Add the resource in your Lovelace dashboard:
   - Go to Settings > Dashboards > Resources
   - Add `/local/econet-schedule-card.js` as a JavaScript Module

## Usage

```yaml
type: custom:econet-schedule-card
schedule_entity_prefix: number.econet_next_dhw_schedule
title: "DHW Schedule"
```

The card automatically discovers entities based on the prefix pattern:
- `{prefix}_sunday_am`, `{prefix}_sunday_pm`
- `{prefix}_monday_am`, `{prefix}_monday_pm`
- etc.

## Configuration Options

| Option                   | Type    | Default    | Description                                             |
| ------------------------ | ------- | ---------- | ------------------------------------------------------- |
| `schedule_entity_prefix` | string  | *required* | Entity prefix (e.g., `number.econet_next_dhw_schedule`) |
| `title`                  | string  | none       | Card title                                              |
| `editable`               | boolean | `true`     | Allow clicking cells to toggle slots                    |
| `show_time_labels`       | boolean | `true`     | Show time labels on the left                            |
| `highlight_current_day`  | boolean | `true`     | Highlight today's column                                |
| `highlight_current_slot` | boolean | `true`     | Highlight current 30-min slot                           |
| `active_color`           | string  | `#00bcd4`  | Color for active slots                                  |
| `inactive_color`         | string  | `#e0e0e0`  | Color for inactive slots                                |

## Examples

### DHW Schedule
```yaml
type: custom:econet-schedule-card
schedule_entity_prefix: number.dhw_dhw_schedule
title: "Hot Water Schedule"
```

### Circuit 1 Heating Schedule
```yaml
type: custom:econet-schedule-card
schedule_entity_prefix: number.ufh_schedule
title: "Heating Zone 1"
active_color: "#ff9800"
```

### Heat Pump Schedule (Read-only)
```yaml
type: custom:econet-schedule-card
schedule_entity_prefix: number.heatpump_heatpump_schedule
title: "Heat Pump"
editable: false
```

## Schedule Data Format

The ecoNET-300 integration exposes schedules as bitfield number entities:

- Each entity stores a uint32 value (0 to 4,294,967,295)
- Each bit represents one 30-minute time slot
- AM entities cover 00:00-11:30 (24 slots)
- PM entities cover 12:00-23:30 (24 slots)

## Building from Source

```bash
npm install
npm run build
```

## License

MIT
