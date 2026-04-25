# ADR: SheetCheater

## Product

### What #basics

Markdown → A4 cheatsheet. 3-column HTML, auto tags, print-optimized.

### Principles #philosophy

- **Print-first** — A4 PDF drives all design
- **Convention over config** — rigid `#`/`##`/`###` hierarchy
- **Zero deps** — self-contained HTML, Tailwind CDN
- **Fast dev** — Bun native TS

## Stack

### Layers #toolchain

| Layer | Choice | Why |
|-------|--------|-----|
| Runtime | Bun | Native TS, fast CLI |
| Bundler | Vite | HMR, ESM |
| Styling | Tailwind v4 | CDN-friendly |
| Parser | markdown-it | Token-based |
| Language | TypeScript | Type safety |

## Pipeline

### Flow #data

```
input.md → tokens → JSON → HTML
```

### Parser #parser

- `#` title, `##` column, `###` card
- `#tag-name` via regex

### Renderer #renderer

- Pure functions, Tailwind CDN
- A4: `210mm × 297mm`
- Print: shadows stripped

## Decisions

### Key #history

- **v0.1.0** — Compiled CLI for `npx sheetcheater`
- **v0.1.0** — Dynamic grid, no shadows
- **v0.1.1** — Code bg, word-break fixes
