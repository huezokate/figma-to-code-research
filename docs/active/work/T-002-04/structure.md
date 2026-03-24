# Structure: T-002-04 — implement-nasi-loom-dashboard

## Files Changed

### Created
- `experiments/006-nasi-loom-dashboard/src/NasiLoomDashboard.tsx`

### Modified
- `src/pages/experiments/006-nasi-loom-dashboard/index.astro` — replace stub

### Unchanged
- `experiments/002-nasi-app-connect/src/ModeTabBar.tsx` — already updated in T-002-03

---

## `NasiLoomDashboard.tsx` — Module Boundary

**Default export**: `NasiLoomDashboard`
**Props**: none
**State**: none
**Imports**: `ModeTabBar` from `../../002-nasi-app-connect/src/ModeTabBar`

### Internal Constants

```ts
const INSPO_CARDS = [
  { id, label, copy }  // 4 cards with exact FigJam copy
]

const PROJECTS = [
  { id, emoji, name, when }  // 2 placeholder projects
]

const FOLLOWING = [
  { id, emoji, name, posts }  // 3 content channels
]
```

### Component Tree

```
NasiLoomDashboard
├── ModeTabBar (activeTab="loom")
└── <div flex-1 overflow-y-auto px-4 py-4>
    ├── prompt card (h-36, blue gradient, focal point)
    ├── "Inspiration" header
    ├── inspo grid (grid-cols-2, 4 cards)
    ├── "Previous Projects" header
    ├── projects list (2 cards)
    ├── "Share your work" (fake input)
    ├── "Content You Follow" header
    └── following list (3 rows)
```

---

## `index.astro` Replacement

Same phone-frame pattern as all other experiments.
