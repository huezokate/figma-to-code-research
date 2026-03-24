# Design: T-002-02 — implement-nasi-sprite-dashboard

## Core Design Challenge

The "Chaos Curated" feel requires visual density that contrasts with the calm Shell dashboard. The key is a mixed-size grid — some cards take full width (2 of 2 columns) and others are half-width (1 of 2 columns), creating rhythm without uniformity.

---

## Options Considered

### Option A — Uniform 2-column grid
All cards are the same size, 2 columns.

**Pros**: Simple, predictable.
**Cons**: Exactly what "Chaos Curated" should NOT look like. No visual interest. Brief explicitly says "high visual density" and "mix 1-col and 2-col cards."

**Verdict**: Reject.

---

### Option B — CSS Grid with colspan
`grid-cols-2`, with some items having `col-span-2` (full width) and others `col-span-1` (half width). Pattern: wide → narrow narrow → wide → narrow narrow → etc.

**Pros**:
- Achieves the mixed-size visual without CSS masonry (no browser support concerns)
- Each card can have different heights, adding more visual variation
- Clean, declarative — no JS needed for layout
- Consistent with Tailwind utility-first approach

**Cons**: Layout pattern is hand-coded, not truly dynamic. Fine for a PoC.

**Verdict**: Accept.

---

### Option C — CSS masonry (grid-template-rows: masonry)
**Pros**: Most "Pinterest-like" chaos.
**Cons**: Only Firefox supports this behind a flag as of early 2026. Not viable.

**Verdict**: Reject.

---

## Decision: Option B — CSS Grid with col-span variation

---

## Card Data Design

10 cards (exceeds minimum of 8). Each card has:
- `type`: content category
- `emoji`: icon/representative symbol
- `label`: title
- `wide`: boolean — whether card takes `col-span-2`
- `color`: gradient pair (two Tailwind color names)
- `height`: tall or short (`h-32` or `h-24`)

Layout pattern:
```
[wide]          ← col-span-2, h-32
[half] [half]   ← col-span-1, h-24
[wide]          ← col-span-2, h-32
[half] [half]
[wide]
[half] [half]
```

Cards array (10 items):
1. 🎵 "Daily Mix: Indie Vibes" — wide, music, from-violet-400 to-pink-500
2. 📖 "The Midnight Library" — narrow, books, from-amber-300 to-orange-400
3. 🎬 "Top 10 on Netflix" — narrow, video, from-red-400 to-rose-500
4. 📌 "Aesthetic Inspo" — wide, pinterest, from-pink-300 to-fuchsia-400
5. 🎙️ "Crime Junkie: Latest Ep" — narrow, podcast, from-purple-400 to-violet-500
6. 📖 "BookTok Picks" — narrow, books, from-yellow-300 to-amber-400
7. 🎬 "Films Like Your Favs" — wide, video, from-sky-400 to-blue-500
8. 📌 "Room Inspo 2026" — narrow, pinterest, from-rose-300 to-pink-400
9. 🎵 "Artist Radio: Lana" — narrow, music, from-indigo-400 to-purple-500
10. 🎬 "New Drops This Week" — wide, video, from-orange-400 to-red-500

---

## "Chaos Curated" Badge

Below the tab bar, above the grid: a `text-xl font-bold text-pink-500` label reading "Chaos Curated" with a secondary subtext `text-xs text-gray-400` reading "your AI-curated feed."

---

## Layout Structure

```
<div> (flex-col w-full h-full bg-white)
  <ModeTabBar activeTab="sprite" />
  <div> (flex-1 overflow-y-auto px-4 py-4)
    <div> (mb-4)
      <h1> "Chaos Curated"  — text-xl font-bold text-pink-500
      <p>  "your AI-curated feed"  — text-xs text-gray-400
    </div>
    <div> (grid grid-cols-2 gap-3)
      {CARDS.map(...)}
    </div>
  </div>
</div>
```

Each card:
```
<div key={...} className="col-span-{1 or 2} rounded-2xl bg-gradient-to-br from-X to-Y h-{24 or 32} flex flex-col justify-between p-3">
  <span className="text-2xl">{emoji}</span>
  <p className="text-white text-xs font-medium leading-tight">{label}</p>
</div>
```
