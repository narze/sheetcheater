# ADR: SheetCheater Architecture

## Product #architecture

### What #basics

Markdown → A4 cheatsheet generator. 3-column HTML, auto-colored tags, print-optimized.

### Philosophy #principles

- **Print-first** — A4 PDF output drives all design
- **Convention over config** — rigid `#`/`##`/`###` hierarchy
- **Zero deps** — self-contained HTML with Tailwind CDN
- **Fast dev** — Bun native TS, no transpile

## Stack #toolchain

| Layer | Choice | Why |
|-------|--------|-----|
| Runtime | Bun | Native TS, fast CLI |
| Bundler | Vite | HMR, ESM, Vite+ |
| Styling | Tailwind v4 | CDN-friendly, utilities |
| Markdown | markdown-it | Token-based, extensible |
| Language | TypeScript | Types without runtime cost |

## Pipeline #parser #renderer

```
input.md → markdown-it tokens → parseCheatsheet() → JSON → renderCheatsheet() → HTML
```

### Parser

- Token-based (`markdown-it.parse()`)
- `#` title, `##` column, `###` card, `####+` bold
- `#tag-name` extracted via regex

### Renderer

- Pure functions, no side effects
- Tailwind CDN inlined
- A4: `210mm × 297mm`, `@page { margin: 0 }`
- Print: shadows stripped, exact colors forced

## Convention #schema

| Markdown | Role | Max |
|----------|------|-----|
| `# Title` | Page heading | 1 |
| `## Section` | Column | 3 |
| `### Card` | Content block | ∞ |
| `#tag-name` | Pill badge | ∞ |

## Styling #tailwind

- Dynamic grid: `grid-cols-{1|2|3}` based on column count
- 17 pastel tag colors, hash-assigned
- `word-break: break-all` on code/pre
- Tables: `table-layout: fixed`, `font-size: 0.85em`

## Distribution #build #npm

| Target | Tool | Output |
|--------|------|--------|
| Dev | Vite | `dist/` bundle |
| CLI | tsc | `dist/cli.js` |
| Publish | npm | `files: ["dist"]` |

## Key Decisions #history

| Version | Decision |
|---------|----------|
| v0.1.0 | Compile CLI to `dist/` for `npx sheetcheater` |
| v0.1.0 | Dynamic grid columns (no empty space) |
| v0.1.0 | Remove shadows, `@page { margin: 0 }` |
| v0.1.1 | Gray `<code>` bg, print-safe overflow handling |
