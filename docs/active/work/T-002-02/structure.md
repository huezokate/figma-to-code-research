# Structure: T-002-02 — implement-nasi-sprite-dashboard

## Files Changed

### Created
- `experiments/004-nasi-sprite-dashboard/src/NasiSpriteDashboard.tsx`

### Modified
- `src/pages/experiments/004-nasi-sprite-dashboard/index.astro` — replace stub with live component

### Unchanged
- `experiments/002-nasi-app-connect/src/ModeTabBar.tsx` — imported, not modified
- `src/styles/global.css` — no new keyframes needed
- `tsconfig.json` — already includes `experiments/`

---

## `NasiSpriteDashboard.tsx` — Module Boundary

**Default export**: `NasiSpriteDashboard` (React functional component)
**Props**: none
**State**: none (purely presentational)
**Imports**:
- `ModeTabBar` from `'../../002-nasi-app-connect/src/ModeTabBar'`

### Internal Data Structure

```ts
const CARDS: Array<{
  id: string;
  emoji: string;
  label: string;
  wide: boolean;
  from: string; // Tailwind gradient-from class
  to: string;   // Tailwind gradient-to class
  tall: boolean; // h-32 vs h-24
}>
```

### Component Tree

```
NasiSpriteDashboard
├── ModeTabBar (activeTab="sprite")
└── <div flex-1 overflow-y-auto px-4 py-4>
    ├── <div> — "Chaos Curated" header + subtext
    └── <div grid grid-cols-2 gap-3>
        └── CARDS.map → <div col-span-{1|2} gradient rounded-2xl ...>
                            ├── emoji
                            └── label
```

---

## `004-nasi-sprite-dashboard/index.astro` — Replacement

Same phone-frame pattern as 002 and 003:

```astro
---
export const prerender = true;
import ExperimentLayout from '../../../layouts/ExperimentLayout.astro';
import NasiSpriteDashboard from '../../../../experiments/004-nasi-sprite-dashboard/src/NasiSpriteDashboard';
---

<ExperimentLayout experimentId="004" title="NASI Sprite Dashboard" status="in-progress">
  <div class="flex justify-center">
    <div class="w-[390px] h-[844px] overflow-hidden rounded-3xl shadow-2xl border border-gray-200">
      <NasiSpriteDashboard client:load />
    </div>
  </div>
</ExperimentLayout>
```

---

## Ordering

1. Create `NasiSpriteDashboard.tsx` with ModeTabBar import and card grid
2. Update `index.astro`
3. TypeScript check
