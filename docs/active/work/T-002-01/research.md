# Research: T-002-01 — implement-nasi-glow-up

## Ticket Summary

Screen 3 of the NASI onboarding flow. A full-screen interstitial "glow-up" transition moment while NASI builds the user's Sprite profile from connected apps. Moment of delight — Sprite "coming alive."

---

## Codebase State

### Tailwind CSS v4
- Configured via `src/styles/global.css` with `@import "tailwindcss"` and `@plugin "@tailwindcss/typography"`.
- One custom keyframe already present: `welcome-pop-in` (opacity + scale + translateY).
- v4 means Tailwind utilities are available including `animate-pulse`, `animate-spin`. Custom keyframes added to global.css are consumed via inline `style` (as in NasiModePicker.tsx) or via a custom animation utility if needed.

### Color System (from NasiModePicker.tsx)
- Loom: `bg-blue-500`
- Sprite: `bg-rose-400` (mode cards) / `bg-pink-500` (ModeTabBar active pill)
- Shell: `bg-gray-400`
- Glow color for Sprite is in the pink/rose range — use `#f43f5e` (rose-500) or `#ec4899` (pink-500) for the glow effect.

### Animation Pattern (from NasiModePicker.tsx)
- Custom keyframes defined in `global.css`.
- Applied via inline `style={{ animation: '...' }}` referencing the keyframe name.
- `animate-pulse` from Tailwind is available natively — pulses opacity from 1 → 0.5 on a 2s cycle.

### Existing Experiment Patterns

**NasiModePicker.tsx** (001):
- No imports — self-contained, no sub-components
- `max-w-[390px] mx-auto flex flex-col gap-4 p-4` for mobile centering

**NasiAppConnect.tsx** (002):
- `flex flex-col w-full h-full` — fills the phone frame container (390×844)
- Flex-col with `flex-1 overflow-y-auto` for scrollable middle

**Astro page pattern** (002 example):
```astro
<ExperimentLayout experimentId="002" title="NASI App Connect" status="in-progress">
  <div class="flex justify-center">
    <div class="w-[390px] h-[844px] overflow-hidden rounded-3xl shadow-2xl border border-gray-200">
      <NasiAppConnect client:load />
    </div>
  </div>
</ExperimentLayout>
```

### Stub Page (003)
`src/pages/experiments/003-nasi-glow-up/index.astro` exists with import commented out. Needs:
1. Uncomment and update import
2. Replace `<p>Component not yet implemented.</p>` with phone frame + component

### Experiment Directory
`experiments/003-nasi-glow-up/` exists. `src/` subdirectory needs to be created and populated.
Files present: `BRIEF.md`, `RETRO.md` (blank template). No `figma/` subdirectory present (unlike 002 which has `figma/.gitkeep`).

---

## FigJam Source Notes (from ticket brief)

- Large centered ellipse — fills most of the screen
- Note: "craping moment when Sprite goes through a glow up" (designer note about the scraping/personalizing happening)
- Below the ellipse: an AI-generated character portrait image (glowing anime-style — placeholder for actual Sprite avatar)
- This is a **full-screen interstitial** — no tab bar

### Design Intent
- Background: dark (to make the glow stand out)
- Center: large glowing/pulsing ellipse/circle in Sprite's pink/coral
- Inside or below: character image placeholder
- Loading text: "Sprite is getting to know you…"
- No navigation — no tab bar, no back button, purely a waiting/delight screen

---

## Constraints

1. **No routing needed** — static visual.
2. **Mobile width**: component should fill 390×844 phone frame (same as 002).
3. **Sprite color** for the glow: rose/pink family. Consistent with `bg-rose-400` / `bg-pink-500` from prior screens.
4. **Animation**: needs a visible pulse or glow — can extend existing global.css or use `animate-pulse`.
5. **No real image** — placeholder gradient or emoji avatar inside the circle.
6. **tsconfig already includes `experiments/`** — no changes needed there.

---

## Files Relevant to This Ticket

| File | Role |
|------|------|
| `experiments/003-nasi-glow-up/src/NasiGlowUp.tsx` | Create — main component |
| `src/pages/experiments/003-nasi-glow-up/index.astro` | Modify — replace stub with live component |
| `src/styles/global.css` | Possibly modify — add glow-pulse keyframe |
| `experiments/003-nasi-glow-up/BRIEF.md` | Read-only reference |

---

## Open Questions

1. Should the glow be implemented via `animate-pulse` (built-in) or a custom keyframe? `animate-pulse` only pulses opacity, which is subtle. A custom `box-shadow` glow keyframe would be more dramatic.
2. Should the avatar be inside the circle or below it? The FigJam brief says "below the ellipse" — two separate elements.
3. Dark background: `bg-gray-950` (near-black) or `bg-black`? Either works — `bg-gray-950` is softer.
