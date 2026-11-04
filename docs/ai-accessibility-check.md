# AI-run accessibility check

**This is not the team's audit log.** Claude ran these checks on 4 November 2026 using automated tools and scripted key presses. The D4 checklist says audit findings must come from the team's own walkthroughs, so don't copy these results into the audit log as your findings. If you submit or cite this file, disclose it in the AI-use note.

## What was run

| Check | Gray build | Styled build |
|---|---|---|
| axe-core scan of all screens and states | 0 violations | 0 violations |
| Real Tab key presses through the timeline | Logical order, focus ring present | Logical order, focus ring present |
| Real Tab key presses through the question form | Logical order, focus ring present | Not repeated |
| Enter on a stage link | Opens the screen, focus moves to its heading | Not repeated |
| Enter on Build my message with nothing selected | Shows the error, focus moves to the first checkbox | Not repeated |
| Space on a checkbox | Ticks it and clears the error | Not repeated |
| Enter on Copy message | Runs copy and shows the fallback message | Not repeated |
| Sideways scrolling | Not repeated at 320px | None at 320px wide, on all 10 routes |
| Browser accessibility tree of the question form | Names, labels and group legends present | Not repeated |

The axe scan covered the 10 routes, the error state, the built message, the copy fallback and the failed load. On the styled build it also covered copy success, using a simulated clipboard.

axe couldn't automatically rate the contrast of the three decorative timeline arrows, because they contain only symbols. They're hidden from screen readers and use the muted color, which measures 6.3:1 on the page.

## What changed as a result

| Issue | Severity | Change |
|---|---|---|
| Lists styled without bullets can lose their list role in Safari with VoiceOver | Low | Added `role="list"` to the timeline and topic lists. This came from a code review, not the scan, and it wasn't tested in Safari. |

## What this doesn't cover

- No screen reader was used, so what NVDA or Narrator actually announces is untested.
- Tab order was tested on two screens only, and not every keyboard path was repeated on the styled build.
- A real clipboard copy success is untested, because this browser pane blocks copying.
- Automated tools catch only some accessibility problems. Passing them doesn't establish WCAG conformance.
- No one who relies on assistive technology has tested this prototype.

The team's keyboard and screen-reader walkthroughs are still required.
