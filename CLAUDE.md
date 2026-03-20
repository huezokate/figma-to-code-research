# CLAUDE.md

## Project

figma-to-code-research — A structured research sprint to develop a repeatable methodology for turning Figma designs into pixel-accurate React components. Each experiment is a Lisa ticket that takes a Figma design through the full RDSPI cycle to produce a working component.

## Roadmap

**Read `docs/ROADMAP.md` at the start of every session.** It is the current state of the research: active experiments, key findings so far, what's up next, and the session log. It is also rendered on the site at `/roadmap`.

When a session ends, append a one-line entry to the Session Log table in `docs/ROADMAP.md` describing what happened. Keep the Experiments table and Key Findings current as work completes.

## Stack

- **Astro 6** + **React 19** + **TypeScript 5**
- **Tailwind CSS v4** (utility-first; use the spacing scale, not arbitrary values; configured via `src/styles/global.css`)
- `npm run dev` — dev server at localhost:4321
- `npm run build` — production build (output: server, adapter: Cloudflare)

## Source Layout

```
experiments/{NNN}-{name}/
  BRIEF.md          — visual spec and acceptance criteria (the design intent)
  figma/            — exported Figma screenshots and assets
  src/              — generated React component(s)
  page.astro        — Astro page wiring the component for visual review

src/layouts/ExperimentLayout.astro   — shared layout for all experiment pages
src/pages/index.astro                — landing page listing all experiments

docs/active/tickets/    — Lisa ticket files
docs/active/stories/    — Lisa story files
docs/active/work/       — RDSPI phase artifacts, one subdirectory per ticket ID

techniques/             — extracted, named techniques from completed retros
```

## Quality Bar

Match the Figma design exactly. When in doubt, measure.

- **Spacing**: Use Tailwind's spacing scale. Map Figma values to nearest scale token (4px=`p-1`, 8px=`p-2`, 16px=`p-4`, 24px=`p-6`, 32px=`p-8`, 48px=`p-12`).
- **Typography**: Match font-size, font-weight, line-height, and letter-spacing exactly. Use Tailwind's type scale.
- **Colors**: Use exact hex values from Figma unless a design token is specified. Never eyeball.
- **Layout**: Use flexbox or grid as the design implies structurally — not just what visually approximates it.
- **Responsive**: Implement breakpoints that match the Figma frames if multiple viewport sizes are provided.

## For Each Experiment

The ticket's `BRIEF.md` describes the component. Read it before starting Research.

Figma exports are in `experiments/{NNN}-{name}/figma/`. Treat these as ground truth for visual decisions.

Output the component to `experiments/{NNN}-{name}/src/`. Wire it into `experiments/{NNN}-{name}/page.astro`.

## Anti-Patterns

- Do not invent spacing values not in the design.
- Do not add interactions or states not specified in the brief.
- Do not change component structure to be "cleaner" at the cost of visual accuracy.
- Do not use inline `style=""` when a Tailwind class covers the value.

---

The RDSPI workflow definition is in docs/knowledge/rdspi-workflow.md and is injected into agent context by Lisa automatically.
