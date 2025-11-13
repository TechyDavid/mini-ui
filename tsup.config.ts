// packages/ui/tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  // repo layout places package sources under `packages/ui/src`
  // when running `npm run build` from the repo root tsup's cwd is the repo root,
  // so make the entry an explicit path to the package source.
  entry: ['packages/ui/src/index.ts'],
  // Use the package-local tsconfig so dts generation and include paths
  // resolve correctly (root tsconfig includes `src` which doesn't exist
  // at repo root for this layout).
  tsconfig: 'packages/ui/tsconfig.json',
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  minify: false,
  external: ['react', 'react-dom'],
  injectStyle: false,
  treeshake: true,
  outDir: 'dist',
  // Mark CSS as side effect so it’s bundled properly
  loader: {
    '.css': 'copy',
  },
  esbuildOptions(options) {
    options.define = { 'process.env.NODE_ENV': '"production"' };
  },
});
