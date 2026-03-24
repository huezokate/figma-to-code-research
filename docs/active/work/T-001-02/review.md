# Review: T-001-02 implement-nasi-app-connect

## Summary

Implemented Screen 2 of the NASI onboarding flow: the app permissions / data connect screen. Three React components were created, and the pre-existing Astro page stub was wired to render them. TypeScript passes cleanly with zero errors.

---

## Files Created

| File | Purpose |
|------|---------|
| `experiments/002-nasi-app-connect/src/ModeTabBar.tsx` | Shared tab bar, Sprite/Loom/Shell modes, Sprite active |
| `experiments/002-nasi-app-connect/src/AppTile.tsx` | Toggleable app tile, icon + label, selected/unselected states |
| `experiments/002-nasi-app-connect/src/NasiAppConnect.tsx` | Top-level screen — holds toggle state, composes all sub-components |
| `docs/active/work/T-001-02/research.md` | RDSPI research artifact |
| `docs/active/work/T-001-02/design.md` | RDSPI design artifact |
| `docs/active/work/T-001-02/structure.md` | RDSPI structure artifact |
| `docs/active/work/T-001-02/plan.md` | RDSPI plan artifact |
| `docs/active/work/T-001-02/progress.md` | RDSPI progress artifact |

## Files Modified

| File | Change |
|------|--------|
| `src/pages/experiments/002-nasi-app-connect/index.astro` | Replaced "Component not yet implemented" stub with live `NasiAppConnect client:load` wired in a 390×844 phone frame |

## Files Deleted

None.

---

## Acceptance Criteria Evaluation

| Criterion | Status | Notes |
|-----------|--------|-------|
| Tab bar renders with Sprite active (pink/coral), others visible | ✅ | `bg-pink-500 text-white` for Sprite; `text-gray-400` for Loom/Shell |
| Heading and body copy match FigJam text | ✅ | Exact text from ticket used verbatim |
| App grid shows all 13 apps in 3-column layout | ✅ | `grid grid-cols-3 gap-3`, 13 APPS entries |
| Grid scrolls if content overflows | ✅ | `flex-1 overflow-y-auto` on content zone |
| App tiles toggle selected/unselected on click | ✅ | `useState<Set<string>>` with functional updates |
| Security footer pinned to bottom | ✅ | Flex child at end of `flex flex-col h-full`; doesn't scroll |
| Renders correctly at 390px viewport width | ✅ | Phone frame wrapper is `w-[390px]` |
| Page at `/experiments/002-nasi-app-connect/` | ✅ | `src/pages/experiments/002-nasi-app-connect/index.astro` with `prerender = true` |

---

## Test Coverage

**Automated**: TypeScript (`tsc --noEmit`) — passes with 0 errors. This is the only automated check in the project; no test framework is configured.

**Manual (required)**: Visual and interaction testing in the dev server:
- Navigate to `/experiments/002-nasi-app-connect/`
- Verify Sprite tab renders pink/coral
- Count 13 app tiles in 3-column layout
- Click tiles to verify toggle behavior
- Scroll within the phone frame to confirm footer stays pinned
- Confirm experiment appears on `/` homepage list

**Gap**: No automated interaction or snapshot tests. This is consistent with the project's current state (no test framework, no existing tests anywhere in the codebase). Acceptable for a PoC research experiment.

---

## Open Concerns

### 1. Pre-existing build failure (non-blocking)
`npm run build` fails with `require_dist is not a function` in the Cloudflare adapter — a Vite/Cloudflare Workers module compatibility issue. This existed before this ticket (confirmed by stashing all changes and reproducing the error). The dev server (`npm run dev`) is the correct way to verify the component at this stage. **Human attention needed** to resolve the Cloudflare adapter issue before any deployment.

### 2. ModeTabBar is display-only
The tab bar renders the three tabs but has no onClick handlers — clicking Loom or Shell does nothing. The ticket specifies "Sprite selected" as a fixed display state for Screen 2; tab navigation across screens is out of scope for this ticket. When screens 3–6 are implemented, `ModeTabBar` will need `onClick` or a routing callback added to its props.

### 3. Lo-fi design source limitations
The visual spec comes from a FigJam lo-fi board description, not a hi-fi Figma design. Exact spacing, font sizes, and icon proportions are estimated from Tailwind's default scale per CLAUDE.md quality bar guidelines. No pixel measurements were available. The `figma/` directory is empty. Visual accuracy relative to the FigJam is good-faith; accuracy relative to any future hi-fi spec is unknown.

### 4. `aspect-square` tile height
App tiles use `aspect-square` for the icon area. In a 3-column grid at 390px with `px-4` padding and `gap-3`, each tile is approximately `(390 - 32 - 24) / 3 ≈ 111px` wide → icon area ~111px tall. This is a reasonable tap target size. If the phone frame's content area is narrower than expected, tiles could be too small. Verify visually.

### 5. Emoji rendering varies by platform
App icons use emoji characters (`🎵`, `💬`, etc.). Emoji rendering differs between macOS, iOS, Android, and Windows. For a PoC this is acceptable; for production, SVG icons would be needed.

---

## Reuse Notes

`ModeTabBar` is ready to be imported by Screens 3–6. The `activeTab` prop controls which tab appears active. No changes are needed to use it in other screens — just pass the appropriate `activeTab` value.

---

## ROADMAP.md Update Due

Per CLAUDE.md: append a one-line entry to the Session Log table in `docs/ROADMAP.md` at session end. The Experiments table should also be updated to reflect experiment 002 as in-progress.
