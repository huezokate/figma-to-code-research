# Figma-to-Code Research — Specification

*Written from first principles, grounded in how Lisa actually works.*

---

## What This Is

A research sprint for a designer who works primarily in Figma and wants to develop a personal, repeatable methodology for turning their designs into pixel-accurate coded components.

The execution engine is **Lisa** — a DAG-driven concurrent task scheduler for Claude Code. The target stack is **Astro + React + Tailwind**. The output accumulates in an `experiments/` directory that an agent can later synthesize into a methodology document.

This is early-stage research, not a final system. The goal is enough reps and documented observations to know what works, what doesn't, and where the real leverage points are.

---

## The Core Question

**How do I turn a Figma design into a component that looks exactly right?**

Not close enough. Not structurally similar. Exactly right — spacing, type, colors, responsive behavior, the details a designer notices and a developer might not.

---

## How Lisa Actually Works

Understanding Lisa's mechanics is necessary for structuring this project correctly.

### RDSPI: The six-phase workflow

Every Lisa ticket passes through six phases in sequence:

| Phase | Artifact | Purpose |
|-------|----------|---------|
| **Research** | `research.md` | Map the codebase. What exists, where, how it connects. No solutions yet. |
| **Design** | `design.md` | Enumerate approaches, evaluate tradeoffs, decide with rationale. |
| **Structure** | `structure.md` | Define file-level changes. Which files are created, modified, deleted. Blueprint, not code. |
| **Plan** | `plan.md` | Sequence implementation steps. Testing strategy. Ordered, atomic. |
| **Implement** | `progress.md` | Execute the plan. Commit incrementally. Track deviations. |
| **Review** | `review.md` | Self-assess. What changed, what's tested, open concerns. The handoff document. |

All six phases always run. No phases are skipped based on ticket size. Each artifact is ~200 lines — enough to be thorough, short enough to review quickly.

Lisa detects completed artifacts and advances the ticket's `phase` field automatically. Agents do not update frontmatter manually.

### Where artifacts live

```
docs/active/work/{ticket-id}/
  research.md
  design.md
  structure.md
  plan.md
  progress.md
  review.md
```

Completed tickets archive to `docs/archive/`.

### Ticket format

```yaml
---
id: T-001-01
story: S-001
title: implement-hero-section
type: task
status: open
priority: medium
phase: ready
depends_on: []
---

## Context

Why this work matters and what it accomplishes.

## Acceptance Criteria

- [ ] Concrete, verifiable condition
```

Phase values: `ready → research → design → structure → plan → implement → review → done`

### DAG scheduling

Lisa computes a dependency graph from `depends_on` fields and runs tickets concurrently up to `max_threads`. Tickets with no unmet dependencies start immediately. Commit serialization is handled via file locking — agents do not coordinate.

**Critical rule**: if two tickets touch the same files, one must `depends_on` the other. The lock is a safety net, not a substitute for correct modeling.

### Signals and hooks

Lisa uses signal files (`.lisa/signals/`) and Claude Code hooks (`.claude/settings.local.json`) to detect when agent sessions become idle and advance scheduling. These are wired automatically by `lisa init`.

---

## Repository Structure

```
figma-to-code-research/
├── README.md
├── CLAUDE.md                        # Agent context — injected into every Lisa session
├── .lisa.toml                       # Lisa config (threads, dirs, timeouts)
├── astro.config.mjs
├── package.json
├── tsconfig.json
│
├── src/
│   ├── layouts/
│   │   └── ExperimentLayout.astro   # Shared layout: header, status badge, back nav
│   └── pages/
│       └── index.astro              # Landing page, auto-lists all experiments
│
├── experiments/                     # Human-facing layer: outputs and retros
│   └── {NNN}-{name}/
│       ├── BRIEF.md                 # Visual spec and acceptance criteria
│       ├── figma/                   # Exported screenshots and assets
│       ├── src/                     # Generated React component(s)
│       │   └── {ComponentName}.tsx
│       ├── page.astro               # Astro page rendering the component
│       └── RETRO.md                 # Post-experiment reflection
│
├── techniques/                      # Extracted, named findings (the real output)
│   └── README.md
│
├── docs/
│   ├── specification.md             # This file
│   ├── knowledge/
│   │   └── rdspi-workflow.md        # RDSPI definition — injected by Lisa automatically
│   ├── active/
│   │   ├── tickets/                 # T-NNN-NN.md files
│   │   ├── stories/                 # S-NNN.md files
│   │   └── work/                    # RDSPI artifacts, one dir per ticket ID
│   └── archive/                     # Completed tickets, stories, and work
│
└── scripts/
    └── new-experiment.sh            # Scaffolds experiment dir + story + ticket together
```

### Key design decisions

