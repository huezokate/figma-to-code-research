# Research Roadmap

*This document is the living record of the figma-to-code research sprint. It is read by the coding agent at the start of every session and rendered on the research site. Keep it current.*

---

## Current Status

**Phase**: Complete — Wave 1 done, retros written, techniques extracted
**Version**: 0.2.0
**Sprint start**: 2026-03-20
**Focus**: NASI onboarding flow PoC — all 6 screens implemented, all retros written, 3 techniques extracted. Synthesis document up next.

---

## Research Goals

1. Develop a repeatable, personal methodology for turning Figma designs into pixel-accurate components.
2. Identify which description patterns produce accurate output and which don't.
3. Determine how much a FigJam lo-fi read (via MCP) can power an implementation vs. requiring hi-fi Figma specs.
4. Build a `techniques/` library that compounds across experiments.
5. Produce a synthesis document an agent can generate from the accumulated evidence.

---

## Experiments

| ID | Component | Lisa Ticket | Status | Pass/Partial/Miss | Technique Extracted |
|----|-----------|-------------|--------|-------------------|---------------------|
| 001 | NASI Mode Picker (Screen 1) | T-001-01 | complete | Pass | — |
| 002 | NASI App Connect (Screen 2) | T-001-02 | complete | Pass | ModeTabBar reusable component pattern |
| 003 | NASI Glow-Up (Screen 3) | T-002-01 | complete | Pass | — |
| 004 | NASI Sprite Dashboard (Screen 4) | T-002-02 | complete | Pass | chaos-grid-col-span |
| 005 | NASI Shell Dashboard (Screen 5) | T-002-03 | complete | Pass | mode-personality-palette-density |
| 006 | NASI Loom Dashboard (Screen 6) | T-002-04 | complete | Pass | figjam-shape-type-semantics |

*Status: `in-progress` / `complete` / `archived`. Update after each retro.*

---

## FigJam Source

**NASI lo-fi onboarding flow**: `https://www.figma.com/board/O9ONqUiEu0vcaAJ5VGgq1d/NASI?node-id=39-825`

NASI is a multi-modal AI companion app with three modes:
- **Loom** (blue) — creative work and project focus
- **Sprite** (pink/coral) — curated entertainment and social content ("Chaos Curated")
- **Shell** (gray) — calmer version of Sprite ("Chaos Toned Down")

The 6-screen flow: Mode Picker → App Connect → Glow-Up Transition → Sprite Dashboard → Shell Dashboard → Loom Dashboard.

---

## Key Findings

*Findings emerge from retros. Add here when a pattern appears more than once or has a large effect.*

1. **Semantic naming drives layout** — Mode names ("Chaos Curated" vs "Chaos Toned Down") were sufficient to produce visually distinct output (dense chaos grid vs. calm single-column) without explicit layout specs. The name is the design intent.

2. **FigJam shape type names are semantic** — `MANUAL_INPUT`, `INTERNAL_STORAGE`, and `DOCUMENT_SINGLE` reliably predicted UI section role (input area, saved list, project header). More useful than x/y coordinates for implementation decisions.

3. **~90% invented screens can still pass** — Glow-Up (Screen 3) was nearly all invented from a single ellipse shape. Strong mood descriptors ("transformative, intimate, glowing") compensated for absent structural data. The brief's tone matters as much as its structure.

4. **FigJam lo-fi is sufficient for structure; insufficient for visual polish** — Layout decisions (column count, section order, component type) were accurately derived from lo-fi across all 6 screens. Colors, spacing, font sizes, and animation parameters were always guessed.

---

## Techniques Library

| File | Summary |
|------|---------|
| [chaos-grid-col-span.md](../techniques/chaos-grid-col-span.md) | Editorial chaos grid via `col-span-2` alternation |
| [mode-personality-palette-density.md](../techniques/mode-personality-palette-density.md) | Express mode personality through palette + layout density, same structure |
| [figjam-shape-type-semantics.md](../techniques/figjam-shape-type-semantics.md) | FigJam shape type names predict UI section role |

*See `techniques/README.md` for the full index.*

---

## Up Next

- [x] Write retros for experiments 003–006
- [x] First technique extraction from retro patterns across all 6 screens
- [x] Update Pass/Partial/Miss column after visual review of each screen
- [ ] Synthesis document: what did the FigJam lo-fi MCP read enable vs. what had to be inferred?

---

## Open Questions

- Does the FigJam `get_figjam` MCP read provide enough to write accurate BRIEFs, or do we always need the hi-fi design file too? → **Answered**: Sufficient for structure and layout; insufficient for colors, spacing, animation timing. Hi-fi needed for visual polish only.
- Do FigJam shape type names (`MANUAL_INPUT`, `DOCUMENT_SINGLE`, `INTERNAL_STORAGE`) give useful semantic hints to the implementing agent? → **Answered**: Yes — reliably for `MANUAL_INPUT` and `INTERNAL_STORAGE`. See `figjam-shape-type-semantics.md`.
- Does "Chaos Curated" vs "Chaos Toned Down" as a descriptor produce a visible design difference in output? → **Answered**: Yes — produced distinct layouts, palettes, and densities with no explicit layout spec. See `mode-personality-palette-density.md`.
- What information is consistently missing from lo-fi that always needs to be inferred? → **Answered**: Colors (hex/tokens), spacing values, font sizes, border-radius, animation timing/easing. Structure is covered; visual parameters are not.

---

## Session Log

*One entry per session. Append; never edit past entries.*

| Date | What happened |
|------|--------------|
| 2026-03-20 | Project scaffolded. Lisa initialized. Cloudflare deployment configured. ROADMAP.md established. |
| 2026-03-20 | NASI FigJam board pulled via MCP. 6 experiments scaffolded. S-001 and S-002 drafted. 6 tickets created. T-001-01 and T-001-02 picked up by Lisa immediately (now in research phase). |
| 2026-03-20 | T-001-01: Full RDSPI cycle complete. NasiModePicker.tsx implemented — welcome card + 3 mode cards (Loom/Sprite/Shell). tsconfig updated to include experiments/. Awaiting npm install + visual review. |
| 2026-03-23 | T-001-02: Full RDSPI cycle complete. NasiAppConnect.tsx + ModeTabBar + AppTile implemented. Visual review passed for both 001 and 002. Retros written. Experiments 001 and 002 marked complete (Pass). |
| 2026-03-23 | Wave 1 complete. T-002-01 through T-002-04 implemented: NasiGlowUp (glow-pulse keyframe), NasiSpriteDashboard (mixed-width chaos grid), NasiShellDashboard (single-col calm layout + ModeTabBar ACTIVE_COLORS fix), NasiLoomDashboard (7-section work dashboard). All 6 screens live. TypeScript 0 errors. |
| 2026-03-23 | Retros written for all 6 experiments (all Pass). 3 techniques extracted: chaos-grid-col-span, mode-personality-palette-density, figjam-shape-type-semantics. All 4 sprint open questions answered. ROADMAP Key Findings populated. |
