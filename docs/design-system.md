# Minimal design system

The look aims to be calm and non-clinical, so the page informs without pressuring anyone to book. All values live in `src/styles/tokens.css`.

## Color

| Token | Value | Use |
|---|---|---|
| `--page` | `#f5f6f3` | Page background |
| `--surface` | `#ffffff` | Cards, fields and secondary buttons |
| `--ink` | `#1f2a30` | Main text |
| `--muted` | `#4f5d65` | Supporting text |
| `--line` | `#7c8a92` | Borders on interactive controls |
| `--line-soft` | `#d5dadb` | Borders on information cards |
| `--accent` | `#1f5f6b` | Primary actions, the current stage and decision points |
| `--accent-soft` | `#e3f0f1` | Hover and decision point backgrounds |
| `--error` / `--error-soft` | `#a32a2a` / `#fbeceb` | Errors |
| `--success` / `--success-soft` | `#1e6b3f` / `#e8f4ec` | Success messages |
| `--warning` / `--warning-soft` | `#7a5200` / `#fdf4e1` | "Not confirmed" and the copy fallback |
| `--disabled` / `--disabled-soft` | `#5f6b70` / `#e9ecea` | Disabled controls |
| `--focus` | `#1d4ed8` | Keyboard focus ring |

Color is never the only signal. "Not confirmed" also has wording and a dashed border, the current stage is bold, and messages state what happened in words.

### Calculated contrast

These ratios were calculated from the color values. WCAG AA asks for 4.5:1 for normal text and 3:1 for control borders and focus indicators.

| Pair | Ratio |
|---|---|
| Main text on page | 13.5:1 |
| Main text on surface | 14.7:1 |
| Muted text on page | 6.3:1 |
| Primary button and current stage | 7.2:1 |
| Secondary button | 7.2:1 |
| Text on decision point | 12.6:1 |
| Error text | 6.3:1 |
| Success text | 5.8:1 |
| "Not confirmed" text | 6.3:1 |
| Control border on surface | 3.6:1 |
| Control border on page | 3.3:1 |
| Focus ring on page | 6.2:1 |
| Focus ring on surface | 6.7:1 |
| Disabled text (WCAG exempts disabled controls) | 4.6:1 |

## Type

The system font stack avoids requesting fonts from another company's server, which suits a privacy-sensitive page.

| Level | Size | Use |
|---|---|---|
| Large | 1.75rem, bold | Screen headings |
| Medium | 1rem, regular or bold | Body text, section and fact headings, buttons |
| Small | 0.875rem | Prototype notice and "Sample" labels |

## Spacing

Spacing uses four steps: 0.5rem, 1rem, 1.5rem and 2rem. Corners use an 8px radius. Interactive controls are at least 2.75rem tall, apart from checkboxes and inline links.

## Components

Each recurring component has one styled version in `src/styles/components.css`: timeline, fact box, decision point, "Sample" label, primary button, secondary button, large choice link, question group, text field and feedback message.

## Component states

| State | Where it appears | How it looks or behaves |
|---|---|---|
| Default | All controls | As described above |
| Focus | All interactive controls | 3px blue ring with a 2px gap |
| Hover | Buttons, stages and choice links | Soft teal or darker teal background |
| Active | Buttons, stages and choice links | Darker background while pressed |
| Disabled | Copy message, before a message exists | Gray fill and "not allowed" cursor |
| Loading | Service details on first load | Spinner and "Loading service details...". The spinner stops if the person asks for reduced motion. |
| Empty | Your message, before questions are chosen | "Your message will appear here." and a link to choose questions |
| Error | Build my message with nothing chosen | Red message, red question group borders and focus on the first checkbox |
| Error | Failed load (`?fail=1`) | "Couldn't load the service details", a red message and Try again |
| Success | Copy message | Green "Copied. Nothing has been sent." |
| Warning | Copy blocked by the browser | Amber message, with the text selected for Ctrl+C |
| Warning | Unverified fact | Amber dashed box and "Not confirmed" |
