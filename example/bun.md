# Bun Cheatsheet

## Scripts

### Run #cli #basics

- `bun run dev` — run dev script from package.json
- `bun run src/cli.ts` — run TypeScript directly
- `bun --watch src/index.ts` — run with watch mode
- `bun --hot src/index.ts` — hot reload

### Install #cli

- `bun install` — install dependencies
- `bun add lodash` — add dependency
- `bun add -d typescript` — add dev dependency
- `bun remove lodash` — remove dependency

## Testing

### Runner #test

- `bun test` — run tests
- `bun test --watch` — watch mode
- `bun test file.test.ts` — single file
- `bun test --coverage` — with coverage

## Bundler

### Build #cli #build

- `bun build src/index.ts --outdir dist` — bundle to directory
- `bun build src/index.ts --outfile dist/bundle.js` — single file
- `bun build --target node` — target Node.js
- `bun build --target bun` — target Bun runtime

### Flags #cli

- `--minify` — minify output
- `--splitting` — enable code splitting
- `--sourcemap` — generate source maps
- `--format esm` — ESM output
