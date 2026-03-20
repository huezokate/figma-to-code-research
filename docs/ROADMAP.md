# Research Roadmap

*This document is the living record of the figma-to-code research sprint. It is read by the coding agent at the start of every session and rendered on the research site. Keep it current.*

---

## Current Status

**Phase**: Active — Wave 1 running
**Version**: 0.2.0
**Sprint start**: 2026-03-20
**Focus**: NASI onboarding flow PoC — 6 screens from a FigJam lo-fi board, pulled via Figma MCP and implemented as Astro + React components. T-001-01 and T-001-02 are in progress.

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
| 001 | NASI Mode Picker (Screen 1) | T-001-01 | in-progress | — | — |
| 002 | NASI App Connect (Screen 2) | T-001-02 | in-progress | — | — |
| 003 | NASI Glow-Up (Screen 3) | T-002-01 | queued | — | — |
| 004 | NASI Sprite Dashboard (Screen 4) | T-002-02 | queued | — | — |
| 005 | NASI Shell Dashboard (Screen 5) | T-002-03 | queued | — | — |
| 006 | NASI Loom Dashboard (Screen 6) | T-002-04 | queued | — | — |

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

*None yet — first wave in progress.*

---

## Techniques Library

| File | Summary |
|------|---------|
| — | No techniques yet |

*See `techniques/README.md` for the full index.*

---

## Up Next

- [ ] T-001-01 and T-001-02 complete → write retros for experiments 001 and 002
- [ ] Update experiment status in this table after each retro
- [ ] T-002-01 and T-002-02 unlock after S-001 completes (parallel)
- [ ] After wave 2: first technique extraction from retro patterns

---

## Open Questions

- Does the FigJam `get_figjam` MCP read provide enough to write accurate BRIEFs, or do we always need the hi-fi design file too?
- Do FigJam shape type names (`MANUAL_INPUT`, `DOCUMENT_SINGLE`, `INTERNAL_STORAGE`) give useful semantic hints to the implementing agent?
- Does "Chaos Curated" vs "Chaos Toned Down" as a descriptor produce a visible design difference in output?
- What information is consistently missing from lo-fi → that always needs to be inferred?

---

## Session Log

*One entry per session. Append; never edit past entries.*

| Date | What happened |
|------|--------------|
| 2026-03-20 | Project scaffolded. Lisa initialized. Cloudflare deployment configured. ROADMAP.md established. |
| 2026-03-20 | NASI FigJam board pulled via MCP. 6 experiments scaffolded. S-001 and S-002 drafted. 6 tickets created. T-001-01 and T-001-02 picked up by Lisa immediately (now in research phase). |
