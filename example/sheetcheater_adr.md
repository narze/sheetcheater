# ADR: SheetCheater CLI Distribution

## Context #architecture #npm

### Problem #decision

SheetCheater's CLI was written in TypeScript and relied on Bun's native TS execution (`bun run src/cli.ts`). This meant:

- `npx sheetcheater` would fail for users without Bun installed
- Node.js users couldn't run the CLI at all
- The package wasn't publishable to npm in its original state

### Goals

- Make CLI runnable via `npx sheetcheater` without Bun
- Keep the dev workflow fast (Bun native TS during development)
- Support both `bun run src/cli.ts` (dev) and `npx sheetcheater` (users)

## Decision

### Compiled CLI to `dist/` #build #typescript

- Created `tsconfig.cli.json` to compile CLI source (`cli.ts`, `parser.ts`, `renderer.ts`, `types.ts`) from `src/` → `dist/`
- Changed shebang from `#!/usr/bin/env bun` to `#!/usr/bin/env node`
- Set `package.json` `bin` entry to `dist/cli.js`
- Added `"files": ["dist"]` to whitelist npm publish contents

### Build Pipeline

```bash
npm run build:cli  # tsc -p tsconfig.cli.json && chmod +x dist/cli.js
```

### Dual Usage

| Mode | Command | Runtime |
|------|---------|---------|
| Dev | `bun run src/cli.ts` | Bun (native TS) |
| Users | `npx sheetcheater` | Node.js (compiled JS) |

## Consequences #trade-offs

### Positive

- `npx sheetcheater` works for any Node.js user
- Dev workflow unchanged (still Bun native TS)
- Fast iteration: `tsc` compiles CLI in ~1s

### Negative

- Extra build step before publishing (`npm run build:cli`)
- `dist/` must be kept in sync with `src/` changes
- `tsconfig.cli.json` needed (slight config overhead)

## Status

**Accepted** — implemented in v0.1.0

## References

- `tsconfig.cli.json` — CLI-specific TS config
- `package.json` — `bin`, `files`, `build:cli` script
- `src/cli.ts` — CLI entry with Node shebang
