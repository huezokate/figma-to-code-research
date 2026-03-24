# Plan: T-002-02 — implement-nasi-sprite-dashboard

## Steps

### Step 1 — Create NasiSpriteDashboard.tsx

File: `experiments/004-nasi-sprite-dashboard/src/NasiSpriteDashboard.tsx`

Import `ModeTabBar` from the relative path `../../002-nasi-app-connect/src/ModeTabBar`.

Define `CARDS` array (10 cards) with `id`, `emoji`, `label`, `wide`, `from`, `to`, `tall` fields.

Layout pattern:
- Cards with `wide: true` → `col-span-2`
- Cards with `wide: false` → `col-span-1`
- Cards with `tall: true` → `h-32`, others → `h-24`

Card visual: `rounded-2xl` gradient background, emoji top-left, label bottom-left in white text.

Verification: TypeScript valid; no `any` types; correct relative import path.

---

### Step 2 — Update index.astro

File: `src/pages/experiments/004-nasi-sprite-dashboard/index.astro`

Replace stub with phone-frame + `<NasiSpriteDashboard client:load />`.

---

### Step 3 — TypeScript check

`node_modules/.bin/tsc --noEmit` — expect 0 errors.

---

## Testing Strategy

Visual acceptance criteria:
- [ ] Tab bar renders Sprite as active (pink pill)
- [ ] "Chaos Curated" label in pink above the grid
- [ ] At least 8 content cards visible in mixed-width grid
- [ ] Gradient cards with emoji and label text
- [ ] Content scrolls vertically if needed (overflow-y-auto)
- [ ] No layout overflow outside 390px phone frame

---

## Risk

Low. The only non-trivial aspect is the relative import path for ModeTabBar (`../../002-nasi-app-connect/src/ModeTabBar`). TypeScript check will catch any path errors immediately.

Note for T-002-03 and T-002-04: Both depend on this ticket. Once NasiSpriteDashboard.tsx is complete, those tickets can reuse the same ModeTabBar import pattern and adapt the card layout.
