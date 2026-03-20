# figma-to-code-research

A structured sprint to develop a repeatable methodology for turning Figma designs into pixel-accurate React components.

**Execution engine**: [Lisa](https://github.com/lisa-loop/lisa) — DAG-driven concurrent task scheduler for Claude Code
**Stack**: Astro 4 + React 18 + TypeScript + Tailwind CSS

---

## Setup

```bash
npm install
npm run dev        # dev server at localhost:4321
```

Requires Lisa to be installed:

```bash
cargo install lisa
```

---

## Running an Experiment

```bash
# Scaffold experiment + Lisa story + Lisa ticket
./scripts/new-experiment.sh 1 hero-section

# Add Figma exports to experiments/001-hero-section/figma/
# Fill in experiments/001-hero-section/BRIEF.md

# Validate and launch
lisa validate
lisa loop
```

---

## Structure

```
experiments/     — component outputs, briefs, and retros (human layer)
techniques/      — extracted, named findings (the real output)
docs/active/     — Lisa tickets, stories, and RDSPI phase artifacts
docs/knowledge/  — RDSPI workflow definition (auto-injected by Lisa)
```

Full details in [docs/specification.md](./docs/specification.md).
