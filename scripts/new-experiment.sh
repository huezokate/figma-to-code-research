#!/bin/bash
# Usage: ./scripts/new-experiment.sh <number> <kebab-name>
# Example: ./scripts/new-experiment.sh 1 hero-section
#
# Creates:
#   experiments/001-hero-section/       — experiment output dir
#   docs/active/tickets/T-001-01.md    — Lisa ticket for this experiment
#   docs/active/stories/S-001.md       — Lisa story for this experiment

set -e

if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Usage: $0 <number> <kebab-name>"
  exit 1
fi

NUM=$(printf "%03d" "$1")
NAME="$2"
STORY_ID="S-${NUM}"
TICKET_ID="T-${NUM}-01"
EXP_DIR="experiments/${NUM}-${NAME}"

if [ -d "$EXP_DIR" ]; then
  echo "Error: $EXP_DIR already exists"
  exit 1
fi

# --- Experiment directory ---
mkdir -p "${EXP_DIR}/figma" "${EXP_DIR}/src"

cat > "${EXP_DIR}/BRIEF.md" << EOF
# ${NAME}

## Figma Source
- File:
- Frame:
- Screenshots: see ./figma/

## What This Is
[1-2 sentences. What is this component? Where would it live in a real product?]

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
[Any tokens, variables, or color names the agent should use.]

## What I'm Testing
[Which aspect of the description process is this experiment focusing on?]
EOF

cat > "${EXP_DIR}/RETRO.md" << EOF
# Retro: ${name}

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
[If a reusable insight emerged, name it here and confirm it's in techniques/.]
EOF

cat > "${EXP_DIR}/page.astro" << EOF
---
import ExperimentLayout from '../../src/layouts/ExperimentLayout.astro';
// import YourComponent from './src/YourComponent';

const status = 'in-progress'; // 'pass' | 'partial' | 'miss' | 'in-progress'
---

<ExperimentLayout experimentId="${NUM}" title="${NAME}" status={status}>
  <section class="space-y-8">
    <div class="rounded border bg-white p-8">
      <!-- Drop component here once generated -->
      <p class="text-gray-400 text-sm">Component not yet implemented.</p>
    </div>
  </section>
</ExperimentLayout>
EOF

# --- Lisa story ---
cat > "docs/active/stories/${STORY_ID}.md" << EOF
---
id: ${STORY_ID}
title: experiment-${NUM}-${NAME}
type: story
status: open
priority: medium
tickets: [${TICKET_ID}]
---

## Goal

Build the **${NAME}** component from its Figma design and evaluate fidelity.

See \`experiments/${NUM}-${NAME}/BRIEF.md\` for the full visual specification and acceptance criteria.

## Track Breakdown

| Track | Tickets |
|-------|---------|
| Implementation | ${TICKET_ID} |
EOF

# --- Lisa ticket ---
cat > "docs/active/tickets/${TICKET_ID}.md" << EOF
---
id: ${TICKET_ID}
story: ${STORY_ID}
title: implement-${NAME}
type: task
status: open
priority: medium
phase: ready
depends_on: []
---

## Context

Implement the **${NAME}** component from its Figma design.

Full brief, Figma exports, and acceptance criteria are in \`experiments/${NUM}-${NAME}/BRIEF.md\`.

Output the component to \`experiments/${NUM}-${NAME}/src/\` and wire it into \`experiments/${NUM}-${NAME}/page.astro\`.

## Acceptance Criteria

- [ ] Component renders correctly at the specified viewport widths
- [ ] Spacing, typography, and colors match the Figma design as described in BRIEF.md
- [ ] Page at \`/experiments/${NUM}-${NAME}\` shows the component
EOF

echo "Created:"
echo "  ${EXP_DIR}/"
echo "  docs/active/stories/${STORY_ID}.md"
echo "  docs/active/tickets/${TICKET_ID}.md"
echo ""
echo "Next:"
echo "  1. Add Figma screenshots to ${EXP_DIR}/figma/"
echo "  2. Fill in ${EXP_DIR}/BRIEF.md"
echo "  3. Run: lisa validate && lisa loop"
