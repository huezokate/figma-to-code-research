# NASI Shell Dashboard (Screen 5)

## Figma Source
- File: NASI lo-fi onboarding flow
- Board: https://www.figma.com/board/O9ONqUiEu0vcaAJ5VGgq1d/NASI?node-id=39-825
- FigJam section: `3:4618` — "Screen 5"
- Screenshots: see ./figma/

## What This Is
The Shell mode's home dashboard — "Chaos Toned Down." Same content sources as Sprite, but filtered through a calmer, more focused lens. Less visual noise, more space to breathe.

## Visual Specifications

- **Layout**: Mobile (~390px). Tab bar (Shell active, gray). Mode label. Single-column content area.
- **Tab bar**: Shell active. Reuse from Screen 2.
- **Mode label**: "Chaos Toned Down" — in Shell's gray.
- **Content area**: Single column. Fewer cards visible. Generous padding. Muted colors. Feels like a calm reading list vs. Sprite's busy gallery.
- **Contrast with Screen 4**: Same data, deliberately calmer presentation. This difference IS the design.

## Acceptance Criteria
1. Tab bar with Shell active (gray)
2. "Chaos Toned Down" label
3. Single-column content, visually calmer than Screen 4 — more whitespace, fewer items above fold
4. Same component patterns as Screen 4 but with Shell styling

## Design Tokens / References
Shell = gray (`#9CA3AF`). Background: light or near-white to emphasize the calm contrast with Sprite's dark busyness.

## What I'm Testing
Can the agent express the *same content differently* based solely on a mode name and a brief description? Does "toned down" produce visible design restraint?
