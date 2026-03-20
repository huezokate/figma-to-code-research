# NASI Mode Picker (Screen 1)

## Figma Source
- File: NASI lo-fi onboarding flow
- Board: https://www.figma.com/board/O9ONqUiEu0vcaAJ5VGgq1d/NASI?node-id=39-825
- FigJam section: `3:3909` — "Screen 1"
- Screenshots: see ./figma/

## What This Is
The first screen of the NASI onboarding flow. Users pick their mode — Loom, Sprite, or Shell — which sets the personality and layout of the entire app. This choice can be toggled later.

## Visual Specifications

- **Layout**: Single column, mobile (~390px). Welcome card at top, three mode cards stacked below. Cards are tall rounded rectangles with generous padding.
- **Typography**: Mode names are large, legible. Welcome copy is smaller, multi-line.
- **Colors**:
  - Loom = blue (sky/cornflower range)
  - Sprite = pink/coral (salmon range)
  - Shell = gray (neutral, cool)
- **Spacing**: Cards have visible gaps between them. Top card (welcome) is taller than mode cards.
- **Animation**: Welcome card pops in on load, then minimizes slightly to make room for mode cards beneath it. (Designer's sticky note: "cool animation for hello message where it pops first and then minimizes to give space for short pitches by each mode")
- **Responsive**: Mobile only, no breakpoints needed.

## Acceptance Criteria
1. Welcome card reads: "hello message / lets pick a vibe / you can always toggle between modes"
2. Three mode cards (Loom/Sprite/Shell) in correct brand colors, stacked vertically
3. Welcome card has an entry animation

## Design Tokens / References
- Loom: `#3B82F6` (blue-500) or similar blue
- Sprite: `#F472B6` or `#FB7185` (pink/rose range)
- Shell: `#9CA3AF` (gray-400) or similar neutral gray

## What I'm Testing
Can the FigJam read via MCP provide enough detail to implement a visually correct mobile screen without any hi-fi Figma design? What information is missing from the lo-fi?
