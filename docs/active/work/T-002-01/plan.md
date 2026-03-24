# Plan: T-002-01 — implement-nasi-glow-up

## Steps

### Step 1 — Append glow-pulse keyframe to global.css
File: `src/styles/global.css`
Action: Append the `@keyframes glow-pulse` block after the existing `welcome-pop-in` keyframe.

Verification: File contains both keyframe names; no syntax errors visible.

---

### Step 2 — Create NasiGlowUp.tsx
File: `experiments/003-nasi-glow-up/src/NasiGlowUp.tsx`

Content:
```tsx
export default function NasiGlowUp() {
  return (
    <div className="w-full h-full bg-gray-950 flex flex-col items-center justify-center gap-8">
      {/* Glow circle */}
      <div
        className="w-60 h-60 rounded-full bg-rose-400 flex items-center justify-center"
        style={{ animation: 'glow-pulse 2s ease-in-out infinite' }}
      >
        <div className="w-52 h-52 rounded-full bg-gradient-to-br from-pink-300 to-rose-500 opacity-80" />
      </div>

      {/* Avatar placeholder */}
      <div className="w-32 h-40 rounded-2xl bg-gradient-to-b from-pink-300 to-rose-500 flex items-center justify-center">
        <span className="text-4xl">✨</span>
      </div>

      {/* Loading text */}
      <p
        className="text-rose-300 text-sm tracking-wide"
        style={{ animation: 'glow-pulse 3s ease-in-out infinite' }}
      >
        Sprite is getting to know you…
      </p>
    </div>
  );
}
```

Verification: TypeScript-valid (no imports needed, no JSX issues). File exists at correct path.

---

### Step 3 — Update index.astro
File: `src/pages/experiments/003-nasi-glow-up/index.astro`

Action: Replace stub content with:
- Remove commented-out import; add real import
- Remove `const status = 'in-progress'` (inline in JSX instead)
- Replace placeholder div with phone frame + `<NasiGlowUp client:load />`

Verification: File matches the structure of 002's index.astro.

---

## Testing Strategy

TypeScript verification:
- `node_modules/.bin/tsc --noEmit` should pass with 0 errors
- NasiGlowUp.tsx has no props, no state, no imports — very low surface area for type errors

Visual acceptance criteria (manual):
- [ ] Full-screen dark background fills the phone frame
- [ ] Centered circle with visible pink glow animation
- [ ] Avatar placeholder below circle
- [ ] Loading text visible in rose/pink color
- [ ] No overflow outside 390×844 phone frame

---

## Risk

Low. This component is purely presentational with no state, no sub-components, no external dependencies. The only risk is the `box-shadow` glow not rendering inside the `overflow-hidden` phone frame — mitigated by using `inset` shadow positioning (but box-shadow is not clipped by overflow:hidden in standard CSS, so this is fine).
