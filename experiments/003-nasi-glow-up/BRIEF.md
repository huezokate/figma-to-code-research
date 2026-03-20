# NASI Glow-Up (Screen 3)

## Figma Source
- File: NASI lo-fi onboarding flow
- Board: https://www.figma.com/board/O9ONqUiEu0vcaAJ5VGgq1d/NASI?node-id=39-825
- FigJam section: `3:3939` — "Screen 3"
- Screenshots: see ./figma/

## What This Is
A full-screen interstitial shown while NASI processes connected app data. Sprite "comes alive" for the user during this moment. This is a delight/loading screen.

## Visual Specifications

- **Layout**: Full-screen, no tab bar. Dark background. Centered vertically and horizontally.
- **Main element**: A large ellipse/circle (~80% screen width) centered on screen. Pulsing or glowing animation. Sprite's pink/coral as the glow color. Inside or overlapping: a representation of the Sprite avatar (placeholder image or gradient portrait).
- **Below ellipse**: A character portrait image (the FigJam showed an AI-generated glowing anime-style character). Use a placeholder gradient or image.
- **Loading text**: Something like "Sprite is getting to know you…" — subtle, below the circle.
- **Mood**: Dark, glowing, intimate. This is a transformative moment in the onboarding.
- **Animation**: Ellipse should pulse (scale or opacity) with Sprite's coral/pink glow.

## Acceptance Criteria
1. Dark full-screen background, no navigation chrome
2. Large centered glowing ellipse with pulse animation
3. Avatar placeholder (image or gradient) visible inside/below the ellipse
4. Subtle loading text present

## Design Tokens / References
- Background: near-black (`#0F0F0F` or `slate-950`)
- Glow: Sprite pink/coral with CSS `box-shadow` or `drop-shadow`

## What I'm Testing
Can a single-element FigJam screen (mostly a shape + note) produce a compelling animated interstitial? How much has to be invented versus read from the source?
