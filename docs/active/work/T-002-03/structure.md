# Structure: T-002-03 — implement-nasi-shell-dashboard

## Files Changed

### Created
- `experiments/005-nasi-shell-dashboard/src/NasiShellDashboard.tsx`

### Modified
- `experiments/002-nasi-app-connect/src/ModeTabBar.tsx` — add `ACTIVE_COLORS` map for active pill color
- `src/pages/experiments/005-nasi-shell-dashboard/index.astro` — replace stub

---

## `ModeTabBar.tsx` Change

Add constant before the component:
```tsx
const ACTIVE_COLORS: Record<'sprite' | 'loom' | 'shell', string> = {
  sprite: 'bg-pink-500',
  loom:   'bg-blue-500',
  shell:  'bg-gray-500',
};
```

In the render, replace `bg-pink-500` with `${ACTIVE_COLORS[activeTab ?? 'sprite']}`:
```tsx
<span className={`${ACTIVE_COLORS[activeTab ?? 'sprite']} text-white rounded-full px-4 py-1.5 text-sm font-medium`}>
```

This is a backward-compatible change. Existing callers passing `activeTab="sprite"` continue to get pink-500.

---

## `NasiShellDashboard.tsx` — Module Boundary

**Default export**: `NasiShellDashboard`
**Props**: none
**State**: none
**Imports**: `ModeTabBar` from `../../002-nasi-app-connect/src/ModeTabBar`

### Internal Data
```ts
const CARDS = Array<{ id, emoji, label, from, to }>
```
No `wide`/`tall` fields — all cards uniform (full-width, h-28).

---

## Ordering

1. Update `ModeTabBar.tsx` (needed by this ticket AND T-002-04)
2. Create `NasiShellDashboard.tsx`
3. Update `index.astro`
4. TypeScript check
