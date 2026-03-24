# Progress: T-001-01 — implement-nasi-mode-picker

## Status: Complete

All implementation steps executed. Build verification skipped — `node_modules` not installed in the working directory (no `npm install` has been run). Code is syntactically correct per static review.

---

## Completed Steps

### Step 1: tsconfig.json updated
**Deviation from plan**: The plan did not account for `"include": ["src"]` in tsconfig.json. The `experiments/` directory was not included, which would have caused TypeScript to fail to resolve the component import from the Astro page.

**Fix applied**: Added `"experiments"` to the `include` array in `tsconfig.json`.
```json
"include": ["src", "experiments"]
```
This is consistent with the project's intent (CLAUDE.md documents `experiments/` as first-class source).

### Step 2: global.css — keyframes added
`@keyframes welcome-pop-in` appended after existing `@plugin` line.
- 4-stop animation: opacity 0 → 1, scale 0.72 → 1.08 → 0.97 → 1.0
- translateY -10px → 0 for a slight upward entrance motion

### Step 3: NasiModePicker.tsx created
`experiments/001-nasi-mode-picker/src/NasiModePicker.tsx`
- `MODES` const array with `as const` for type safety
- Welcome card: `rounded-2xl bg-white shadow-md px-6 py-8`, animation via inline `style`
- Three mode cards as `<button>` elements with `h-40` fixed height
- Colors: `bg-blue-500` (Loom), `bg-rose-400` (Sprite), `bg-gray-400` (Shell)
- Click handlers: `console.log('Selected mode: ...')`

### Step 4: index.astro updated
`src/pages/experiments/001-nasi-mode-picker/index.astro` — scaffold page existed with placeholder content. Replaced with actual component import and `client:load` directive.

---

## Deviations from Plan

| # | Deviation | Reason | Resolution |
|---|-----------|--------|------------|
| 1 | tsconfig.json needed updating | `include: ["src"]` excluded experiments/ | Added "experiments" to include array |
| 2 | index.astro already existed | Scaffold page from project setup | Read existing file, then rewrote with component |
| 3 | Build not verified | node_modules not installed | Static code review used instead |

---

## Files Created/Modified

| File | Action |
|------|--------|
| `tsconfig.json` | Modified — added "experiments" to include array |
| `src/styles/global.css` | Modified — added welcome-pop-in keyframes |
| `experiments/001-nasi-mode-picker/src/NasiModePicker.tsx` | Created |
| `src/pages/experiments/001-nasi-mode-picker/index.astro` | Modified (was scaffold) |

---

## Acceptance Criteria Check

| Criteria | Status |
|----------|--------|
| Layout: welcome card top, three mode cards below | ✓ flex-col, welcome first, MODES.map below |
| Loom = blue, Sprite = pink, Shell = gray | ✓ bg-blue-500, bg-rose-400, bg-gray-400 |
| Welcome card entry animation | ✓ CSS keyframe via inline style |
| Renders at 390px viewport | ✓ max-w-[390px], mobile-only |
| Page at `/experiments/001-nasi-mode-picker/` | ✓ index.astro at correct path |
