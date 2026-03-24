# Retro: NASI Sprite Dashboard

## Result
Pass

## What Matched
- Tab bar with Sprite active (pink)
- "Chaos Curated" label in Sprite pink
- Mixed-width card grid (`col-span-1` + `col-span-2`, two heights) — visually dense
- 10 cards — exceeds 8-card minimum
- Scrollable content area
- Gradient cards with emoji + label — colorful and varied

## What Didn't
- ModeTabBar imported cross-experiment from `002-nasi-app-connect/src/` — not self-contained, fragile path reference
- Mixed-size card pattern is hand-assigned, not derived from FigJam data

## Why
Cross-experiment import was a shortcut that works but creates a hard dependency on 002's file path. Card size assignment is invented — FigJam had no grid layout data for this screen.

## Brief Changes for Next Time
- Note ModeTabBar should be copied into each experiment's src/ for isolation
- Specify approximate wide-card frequency (e.g. "every 3rd card spans full width")

## Technique Extracted?
**Yes**: "Chaos grid via alternating col-span" — `grid-cols-2` with strategic `col-span-2` on select cards produces a dynamic editorial grid from a simple data array. The wide/tall flag pattern is reusable. Extract as technique.

## Roundtrip Notes
- **What the FigJam gave**: "Chaos Curated" label, Sprite's color, implied content types from the app connect screen (music/books/video/social)
- **What was invented**: All card content, the mixed-size layout rhythm, gradient palette per content type
- **Would hi-fi have helped?**: For exact grid rhythm, yes. For the core "dense and chaotic" direction — the name was sufficient.
- **Key finding**: "Chaos Curated" as two words produced genuinely varied visual output. Semantic naming directly influenced layout density and color palette decisions.
