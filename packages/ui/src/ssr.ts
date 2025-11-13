// packages/ui/src/ssr.ts
import type { Theme } from './theme';

export function cssVarsFromTheme(theme: Theme): string {
  const lines: string[] = [];
  // colors
  for (const [k, v] of Object.entries(theme.colors)) {
    lines.push(`--ui-color-${k}: ${v};`);
  }
  // spacing
  for (const [k, v] of Object.entries(theme.space)) {
    lines.push(`--ui-space-${k}: ${v};`);
  }
  for (const [k, v] of Object.entries(theme.radii)) {
    lines.push(`--ui-radius-${k}: ${v};`);
  }
  lines.push(`--ui-font-body: ${theme.fonts.body};`);
  lines.push(`--ui-font-heading: ${theme.fonts.heading};`);
  // breakpoints as vars
  for (const [k, v] of Object.entries(theme.breakpoints)) {
    lines.push(`--ui-breakpoint-${k}: ${v};`);
  }
  return `:root{${lines.join('')}}`;
}

/** Return a style tag string you can inject into SSR HTML head */
export function generateCssVarsStyleTag(theme: Theme): string {
  const css = cssVarsFromTheme(theme);
  return `<style data-ui-theme>${css}</style>`;
}
