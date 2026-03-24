# Structure: T-002-01 — implement-nasi-glow-up

## Files Changed

### Created
- `experiments/003-nasi-glow-up/src/NasiGlowUp.tsx`

### Modified
- `src/styles/global.css` — append `@keyframes glow-pulse`
- `src/pages/experiments/003-nasi-glow-up/index.astro` — replace stub with live component

---

## `NasiGlowUp.tsx` — Module Boundary

**Default export**: `NasiGlowUp` (React functional component)
**Props**: none
**State**: none (purely presentational)
**Imports**: none (no sub-components, no hooks)

```
NasiGlowUp
├── outer wrapper: full-height dark bg, flex-col centered
├── glow circle: rounded-full, rose-400, glow-pulse keyframe via inline style
│   └── inner gradient overlay (optional — softens the fill)
├── avatar block: rounded-2xl, pink→rose gradient, ✨ emoji
└── loading text: "Sprite is getting to know you…"
```

---

## `global.css` — Addition

Append after existing `@keyframes welcome-pop-in` block:

```css
@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 0 0 30px 10px rgba(244, 63, 94, 0.4),
                0 0 60px 20px rgba(244, 63, 94, 0.15);
  }
  50% {
    box-shadow: 0 0 60px 20px rgba(244, 63, 94, 0.7),
                0 0 100px 40px rgba(244, 63, 94, 0.3);
  }
}
```

No other changes to global.css.

---

## `003-nasi-glow-up/index.astro` — Replacement

Remove the "Component not yet implemented" stub. Replace with the same phone-frame pattern as 002:

```astro
---
export const prerender = true;
import ExperimentLayout from '../../../layouts/ExperimentLayout.astro';
import NasiGlowUp from '../../../../experiments/003-nasi-glow-up/src/NasiGlowUp';
---

<ExperimentLayout experimentId="003" title="NASI Glow-Up" status="in-progress">
  <div class="flex justify-center">
    <div class="w-[390px] h-[844px] overflow-hidden rounded-3xl shadow-2xl border border-gray-200">
      <NasiGlowUp client:load />
    </div>
  </div>
</ExperimentLayout>
```

---

## Ordering

1. `global.css` — add keyframe first (no dependencies)
2. `NasiGlowUp.tsx` — create component (depends on knowing keyframe name from step 1)
3. `index.astro` — update page wiring (depends on component existing)

---

## Non-Changes

- `tsconfig.json` — already includes `experiments/`; no change needed
- `package.json` — no new dependencies
- `experiments/003-nasi-glow-up/BRIEF.md` — read-only, no change
- `experiments/003-nasi-glow-up/figma/` — not created (no assets for this screen)
