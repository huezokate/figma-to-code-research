# Research: T-002-02 — implement-nasi-sprite-dashboard

## Ticket Summary

Screen 4 of the NASI onboarding flow. The Sprite mode dashboard — "Chaos Curated." A dense, visually busy media/entertainment feed showing AI-curated content cards based on the apps connected in Screen 2.

---

## Codebase State

### ModeTabBar (from T-001-02)
`experiments/002-nasi-app-connect/src/ModeTabBar.tsx` — available and ready to import.

Props: `{ activeTab?: 'sprite' | 'loom' | 'shell' }`
Active tab styling:
- Sprite: `bg-pink-500 text-white rounded-full`
- Loom active: `bg-pink-500` (same — needs update for blue when Loom is active)
- Inactive: `text-gray-400`

**Issue**: `ModeTabBar` hardcodes the active pill color to `bg-pink-500` regardless of which tab is active. For this screen, Sprite is active (pink), so this works. But for Shell and Loom dashboards (T-002-03, T-002-04), the active pill should be gray or blue respectively. This ticket should NOT change ModeTabBar since it's used by T-001-02 (done). Downstream tickets will need to handle this.

### Color System
- Sprite: `bg-rose-400` (mode cards) / `bg-pink-500` (tab pill active) / `text-pink-500` (label)
- The "Chaos Curated" badge should use Sprite's pink

### App patterns
- NasiAppConnect.tsx: `flex flex-col w-full h-full` — fills phone frame
- Scrollable middle: `flex-1 overflow-y-auto px-4 py-4`
- ModeTabBar at top, pinned footer at bottom

### Existing stub
`src/pages/experiments/004-nasi-sprite-dashboard/index.astro` — stub with commented-out import. Same pattern as 003.

### Experiment directory
`experiments/004-nasi-sprite-dashboard/` — has `BRIEF.md` and `RETRO.md`, no `src/`.

---

## FigJam Source Notes (from ticket brief)

- **Tab bar**: Sprite active (pink/coral)
- **Mode label**: "Chaos Curated" — prominent header/badge
- **Content**: Dense grid — AI-curated media/entertainment. Two AI-generated images shown in FigJam representing book covers, show posters, content cards.
- **Designer note**: "that's what we scrape and profile the person, interests? aspirations? content likes?"
- **Visual intent**: High density. "Chaos" = intentionally busy. Not a uniform boring list.

### Content types (from brief)
- 🎵 music
- 📖 books
- 🎬 video
- 📌 pins/boards

### Grid structure (inferred from brief)
"Mix 1-col and 2-col cards" — a masonry-like grid where some cards take 2 columns and others take 1. This is the key visual technique for "chaos."

---

## Constraints

1. **ModeTabBar**: Import from 002 path, Sprite active.
2. **No state needed** beyond potential scroll position (but that's implicit from `overflow-y-auto`).
3. **Card count**: Minimum 8 cards per acceptance criteria.
4. **Mobile width**: 390px phone frame, full height with scroll.
5. **No real images**: Gradient placeholders or emoji.

---

## Files Relevant to This Ticket

| File | Role |
|------|------|
| `experiments/004-nasi-sprite-dashboard/src/NasiSpriteDashboard.tsx` | Create |
| `src/pages/experiments/004-nasi-sprite-dashboard/index.astro` | Modify — replace stub |
| `experiments/002-nasi-app-connect/src/ModeTabBar.tsx` | Import (read-only) |

---

## Key Technical Question

The "chaotic" mixed-size grid: CSS grid with `grid-cols-2` and some cards spanning `col-span-2` achieves the 1-col/2-col mix. This is more predictable than CSS masonry (which has limited browser support) and sufficient for a PoC.
