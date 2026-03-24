# Research: T-001-01 — implement-nasi-mode-picker

## Scope

Map the codebase context relevant to building the NASI Mode Picker (Screen 1): a mobile-width welcome + mode selection screen.

---

## Source of Truth

**BRIEF.md** at `experiments/001-nasi-mode-picker/BRIEF.md` is the primary spec. No exported Figma screenshots exist yet in `experiments/001-nasi-mode-picker/figma/` — the directory is absent. All visual decisions must be derived from the BRIEF.md description and the design token hints provided.

The FigJam source is a lo-fi board (not a hi-fi Figma frame), which means:
- No pixel measurements available
- No font-size specs, only relative descriptions ("large", "smaller")
- No exact spacing, only qualitative guidance ("generous padding", "visible gaps")
- No explicit border-radius values
- Color tokens are explicitly given: blue-500 / rose-400 / gray-400 equivalents

---

## Stack

- **Astro 6.0.8** with `@astrojs/react` integration
- **React 19.2.4** — functional components, hooks available
- **TypeScript 5.9.3**
- **Tailwind CSS v4.2.2** configured via `src/styles/global.css` with `@import "tailwindcss"`
- `@tailwindcss/typography` plugin loaded
- **No animation libraries** — Framer Motion, React Spring, etc. are not installed
- **No CSS Modules** setup detected — plain Tailwind classes and global CSS

---

## File Structure Patterns

### Experiment directory pattern
```
experiments/{NNN}-{name}/
  BRIEF.md           — visual spec (exists)
  RETRO.md           — post-experiment reflection (exists, blank)
  figma/             — Figma exports (absent)
  src/               — generated component (absent, to be created)
  page.astro         — experiment page (absent, to be created)
```
Note: The ticket specifies the Astro page at `src/pages/experiments/001-nasi-mode-picker/index.astro`, NOT in the experiment directory root. The CLAUDE.md structure shows `experiments/{NNN}/page.astro` but the ticket overrides this with the src/pages path.

### Page discovery
`src/pages/index.astro` uses `import.meta.glob('./experiments/*/index.astro')` to enumerate experiment pages. Therefore the page file **must** live at `src/pages/experiments/001-nasi-mode-picker/index.astro` for it to appear in the index.

### Shared layout
`src/layouts/ExperimentLayout.astro` accepts:
- `experimentId: string` — shown as monospace label
- `title: string` — shown as heading
- `status?: 'pass' | 'partial' | 'miss' | 'in-progress'` — badge color

It wraps content in `<main class="mx-auto max-w-5xl px-6 py-10">`. The component will be centered within this max-width container.

### Existing pages for reference
`src/pages/index.astro` and `src/pages/roadmap.astro` — both use `export const prerender = true` since the Cloudflare adapter defaults to server-rendering. Experiment pages need the same prerender directive.

---

## Tailwind v4 Constraints

Tailwind v4 is configured via CSS only — there is no `tailwind.config.js`. Custom utilities, keyframes, and animations must be defined in `src/styles/global.css` using CSS `@keyframes` and `@utility` or standard CSS custom properties. The `@plugin "@tailwindcss/typography"` is already in global.css.

Arbitrary values like `max-w-[390px]` are supported in Tailwind v4.

Standard color classes available and relevant:
- `bg-blue-500` = `#3B82F6` (exact match for Loom)
- `bg-rose-400` = `#FB7185` (exact match for Sprite)
- `bg-gray-400` = `#9CA3AF` (exact match for Shell)

Standard animation classes: `animate-bounce`, `animate-ping`, `animate-pulse`, `animate-spin` — none match the required "pop in then minimize" effect. Custom keyframes are needed.

---

## Animation Constraints

No Framer Motion. The required animation ("pops in, then minimizes to give space for mode cards") must be implemented with:
- CSS `@keyframes` defined in `global.css`
- Applied via a Tailwind custom animation class or direct `animation` style property

The animation has two phases:
1. **Pop in**: Welcome card appears with a scale-up bounce effect (scale 0.8 → 1.05 → 1.0)
2. **Minimize**: The card settles to a slightly compact state, visually making room

This is a single CSS animation using `animation-fill-mode: forwards` that can simulate both phases in sequence.

---

## Visual Spec Summary (from BRIEF.md)

| Element | Description |
|---------|-------------|
| Viewport target | ~390px wide (mobile, single column) |
| Welcome card | Large rounded rect, top of layout, taller than mode cards |
| Welcome copy | "hello message / lets pick a vibe / you can always toggle between modes" |
| Welcome animation | Pop in on load, then minimize slightly |
| Mode cards | Tall rounded rects, stacked vertically, generous padding |
| Loom card | Blue (`bg-blue-500`) |
| Sprite card | Pink/coral (`bg-rose-400`) |
| Shell card | Gray (`bg-gray-400`) |
| Mode card behavior | console.log on click, no routing |
| Card text | Mode name (large, legible) |
| Gaps between cards | Visible gaps |

---

## Constraints and Assumptions

1. **No figma screenshots** — must infer all sizing from qualitative descriptions.
2. **No routing needed** — cards log to console only.
3. **Mobile-only** — no breakpoints. Component is fixed to ~390px width, centered.
4. **Animation via CSS only** — no external library.
5. **Tailwind classes preferred** over inline styles; only use inline style for values Tailwind cannot cover (none here — all colors map to exact Tailwind tokens).
6. **ExperimentLayout** provides the outer chrome. Component only needs to handle its own interior.

---

## Open Questions

- What is the intended height ratio between welcome card and mode cards? BRIEF says welcome is "taller" but doesn't specify by how much.
- Does "minimizes to give space" mean the welcome card actually shrinks in final layout height, or just that the animation makes it appear smaller momentarily before settling?
- Are mode card labels the only text, or do they have a subtitle/description?

These will be resolved in Design by picking reasonable defaults.