**The experiment folder is the human layer; `docs/active/work/` is Lisa's layer.**
`experiments/{NNN}/` holds what the designer produces (brief, assets, retro) and what Lisa produces as output (the component). Lisa's reasoning artifacts — the six RDSPI phase documents — live in `docs/active/work/{ticket-id}/`. These are separate concerns. Don't conflate them.

**Each experiment is one Story + one Ticket.**
Story `S-NNN` groups the experiment conceptually. Ticket `T-NNN-01` is the atomic unit Lisa schedules. The ticket's Context section references the `BRIEF.md` for visual specifications. For complex components, additional tickets (T-NNN-02, T-NNN-03) can be added with explicit dependencies.

**BRIEF.md is the interface between designer intent and agent execution.**
This is where the research really happens. Early briefs will be vague. Later briefs will be precise. The delta between early and late briefs *is the methodology*. A huge part of this sprint is figuring out what to put here.

**`techniques/` is the compound output.**
Individual experiments are raw material. Techniques are extracted, named insights: "When I describe spacing using the 8px grid directly, the output nails it." These are the findings that carry forward.

---

## BRIEF.md Format

The most important file in each experiment. It drives the ticket's Context and Acceptance Criteria.

```markdown
# {Component Name}

## Figma Source
- File: [link or filename]
- Frame: [specific frame name]
- Screenshots: see ./figma/

## What This Is
[1-2 sentences. Component purpose and placement.]

## Visual Specifications
- Layout:
- Typography:
- Colors:
- Spacing:
- Responsive behavior:

## Acceptance Criteria
1.
2.
3.

## Design Tokens / References
[Tokens, variables, or color names the agent should use.]

## What I'm Testing
[Which aspect of the description process is this experiment focusing on?]
```

The `Visual Specifications` section is deliberately loose. It evolves over the sprint. Early entries will be incomplete. That's fine — the gaps are data.

---

## RETRO.md Format

Written by the designer after reviewing the output. Short and honest.

```markdown
# Retro: {Component Name}

## Result
[Pass / Partial / Miss]

## What Matched
-

## What Didn't
-

## Why
[Theory on what in the brief caused the hit or miss.]

## Brief Changes for Next Time


## Technique Extracted?
[If a reusable insight emerged, name it and note whether it's in techniques/.]
```

---

## Evaluation Dimensions

Pick 2-3 per experiment. Not all at once.

- **Spacing accuracy** — Do margins, padding, and gaps match the design?
- **Typography** — Font size, weight, line-height, letter-spacing.
- **Color fidelity** — Are the right values used? Compare hex.
- **Layout structure** — Is flexbox/grid used where the design implies it?
- **Responsive behavior** — Does it adapt at the breakpoints the Figma frames imply?
- **Component boundaries** — Did the agent decompose the component the way the designer would?
- **Interaction states** — Hover, focus, active, disabled. If specified, are they present and correct?

---

## Running an Experiment

```bash
# 1. Scaffold the experiment, story, and ticket
./scripts/new-experiment.sh 1 hero-section

# 2. Add Figma exports to experiments/001-hero-section/figma/

# 3. Fill in experiments/001-hero-section/BRIEF.md

# 4. Update the ticket at docs/active/tickets/T-001-01.md with brief details

# 5. Validate the setup
lisa validate

# 6. Launch Lisa
lisa loop

# 7. After output: write the retro at experiments/001-hero-section/RETRO.md

# 8. If a technique emerged, add it to techniques/
```

---

## .lisa.toml

```toml
version = "0.2.9"

[dirs]
tickets = "docs/active/tickets"
stories = "docs/active/stories"
work = "docs/active/work"

[scheduling]
max_threads = 2
```

Two threads is the right default for this project. The designer is the bottleneck on review, not the agents on execution.

---

## CLAUDE.md Principles

CLAUDE.md is injected into every Lisa agent session. It must contain:

1. **Stack** — Astro + React, TypeScript, Tailwind. Build commands.
2. **Source layout** — Where the experiments are, where outputs go.
3. **Quality bar** — What "exactly right" means. Explicit enough to be checked.
4. **Figma conventions** — How to interpret exports, how to read measurements.
5. **Anti-patterns** — Things agents tend to get wrong, explicitly named.

CLAUDE.md should be edited throughout the research period. Improving it is part of the methodology.

---

## What Intentionally Doesn't Exist Here

- **Figma plugin/API integration** — exports are manual for now; that's deliberate.
- **Automated visual regression testing** — adds setup cost that slows the early loop.
- **Production deployment** — `npm run dev` is sufficient.
- **Multi-designer collaboration** — this is a solo methodology sprint.

---

## What Success Looks Like

After 10-20 experiments:

- `techniques/` has 5-10 named, reusable techniques.
- `CLAUDE.md` is tuned — the anti-patterns section reflects real observed failures.
- The Astro site shows a progression from rough early components to accurate later ones.
- An agent pointed at `experiments/`, `techniques/`, and the RDSPI artifacts can produce a coherent synthesis document: what works, what doesn't, what the remaining gaps are.
