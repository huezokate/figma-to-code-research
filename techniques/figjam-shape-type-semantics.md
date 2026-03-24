# Technique: FigJam Shape Type Names as Semantic UI Hints

**First seen**: Experiment 006 (NASI Loom Dashboard)
**Effect**: Large — shape type names predicted UI section role with high accuracy, reducing inference

## What It Is

FigJam lo-fi shapes have named types beyond generic rectangles. These type names carry semantic meaning that maps reliably to UI patterns:

| FigJam Shape Type | UI Interpretation |
|-------------------|-------------------|
| `DOCUMENT_SINGLE` | Project header, file preview, document area |
| `INTERNAL_STORAGE` | Saved items, history, recent/previous list |
| `MANUAL_INPUT` | Text input, textarea, CTA / form area |
| `ROUNDED_RECTANGLE` | Generic card, button, content block |
| `ELLIPSE` | Avatar, status indicator, icon |

## When to Use

When reading a FigJam via `get_figjam` MCP, inspect the `name` attribute of each shape alongside its text content. Use the shape type as a secondary signal for what kind of UI element it should become — especially when the text label is absent or vague.

## How to Apply

```xml
<!-- FigJam output example -->
<shape-with-text name="INTERNAL_STORAGE">Previous projects</shape-with-text>
<shape-with-text name="MANUAL_INPUT">Share your work</shape-with-text>
<shape-with-text name="DOCUMENT_SINGLE"></shape-with-text>
```

→ `INTERNAL_STORAGE` + "Previous projects" = scrollable saved-items list with history cards
→ `MANUAL_INPUT` + "Share your work" = textarea + submit button
→ `DOCUMENT_SINGLE` (empty text) = project/document header with workspace context

## Confidence Levels

- `MANUAL_INPUT`: High confidence → always an input, form, or interactive CTA
- `INTERNAL_STORAGE`: High confidence → always a list of persisted/saved items
- `DOCUMENT_SINGLE`: Medium confidence → project context area, but visual treatment varies
- `ROUNDED_RECTANGLE`: Low confidence → generic; rely on text label instead

## Notes

- Empty text on a shape is not a data gap — `DOCUMENT_SINGLE` with no text means the designer intended a structural placeholder; infer from shape type
- This technique is most valuable on content-rich screens (4+ sections) where section differentiation matters
- Answers the sprint open question: "Do FigJam shape type names give useful semantic hints?" — **Yes, reliably for MANUAL_INPUT and INTERNAL_STORAGE.**
