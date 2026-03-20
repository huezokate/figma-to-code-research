# Research: T-001-02 implement-nasi-app-connect

## Ticket Summary

Build Screen 2 of the NASI onboarding flow — the app permissions / data connect screen.
FigJam source: https://www.figma.com/board/O9ONqUiEu0vcaAJ5VGgq1d/NASI?node-id=39-825 (section 3:3935).

---

## Codebase State

### Framework & Toolchain

- **Astro 6** with `output: server` and Cloudflare adapter (`astro.config.*`)
- **React 19** for interactive components
- **TypeScript 5** throughout
- **Tailwind CSS v4** — configured via `src/styles/global.css` which contains only `@import "tailwindcss";` and the typography plugin. No custom theme file. All spacing/color tokens come from Tailwind defaults.
- `npm run dev` → localhost:4321

### Page Discovery Mechanism

`src/pages/index.astro` auto-discovers experiments using:
```js
const experimentModules = import.meta.glob('./experiments/*/index.astro');
```
This means experiment pages **must** live at `src/pages/experiments/{slug}/index.astro` to be listed on the homepage. The slug extracted from the path becomes the display label and link.

### Shared Layout

`src/layouts/ExperimentLayout.astro` accepts:
- `experimentId: string` — shown in header as monospace label
- `title: string` — shown as heading in header
- `status?: 'pass' | 'partial' | 'miss' | 'in-progress'` — color-coded badge; defaults to `'in-progress'`

The layout provides a header with a back link to `/`, main content area (max-w-5xl, px-6 py-10), and imports `global.css`.

### Existing Experiments

- `experiments/001-nasi-mode-picker/` — has `BRIEF.md` only. No `src/` directory, no page yet. Screen 1 of the NASI flow.

### No Existing Screen 2 Work

- `experiments/002-nasi-app-connect/` does not exist.
- `src/pages/experiments/002-nasi-app-connect/` does not exist.
- `docs/active/work/T-001-02/` is being created now (this file).

---

## Design Source

The ticket describes Screen 2 from a FigJam lo-fi board. No hi-fi Figma export, no screenshots in `figma/` dir yet (dir doesn't exist). The visual specification comes from the ticket's prose description of the FigJam.

Key visual elements described:

### Tab Bar (top)
- Three tabs: **Sprite** (selected/active), plus two unnamed empty tabs
- Sprite tab is pink/coral when selected
- Shared across screens 2–6 → extract as `ModeTabBar` component

### Heading
> "Let's get you set up and connected"

### Body Copy
> "Select the apps you would like give Sprite access to (include those for Loom and Shell?)"

### App Grid
- 3 columns, scrollable
- 13 apps across 5 rows (last row is partial):
  - Row 1: Apple Music, iMessage, Instagram
  - Row 2: Spotify, Podcast, Pinterest
  - Row 3: X (Twitter), Wattpad, TikTok
  - Row 4: Oura, Picture Gallery, YouTube
  - Row 5: Disney (partial — 1 item)
- Each tile: rounded square, icon placeholder (emoji or letter), label
- Tappable toggle: selected / unselected state

### Security Footer (pinned bottom)
- Dark background
- Placeholder text: "Ideally a super message on security and never selling or using data for evil?"

---

## Component Boundaries (from ticket)

The ticket specifies three sub-components:
1. **`ModeTabBar`** — tab bar with Sprite/Shell/Loom, extracted for reuse in screens 3–6
2. **`AppTile`** — icon placeholder + label, toggleable selected state
3. **`NasiAppConnect`** — top-level composition: header + grid + pinned footer

---

## File Placement

Per ticket specification:
- Components → `experiments/002-nasi-app-connect/src/`
- Astro page → `src/pages/experiments/002-nasi-app-connect/index.astro`

The CLAUDE.md source layout shows `experiments/{NNN}/page.astro` but the ticket explicitly states `src/pages/experiments/002-nasi-app-connect/index.astro`, and the index.astro discovery mechanism confirms the page must live in `src/pages/experiments/` to be auto-detected. The ticket takes precedence.

---

## Relevant Patterns from Experiment 001 BRIEF

Screen 1 establishes the NASI brand colors:
- Loom = blue (`#3B82F6` / blue-500)
- Sprite = pink/coral (`#F472B6` or `#FB7185`)
- Shell = gray (`#9CA3AF` / gray-400)

These are referenced in the tab bar design for Screen 2.

---

## Constraints & Assumptions

1. **Mobile-width layout** (~390px). No responsive breakpoints needed.
2. **No real icons** — use emoji or initial-letter placeholders per ticket.
3. **Toggle state** is local React state (no external state manager needed).
4. **Scrollable grid** — the app grid should scroll independently if content overflows; the security footer stays pinned.
5. **Lo-fi source** — exact pixel measurements are not available. Must map to nearest Tailwind scale tokens per CLAUDE.md quality bar.
6. **Tab bar reuse** — `ModeTabBar` is a shared component. Screen 2 should show Sprite as the active tab.
7. **No BRIEF.md exists yet** for experiment 002 — this task creates the full experiment scaffold.

---

## Open Assumptions to Confirm in Design

- Which tabs appear in the tab bar? Ticket says "Sprite (selected), plus two empty tabs" — likely Loom and Shell based on the NASI app modes.
- Should selected app tiles use Sprite's pink color for the selection indicator?
- Is the security footer a fixed/sticky element within a scrollable viewport, or does it float over the content?
- What is the exact aspect ratio of app tiles? The lo-fi suggests rounded squares.
