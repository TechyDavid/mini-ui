# mini-ui

Minimal React UI library (monorepo-style layout).

How to build

From the repository root (PowerShell):

```powershell
npm run build:ui
```

This runs `tsup` with the repo `tsup.config.ts` which is configured to build the package entry at `packages/ui/src/index.ts` and emit `dist/` with bundles and type declarations.

If you prefer the default `build` script, it already runs `tsup` and will also build the package because the tsup config points at the package entry.

Notes
- Use `npm run dev` for a watch build.
- Run `npm run typecheck` to run `tsc --noEmit`.
