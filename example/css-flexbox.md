# CSS Flexbox & Grid Cheatsheet

## Flexbox

### Container #layout #flex

- `display: flex` — enable flexbox
- `flex-direction: row | column` — main axis direction
- `justify-content: center` — align along main axis
- `align-items: center` — align along cross axis
- `gap: 1rem` — spacing between items
- `flex-wrap: wrap` — allow wrapping

### Items #layout

- `flex: 1` — grow and shrink equally
- `flex-grow: 1` — allow growing
- `flex-shrink: 0` — prevent shrinking
- `align-self: flex-end` — override item alignment
- `order: 1` — visual order

## Grid

### Container #layout #grid

- `display: grid` — enable grid
- `grid-template-columns: 1fr 1fr` — two equal columns
- `grid-template-rows: auto 1fr` — row sizing
- `gap: 1rem` — cell spacing
- `grid-template-areas` — named template layout

### Items #layout

- `grid-column: 1 / 3` — span columns
- `grid-row: span 2` — span rows
- `justify-self: center` — horizontal alignment
- `align-self: center` — vertical alignment
- `place-self: center` — both axes
