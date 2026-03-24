# Structure: T-001-01 — implement-nasi-mode-picker

## Files Changed

### Created

| File | Purpose |
|------|---------|
| `experiments/001-nasi-mode-picker/src/NasiModePicker.tsx` | React component — welcome card + 3 mode cards |
| `src/pages/experiments/001-nasi-mode-picker/index.astro` | Astro page wiring the component; route `/experiments/001-nasi-mode-picker/` |

### Modified

| File | Change |
|------|--------|
| `src/styles/global.css` | Add `@keyframes welcome-pop-in` animation definition |

### Not Modified

- `src/layouts/ExperimentLayout.astro` — consumed as-is
- `src/pages/index.astro` — experiment auto-discovered via `import.meta.glob`
- `experiments/001-nasi-mode-picker/BRIEF.md` — read-only spec
- `experiments/001-nasi-mode-picker/RETRO.md` — filled in after review, not by this ticket

---

## Component: `NasiModePicker.tsx`

**Location**: `experiments/001-nasi-mode-picker/src/NasiModePicker.tsx`

**Module type**: Standard ES module, default export.

**Props**: None. Self-contained.

**Internal data**:
```
MODES constant (readonly array):
  - { id: 'loom',   label: 'Loom',   bg: 'bg-blue-500' }
  - { id: 'sprite', label: 'Sprite', bg: 'bg-rose-400'  }
  - { id: 'shell',  label: 'Shell',  bg: 'bg-gray-400'  }
```

**DOM shape**:
```
<div>                              — outer container: max-w-[390px] mx-auto flex flex-col gap-4 p-4
  <div>                            — WelcomeCard: rounded-2xl bg-white shadow-md px-6 py-8
    <p>                            — welcome copy: text-sm text-gray-600 leading-relaxed
      hello message<br />
      lets pick a vibe<br />
      you can always toggle between modes
    </p>
  </div>
  <button>                         — ModeCard: Loom, rounded-2xl bg-blue-500 h-40 flex items-center justify-center w-full
    <span>Loom</span>              — text-2xl font-bold text-white
  </button>
  <button>                         — ModeCard: Sprite, rounded-2xl bg-rose-400 h-40 ...
    <span>Sprite</span>
  </button>
  <button>                         — ModeCard: Shell, rounded-2xl bg-gray-400 h-40 ...
    <span>Shell</span>
  </button>
</div>
```

**Animation**: Applied via inline `style={{ animation: '...' }}` on the WelcomeCard div. No React hooks needed — pure CSS.

**Interactivity**: Each button's `onClick` calls `console.log('Selected mode: loom')` etc.

**No client state**: No `useState`, no `useEffect`. The component is stateless and can render without hydration. However, `onClick` handlers mean it must be hydrated (`client:load` in the Astro page).

---

## Astro Page: `index.astro`

**Location**: `src/pages/experiments/001-nasi-mode-picker/index.astro`

**Structure**:
```
---
export const prerender = true;
import ExperimentLayout from '../../../../src/layouts/ExperimentLayout.astro';
import NasiModePicker from '../../../../../experiments/001-nasi-mode-picker/src/NasiModePicker';
---

<ExperimentLayout experimentId="001" title="NASI Mode Picker" status="in-progress">
  <div class="flex justify-center">
    <NasiModePicker client:load />
  </div>
</ExperimentLayout>
```

The `client:load` directive is required because `onClick` handlers need hydration. Without it, buttons would render but clicks would not fire.

**Import paths**: Relative paths from `src/pages/experiments/001-nasi-mode-picker/` back to project root:
- Layout: `../../../../src/layouts/ExperimentLayout.astro` — but since page is already inside `src/`, the path is `../../../layouts/ExperimentLayout.astro`
- Component: `../../../../experiments/001-nasi-mode-picker/src/NasiModePicker`

Let me recalculate paths from `src/pages/experiments/001-nasi-mode-picker/`:
- `../` → `src/pages/experiments/`
- `../../` → `src/pages/`
- `../../../` → `src/`
- `../../../../` → project root
- Layout is at `src/layouts/ExperimentLayout.astro` → `../../../layouts/ExperimentLayout.astro`
- Component is at `experiments/001-nasi-mode-picker/src/NasiModePicker.tsx` → `../../../../experiments/001-nasi-mode-picker/src/NasiModePicker`

---

## Global CSS: `global.css`

**Addition** (appended after existing content):
```css
@keyframes welcome-pop-in {
  0%   { opacity: 0; transform: scale(0.72) translateY(-10px); }
  55%  { opacity: 1; transform: scale(1.08) translateY(0); }
  75%  { transform: scale(0.97); }
  100% { opacity: 1; transform: scale(1.0); }
}
```

This is a purely additive change. The existing two lines (`@import "tailwindcss"` and `@plugin "@tailwindcss/typography"`) are untouched.

---

## Ordering of Changes

1. Add `@keyframes` to `global.css` first — the component references it by name
2. Create `experiments/001-nasi-mode-picker/src/NasiModePicker.tsx`
3. Create `src/pages/experiments/001-nasi-mode-picker/index.astro`

Steps 2 and 3 can be done in either order since neither depends on the other at write-time, but the page imports the component so the component should exist first for TypeScript resolution.

---

## Boundaries

- **NasiModePicker** is a pure presentational component. No routing, no state management, no side effects beyond console.log.
- **Astro page** is a thin wrapper only. All layout logic lives in the component.
- **global.css** is the only shared-file modification; the keyframe name is namespaced enough (`welcome-pop-in`) to avoid collision with other experiments.
