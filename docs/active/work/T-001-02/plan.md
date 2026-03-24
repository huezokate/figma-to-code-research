# Plan: T-001-02 implement-nasi-app-connect

## Implementation Steps

Steps are ordered to respect module dependencies. Each step is independently committable.

---

### Step 1: Scaffold experiment directory

Create:
- `experiments/002-nasi-app-connect/figma/.gitkeep`
- `experiments/002-nasi-app-connect/BRIEF.md`

BRIEF.md captures the visual spec for experiment 002 in the standard format used by experiment 001. This ensures the experiment directory is complete per project conventions.

**Verification**: `ls experiments/002-nasi-app-connect/` shows `BRIEF.md` and `figma/`.

---

### Step 2: Implement `ModeTabBar.tsx`

Create `experiments/002-nasi-app-connect/src/ModeTabBar.tsx`.

Contents:
- `ModeTabBarProps` interface: `activeTab?: 'sprite' | 'loom' | 'shell'`
- Tab definitions array: `['sprite', 'loom', 'shell']` with display labels
- `<nav>` with `flex gap-2 px-4 py-3 bg-white border-b border-gray-200`
- Each tab as a `<span>` (display only for PoC — no onClick)
  - Active: `bg-pink-500 text-white rounded-full px-4 py-1.5 text-sm font-medium`
  - Inactive: `text-gray-500 px-4 py-1.5 text-sm`

**Verification**: TypeScript compiles without errors. Component renders a row of three tabs with Sprite styled differently.

---

### Step 3: Implement `AppTile.tsx`

Create `experiments/002-nasi-app-connect/src/AppTile.tsx`.

Contents:
- `AppTileProps` interface: `label`, `icon`, `selected`, `onToggle`
- `<button>` with `flex flex-col items-center w-full` and `onClick={onToggle}`
- Icon area: `rounded-2xl w-full aspect-square flex items-center justify-center text-2xl`
  - `bg-gray-100 border-2 border-transparent` when unselected
  - `bg-pink-50 border-2 border-pink-400` when selected
- Label: `text-xs text-center mt-1.5 text-gray-700 leading-tight`

**Verification**: Component toggles border/background on click.

---

### Step 4: Implement `NasiAppConnect.tsx`

Create `experiments/002-nasi-app-connect/src/NasiAppConnect.tsx`.

Contents:
- `APPS` const array with 13 items (id, label, icon emoji)
- `useState<Set<string>>` initialized to empty set
- `toggleApp(id: string)` handler using functional update
- Outer: `flex flex-col w-full h-full bg-white`
- Zone 1: `<ModeTabBar activeTab="sprite" />`
- Zone 2: `<div className="flex-1 overflow-y-auto px-4 py-4">`
  - `<h1 className="text-xl font-semibold text-gray-900 mb-2">Let's get you set up and connected</h1>`
  - `<p className="text-sm text-gray-600 mb-5">Select the apps you would like give Sprite access to (include those for Loom and Shell?)</p>`
  - `<div className="grid grid-cols-3 gap-3">` with mapped `<AppTile>` elements
- Zone 3: `<div className="bg-gray-900 text-white text-xs px-4 py-4 text-center">` with security copy

**Verification**: All 13 app tiles render in a 3-column grid. Toggling a tile updates its visual state.

---

### Step 5: Create Astro page

Create `src/pages/experiments/002-nasi-app-connect/index.astro`.

Contents:
- Import `ExperimentLayout` from `../../../layouts/ExperimentLayout.astro`
- Import `NasiAppConnect` from `../../../../experiments/002-nasi-app-connect/src/NasiAppConnect`
- Wrap component in phone-frame div: `w-[390px] h-[844px] overflow-hidden rounded-3xl shadow-2xl border border-gray-200`
- Center with `flex justify-center`
- Pass `client:load` for React hydration
- Props: `experimentId="002"` `title="NASI App Connect"` `status="in-progress"`

**Verification**: `npm run dev` — navigate to `/experiments/002-nasi-app-connect/`. Component renders inside phone frame. Tiles are interactive.

---

### Step 6: End-to-end acceptance verification

Check all acceptance criteria from the ticket:

| Criterion | How to verify |
|-----------|---------------|
| Tab bar renders with Sprite active (pink/coral) | Visual — dev server |
| Heading and body copy match FigJam text | Visual + DOM inspection |
| App grid shows all 13 apps in 3-column layout | Count rendered tiles |
| App tiles toggle selected/unselected on click | Click interaction |
| Security footer pinned to bottom | Scroll content; footer stays |
| Renders correctly at 390px viewport width | Dev tools device emulation |
| Page at `/experiments/002-nasi-app-connect/` exists | Navigate in browser |
| Experiment appears on homepage | Check `/` index page |

---

## Testing Strategy

This is a visual/interactive PoC. No automated tests are planned (consistent with experiment 001's approach — no test files exist in the project).

**Manual verification** is the testing strategy:
1. `npm run build` must complete without TypeScript or Astro errors
2. `npm run dev` — visual review at `/experiments/002-nasi-app-connect/`
3. Click test: toggle 5+ tiles, verify selected state visual change
4. Scroll test: if 13 tiles don't fit, scroll grid while footer stays put

**TypeScript compile-time verification** is the primary automated check — prop type mismatches will fail the build.

---

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Import path from `src/pages/experiments/` to `experiments/` root is unusual | Use relative `../../../../experiments/...` path; verify at build time |
| Tailwind v4 class application differs from v3 | Stick to standard utility classes; no custom theme needed |
| `aspect-square` behavior in grid may vary | Test in dev server; fallback to explicit `h-16 w-full` if needed |
| `overflow-y-auto` requires height constraint on flex parent | Outer container is `h-[844px]` so constraint is set |

---

## Commit Strategy

Single commit after all files are created and the build passes. The component is small enough that atomic commits per file would be noisy. If the build fails, fix before committing.
