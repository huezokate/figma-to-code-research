# Plan: T-002-04 — implement-nasi-loom-dashboard

## Steps

### Step 1 — Create NasiLoomDashboard.tsx
Define INSPO_CARDS (verbatim FigJam copy), PROJECTS, FOLLOWING.
Render all 8 sections in order. ModeTabBar with loom active.

### Step 2 — Update index.astro
Replace stub with phone-frame + component.

### Step 3 — TypeScript check
`tsc --noEmit`, expect 0 errors.

## Acceptance Criteria Reminders
- "What are we working on today?" is the visual focal point — make it tall and prominent
- All 4 inspo cards must have the exact FigJam copy verbatim
- All 7 content sections must be present
- Full vertical scroll in 390×844 frame
