'use strict';

var React2 = require('react');
var jsxRuntime = require('react/jsx-runtime');
require('./styles-JF6KF7YO.css');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React2__default = /*#__PURE__*/_interopDefault(React2);

// packages/ui/src/theme.ts
var defaultLightTheme = {
  name: "light",
  colors: {
    background: "#ffffff",
    surface: "#fbfbfd",
    text: "#0f172a",
    muted: "#64748b",
    primary: "#2563eb",
    primaryText: "#ffffff"
  },
  space: {
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "20px",
    "6": "24px"
  },
  radii: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    round: "9999px"
  },
  fonts: {
    body: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    heading: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial'
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px"
  }
};
var defaultDarkTheme = {
  ...defaultLightTheme,
  name: "dark",
  colors: {
    background: "#0b1220",
    surface: "#0f1724",
    text: "#e6eef8",
    muted: "#98a6bf",
    primary: "#3b82f6",
    primaryText: "#0b1220"
  }
};
function createTheme(partial = {}, base = defaultLightTheme) {
  return deepMerge(base, partial);
}
function deepMerge(a, b) {
  if (!b) return a;
  const out = Array.isArray(a) ? [...a] : { ...a };
  for (const k of Object.keys(b)) {
    const av = a[k];
    const bv = b[k];
    if (bv && typeof bv === "object" && !Array.isArray(bv)) {
      out[k] = deepMerge(av != null ? av : {}, bv);
    } else {
      out[k] = bv;
    }
  }
  return out;
}

// packages/ui/src/ssr.ts
function cssVarsFromTheme(theme) {
  const lines = [];
  for (const [k, v] of Object.entries(theme.colors)) {
    lines.push(`--ui-color-${k}: ${v};`);
  }
  for (const [k, v] of Object.entries(theme.space)) {
    lines.push(`--ui-space-${k}: ${v};`);
  }
  for (const [k, v] of Object.entries(theme.radii)) {
    lines.push(`--ui-radius-${k}: ${v};`);
  }
  lines.push(`--ui-font-body: ${theme.fonts.body};`);
  lines.push(`--ui-font-heading: ${theme.fonts.heading};`);
  for (const [k, v] of Object.entries(theme.breakpoints)) {
    lines.push(`--ui-breakpoint-${k}: ${v};`);
  }
  return `:root{${lines.join("")}}`;
}
function generateCssVarsStyleTag(theme) {
  const css = cssVarsFromTheme(theme);
  return `<style data-ui-theme>${css}</style>`;
}
var ThemeContext = React2.createContext(void 0);
var ThemeProvider = ({
  theme: initialTheme,
  colorScheme = "auto",
  enableSystem = true,
  storageKey = "ui:color-scheme",
  children
}) => {
  const baseLight = defaultLightTheme;
  const baseDark = defaultDarkTheme;
  const [userScheme, setUserScheme] = React2.useState(() => {
    try {
      const stored = typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;
      return stored || colorScheme || "auto";
    } catch {
      return colorScheme;
    }
  });
  const systemPrefersDark = (() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  })();
  const effectiveScheme = userScheme === "auto" ? enableSystem && systemPrefersDark ? "dark" : "light" : userScheme;
  const [theme, setThemeState] = React2.useState(() => {
    if (initialTheme) return initialTheme;
    return effectiveScheme === "dark" ? baseDark : baseLight;
  });
  React2.useEffect(() => {
    const newTheme = effectiveScheme === "dark" ? baseDark : baseLight;
    setThemeState((prev) => ({ ...newTheme, ...initialTheme != null ? initialTheme : {} }));
  }, [effectiveScheme, initialTheme]);
  React2.useEffect(() => {
    const id = "ui-theme-vars";
    let el = document.getElementById(id);
    const css = cssVarsFromTheme(theme);
    if (!el) {
      el = document.createElement("style");
      el.id = id;
      el.setAttribute("data-ui-theme", "true");
      el.innerHTML = css;
      document.head.appendChild(el);
    } else {
      if (el.innerHTML !== css) el.innerHTML = css;
    }
  }, [theme]);
  React2.useEffect(() => {
    try {
      localStorage.setItem(storageKey, userScheme);
    } catch {
    }
  }, [userScheme, storageKey]);
  const value = React2.useMemo(
    () => ({
      theme,
      colorScheme: effectiveScheme,
      setTheme: setThemeState,
      setColorScheme: (s) => setUserScheme(s),
      toggleColorScheme: () => setUserScheme((prev) => prev === "dark" ? "light" : prev === "light" ? "dark" : systemPrefersDark ? "light" : "dark")
    }),
    [theme, effectiveScheme, systemPrefersDark]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(ThemeContext.Provider, { value, children });
};
function useThemeProviderContext() {
  const ctx = React2.useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeProviderContext must be used within ThemeProvider");
  return ctx;
}

// packages/ui/src/useTheme.tsx
function useTheme() {
  const ctx = useThemeProviderContext();
  return {
    theme: ctx.theme,
    colorScheme: ctx.colorScheme,
    setTheme: ctx.setTheme,
    setColorScheme: ctx.setColorScheme,
    toggleColorScheme: ctx.toggleColorScheme
  };
}
var Box = ({ as = "div", children, style, p, px, py, m, display, w, h, bg, color, ...rest }) => {
  const Tag = as;
  const resolvedStyle = {
    padding: p,
    paddingLeft: px != null ? px : void 0,
    paddingRight: px != null ? px : void 0,
    paddingTop: py != null ? py : void 0,
    paddingBottom: py != null ? py : void 0,
    margin: m,
    display,
    width: w,
    height: h,
    background: bg ? `var(${bg})` : void 0,
    color: color ? `var(${color})` : void 0,
    ...style
  };
  return /* @__PURE__ */ jsxRuntime.jsx(Tag, { style: resolvedStyle, ...rest, children });
};
var Button = React2__default.default.forwardRef(
  ({ variant = "solid", size = "md", color = "var(--ui-color-primary)", loading, leftIcon, rightIcon, children, ...rest }, ref) => {
    const className = `ui-btn ui-btn--${variant} ui-btn--${size}`;
    const style = {
      // allow using CSS variables or raw colors
      ["--ui-btn-bg-color"]: color
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("button", { ref, className, style, disabled: rest.disabled || loading, ...rest, children: [
      loading ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ui-btn__spinner", "aria-hidden": true }) : leftIcon ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ui-btn__icon", children: leftIcon }) : null,
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ui-btn__label", children }),
      rightIcon ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ui-btn__icon", children: rightIcon }) : null
    ] });
  }
);
Button.displayName = "Button";

exports.Box = Box;
exports.Button = Button;
exports.ThemeProvider = ThemeProvider;
exports.createTheme = createTheme;
exports.cssVarsFromTheme = cssVarsFromTheme;
exports.defaultDarkTheme = defaultDarkTheme;
exports.defaultLightTheme = defaultLightTheme;
exports.generateCssVarsStyleTag = generateCssVarsStyleTag;
exports.useTheme = useTheme;
exports.useThemeProviderContext = useThemeProviderContext;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map