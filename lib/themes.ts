export type ThemeName = "paper" | "pink" | "periwinkle" | "lime" | "black";

export interface ThemeDefinition {
  /** value written to <html data-theme> */
  name: ThemeName;
  /** human label for the switcher */
  label: string;
  /** the dot colour shown in the switcher */
  swatch: string;
  /** background hex — mirrors `--bg` in globals.css, used by previews */
  bg: string;
  /** foreground hex — mirrors `--ink` in globals.css */
  ink: string;
  /** accent hex — mirrors `--accent` in globals.css */
  accent: string;
}

/**
 * The five brand palettes. CSS variable definitions live in `app/globals.css`
 * under the matching `[data-theme="..."]` selector — this file only holds the
 * bits the switcher UI needs, so the two stay in sync by name.
 */
export const THEMES: Record<ThemeName, ThemeDefinition> = {
  pink: {
    name: "pink",
    label: "Hot Pink",
    swatch: "#FF2E88",
    bg: "#FF2E88",
    ink: "#0A0A0A",
    accent: "#C6F432",
  },
  periwinkle: {
    name: "periwinkle",
    label: "Periwinkle",
    swatch: "#6E62E5",
    bg: "#6E62E5",
    // Mirrors `--ink` in globals.css: periwinkle is a mid-tone, so only pure
    // white clears 4.5:1 here.
    ink: "#FFFFFF",
    accent: "#C6F432",
  },
  lime: {
    name: "lime",
    label: "Acid Lime",
    swatch: "#C6F432",
    bg: "#C6F432",
    ink: "#0A0A0A",
    accent: "#FF2E88",
  },
  black: {
    name: "black",
    label: "Stark Black",
    swatch: "#0A0A0A",
    bg: "#0A0A0A",
    ink: "#F4F1EA",
    accent: "#FF2E88",
  },
  paper: {
    name: "paper",
    label: "Paper",
    swatch: "#F4F1EA",
    bg: "#F4F1EA",
    ink: "#0A0A0A",
    accent: "#FF2E88",
  },
};

export const THEME_ORDER: ThemeName[] = [
  "pink",
  "periwinkle",
  "lime",
  "black",
  "paper",
];

export const DEFAULT_THEME: ThemeName = "paper";

export const THEME_STORAGE_KEY = "plusone:theme";

export function isThemeName(value: unknown): value is ThemeName {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(THEMES, value)
  );
}
