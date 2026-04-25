# Agent Instructions

This project uses **Vite+** with **Bun** as the runtime and package manager.

## Commands

- `vp install` — install dependencies (auto-detects Bun from `bun.lock`)
- `vp dev` — start Vite dev server
- `vp build` — type-check and build for production
- `vp preview` — preview production build
- `vp check` — run format, lint, and type checks
- `bun run src/cli.ts <input.md> [output.html]` — run CLI directly (Bun only)
- `npx sheetcheater <input.md> [output.html]` — run CLI via npx (Node, after publish or local build)
- `bun run build:cli` — compile CLI to `dist/` for publishing

## Stack

- **Runtime / Package Manager**: Bun (native TypeScript support, no tsx needed)
- **Toolchain**: Vite+ (wraps Vite, Rolldown, Vitest, Oxlint, Oxfmt)
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite`
- **Markdown parser**: `markdown-it`

## Notes for Agents

- Use `vp` for package management and Vite+ built-in commands (`vp dev`, `vp build`, `vp check`).
- Use `bun run <script>` or `bun run src/cli.ts` for TypeScript execution — Bun runs TS natively.
- Import from `vite-plus` in config files.
