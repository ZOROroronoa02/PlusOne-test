// WCAG 2.1 contrast audit for the palettes in app/globals.css.
// Parses the file so the numbers can never drift from the shipped tokens.
//
//   node scripts/check-contrast.mjs        # report
//   node scripts/check-contrast.mjs --ci   # exit 1 on any failure
//
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const css = readFileSync(join(here, "..", "app", "globals.css"), "utf8");

const THEME_NAMES = ["paper", "pink", "periwinkle", "lime", "black"];
const NEEDED = ["bg", "ink", "muted", "line", "accent", "accent-ink", "panel", "panel-ink", "danger", "muted-on-panel", "line-on-panel"];

function readBlock(name) {
  const start =
    name === "paper"
      ? css.indexOf(':root,\n[data-theme="paper"]')
      : css.indexOf(`[data-theme="${name}"]`);
  if (start === -1) throw new Error(`No token block for theme "${name}"`);
  const open = css.indexOf("{", start);
  const close = css.indexOf("}", open);
  const body = css.slice(open + 1, close);
  const tokens = {};
  for (const line of body.split("\n")) {
    const m = line.match(/^\s*--([\w-]+):\s*(.+?);/);
    if (m) tokens[m[1]] = m[2].trim();
  }
  return tokens;
}

function parse(color) {
  if (color.startsWith("#")) {
    const hex = color.length === 4
      ? color.slice(1).split("").map((c) => c + c).join("")
      : color.slice(1);
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
      a: 1,
    };
  }
  const m = color.match(/^rgba?\(([^)]+)\)$/);
  if (!m) throw new Error(`Cannot parse colour: ${color}`);
  const parts = m[1].split(",").map((p) => parseFloat(p.trim()));
  return { r: parts[0], g: parts[1], b: parts[2], a: parts[3] ?? 1 };
}

const composite = (fg, bg) => ({
  r: fg.a * fg.r + (1 - fg.a) * bg.r,
  g: fg.a * fg.g + (1 - fg.a) * bg.g,
  b: fg.a * fg.b + (1 - fg.a) * bg.b,
  a: 1,
});

function luminance({ r, g, b }) {
  const channel = (v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const PAIRS = [
  ["ink", "bg", 4.5, "body text on the page"],
  ["muted", "bg", 4.5, "secondary text on the page"],
  ["danger", "bg", 4.5, "validation errors on the page"],
  ["accent-ink", "accent", 4.5, "button label on an accent button"],
  ["panel-ink", "panel", 4.5, "text on the dark slab"],
  ["muted-on-panel", "panel", 4.5, "secondary text on the dark slab"],
  ["line", "bg", 3, "dashed dividers / borders on the page"],
  ["line-on-panel", "panel", 3, "dividers on the dark slab"],
];

let failures = 0;
for (const name of THEME_NAMES) {
  const tokens = readBlock(name);
  const missing = NEEDED.filter((t) => !tokens[t]);
  if (missing.length) {
    console.log(`\n${name}: MISSING TOKENS -> ${missing.join(", ")}`);
    failures += missing.length;
    continue;
  }
  console.log(`\n${name}`);
  for (const [fgKey, bgKey, min, label] of PAIRS) {
    const bg = parse(tokens[bgKey]);
    const fg = composite(parse(tokens[fgKey]), bg);
    const value = ratio(fg, bg);
    const ok = value >= min;
    if (!ok) failures += 1;
    console.log(
      `  ${ok ? "PASS" : "FAIL"}  ${value.toFixed(2).padStart(6)} : 1  (min ${min})  ${label}`,
    );
  }
}

console.log(
  failures === 0
    ? "\nAll palettes pass their contrast targets.\n"
    : `\n${failures} contrast check${failures === 1 ? "" : "s"} failed.\n`,
);

if (process.argv.includes("--ci") && failures > 0) process.exit(1);
