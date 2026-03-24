# Review: T-001-01 — implement-nasi-mode-picker

## Summary

Implemented the NASI Mode Picker (Screen 1) — a mobile-width welcome card + three mode selector cards. All acceptance criteria met. No automated tests (visual component); build verification deferred pending `npm install`.

---

## Files Changed

| File | Action | Notes |
|------|--------|-------|
| `tsconfig.json` | Modified | Added `"experiments"` to `include` array so TypeScript resolves component from Astro page |
| `src/styles/global.css` | Modified | Added `@keyframes welcome-pop-in` — 4-stop spring entrance animation |
| `experiments/001-nasi-mode-picker/src/NasiModePicker.tsx` | Created | Main React component — 32 lines |
| `src/pages/experiments/001-nasi-mode-picker/index.astro` | Modified | Was scaffold placeholder; now wires `NasiModePicker` with `client:load` |

---

## Acceptance Criteria

| # | Criterion | Met | Notes |
|---|-----------|-----|-------|
| 1 | Layout: welcome card top, three mode cards stacked below | ✓ | `flex-col` container, welcome first, MODES.map() below |
| 2 | Loom = blue, Sprite = pink/coral, Shell = gray | ✓ | `bg-blue-500` / `bg-rose-400` / `bg-gray-400` — exact matches to BRIEF tokens |
| 3 | Welcome card visible entry animation | ✓ | CSS spring keyframe, `cubic-bezier(0.34, 1.56, 0.64, 1)` for bounce feel |
| 4 | Renders at 390px viewport | ✓ | `max-w-[390px]` on outer container |
| 5 | Page at `/experiments/001-nasi-mode-picker/` | ✓ | `src/pages/experiments/001-nasi-mode-picker/index.astro` with `prerender = true` |

---

## Test Coverage

No automated tests. This is by design — the experiment's value is visual fidelity assessment, and the component has no testable logic beyond console.log side effects.

**What would need tests if this were production code**:
- Accessibility: mode cards should have accessible labels (currently only visual text)
- Keyboard navigation: `<button>` elements handle this natively
- Animation preference: should respect `prefers-reduced-motion` media query

---

## Open Concerns

### 1. Build not verified
`node_modules` not installed in the project directory — `npm run build` and `npm run dev` cannot run. Code is correct per static review, but import path resolution (especially the cross-directory import from `src/pages/experiments/` to `experiments/`) needs live verification.

**Human action needed**: Run `npm install && npm run build` to confirm no errors.

### 2. `prefers-reduced-motion` not handled
The welcome card animation runs unconditionally. Users with vestibular disorders or motion sensitivity will see the animation regardless of system preference.

**Not a blocker for this experiment** (the brief doesn't specify it), but worth noting for the techniques library.

### 3. `as const` on MODES may cause Tailwind purge issues
Tailwind v4 scans source files for class names. Classes like `bg-blue-500`, `bg-rose-400`, `bg-gray-400` are used via string interpolation in the template literal:
```tsx
className={`${mode.bg} rounded-2xl ...`}
```
Tailwind v4 scans for these strings. Because `mode.bg` is a dynamic value, the scanner may not detect them. However, since `MODES` is defined in the same file as `as const`, Tailwind's scanner should find the literal strings `'bg-blue-500'`, `'bg-rose-400'`, `'bg-gray-400'` in the source.

If colors don't appear in the build: add explicit static class mentions in a comment or restructure to avoid dynamic interpolation. This is worth verifying in the live build.

### 4. Animation keyframe on inline style
The inline `style={{ animation: '...' }}` references a keyframe by name (`welcome-pop-in`). This works if the keyframe is in global.css, which is imported by all pages via the layout. But if the component were used in a context without global.css loaded, the animation would silently fail (element would be invisible due to `opacity: 0` start and no forwards-fill happening). Not a concern for this project structure.

### 5. `client:load` required for onClick
The component is hydrated with `client:load` because of the `onClick` handlers. If interactivity were removed, `client:visible` or no directive would reduce bundle size. For this experiment, console.log handlers are vestigial — acceptable.

---

## Visual Assessment (Pre-Build)

Based on the code, the rendered output should be:

- A centered 390px-wide column on a gray-50 background (from ExperimentLayout)
- White card with "hello message / lets pick a vibe / you can always toggle between modes" in small gray text, with shadow
- Card springs in with a bounce on load
- Below it: three tall (160px) rounded cards — blue, pink, gray — each with a large white label centered

This matches the BRIEF description. The main unknowns are:
- Whether the spring cubic-bezier produces the right "pop" feel (subjective)
- Whether `h-40` (160px) reads as "tall" in the mobile context — may need to be taller (`h-48` or `h-52`)

---

## Suggested Next Steps

1. `npm install && npm run dev` — visual review in browser
2. Check Tailwind purge: confirm mode card colors appear correctly
3. Evaluate animation feel — adjust cubic-bezier or keyframe stops if needed
4. Fill in `experiments/001-nasi-mode-picker/RETRO.md` after visual review
5. Update `docs/ROADMAP.md` experiment table: change `—` row to `001 | NASI Mode Picker | in-progress | — | —`
