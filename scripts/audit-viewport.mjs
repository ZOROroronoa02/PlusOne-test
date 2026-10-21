// Horizontal-overflow audit. Loads every route at a set of viewport widths
// inside real Chrome and reports any element that pushes past the viewport
// (the "content is wider than the screen" class of mobile bug).
//
//   node scripts/audit-viewport.mjs [baseUrl]
//
// Requires: npm run build && npm run start (or pass a URL).
import { launch } from "puppeteer-core";
import { existsSync } from "node:fs";

const BASE = process.argv[2] ?? "http://localhost:3210";
const WIDTHS = [320, 360, 375, 390, 414, 768, 1024, 1440];
const ROUTES = [
  "/",
  "/ads",
  "/book",
  "/pricing",
  "/trust",
  "/faq",
  "/reviews",
  "/areas",
  "/join",
  "/blog",
  "/blog/what-actually-happens-in-a-first-session",
];

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean);

const executablePath = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!executablePath) {
  console.error("No Chrome/Edge binary found. Set CHROME_PATH.");
  process.exit(1);
}

const browser = await launch({
  executablePath,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

let problems = 0;
const page = await browser.newPage();

for (const route of ROUTES) {
  for (const width of WIDTHS) {
    await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle0", timeout: 45000 });
    // Let reveal/motion settle so measured positions are final.
    await new Promise((r) => setTimeout(r, 350));

    const result = await page.evaluate(() => {
      // The site sets overflow-x:hidden on <body>, which can hide genuine
      // overflow from scrollWidth. Force it visible so we measure the truth.
      document.documentElement.style.overflowX = "visible";
      document.body.style.overflowX = "visible";

      const docWidth = document.documentElement.scrollWidth;
      const viewWidth = document.documentElement.clientWidth;
      const offenders = [];
      if (docWidth > viewWidth + 1) {
        for (const el of Array.from(document.querySelectorAll("body *"))) {
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 && rect.height === 0) continue;
          const style = getComputedStyle(el);
          if (style.position === "fixed") continue;
          if (rect.right > viewWidth + 1 || rect.left < -1) {
            offenders.push({
              tag: el.tagName.toLowerCase(),
              cls: (el.className || "").toString().slice(0, 90),
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              text: (el.textContent || "").trim().slice(0, 40),
            });
          }
        }
      }
      return { docWidth, viewWidth, offenders: offenders.slice(0, 6) };
    });

    const overflow = result.docWidth - result.viewWidth;
    if (overflow > 1) {
      problems += 1;
      console.log(
        `\nOVERFLOW  ${route} @ ${width}px  (document ${result.docWidth}px, +${overflow}px)`,
      );
      for (const o of result.offenders) {
        console.log(
          `   <${o.tag} class="${o.cls}">  x:[${o.left}..${o.right}]  "${o.text}"`,
        );
      }
    }
  }
}

await browser.close();

console.log(
  problems === 0
    ? `\nNo horizontal overflow across ${ROUTES.length} routes x ${WIDTHS.length} widths.\n`
    : `\n${problems} viewport/route combination(s) overflow horizontally.\n`,
);
process.exit(problems === 0 ? 0 : 1);
