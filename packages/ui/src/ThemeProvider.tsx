// packages/ui/src/ThemeProvider.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Theme } from './theme';
import { defaultLightTheme, defaultDarkTheme } from './theme';
import { cssVarsFromTheme } from './ssr';

type ColorScheme = 'light' | 'dark' | 'auto';
type ThemeContextValue = {
  theme: Theme;
  colorScheme: 'light' | 'dark';
  setTheme: (t: Theme) => void;
  setColorScheme: (s: ColorScheme) => void;
  toggleColorScheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export type ThemeProviderProps = {
  theme?: Theme;
  colorScheme?: ColorScheme;
  enableSystem?: boolean;
  storageKey?: string;
  children?: React.ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme: initialTheme,
  colorScheme = 'auto',
  enableSystem = true,
  storageKey = 'ui:color-scheme',
  children,
}) => {
  const baseLight = defaultLightTheme;
  const baseDark = defaultDarkTheme;

  const [userScheme, setUserScheme] = useState<ColorScheme>(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem(storageKey) : null;
      return (stored as ColorScheme) || colorScheme || 'auto';
    } catch {
      return colorScheme;
    }
  });

  const systemPrefersDark = (() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  })();

  const effectiveScheme: 'light' | 'dark' =
    userScheme === 'auto' ? (enableSystem && systemPrefersDark ? 'dark' : 'light') : (userScheme as 'light' | 'dark');

  const [theme, setThemeState] = useState<Theme>(() => {
    if (initialTheme) return initialTheme;
    return effectiveScheme === 'dark' ? baseDark : baseLight;
  });

  // ensure theme updates when scheme changes (client)
  useEffect(() => {
    const newTheme = effectiveScheme === 'dark' ? baseDark : baseLight;
    setThemeState((prev) => ({ ...newTheme, ...(initialTheme ?? {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveScheme, initialTheme]);

  // inject css vars into head (client)
  useEffect(() => {
    const id = 'ui-theme-vars';
    let el = document.getElementById(id) as HTMLStyleElement | null;
    const css = cssVarsFromTheme(theme);
    if (!el) {
      el = document.createElement('style');
      el.id = id;
      el.setAttribute('data-ui-theme', 'true');
      el.innerHTML = css;
      document.head.appendChild(el);
    } else {
      if (el.innerHTML !== css) el.innerHTML = css;
    }
  }, [theme]);

  // persist user choice
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, userScheme);
    } catch {
      // ignore
    }
  }, [userScheme, storageKey]);

  const value = useMemo(
    () => ({
      theme,
      colorScheme: effectiveScheme,
      setTheme: setThemeState,
      setColorScheme: (s: ColorScheme) => setUserScheme(s),
      toggleColorScheme: () =>
        setUserScheme((prev) => (prev === 'dark' ? 'light' : prev === 'light' ? 'dark' : systemPrefersDark ? 'light' : 'dark')),
    }),
    [theme, effectiveScheme, systemPrefersDark],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useThemeProviderContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeProviderContext must be used within ThemeProvider');
  return ctx;
}
