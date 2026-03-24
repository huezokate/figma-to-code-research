# Retro: NASI App Connect

## Result
Pass

## What Matched
- Tab bar with Sprite active (pink/coral), Loom and Shell visible but inactive
- Heading and body copy exact from FigJam
- 3-column app grid with all 13 apps, scrollable
- App tile toggle behavior (selected/unselected state)
- Pinned security footer stays fixed while content scrolls
- Renders correctly in 390×844 phone frame

## What Didn't
- Nothing significant — all acceptance criteria met on visual review

## Why
The FigJam contained explicit app names (rows of 3), exact copy for heading/body, and clear layout description (tab bar top, grid middle, footer pinned). Enough to implement without hi-fi specs.

## Brief Changes for Next Time
- Add a note that the security footer should have a specific bg color (dark gray/near-black) — was inferred
- Clarify whether Loom/Shell tabs should be present but inactive, or hidden entirely on Screen 2

## Technique Extracted?
Candidate: "Reusable ModeTabBar pattern — extract as standalone component with `activeTab` prop on first occurrence; pass prop from parent screen. No internal state needed."

## Roundtrip Notes
- **FigJam x/y positions**: Not useful for grid layout — the 3-column grid structure was derived from the row-by-row app list description, not coordinates. Coordinates in FigJam lo-fi don't map reliably to CSS layout.
- **Tab bar reuse**: ModeTabBar designed as reusable from the start (display-only, `activeTab` prop). No changes needed for screens 3–6 — just pass the correct `activeTab` value.
- **What hi-fi would have clarified**: Icon sizes and padding within tiles, exact tab bar height, footer padding and typography weight, selected tile highlight color precision (pink-50 + border vs. filled bg).
