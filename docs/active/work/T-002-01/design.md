# Design: T-002-01 — implement-nasi-glow-up

## Options Considered

### Option A — animate-pulse on a solid circle
Use Tailwind's built-in `animate-pulse` on a `rounded-full` div with `bg-rose-400`.

**Pros**: No custom keyframe needed. Zero new global.css additions.
**Cons**: `animate-pulse` only modulates opacity (1 → 0.5 → 1). Reads as "loading skeleton," not as a glowing magical moment. Doesn't achieve the "glow" intent.

**Verdict**: Reject. The design intent is delight, not a loading skeleton feel.

---

### Option B — Custom `glow-pulse` keyframe (box-shadow based)
Add a `@keyframes glow-pulse` to `global.css` that animates `box-shadow` from a tight pink glow to a wide, diffuse bloom and back. Apply via `style={{ animation: 'glow-pulse 2s ease-in-out infinite' }}` on the circle element.

**Pros**:
- Matches the "coming alive" intent exactly — the circle radiates light
- Consistent with the existing keyframe pattern in global.css (welcome-pop-in)
- No new dependencies
- `box-shadow` glow works in all browsers

**Cons**: One small addition to global.css. But that's the established pattern.

**Verdict**: Accept. This is the correct approach for the design intent.

---

### Option C — Framer Motion animate
Import `framer-motion` for a spring-based pulse.

**Pros**: Smooth, production-quality animation.
**Cons**: Framer is not in the project. Would require `npm install`. Adds a dependency for one animation. Overkill for a PoC experiment.

**Verdict**: Reject. The project already has a CSS keyframe pattern; stick to it.

---

## Decision: Option B

Custom `glow-pulse` keyframe in `global.css`, applied inline on the circle.

---

## Component Architecture

Single file: `NasiGlowUp.tsx`. No sub-components needed — this is a self-contained interstitial screen.

### Layout (flex-col, full-height, dark bg)
```
<div> (390×844 fill, bg-gray-950, flex-col, items-center, justify-center)
  <div> (circle, ~240px, rounded-full, bg-rose-400, glow-pulse animation)
    <div> (inner gradient, softer pink)
  </div>
  <div> (avatar placeholder below circle — gradient oval or emoji)
  <p> ("Sprite is getting to know you…", pink text, subtle)
</div>
```

### Glow keyframe
```css
@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 0 0 30px 10px rgba(244, 63, 94, 0.4), 0 0 60px 20px rgba(244, 63, 94, 0.15);
  }
  50% {
    box-shadow: 0 0 60px 20px rgba(244, 63, 94, 0.7), 0 0 100px 40px rgba(244, 63, 94, 0.3);
  }
}
```
Uses `rgba(244, 63, 94, ...)` which is Tailwind's `rose-500` hex `#f43f5e`.

### Avatar Placeholder
Below the circle: a smaller rounded rectangle (`w-32 h-40 rounded-2xl`) with a vertical gradient (`from-pink-300 to-rose-500`) and a `✨` emoji centered. This represents the AI-generated character portrait referenced in the brief.

### Loading Text
`"Sprite is getting to know you…"` in `text-rose-300 text-sm` with a slight fade-in animation delay so it appears after the circle blooms. Use the same `glow-pulse` delay or a simple `opacity` animation via `animate-pulse` (just opacity — appropriate here for subtle text fade).

---

## Color Decisions

| Element | Value | Rationale |
|---------|-------|-----------|
| Background | `bg-gray-950` (`#030712`) | Near-black — maximizes contrast for the glow |
| Circle fill | `bg-rose-400` | Consistent with mode card color from T-001-01 |
| Glow color | `rgba(244,63,94,…)` (rose-500) | Slightly deeper than fill for diffuse glow |
| Avatar gradient | `from-pink-300 to-rose-500` | Suggests the character; warm, alive |
| Loading text | `text-rose-300` | On-theme, readable against near-black bg |

---

## What's Rejected

- Box around the avatar (adds unnecessary visual complexity)
- Lottie/SVG animation (no assets, no dependency)
- Separate sub-component for the avatar (overkill — single screen, single use)
- Spinner or progress bar (contradicts the "delight moment" feel — no progress indicator)
