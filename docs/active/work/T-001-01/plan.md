# Plan: T-001-01 — implement-nasi-mode-picker

## Implementation Steps

### Step 1: Add keyframes to global.css

**File**: `src/styles/global.css`
**Change**: Append `@keyframes welcome-pop-in` after existing lines.

```css
@keyframes welcome-pop-in {
  0%   { opacity: 0; transform: scale(0.72) translateY(-10px); }
  55%  { opacity: 1; transform: scale(1.08) translateY(0); }
  75%  { transform: scale(0.97); }
  100% { opacity: 1; transform: scale(1.0); }
}
```

**Verification**: File should have 3 sections: `@import`, `@plugin`, keyframes. Build should not warn.

---

### Step 2: Create component directory

**Action**: Ensure `experiments/001-nasi-mode-picker/src/` exists.

---

### Step 3: Write NasiModePicker.tsx

**File**: `experiments/001-nasi-mode-picker/src/NasiModePicker.tsx`

Full implementation:
```tsx
const MODES = [
  { id: 'loom',   label: 'Loom',   bg: 'bg-blue-500' },
  { id: 'sprite', label: 'Sprite', bg: 'bg-rose-400'  },
  { id: 'shell',  label: 'Shell',  bg: 'bg-gray-400'  },
] as const;

export default function NasiModePicker() {
  return (
    <div className="max-w-[390px] mx-auto flex flex-col gap-4 p-4">
      <div
        className="rounded-2xl bg-white shadow-md px-6 py-8"
        style={{ animation: 'welcome-pop-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}
      >
        <p className="text-sm text-gray-600 leading-relaxed">
          hello message<br />
          lets pick a vibe<br />
          you can always toggle between modes
        </p>
      </div>

      {MODES.map((mode) => (
        <button
          key={mode.id}
          onClick={() => console.log(`Selected mode: ${mode.id}`)}
          className={`${mode.bg} rounded-2xl h-40 w-full flex items-center justify-center cursor-pointer`}
        >
          <span className="text-2xl font-bold text-white">{mode.label}</span>
        </button>
      ))}
    </div>
  );
}
```

**Verification**:
- TypeScript: no type errors (`as const` on MODES for readonly tuple)
- Tailwind: all classes are valid v4 tokens
- Animation: inline style references keyframe defined in step 1

---

### Step 4: Create page directory

**Action**: Ensure `src/pages/experiments/001-nasi-mode-picker/` exists.

---

### Step 5: Write Astro page

**File**: `src/pages/experiments/001-nasi-mode-picker/index.astro`

```astro
---
export const prerender = true;
import ExperimentLayout from '../../../layouts/ExperimentLayout.astro';
import NasiModePicker from '../../../../experiments/001-nasi-mode-picker/src/NasiModePicker';
---

<ExperimentLayout experimentId="001" title="NASI Mode Picker" status="in-progress">
  <div class="flex justify-center">
    <NasiModePicker client:load />
  </div>
</ExperimentLayout>
```

**Verification**:
- Route `/experiments/001-nasi-mode-picker/` resolves
- `import.meta.glob` in `index.astro` picks it up (index page shows the experiment)
- Layout renders with correct experimentId and title

---

## Testing Strategy

This is a visual component with no unit-testable logic beyond a console.log. Testing approach:

| What | How | Criteria |
|------|-----|----------|
| TypeScript validity | `npm run build` — Astro+Vite validates TS | No type errors |
| Route exists | `npm run build` succeeds and emits the page | Build output contains the route |
| Visual correctness | `npm run dev` → view at localhost:4321/experiments/001-nasi-mode-picker/ | Matches acceptance criteria checklist |
| Animation fires | Visual check — reload page, observe welcome card bounce | Card springs in, settles |
| Click handlers | Browser devtools console — click each card | Logs "Selected mode: loom" etc. |
| Mobile width | Browser devtools responsive mode at 390px | Component fills correctly |
| Index page | localhost:4321 | "001-nasi-mode-picker" link appears |

No automated tests are introduced. This experiment's value is visual fidelity assessment, not unit test coverage.

---

## Commit Plan

Single commit after all files are written:
```
feat(001): implement NASI mode picker — welcome card + 3 mode cards
```

Files in commit:
- `src/styles/global.css`
- `experiments/001-nasi-mode-picker/src/NasiModePicker.tsx`
- `src/pages/experiments/001-nasi-mode-picker/index.astro`

---

## Risk: Import Path Errors

The component lives outside `src/`, which is a common source of Astro import resolution issues. Astro 6 should handle cross-directory imports fine with relative paths. If TypeScript complains about the import path, the fix is to ensure `tsconfig.json` includes `experiments/` in the `include` array or uses a `paths` alias.

Let me verify tsconfig before implementation.

---

## Deviation Protocol

If the build fails due to import resolution, fallback plan is to move the component to `src/components/experiments/001-nasi-mode-picker/NasiModePicker.tsx` and update the import. Document the deviation in progress.md.
