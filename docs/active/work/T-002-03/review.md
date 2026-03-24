# Review: T-002-03 — implement-nasi-shell-dashboard

## Summary

Implemented Shell dashboard (Screen 5). Fixed ModeTabBar to support per-mode active pill colors. NasiShellDashboard.tsx implements the calm, single-column layout that contrasts with Sprite's dense chaos grid. TypeScript clean (0 errors). All acceptance criteria met.

---

## Files Changed

| File | Action | Lines |
|------|--------|-------|
| `experiments/002-nasi-app-connect/src/ModeTabBar.tsx` | Modified — ACTIVE_COLORS map | +6 |
| `experiments/005-nasi-shell-dashboard/src/NasiShellDashboard.tsx` | Created | 34 |
| `src/pages/experiments/005-nasi-shell-dashboard/index.astro` | Modified (stub → live) | 12 |

---

## Acceptance Criteria

| Criteria | Result |
|----------|--------|
| Tab bar with Shell active (gray) | ✓ |
| "Chaos Toned Down" label in gray | ✓ |
| Single-column, generous spacing | ✓ |
| Noticeably calmer than Sprite | ✓ |
| Renders at 390px | ✓ |
| Page at `/experiments/005-nasi-shell-dashboard/` | ✓ |

---

## ModeTabBar Fix — Impact on Prior Screens

- **T-001-02 (NasiAppConnect)**: `activeTab="sprite"` → still gets `bg-pink-500`. No regression.
- **T-002-02 (NasiSpriteDashboard)**: `activeTab="sprite"` → still gets `bg-pink-500`. No regression.
- **T-002-03 (this)**: `activeTab="shell"` → `bg-gray-500`. Correct.
- **T-002-04 (Loom)**: `activeTab="loom"` → will get `bg-blue-500`. Pre-wired and ready.

---

## Design Contrast (Sprite vs Shell)

| Aspect | Sprite (Screen 4) | Shell (Screen 5) |
|--------|-------------------|------------------|
| Layout | `grid-cols-2` with col-span variation | `flex flex-col` (single column) |
| Cards | 10 cards | 6 cards |
| Card height | h-24 / h-32 (mixed) | h-28 (uniform) |
| Card padding | p-3 | p-4 (more generous) |
| Background | bg-white | bg-gray-50 |
| Colors | Vibrant (violet, pink, red, sky) | Muted (slate, stone, zinc, gray) |
| Label color | text-pink-500 (bold, vibrant) | text-gray-600 (calm, muted) |

---

## Open Concerns

1. **Retro not written**: awaits visual review.
2. **T-002-04 is now unblocked**: Loom active color (`bg-blue-500`) pre-wired in ModeTabBar.
