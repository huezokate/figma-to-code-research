# Research: T-002-04 — implement-nasi-loom-dashboard

## Ticket Summary

Screen 6 of the NASI onboarding flow. Loom mode dashboard — "What are we working on today?" A work-session-focused creative companion dashboard. Richest screen of the 6, with multiple distinct content sections.

---

## Codebase State (post T-002-03)

### ModeTabBar
Updated in T-002-03: `activeTab="loom"` → `bg-blue-500` pill. Pre-wired, ready to use.

### Loom Color
- Loom: `bg-blue-500` (from T-001-01 mode cards)
- Active tab: `bg-blue-500` (already in ModeTabBar ACTIVE_COLORS)
- "What are we working on today?" text label: Loom's blue family

### Established Patterns
- NasiShellDashboard: single-column flex, `bg-gray-50`, `flex-1 overflow-y-auto`
- NasiSpriteDashboard: grid with mixed card sizes
- ModeTabBar: import from `../../002-nasi-app-connect/src/ModeTabBar`
- All Astro pages: phone-frame pattern `w-[390px] h-[844px] overflow-hidden rounded-3xl shadow-2xl`

### Stub Page
`src/pages/experiments/006-nasi-loom-dashboard/index.astro` — stub, same as 003–005.

### Experiment Directory
`experiments/006-nasi-loom-dashboard/` — has `BRIEF.md`, `RETRO.md`, no `src/`.

---

## FigJam Source Notes (from ticket brief)

Sections:
1. **Tab bar**: Loom | Sprite | Shell — Loom active (blue)
2. **Document/header area**: `DOCUMENT_SINGLE` element at top
3. **Main prompt card**: Large rounded rect — "What are we working on today?"
4. **Inspiration cards**: 2×2 grid, 4 cards with exact copy:
   - "Inspo 1: Improve your right hook"
   - "Inspo 2: Try yourself in poetry"
   - "Inspo 3: Gardening tips 101"
   - "Inspo 4: New UI trends"
5. **Previous projects**: Content block for past work sessions
6. **Share your work**: `MANUAL_INPUT` element — text input / CTA
7. **Content you follow / endless scroll**: Bottom content browsing section

---

## Constraints

1. Exact inspiration card copy must be preserved verbatim from the FigJam.
2. "What are we working on today?" is the **visual focal point** — the largest element.
3. `ModeTabBar` with `activeTab="loom"`.
4. Full scroll — all 7 sections must be reachable by scrolling.
5. No routing, no real input handling (PoC static visual).
6. Mobile 390px frame.

---

## Files Relevant to This Ticket

| File | Role |
|------|------|
| `experiments/006-nasi-loom-dashboard/src/NasiLoomDashboard.tsx` | Create |
| `src/pages/experiments/006-nasi-loom-dashboard/index.astro` | Modify — replace stub |
| `experiments/002-nasi-app-connect/src/ModeTabBar.tsx` | Import (read-only, already updated) |
