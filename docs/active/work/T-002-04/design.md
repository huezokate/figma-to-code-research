# Design: T-002-04 — implement-nasi-loom-dashboard

## Design Intent

Loom is the creative/work mode — "What are we working on today?" This screen should feel like a blank canvas with a warm, inviting prompt at the center. Unlike Sprite (chaotic) or Shell (calm but passive), Loom is purposeful and generative.

---

## Layout Architecture

The screen has 7 distinct sections, stacked vertically (all scrollable under the fixed tab bar):

```
1. ModeTabBar (Loom active, blue)
2. [Prompt card] "What are we working on today?"  ← FOCAL POINT (tall, blue gradient)
3. [Section header] "Inspiration"
4. [2×2 grid] 4 inspo cards with exact FigJam copy
5. [Section header] "Previous Projects"
6. [Previous projects block] 2 placeholder project cards
7. [Share your work] Text input area (non-functional, visual only)
8. [Section header] "Content You Follow"
9. [Content block] 3 small horizontal content rows
```

Note: The DOCUMENT_SINGLE element from FigJam is interpreted as the prompt card header/handle area.

---

## Prompt Card

The visual focal point. Must be large, inviting, blank-canvas-feeling.

Design:
- `rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600`
- Height: `h-36` — tall enough to feel significant
- Text: "What are we working on today?" in white, `text-lg font-semibold`
- Subtext: "tap to start a session" in `text-blue-100 text-sm`
- Slight inner shadow or border to suggest it's interactive

---

## Inspiration Cards (2×2 grid)

CSS `grid-cols-2 gap-3`. All 4 cards uniform height `h-24`.

Each card: `rounded-2xl bg-blue-50 border border-blue-100 p-3`
- Small blue label "Inspo {N}" at top in `text-xs text-blue-400`
- Main copy in `text-sm text-gray-700`

Content (verbatim from brief):
1. "Inspo 1: Improve your right hook"
2. "Inspo 2: Try yourself in poetry"
3. "Inspo 3: Gardening tips 101"
4. "Inspo 4: New UI trends"

---

## Previous Projects

Two placeholder cards in `flex flex-col gap-3`:
- Each: `rounded-2xl bg-gray-100 h-16 flex items-center px-4 gap-3`
- Emoji + project name + date subtext
  - 📐 "Brand identity redesign" / "2 days ago"
  - ✍️ "Short story draft" / "last week"

---

## Share Your Work

Visual-only text input area:
```
<div rounded-2xl border border-gray-200 bg-white p-4>
  <p text-xs text-gray-400 mb-2>Share your work</p>
  <div h-12 bg-gray-50 rounded-xl border border-gray-200 flex items-center px-3>
    <span text-sm text-gray-300>What did you make today?</span>
  </div>
</div>
```

---

## Content You Follow

3 horizontal content rows:
- Each: `flex items-center gap-3 py-3 border-b border-gray-100`
- Left: gradient circle avatar (40px)
- Right: title + source text

Content:
- 🎨 "Design Systems Weekly" / "12 new posts"
- ✏️ "The Writing Prompt" / "3 new prompts"
- 🌱 "Garden & Grow" / "5 new posts"

---

## Section Headers

Consistent pattern: `text-sm font-semibold text-gray-600 mb-3 mt-5`
