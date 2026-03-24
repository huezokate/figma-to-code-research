# Design: T-002-03 — implement-nasi-shell-dashboard

## Key Design Principle

Shell = "Chaos Toned Down." The visual contrast with Sprite (Screen 4) must be immediately legible. Where Sprite was dense, mixed-size, and colorful, Shell is spacious, uniform, and muted.

---

## ModeTabBar Fix

**Decision**: Update `ModeTabBar.tsx` to map `activeTab` to the correct pill color.

```tsx
const ACTIVE_COLORS: Record<'sprite' | 'loom' | 'shell', string> = {
  sprite: 'bg-pink-500',
  loom:   'bg-blue-500',
  shell:  'bg-gray-500',
};
```

Then: `<span className={`${ACTIVE_COLORS[activeTab ?? 'sprite']} text-white rounded-full ...`}>`

This is the cleanest fix. No props change — `activeTab` prop type unchanged. Both T-001-02 and T-002-02 continue to work (Sprite still gets pink-500). T-002-04 will also benefit (Loom gets blue-500).

---

## Shell Dashboard Layout

### Option A — Single large card (literal FigJam interpretation)
One `DOCUMENT_SINGLE` rounded rectangle filling most of the screen.

**Pros**: Most literal reading of the FigJam.
**Cons**: One card isn't a dashboard — it's just a placeholder. Doesn't demonstrate "same content as Sprite, calmer."

**Verdict**: Too literal. The brief says "fewer items, more whitespace" — implies multiple items, not one.

### Option B — Single-column card list with generous spacing
Cards in a `flex flex-col gap-4` layout (not a grid), each taking full width. `h-28` per card. Muted gradient palette (desaturated versions of Sprite colors — gray-blue, cool tones).

**Pros**:
- Visually demonstrates the contrast with Sprite's chaotic grid
- "Same content types" but presented calmly
- Matches the DOCUMENT_SINGLE intent (one card in view at a time)
- Single column = `col-span` issue goes away entirely

**Verdict**: Accept.

---

## Cards Design

6 cards (fewer than Sprite's 10, matching "fewer items visible at once"):
1. 🎵 "Daily Mix: Indie Vibes" — slate-400 → gray-500
2. 📖 "Reading List" — stone-400 → zinc-500
3. 🎬 "Watchlist" — gray-400 → slate-500
4. 🎙️ "Podcast Queue" — zinc-400 → gray-500
5. 📌 "Saved Boards" — cool-gray, slate-300 → gray-400
6. 📖 "Continue Reading" — stone-300 → slate-400

Each card: `rounded-2xl`, muted gradient, full-width, `h-28`, emoji + label with more generous internal padding.

---

## "Chaos Toned Down" Badge

`text-xl font-bold text-gray-600` — muted, not vibrant. Secondary text `text-xs text-gray-400 "calmer. cleaner. still yours."`.

---

## Layout

```
<div flex-col w-full h-full bg-gray-50>   ← slightly off-white bg (calmer than pure white)
  <ModeTabBar activeTab="shell" />
  <div flex-1 overflow-y-auto px-4 py-4>
    <div mb-5>
      <h1> "Chaos Toned Down"   — text-xl font-bold text-gray-600
      <p>  "calmer. cleaner. still yours."  — text-xs text-gray-400
    </div>
    <div flex flex-col gap-4>
      {CARDS.map → <div rounded-2xl gradient full-width h-28 flex ...>}
    </div>
  </div>
</div>
```
