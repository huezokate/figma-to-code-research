# NASI App Connect (Screen 2)

## Figma Source
- File: NASI lo-fi onboarding flow
- Board: https://www.figma.com/board/O9ONqUiEu0vcaAJ5VGgq1d/NASI?node-id=39-825
- FigJam section: `3:3935` — "Screen 2"
- Screenshots: see ./figma/

## What This Is
The permissions/data-connect screen. Users select which apps to give NASI access to. The connected apps are used to build their profile and power the three modes.

## Visual Specifications

- **Layout**: Mobile (~390px). Tab bar at top (Sprite active). Heading + body copy below tab bar. Scrollable app grid. Pinned security footer at bottom.
- **Tab bar**: Three tabs — Sprite (pink/coral, active), plus two more. Shared component across screens 2–6.
- **Heading**: "Let's get you set up and connected" — prominent, bold
- **Body copy**: "Select the apps you would like give Sprite access to (include those for Loom and Shell?)"
- **App grid**: 3 columns, rounded square tiles, each with icon placeholder + label. Apps:
  Row 1: Apple Music, iMessage, Instagram
  Row 2: Spotify, Podcast, Pinterest
  Row 3: X (twitter), Wattpad, TikTok
  Row 4: Oura, Picture Gallery, YouTube
  Row 5: Disney
- **Tile states**: Default (unselected) and selected (highlighted with Sprite color or checkmark)
- **Security footer**: Dark/contrasting bar pinned to bottom — "Ideally a super message on security and never selling or using data for evil?" (placeholder copy)
- **Colors**: Inherit from S-001 mode color system

## Acceptance Criteria
1. All 13 apps present in 3-column grid with correct labels
2. App tiles toggle selected/unselected on tap
3. Tab bar renders with Sprite active
4. Security footer pinned to bottom, dark background

## Design Tokens / References
Same as Screen 1. Sprite = pink/coral.

## What I'm Testing
How well does the FigJam grid structure (x/y positions, widths) translate into a workable CSS grid spec? Does the MCP give enough to infer column count and spacing?
