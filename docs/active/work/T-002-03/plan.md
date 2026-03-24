# Plan: T-002-03 — implement-nasi-shell-dashboard

## Steps

### Step 1 — Update ModeTabBar.tsx
Add `ACTIVE_COLORS` record. Replace hardcoded `bg-pink-500` with dynamic lookup.

### Step 2 — Create NasiShellDashboard.tsx
`experiments/005-nasi-shell-dashboard/src/NasiShellDashboard.tsx`
- `CARDS`: 6 muted-gradient full-width cards
- Layout: `flex flex-col gap-4` (not a grid)
- Background: `bg-gray-50`
- Header: "Chaos Toned Down" in `text-gray-600`

### Step 3 — Update index.astro
Replace stub with phone-frame + `<NasiShellDashboard client:load />`

### Step 4 — TypeScript check
`tsc --noEmit`, expect 0 errors.

## Risk
Low. ModeTabBar change is small and backward-compatible. TypeScript check will catch any issues immediately.
