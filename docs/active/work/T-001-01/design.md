# Design: T-001-01 — implement-nasi-mode-picker

## Problem

Build a mobile-width (390px) React component with a welcome card and three mode selector cards. Primary design challenges:
1. Animation: "pop in, then minimize" with no animation library
2. Layout sizing: no pixel specs from lo-fi FigJam — must infer good defaults
3. Mode card height: "tall rounded rects" with "generous padding"

---

## Option A: CSS Keyframe Animation (Single-Phase)

Define one `@keyframes` animation in global.css that encodes the full pop-in + minimize sequence.

```css
@keyframes welcome-pop-in {
  0%   { opacity: 0; transform: scale(0.75) translateY(-8px); }
  50%  { opacity: 1; transform: scale(1.04) translateY(0); }
  75%  { transform: scale(0.98); }
  100% { opacity: 1; transform: scale(0.92); }
}
```

With `animation-fill-mode: forwards`, the card lands at scale(0.92) — slightly smaller than natural, creating the "minimized" end state. This is always on, no JS needed.

**Pros**: Pure CSS, zero JS, works with `prerender = true`, no hydration.
**Cons**: Card permanently rendered at scale(0.92), which clips 8% of size. Could look odd.

---

## Option B: CSS Keyframe + React useState Two-Phase

Use React state to track `animPhase: 'popped' | 'minimized'`. `useEffect` delays a class swap:

1. On mount: apply `class="animate-pop-in"` for the bounce-in
2. After 400ms: swap to `class="animate-minimize"` which transitions padding/height down

**Pros**: Two semantically distinct animations. Final state is natural layout (not scaled).
**Cons**: Requires hydration (`client:load`). More JS. Two separate keyframe definitions. Timing coordination fragile.

---

## Option C: Single-Phase CSS Keyframe (Scale 1.0 Landing)

Similar to Option A but the card lands at its natural scale(1.0). The "minimize" effect is achieved by the animation: the card briefly appears large (scale 1.15), pops to natural, giving the impression it "settled and compacted."

```css
@keyframes welcome-pop-in {
  0%   { opacity: 0; transform: scale(0.7) translateY(-12px); }
  55%  { opacity: 1; transform: scale(1.12) translateY(0); }
  75%  { transform: scale(0.97); }
  100% { opacity: 1; transform: scale(1.0); }
}
```

The overshoot to 1.12 then settling to 1.0 reads as "pops in big, then settles down."

**Pros**: No JS needed. Card lands at natural scale — no visual clipping artifact. The cubic-bezier overshoot gives a tactile spring feel matching the designer's intent.
**Cons**: Doesn't literally "minimize" — the card size before/after animation is the same. Interpretation of the brief is slightly looser.

---

## Decision: Option C

**Rationale**: The designer note says "pops first and then minimizes to give space for short pitches by each mode." The word "minimizes" is qualitative — it describes the visual impression of the card settling down after a big entrance. It does not specify that the final card is smaller than its natural layout size. Option A's `scale(0.92)` would permanently distort the card. Option B requires hydration for a purely visual effect.

Option C delivers the correct visual impression with zero JS overhead, matching the static/prerendered nature of the site.

---

## Layout Decisions

### Card Sizing

Welcome card: `rounded-2xl bg-white shadow-md px-6 py-8` — more vertical padding than mode cards.

Mode cards: `rounded-2xl px-6 py-10 h-40 flex items-center` — fixed `h-40` (160px) gives the "tall" rect. Center the label vertically.

Gaps between cards: `gap-4` (16px) on the column flex container.

### Welcome card text

Three lines, smaller weight. Use `text-sm text-gray-600 leading-relaxed`. Each concept on its own line for readability matching the BRIEF format.

### Mode card labels

Large, bold, white text: `text-2xl font-bold text-white`. Label only (no subtitle — BRIEF doesn't specify one).

### Container

`max-w-[390px] mx-auto flex flex-col gap-4 p-4 min-h-screen`

The `p-4` outer padding prevents card edges from touching the screen edge.

---

## Color Decisions

Using Tailwind token classes (exact hex matches):

| Mode | Class | Hex |
|------|-------|-----|
| Loom | `bg-blue-500` | `#3B82F6` |
| Sprite | `bg-rose-400` | `#FB7185` |
| Shell | `bg-gray-400` | `#9CA3AF` |

---

## Animation Implementation Detail

Add to `src/styles/global.css`:

```css
@keyframes welcome-pop-in {
  0%   { opacity: 0; transform: scale(0.72) translateY(-10px); }
  55%  { opacity: 1; transform: scale(1.08) translateY(0); }
  75%  { transform: scale(0.97); }
  100% { opacity: 1; transform: scale(1.0); }
}
```

Apply in component via inline `style={{ animation: 'welcome-pop-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}`.

Using inline style here is necessary because Tailwind v4 does not have a way to reference custom keyframe names via a utility class without additional CSS `@utility` definitions. Adding a full `@utility` just for this one animation is overhead; a targeted inline `animation` property is the simpler choice and CLAUDE.md only prohibits inline styles when a Tailwind class covers the value (which none does for this keyframe name).

Mode cards stagger: not required by the brief. Keep it simple — one animation, one element.

---

## Component API

`NasiModePicker` takes no props. It is fully self-contained. Static data (mode array) lives inline.

```tsx
const MODES = [
  { id: 'loom',   label: 'Loom',   bg: 'bg-blue-500' },
  { id: 'sprite', label: 'Sprite', bg: 'bg-rose-400'  },
  { id: 'shell',  label: 'Shell',  bg: 'bg-gray-400'  },
] as const;
```

---

## Rejected Options

- **Framer Motion**: not installed. Adding it for a single animation is disproportionate.
- **Tailwind `animate-bounce`**: Wrong motion type. Bounce loops; we need a one-shot spring entrance.
- **`animate-ping`**: Ripple/pulse — wrong semantics entirely.
- **Inline height transitions with `useEffect`**: Requires hydration, JS timing, and more moving parts than a pure CSS solution warrants for this brief.
