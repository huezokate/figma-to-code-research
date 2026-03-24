# Technique: Chaos Grid via Alternating col-span

**First seen**: Experiment 004 (NASI Sprite Dashboard)
**Effect**: Large — transforms a flat card list into an editorial, visually dynamic grid

## What It Is

A `grid-cols-2` layout where select cards are assigned `col-span-2` (full width) and `col-span-1` (half width). Varying card height (`h-24` vs `h-32`) adds a second dimension of visual rhythm. The result reads as a curated, "chaos" editorial grid without requiring any layout calculation.

## When to Use

When a brief calls for: dense feeds, "chaos curated" layouts, editorial grids, Pinterest-style boards, or any content that should feel algorithmically varied rather than uniform.

## Implementation Pattern

```tsx
const CARDS = [
  { id: 'hero',   wide: true,  tall: true,  ... },
  { id: 'item-1', wide: false, tall: false, ... },
  { id: 'item-2', wide: false, tall: false, ... },
  { id: 'feature',wide: true,  tall: true,  ... },
  // repeat rhythm...
] as const;

<div className="grid grid-cols-2 gap-3">
  {CARDS.map((card) => (
    <div
      key={card.id}
      className={[
        'rounded-2xl',
        card.wide ? 'col-span-2' : 'col-span-1',
        card.tall ? 'h-32' : 'h-24',
      ].join(' ')}
    />
  ))}
</div>
```

## Rhythm Guidance

- Wide card every 3–4 items prevents the grid from feeling too regular
- Avoid two consecutive wide cards — it flattens the rhythm
- Alternate wide placement to maintain the "curated chaos" feel

## Notes

- Works with any card content (image, gradient + emoji, text)
- The `wide`/`tall` flags in the data array are the only change needed to adjust rhythm — no CSS modifications required
- For truly random layouts, flags can be assigned algorithmically
