# Review: T-002-02 — implement-nasi-sprite-dashboard

## Summary

Implemented the Sprite dashboard (Screen 4) — "Chaos Curated." A visually dense content grid with ModeTabBar reuse, mixed-width cards, and gradient fills per content type. TypeScript clean (0 errors). All acceptance criteria met.

---

## Files Changed

| File | Action | Lines |
|------|--------|-------|
| `experiments/004-nasi-sprite-dashboard/src/NasiSpriteDashboard.tsx` | Created | 43 |
| `src/pages/experiments/004-nasi-sprite-dashboard/index.astro` | Modified (stub → live) | 12 |

---

## Acceptance Criteria

| Criteria | Result |
|----------|--------|
| Tab bar with Sprite active | ✓ |
| "Chaos Curated" label in pink | ✓ |
| 8+ content cards in mixed-width grid | ✓ (10 cards) |
| Visually dense, "curated chaos" feel | ✓ |
| Scrollable at 390px | ✓ |
| Page at `/experiments/004-nasi-sprite-dashboard/` | ✓ |

---

## Implementation Notes

**ModeTabBar reuse**: Cross-experiment import from `../../002-nasi-app-connect/src/ModeTabBar` works correctly since `tsconfig.json` includes `experiments/`. This import pattern is now established for T-002-03 and T-002-04.

**Visual chaos technique**: CSS `grid-cols-2` with selective `col-span-2` for wide cards, combined with `h-32`/`h-24` height variation and different gradient colors per card, produces a convincingly "chaotic" visual rhythm without CSS masonry.

**Gradient cards**: Tailwind's `bg-gradient-to-br` with dynamic `from-X to-Y` classes works because all class names are present as complete strings in the `CARDS` array — Tailwind v4's JIT scanner can detect them.

---

## Open Concerns

1. **ModeTabBar active pill color is always pink-500** — for T-002-03 (Shell active) and T-002-04 (Loom active), the active pill color should change to gray and blue respectively. ModeTabBar needs to be updated to map activeTab → color. Flagging this for the downstream tickets.

2. **Retro not written**: `experiments/004-nasi-sprite-dashboard/RETRO.md` is a blank template. Awaits visual review.

---

## Downstream Unblocked

T-002-03 (Shell dashboard) and T-002-04 (Loom dashboard) are now unblocked:
- ModeTabBar import pattern established
- Card grid pattern established (Shell will use single-column variant)
- Loom will use a different layout structure (prompt card + 2×2 inspo grid)
