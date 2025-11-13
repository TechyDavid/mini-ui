import React from 'react';

type ColorSet = {
    background: string;
    surface: string;
    text: string;
    muted: string;
    primary: string;
    primaryText: string;
};
type Theme = {
    name?: string;
    colors: ColorSet;
    space: Record<string, string>;
    radii: Record<string, string>;
    fonts: {
        body: string;
        heading: string;
        mono?: string;
    };
    breakpoints: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
};
declare const defaultLightTheme: Theme;
declare const defaultDarkTheme: Theme;
declare function createTheme(partial?: Partial<Theme>, base?: Theme): Theme;

declare function cssVarsFromTheme(theme: Theme): string;
/** Return a style tag string you can inject into SSR HTML head */
declare function generateCssVarsStyleTag(theme: Theme): string;

type ColorScheme = 'light' | 'dark' | 'auto';
type ThemeContextValue = {
    theme: Theme;
    colorScheme: 'light' | 'dark';
    setTheme: (t: Theme) => void;
    setColorScheme: (s: ColorScheme) => void;
    toggleColorScheme: () => void;
};
type ThemeProviderProps = {
    theme?: Theme;
    colorScheme?: ColorScheme;
    enableSystem?: boolean;
    storageKey?: string;
    children?: React.ReactNode;
};
declare const ThemeProvider: React.FC<ThemeProviderProps>;
declare function useThemeProviderContext(): ThemeContextValue;

declare function useTheme(): {
    theme: Theme;
    colorScheme: "light" | "dark";
    setTheme: (t: Theme) => void;
    setColorScheme: (s: "light" | "dark" | "auto") => void;
    toggleColorScheme: () => void;
};

type BoxProps = React.HTMLAttributes<HTMLElement> & {
    as?: React.ElementType;
    p?: string;
    px?: string;
    py?: string;
    m?: string;
    display?: React.CSSProperties['display'];
    w?: string;
    h?: string;
    bg?: string;
    color?: string;
    style?: React.CSSProperties;
};
declare const Box: React.FC<BoxProps>;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'solid' | 'ghost' | 'outline' | 'link';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    color?: string;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
};
declare const Button: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "solid" | "ghost" | "outline" | "link";
    size?: "xs" | "sm" | "md" | "lg";
    color?: string;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
} & React.RefAttributes<HTMLButtonElement>>;

export { Box, Button, type ButtonProps, type ColorSet, type Theme, ThemeProvider, type ThemeProviderProps, createTheme, cssVarsFromTheme, defaultDarkTheme, defaultLightTheme, generateCssVarsStyleTag, useTheme, useThemeProviderContext };
