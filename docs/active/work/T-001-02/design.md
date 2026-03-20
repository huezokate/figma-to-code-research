# Design: T-001-02 implement-nasi-app-connect

## Decision Summary

Build the component as a full-screen mobile layout with three distinct zones: sticky tab bar at top, scrollable content area (heading + body + app grid) in the middle, and a pinned security footer at the bottom. Use a flex-column container at 390px width.

---

## Approach Options Considered

### Option A: Full-screen fixed layout with CSS Grid zones
Use `display: grid` with `grid-template-rows: auto 1fr auto` to carve out three zones: tab bar, scrollable content, pinned footer. The middle zone gets `overflow-y: auto`.

**Pros:**
- Clean separation of zones without z-index hacks
- Middle zone scrolls naturally while header/footer stay put
- Idiomatic CSS

**Cons:**
- Requires careful height management (`h-screen` on the container)
- Slightly less familiar pattern for React component demos

### Option B: Flex column with sticky/fixed footer
Use `flex flex-col h-screen` on the outer container. Tab bar sits at top, content grows with `flex-1 overflow-y-auto`, footer sits at bottom with `sticky bottom-0`.

**Pros:**
- Simple, readable Tailwind classes
- Flex-1 + overflow-y-auto is a well-understood scrollable-middle pattern
- No need for z-index on the footer
- Matches Tailwind's idiomatic usage

**Cons:**
- Container must be height-constrained (`h-screen` or fixed px) for overflow-y to work

### Option C: Absolute-positioned footer
Footer uses `position: fixed bottom-0` or `absolute bottom-0`, content has padding-bottom to avoid overlap.

**Pros:**
- Works regardless of container height

**Cons:**
- Fixed positioning breaks when component is embedded in a page with other content above it
- Requires `relative` context and manual padding calculation
- Fragile for PoC demo

**Decision: Option B — Flex column with sticky footer**

Rationale: The component is a self-contained mobile screen demo embedded in the ExperimentLayout. Using `flex flex-col` with a height-constrained outer container (`h-[844px]` to simulate iPhone 14 Pro height, or `h-screen` inside an `mx-auto w-[390px]` wrapper) gives the cleanest Tailwind implementation. The sticky footer within the flex container avoids fixed-position issues. This is the most readable and maintainable approach for a PoC.

---

## Tab Bar Design

The ticket says "Sprite (selected), plus two empty tabs". Based on NASI's three modes (Loom, Shell, Sprite from Screen 1), the tab bar shows all three modes. The active tab for Screen 2 is Sprite.

**Tab appearances:**
- Active (Sprite): pink/coral background or text, filled indicator
- Inactive (Loom, Shell): gray text, no fill

Design choice: tabs display mode names as text labels with an underline or colored dot indicator for the active state. Keep it simple for lo-fi PoC.

**`ModeTabBar` props:**
```typescript
interface ModeTabBarProps {
  activeTab?: 'sprite' | 'loom' | 'shell';
}
```

---

## App Tile Design

Each `AppTile` shows:
- A rounded square icon area with an emoji or letter placeholder
- A text label below

**Toggle states:**
- Unselected: white background, gray border
- Selected: pink/coral border + background tint (matching Sprite brand color)

**`AppTile` props:**
```typescript
interface AppTileProps {
  label: string;
  icon: string;        // emoji or single letter
  selected: boolean;
  onToggle: () => void;
}
```

The parent `NasiAppConnect` holds selected state in `useState<Set<string>>`.

---

## App Grid Design

3-column grid. Tailwind: `grid grid-cols-3 gap-3`.
13 apps = 4 full rows + 1 partial row (1 app). This is fine — CSS grid auto-places items left to right.

---

## App Data

Hardcoded array of 13 apps with labels and emoji placeholders:

| App | Emoji |
|-----|-------|
| Apple Music | 🎵 |
| iMessage | 💬 |
| Instagram | 📷 |
| Spotify | 🎧 |
| Podcast | 🎙️ |
| Pinterest | 📌 |
| X | 𝕏 |
| Wattpad | 📖 |
| TikTok | 🎬 |
| Oura | 💍 |
| Picture Gallery | 🖼️ |
| YouTube | ▶️ |
| Disney | 🏰 |

---

## Security Footer Design

Dark background (Tailwind `bg-gray-900`), white text, standard padding. Text content from ticket:
> "Ideally a super message on security and never selling or using data for evil?"

Note: This is lo-fi placeholder copy. Render it as-is.

---

## Component Architecture

```
NasiAppConnect (holds selected state)
  └── ModeTabBar (activeTab="sprite")
  └── content area (scrollable)
      ├── heading
      ├── body copy
      └── AppGrid
          └── AppTile × 13
  └── SecurityFooter
```

`ModeTabBar` is a pure display component (no state). `AppTile` is a pure display component that receives `selected` and `onToggle`. `NasiAppConnect` owns all toggle state.

---

## What Was Rejected

- **External state (Zustand, Context)**: overkill for a PoC with 13 toggleable items. `useState<Set<string>>` is sufficient.
- **Real icons / SVGs**: ticket explicitly says emoji or letter placeholder. No icon library needed.
- **CSS Modules or styled-components**: Tailwind-only is the project standard.
- **Animations**: not specified in Screen 2 brief (Screen 1 had an animation spec; Screen 2 does not).
- **Fixed positioning for footer**: fragile when embedded in ExperimentLayout; sticky bottom within flex is safer.

---

## Tailwind Token Mapping (lo-fi → Tailwind)

Without exact Figma measurements, applying CLAUDE.md quality bar guidelines:
- App tile padding: `p-3` (12px) — generous enough for a tap target
- Grid gap: `gap-3` (12px)
- Section spacing: `px-4 py-4` for content area
- Heading: `text-xl font-semibold` or `text-2xl font-bold`
- Body copy: `text-sm text-gray-600`
- Tab bar height: natural (content-driven, ~`py-3`)
- Footer padding: `px-4 py-4`
- Sprite pink active color: `bg-pink-500` or `text-pink-500` (`#EC4899` ≈ Sprite brand)
- Selected tile border: `border-pink-400`, tint: `bg-pink-50`
