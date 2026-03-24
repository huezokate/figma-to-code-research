# Research: T-002-03 — implement-nasi-shell-dashboard

## Ticket Summary

Screen 5 of the NASI onboarding flow. Shell mode dashboard — "Chaos Toned Down." Same content as Sprite but calmer: single-column, more whitespace, muted Shell gray color identity.

---

## Codebase State (post T-002-02)

### ModeTabBar
`experiments/002-nasi-app-connect/src/ModeTabBar.tsx`

**Known issue from T-002-02 review**: The active tab pill is hardcoded to `bg-pink-500`. For Shell (gray) and Loom (blue), the active pill needs a different color.

**Current code**:
```tsx
tab.id === activeTab ? (
  <span className="bg-pink-500 text-white rounded-full px-4 py-1.5 text-sm font-medium">
```

**Fix needed**: Map `activeTab` → pill background:
- `sprite` → `bg-pink-500`
- `shell` → `bg-gray-500`
- `loom` → `bg-blue-500`

This is a small change to ModeTabBar that does not break T-001-02 (Sprite is still default) or T-002-02 (Sprite active still gets pink-500). The change must be backward-compatible.

### Shell Color
- Shell color system: `bg-gray-400` (from T-001-01 mode cards)
- Active tab: `bg-gray-500` (one step darker for the selected pill, for contrast against white nav)
- "Chaos Toned Down" label: `text-gray-600`

### Content Pattern (from T-002-02)
NasiSpriteDashboard established the card pattern. Shell reuses the same ModeTabBar + scrollable body pattern but with:
- Single-column cards (no 2-col grid)
- More padding/whitespace
- Fewer items visible at once
- Muted, calmer color palette

### Stub Page
`src/pages/experiments/005-nasi-shell-dashboard/index.astro` — stub, same structure as 003 and 004 stubs.

### Experiment Directory
`experiments/005-nasi-shell-dashboard/` — has `BRIEF.md`, `RETRO.md`, no `src/`.

---

## FigJam Source Notes

- Tab bar: Shell active (gray). Sprite also visible.
- Mode label: "Chaos Toned Down"
- Content: Single large rounded rectangle in main area — `DOCUMENT_SINGLE` element. Cleaner reading/viewing interface.
- Same sources as Sprite, fewer items, more whitespace, slower pace.

---

## Files Relevant to This Ticket

| File | Role |
|------|------|
| `experiments/005-nasi-shell-dashboard/src/NasiShellDashboard.tsx` | Create |
| `src/pages/experiments/005-nasi-shell-dashboard/index.astro` | Modify — replace stub |
| `experiments/002-nasi-app-connect/src/ModeTabBar.tsx` | Modify — add color mapping for active tab |
