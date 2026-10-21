import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const css = readFileSync(resolve(root, "app/globals.css"), "utf8");
const ts = readFileSync(resolve(root, "lib/themes.ts"), "utf8");

const themes = ["paper", "pink", "periwinkle", "lime", "black"];
let failed = false;

for (const name of themes) {
  const blockMatch = css.match(
    new RegExp(`\\[data-theme="${name}"\\][^}]*\\{([^}]*)\\}`, "s"),
  );
  if (!blockMatch) {
    console.error(`MISSING css block for ${name}`);
    failed = true;
    continue;
  }
  const block = blockMatch[1];
  const getVar = (v) => {
    const m = block.match(new RegExp(`${v}:\\s*(#[0-9A-Fa-f]{3,8})`));
    return m ? m[1].toUpperCase() : null;
  };
  const cssBg = getVar("--bg");
  const cssInk = getVar("--ink");
  const cssAccent = getVar("--accent");

  const tsBlock = ts.match(new RegExp(`${name}:\\s*\\{([\\s\\S]*?)\\n  \\},`, "m"));
  if (!tsBlock) {
    console.error(`MISSING ts block for ${name}`);
    failed = true;
    continue;
  }
  const body = tsBlock[1];
  const getTs = (key) => {
    const m = body.match(new RegExp(`${key}:\\s*"(#[0-9A-Fa-f]{3,8})"`));
    return m ? m[1].toUpperCase() : null;
  };
  const tsBg = getTs("bg");
  const tsInk = getTs("ink");
  const tsAccent = getTs("accent");
  const tsSwatch = getTs("swatch");

  const pairs = [
    ["bg", cssBg, tsBg],
    ["ink", cssInk, tsInk],
    ["accent", cssAccent, tsAccent],
  ];
  for (const [label, a, b] of pairs) {
    if (a && b && a !== b) {
      console.error(`${name}: ${label} drift css=${a} ts=${b}`);
      failed = true;
    }
  }
  if (tsSwatch && cssBg && tsSwatch !== cssBg) {
    console.error(`${name}: swatch drift swatch=${tsSwatch} cssBg=${cssBg}`);
    failed = true;
  }
}

if (failed) {
  console.error("themes sync check FAILED");
  process.exit(1);
} else {
  console.log("themes sync check passed");
}
