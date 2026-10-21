"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_THEME,
  isThemeName,
  THEME_ORDER,
  THEME_STORAGE_KEY,
  type ThemeName,
} from "@/lib/themes";

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (theme: ThemeName, options?: { persist?: boolean }) => void;
  /** cycle to the next palette in the brand order */
  nextTheme: () => void;
  ready: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const MORPH_MS = 320;

function readStoredTheme(): ThemeName | null {
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeName(raw) ? raw : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: ThemeName, animate: boolean) {
  const root = document.documentElement;
  if (animate) {
    root.classList.add("theme-morph");
    window.setTimeout(() => root.classList.remove("theme-morph"), MORPH_MS);
  }
  root.setAttribute("data-theme", theme);
}

export function ThemeProvider({
  children,
  initialTheme = DEFAULT_THEME,
}: {
  children: ReactNode;
  initialTheme?: ThemeName;
}) {
  const [theme, setThemeState] = useState<ThemeName>(initialTheme);
  const [ready, setReady] = useState(false);
  const firstRun = useRef(true);
  const skipPersist = useRef(false);

  // Hydrate from localStorage on mount and align the attribute, in case the
  // inline no-flash script could not run (e.g. JS disabled storage).
  useEffect(() => {
    const stored = readStoredTheme();
    if (stored) {
      setThemeState(stored);
      setReady(true);
      return;
    }
    // No saved choice: honour the OS preference (PURE-style auto mode) so
    // dark-mode users don't get a flash of the paper palette.
    try {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setThemeState("black");
      }
    } catch {
      /* matchMedia unavailable — keep default */
    }
    setReady(true);
  }, []);

  // Push the theme to <html> whenever it changes.
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      applyTheme(theme, false);
      return;
    }
    applyTheme(theme, true);

    // Transient palettes (e.g. the ad deck cycling per ad) must not overwrite
    // the visitor's saved choice.
    if (skipPersist.current) {
      skipPersist.current = false;
      return;
    }
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* storage unavailable (private mode) — palette still works for the tab */
    }
  }, [theme]);

  const setTheme = useCallback(
    (next: ThemeName, options?: { persist?: boolean }) => {
      skipPersist.current = options?.persist === false;
      setThemeState(next);
    },
    [],
  );

  const nextTheme = useCallback(() => {
    setThemeState((current) => {
      const index = THEME_ORDER.indexOf(current);
      return THEME_ORDER[(index + 1) % THEME_ORDER.length];
    });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, nextTheme, ready }),
    [theme, setTheme, nextTheme, ready],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }
  return ctx;
}
