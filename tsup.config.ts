// packages/ui/tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
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
