# Retro: NASI Mode Picker

## Result
Pass

## What Matched
- Welcome card + 3 mode cards layout matches FigJam structure
- Color identity: Loom blue, Sprite pink/coral, Shell gray — correct
- Entry animation on welcome card visible and feels right
- Mobile-width centering at 390px works correctly

## What Didn't
- Nothing significant — visual review confirmed all acceptance criteria met

## Why
FigJam description was specific enough (card count, layout order, color names) to produce an accurate first-pass implementation with no ambiguity on structure.

## Brief Changes for Next Time
- Specify approximate card heights (e.g. "tall cards ~160px") to reduce guessing on `h-` value
- Note whether animation should minimize the welcome card after a delay (the FigJam note mentioned this but it wasn't implemented — out of scope for PoC)

## Technique Extracted?
No new technique extracted — implementation was straightforward. Candidate for future extraction: "use `as const` object array for variant card sets with bg color tokens."

## Roundtrip Notes
*Specific to this experiment's role as a FigJam → code proof of concept:*
- **What the FigJam gave us**: Card count, stacking order, mode names, color identities (blue/pink/gray), welcome copy verbatim, designer note about animation
- **What we had to infer**: Card height, exact spacing, font sizes, border-radius values, animation easing curve
- **Would hi-fi have helped?**: Yes — for the animation feel (easing, duration) and exact card proportions. Structure and color were fully covered by lo-fi.
