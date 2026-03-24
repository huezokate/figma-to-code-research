# Structure: T-001-02 implement-nasi-app-connect

## Files Created

### 1. `experiments/002-nasi-app-connect/BRIEF.md`
Visual spec document. Describes the component purpose, Figma source, visual specifications, and acceptance criteria. Human-readable reference.

### 2. `experiments/002-nasi-app-connect/figma/.gitkeep`
Placeholder for Figma exports. No screenshots available at implementation time (lo-fi FigJam source only). Directory created so the structure matches experiment conventions.

### 3. `experiments/002-nasi-app-connect/src/ModeTabBar.tsx`
**Module boundary**: Reusable tab bar component for NASI screens 2–6.

Public interface:
```typescript
export interface ModeTabBarProps {
  activeTab?: 'sprite' | 'loom' | 'shell';
}
export default function ModeTabBar(props: ModeTabBarProps): JSX.Element;
```

Internals:
- Hardcoded tab definitions: `[{ id: 'sprite', label: 'Sprite' }, { id: 'loom', label: 'Loom' }, { id: 'shell', label: 'Shell' }]`
- Renders a `<nav>` with a horizontal flex row of tab buttons
- Active tab: `bg-pink-500 text-white rounded-full px-4 py-1.5`
- Inactive tab: `text-gray-500 px-4 py-1.5`
- Outer nav: `flex gap-2 px-4 py-3 bg-white border-b border-gray-200`
- No onClick — display-only for Screen 2 (tab navigation is future scope)

### 4. `experiments/002-nasi-app-connect/src/AppTile.tsx`
**Module boundary**: Single toggleable app tile.

Public interface:
```typescript
export interface AppTileProps {
  label: string;
  icon: string;
  selected: boolean;
  onToggle: () => void;
}
export default function AppTile(props: AppTileProps): JSX.Element;
```

Internals:
- `<button>` element (keyboard accessible, handles click)
- Flex column: icon area on top, label below
- Icon area: `rounded-2xl w-full aspect-square flex items-center justify-center text-2xl`
  - Unselected: `bg-gray-100 border-2 border-transparent`
  - Selected: `bg-pink-50 border-2 border-pink-400`
- Label: `text-xs text-center mt-1 text-gray-700`
- Full button: `flex flex-col items-center w-full`

### 5. `experiments/002-nasi-app-connect/src/NasiAppConnect.tsx`
**Module boundary**: Top-level screen component — owns all app selection state.

Public interface:
```typescript
export default function NasiAppConnect(): JSX.Element;
```

Internals:
- `useState<Set<string>>` for selected app IDs
- Hardcoded `APPS` array of 13 items: `{ id: string; label: string; icon: string }`
- Layout: `flex flex-col w-full h-full bg-white`
- Zones:
  1. `<ModeTabBar activeTab="sprite" />` — top, no scroll
  2. Scrollable content: `flex-1 overflow-y-auto px-4 py-4`
     - Heading: `text-xl font-semibold text-gray-900 mb-2`
     - Body copy: `text-sm text-gray-600 mb-4`
     - Grid: `grid grid-cols-3 gap-3`
     - Maps APPS array → `<AppTile>` with toggle handler
  3. Security footer: `bg-gray-900 text-white text-xs px-4 py-4 text-center`

Imports: `ModeTabBar` from `./ModeTabBar`, `AppTile` from `./AppTile`

### 6. `src/pages/experiments/002-nasi-app-connect/index.astro`
**Module boundary**: Astro page that wires the React component into the research site.

Structure:
```astro
---
import ExperimentLayout from '../../../layouts/ExperimentLayout.astro';
import NasiAppConnect from '../../../../experiments/002-nasi-app-connect/src/NasiAppConnect';
---

<ExperimentLayout
  experimentId="002"
  title="NASI App Connect"
  status="in-progress"
>
  <div class="flex justify-center">
    <div class="w-[390px] h-[844px] overflow-hidden rounded-3xl shadow-2xl border border-gray-200">
      <NasiAppConnect client:load />
    </div>
  </div>
</ExperimentLayout>
```

The `390px × 844px` wrapper simulates iPhone 14 Pro form factor. `overflow-hidden` + `rounded-3xl` gives a phone-like presentation. `client:load` enables React hydration for toggle interactions.

---

## Files Modified

None. All changes are additive.

---

## Files Deleted

None.

---

## Dependency Order

Implementation should proceed in this order to avoid import errors:
1. `ModeTabBar.tsx` — no local imports
2. `AppTile.tsx` — no local imports
3. `NasiAppConnect.tsx` — imports ModeTabBar and AppTile
4. `index.astro` — imports NasiAppConnect
5. `BRIEF.md` — documentation, any order
6. `figma/.gitkeep` — placeholder, any order

---

## Module Boundaries Summary

| File | Exports | Imports |
|------|---------|---------|
| `ModeTabBar.tsx` | `ModeTabBar`, `ModeTabBarProps` | React only |
| `AppTile.tsx` | `AppTile`, `AppTileProps` | React only |
| `NasiAppConnect.tsx` | `NasiAppConnect` (default) | ModeTabBar, AppTile, React |
| `index.astro` | page (Astro default) | ExperimentLayout, NasiAppConnect |

---

## Type Safety Notes

- All components are typed with explicit prop interfaces exported from the same file
- `useState<Set<string>>` for selected state — uses functional updates `prev => new Set(prev).add/delete(id)` to ensure immutable updates
- `APPS` array typed as `readonly { id: string; label: string; icon: string }[]`
