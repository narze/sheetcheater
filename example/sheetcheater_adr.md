# ADR: SheetCheater Architecture

## Overview #architecture #product

### What is SheetCheater? #basics

A markdown-to-A4-cheatsheet generator that produces clean, printable 3-column HTML cheatsheets with auto-colored tag pills.

### Core Philosophy #principles

- **Print-first**: Every design decision optimized for A4 PDF output
- **Convention over configuration**: Rigid markdown structure guarantees consistent layout
- **Zero dependencies for users**: Self-contained HTML output with Tailwind CDN
- **Fast dev loop**: Bun native TypeScript, no transpilation during development

## Technology Stack #stack

### Runtime & Build #toolchain

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Runtime | **Bun** | Native TypeScript, fast execution, single binary |
| Bundler | **Vite** | Fast HMR, modern ESM, Vite+ ecosystem |
| Styling | **Tailwind CSS v4** | Utility-first, CDN-friendly, small output |
| Markdown | **markdown-it** | Token-based parsing, extensible, battle-tested |
| Language | **TypeScript** | Type safety without runtime overhead |

### Why Not Node + tsx? #decision #trade-offs

- Bun runs TypeScript natively — no `tsx` or `ts-node` dependency
- Faster cold starts for CLI execution
- Single `bun.lock` for deterministic installs

**Trade-off**: Users need Bun for dev; compiled CLI works on Node for end users.

## Data Pipeline #parser #renderer

### Markdown → Tokens → JSON → HTML

```
input.md
  → markdown-it tokens (heading_open, inline, fence, etc.)
    → parseCheatsheet() → Cheatsheet { title, columns[], cards[], tags[] }
      → renderCheatsheet() → HTML string with Tailwind classes
        → renderFullPage() → Self-contained HTML file
```

### Parser Design #parser

- **Token-based**: Uses `markdown-it.parse()` instead of regex for reliability
- **Heading-driven**: `#` → title, `##` → column, `###` → card, `####+` → bold paragraph
- **Tag extraction**: Regex `#tag-name` extracted from inline token content
- **Block rendering**: Non-heading tokens rendered via `md.renderer.render()`

### Renderer Design #renderer

- **Pure functions**: `renderCheatsheet()` + `renderFullPage()` — no side effects
- **Tailwind CDN**: Output HTML includes `<script src="https://cdn.tailwindcss.com">`
- **A4 optimization**: `@page { size: A4 }` + `.cheatsheet-page { width: 210mm }`
- **Print overrides**: `@media print` strips shadows, forces exact colors

## Markdown Convention #convention #schema

### Rigid Hierarchy

| Element | Markdown | Role | Max |
|---------|----------|------|-----|
| Page Title | `# Title` | Cheatsheet heading | 1 |
| Column | `## Section` | Vertical column | 3 |
| Card | `### Card Title` | Bordered content block | ∞ |
| Tag | `#tag-name` | Inline pill badge | ∞ |

### Why Rigid? #decision #trade-offs

**Pros:**
- Guaranteed consistent layout every time
- Parser stays simple (no config, no ambiguity)
- Users can't break the layout

**Cons:**
- No custom layouts (no 2-column cards, no spanning)
- No nested sections beyond column > card
- Learning curve for new users

## Styling Architecture #styling #tailwind

### Print-First CSS

```
.cheatsheet-page {
  width: 210mm;
  min-height: 297mm;
  padding: 10mm;
  background: white;
}
```

### Dynamic Grid Columns

- 1 column → `grid-cols-1`
- 2 columns → `grid-cols-2`
- 3 columns → `grid-cols-3`

Prevents empty space when content has fewer than 3 columns.

### Tag Color System

- 17 pastel color pairs (bg + text)
- Hash-based assignment: `hashString(label) % 17`
- Consistent per tag across all cheatsheets

## Application Modes #runtime

### 1. Dev Server (Browser Editor)

- **Entry**: `src/main.ts`
- **Features**: Split-pane editor, live preview, drag-and-drop, localStorage persistence
- **Use case**: Authors writing and iterating on cheatsheets

### 2. CLI (Static HTML)

- **Entry**: `src/cli.ts`
- **Output**: Self-contained HTML file
- **Use case**: CI/CD, batch generation, end users

### 3. Web App (Future)

- **URL**: sheetcheater.narze.live
- **Same code**: Parser + renderer shared between all modes

## State Management #state

### In-Memory Editing

- No database, no backend
- `localStorage` persists markdown draft across refreshes
- Reset button restores original file content
- Overflow warning: `page.scrollHeight > 1123px` (A4 at 96dpi)

## Build & Distribution #build #npm

### Compilation Strategy

| Target | Input | Output | Tool |
|--------|-------|--------|------|
| Dev server | `src/main.ts` | `dist/` (bundled) | Vite |
| CLI | `src/cli.ts` | `dist/cli.js` | tsc |
| npm package | `dist/` | Registry | npm publish |

### Why Two Build Paths? #decision

- Vite bundles the dev app (tree-shaking, HMR, assets)
- tsc compiles CLI to plain JS (Node compatible, no bundler overhead)
- `files: ["dist"]` in package.json keeps npm package lean

## Decisions Log #history

| Version | Decision | Impact |
|---------|----------|--------|
| v0.1.0 | Compile CLI to `dist/` | `npx sheetcheater` works |
| v0.1.0 | Dynamic grid columns | No empty space for 1-2 columns |
| v0.1.0 | Remove `shadow-sm` from cards | Clean PDF borders |
| v0.1.0 | `@page { margin: 0 }` | No right-edge clipping |
| v0.1.1 | Gray background for `<code>` | Better inline code distinction |

## Status

**Active** — architecture stable since v0.1.1

## References

- `src/parser.ts` — Markdown → JSON
- `src/renderer.ts` — JSON → HTML
- `src/types.ts` — TypeScript interfaces
- `src/cli.ts` — CLI entry
- `src/main.ts` — Dev server entry
- `package.json` — Dependencies & scripts
