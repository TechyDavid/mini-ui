// packages/ui/src/useTheme.tsx
import { useThemeProviderContext } from './ThemeProvider';

export function useTheme() {
  const ctx = useThemeProviderContext();
  return {
    theme: ctx.theme,
    colorScheme: ctx.colorScheme,
    setTheme: ctx.setTheme,
    setColorScheme: ctx.setColorScheme,
    toggleColorScheme: ctx.toggleColorScheme,
  };
}
