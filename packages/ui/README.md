# @mini-ui/core (package)

This folder contains the `@mini-ui/core` package sources and package-level information.

Quick overview
- Package entry: `packages/ui/src/index.ts`
- Package tsconfig: `packages/ui/tsconfig.json`
- Output: `packages/ui/dist/` (bundles and type declarations)
- Peer dependencies: `react`, `react-dom`

Build and develop

From the package directory (works if you want only type-check/build via tsc):

```powershell
cd packages/ui
npm install           # if you haven't installed dev deps yet
npm run build         # runs `tsc --build` (package's package.json)
npm run dev           # runs `tsc -w` for incremental typechecking
```

From the repository root (recommended — runs the repo `tsup` config to produce bundles + types):

```powershell
npm run build:ui      # builds the package with tsup (bundles + .d.ts files)
```

Notes
- The repo-level `tsup.config.ts` is configured to build `packages/ui/src/index.ts` and to use `packages/ui/tsconfig.json` so running `npm run build` or `npm run build:ui` from the repo root will produce the final `dist/` artifacts (CJS, ESM, CSS, and d.ts files).
- `packages/ui/package.json` currently uses `tsc --build` for its own `build` script (produces declarations based on `packages/ui/tsconfig.json`). Use the repo-level script when you want the full bundles.
- Example consumer app is in `examples/next/` — use it to manually test SSR and theming.

Publishing
- Before publishing, bump the version in `packages/ui/package.json` (if you plan to publish independently).
- Ensure `files` in `packages/ui/package.json` includes `dist` (or adjust per your publishing strategy).

API summary
-----------

This package exports the following public symbols from `packages/ui/src`:

- `Theme` / `ColorSet` / `defaultLightTheme` / `defaultDarkTheme` / `createTheme` (from `theme`)
	- Types and helpers for building themes. Use `createTheme(partial)` to merge custom values with the defaults.
	- Example:

```tsx
import { createTheme, defaultLightTheme } from '@mini-ui/core';

const myTheme = createTheme({
	colors: { primary: '#ff0066' },
}, defaultLightTheme);
```

- `cssVarsFromTheme(theme)` and `generateCssVarsStyleTag(theme)` (from `ssr`)
	- Helpers to turn a `Theme` into CSS custom properties for SSR injection or client-side embedding.
	- Example (SSR):

```js
import { generateCssVarsStyleTag } from '@mini-ui/core';
const styleTag = generateCssVarsStyleTag(myTheme);
// inject into your HTML <head>
```

- `ThemeProvider` and `useTheme` (from `ThemeProvider` / `useTheme`)
	- `ThemeProvider` wraps your app and injects CSS variables; supports `colorScheme` (`light` | `dark` | `auto`), `enableSystem`, and persisting choice in localStorage.
	- `useTheme()` returns `{ theme, colorScheme, setTheme, setColorScheme, toggleColorScheme }`.
	- Example:

```tsx
import { ThemeProvider, useTheme } from '@mini-ui/core';

function App() {
	return (
		<ThemeProvider>
			<MyApp />
		</ThemeProvider>
	);
}

function Example() {
	const { colorScheme, toggleColorScheme } = useTheme();
	return <button onClick={toggleColorScheme}>Toggle ({colorScheme})</button>;
}
```

- `Box` (from `components/Box`)
	- Primitive layout component. Props: `as`, `p, px, py, m, display, w, h, bg, color, style`, plus native HTML attributes.
	- Example: <Box as="section" p="16px" bg="--ui-color-surface"> … </Box>

- `Button` (from `components/Buttons`)
	- `Button` component with `variant` (`solid` | `ghost` | `outline` | `link`), `size` (`xs` | `sm` | `md` | `lg`), `color`, `loading`, `leftIcon`, `rightIcon`.
	- Example:

```tsx
import { Button } from '@mini-ui/core';

<Button variant="solid" size="md" onClick={() => {}}>Click me</Button>
```

Development checklist (contributors)
-----------------------------------

Before opening a PR, run these steps locally:

1. Install dependencies from the repo root:

```powershell
npm install
```

2. Run typecheck and tests (if any):

```powershell
npm run typecheck
```

3. Build the package to ensure bundling and d.ts generation succeed:

```powershell
npm run build:ui
```

4. Run the example app to manually verify UI and SSR behavior (`examples/next`):

```powershell
cd examples/next
npm install
npm run dev
```

5. Lint / format your changes (if you have configured ESLint/Prettier in repo).

6. Commit with clear message and open a PR against `main`. Include a brief summary of the change and any manual test steps.

Publish steps (automated guidance)
--------------------------------

Use these steps when you're ready to publish `@mini-ui/core` to npm.

From the repo root (recommended — ensures the repo tsup config is used):

```powershell
# 1) Build bundles + types
npm run build:ui

# 2) (Optional) Update the package version
cd packages/ui
npm version patch   # or minor/major as appropriate

# 3) Publish (make sure you are logged in to npm and have access)
npm publish --access public
```

Notes:
- Verify `packages/ui/package.json` `files` includes `dist` so the published package contains the built artifacts.
- If you publish from the package folder, ensure `dist/` exists in `packages/ui/dist` (tsup places dist output at repo root `dist/` by default unless you change paths).
- For repeatable, CI-driven publishing, configure your CI to run `npm run build:ui`, then publish the package folder with the built `dist/` included.

If you'd like, I can also add a small GitHub Actions workflow that builds the package and publishes on tagged releases — shall I scaffold that next?
