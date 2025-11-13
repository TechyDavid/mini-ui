// packages/ui/src/theme.ts
export type ColorSet = {
  background: string;
  surface: string;
  text: string;
  muted: string;
  primary: string;
  primaryText: string;
};

export type Theme = {
  name?: string;
  colors: ColorSet;
  space: Record<string, string>;
  radii: Record<string, string>;
  fonts: { body: string; heading: string; mono?: string };
  breakpoints: { sm: string; md: string; lg: string; xl: string };
  // extend as needed
};

export const defaultLightTheme: Theme = {
  name: 'light',
  colors: {
    background: '#ffffff',
    surface: '#fbfbfd',
    text: '#0f172a',
    muted: '#64748b',
    primary: '#2563eb',
    primaryText: '#ffffff',
  },
  space: {
    '1': '4px',
    '2': '8px',
    '3': '12px',
    '4': '16px',
    '5': '20px',
    '6': '24px',
  },
  radii: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    round: '9999px',
  },
  fonts: {
    body: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    heading: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

export const defaultDarkTheme: Theme = {
  ...defaultLightTheme,
  name: 'dark',
  colors: {
    background: '#0b1220',
    surface: '#0f1724',
    text: '#e6eef8',
    muted: '#98a6bf',
    primary: '#3b82f6',
    primaryText: '#0b1220',
  },
};

export function createTheme(partial: Partial<Theme> = {}, base: Theme = defaultLightTheme): Theme {
  return deepMerge(base, partial);
}

function deepMerge<T>(a: T, b: Partial<T>): T {
  if (!b) return a;
  const out: any = Array.isArray(a) ? [...(a as any)] : { ...(a as any) };
  for (const k of Object.keys(b) as (keyof typeof b)[]) {
    const av = (a as any)[k];
    const bv = (b as any)[k];
    if (bv && typeof bv === 'object' && !Array.isArray(bv)) {
      out[k] = deepMerge(av ?? {}, bv);
    } else {
      out[k] = bv;
    }
  }
  return out as T;
}
