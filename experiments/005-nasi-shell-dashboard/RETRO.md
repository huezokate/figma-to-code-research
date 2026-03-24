# Retro: NASI Shell Dashboard

## Result
Pass

## What Matched
- Tab bar with Shell active (gray)
- "Chaos Toned Down" label in Shell gray
- Single-column layout — visibly calmer than Sprite's 2-column chaos grid
- Muted gray gradient palette throughout (`slate-*`, `stone-*`, `zinc-*`)
- Generous padding, fewer items above fold
- Visually distinct from Screen 4 despite identical card component structure

## What Didn't
- Same cross-experiment ModeTabBar import from 002 (same fragility as 004)
- 6 cards vs. Sprite's 10 — contrast is clear but may feel too sparse; 7–8 might be better

## Why
Gray palette + single-column + lower count = "toned down" was the correct interpretation. The visual contrast with Screen 4 is immediately legible.

## Brief Changes for Next Time
- Suggest card count range ("6–8 items, same content types as Sprite")
- Confirm that calm contrast should come from both layout AND color — both were captured here

## Technique Extracted?
**Yes**: "Mode personality through palette + layout density" — same component structure, different personality expressed entirely through: saturated → muted palette, 2-col chaos grid → 1-col calm stack, 10 items → 6 items. No structural code changes required between modes. Extract as technique.

## Roundtrip Notes
- **What the FigJam gave**: "Chaos Toned Down" label, Shell gray identity, single-column implied by contrast with Sprite
- **What was invented**: Specific gray shades, card count, "calmer. cleaner. still yours." subtitle
- **Would hi-fi have helped?**: For color refinement and spacing rhythm, yes. For core layout decision, no.
- **Key finding**: "Chaos Toned Down" produced visible design restraint relative to "Chaos Curated" — the strongest finding of the sprint. Semantic naming differences in a brief directly produce measurable visual differences in output.
