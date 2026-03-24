# Technique: Mode Personality through Palette + Layout Density

**First seen**: Experiments 004 + 005 (NASI Sprite vs. Shell Dashboard)
**Effect**: Large — same component structure expresses opposite personalities without structural code changes

## What It Is

Two screens sharing identical component structure (card list, tab bar, header) but expressing different personalities entirely through:

1. **Color palette**: Saturated gradients (Sprite) → muted grays (Shell)
2. **Layout structure**: 2-column chaos grid (Sprite) → 1-column calm stack (Shell)
3. **Item density**: More cards above fold (Sprite) → fewer cards, more whitespace (Shell)

The semantic brief names ("Chaos Curated" vs "Chaos Toned Down") drove these decisions without requiring explicit layout instructions.

## When to Use

When implementing multiple modes or themes of the same screen. The mode name and one-line description are sufficient to differentiate output — no need to write separate layout specs for each mode.

## Implementation Pattern

```tsx
// Same card structure — different config per mode
const SPRITE_CARDS = [
  { from: 'from-violet-400', to: 'to-pink-500', wide: true, tall: true, ... },
  // 10 cards, mixed sizes, saturated gradients
];

const SHELL_CARDS = [
  { from: 'from-slate-400', to: 'to-gray-500', ... },
  // 6–8 cards, uniform size, muted grays
];

// Grid layout for Sprite:
<div className="grid grid-cols-2 gap-3"> ... </div>

// Stack layout for Shell:
<div className="flex flex-col gap-4"> ... </div>
```

## Brief Writing Guidance

To get this output from a brief, include:
- The mode name and its one-line personality descriptor
- An explicit contrast note: "calmer/fewer items than Sprite" or "same data, different energy"
- The color identity token (e.g. "Shell = gray")

The agent will infer layout density from personality — you don't need to specify card count or column count explicitly.

## Notes

- This technique is most effective when the two modes are described relative to each other in the brief
- Without the contrast reference, the agent may produce similar-feeling outputs
- Applies to any "theme switching" design: dark/light, focused/exploratory, calm/energetic
