# NASI Loom Dashboard (Screen 6)

## Figma Source
- File: NASI lo-fi onboarding flow
- Board: https://www.figma.com/board/O9ONqUiEu0vcaAJ5VGgq1d/NASI?node-id=39-825
- FigJam section: `3:4744` — "Screen 6"
- Screenshots: see ./figma/

## What This Is
The Loom mode's home dashboard. Unlike Sprite/Shell (entertainment), Loom is about creative work. The primary prompt is "What are we working on today?" — this is a creative work session starter.

## Visual Specifications

- **Layout**: Mobile (~390px). Tab bar (Loom active, blue). Document header area. Main prompt card. Inspiration grid. Previous projects. Share + scroll sections at bottom.
- **Tab bar**: All three tabs visible — Loom | Sprite | Shell. Loom active (blue). Reuse from Screen 2.
- **Document/header area**: A document-style header beneath the tab bar (the FigJam shows a `DOCUMENT_SINGLE` shape) — could be a project title area or recent file preview.
- **Main prompt card**: Large rounded rectangle — "What are we working on today?" — this is the biggest element on the screen. Inviting, like a blank canvas. Blue accent.
- **Inspiration cards**: 2-column grid, 4 cards with exact copy:
  - "Inspo 1: Improve your right hook"
  - "Inspo 2: Try yourself in poetry"
  - "Inspo 3: Gardening tips 101"
  - "Inspo 4: New UI trends"
- **Previous projects**: A section below inspo. Placeholder cards.
- **Share your work**: A text input / CTA area. Manual input element from FigJam.
- **Content you follow / endless scroll**: Bottom section, passive browse area.

## Acceptance Criteria
1. Tab bar with Loom active (blue), all three tabs visible
2. "What are we working on today?" prompt card is the clear visual focal point
3. All 4 inspiration cards with exact FigJam copy
4. Previous projects, share, and content scroll sections all present
5. Full scroll, 390px width

## Design Tokens / References
Loom = blue (`#3B82F6`). Background: light/white. Productive, focused energy.

## What I'm Testing
This is the most content-rich screen. Does the FigJam structural data (section names, shape types like `MANUAL_INPUT`, `DOCUMENT_SINGLE`, `INTERNAL_STORAGE`) give useful semantic hints that improve the implementation? Do shape type names matter?
