# AGENTS.md

Working notes for any agent (or human) editing this repo. `README.md` covers
what the project is; this file covers how to work in it safely.

## Verify before you claim done

Run these and make sure they pass:

```bash
npx tsc --noEmit
npm run lint
npm run build
npm run check:contrast
```

For layout changes, also build + serve and run the overflow audit:

```bash
npm run build
npm run start                       # port 3000
npm run audit:viewport http://localhost:3000
```

`check:contrast` and `audit:viewport` are the two custom guards that catch the
bugs most likely to be introduced here (palette contrast drift, mobile
overflow). They are cheap — run them.

## Layout of the code

- `app/` — routes. `page.tsx` per route; `globals.css` holds **all** design
  tokens; `layout.tsx` holds fonts, theme bootstrap, header/footer.
- `components/` — presentational components; `components/book/` and
  `components/ads/` hold the wizard and the ad deck.
- `content/` — all copy and data. Prefer editing here over hard-coding strings.
- `lib/` — `site.ts` (env + WhatsApp links), `seo.ts` (metadata + JSON-LD
  helpers), `themes.ts` (palette mirror for the switcher), `booking.ts`,
  `format.ts`, `blog.tsx`.

## Rules that are easy to break

1. **Never hard-code a palette hex in a component.** Use the CSS variables in
   `globals.css`. If a subtree needs a different palette, put `data-theme` on it
   (see `components/review-wall.tsx`) so the *audited* tokens apply.
2. **Keep `lib/themes.ts` in sync with `globals.css`.** `check:contrast` only
   reads `globals.css`; a drifting hex in `themes.ts` will pass the audit and
   still fail in the browser.
3. **Fonts use `display: "optional"` intentionally.** It is what holds CLS at
   ~0. Changing it to `swap` reintroduces reflow (measured 0.21 CLS on the
   article page).
4. **`--font-display` / `--font-body` / `--font-mono` must point at
   `--font-unbounded` / `--font-space-grotesk` / `--font-space-mono`** (each
   prefixed with the local `PlusOneCurrency` face that carries `₹`). Pointing
   one at itself is a cycle that silently drops text to the system stack.
   Dropping `PlusOneCurrency` from a stack pulls ~144KB of latin-ext webfonts
   back in for the currency symbol — see the comment in `globals.css`.
5. **Canonicals**: static pages call `canonical("/path")` from `lib/seo.ts`.
   New routes should do the same.
6. **`overflow-wrap: break-word` on headings** and the wrapping flex rows exist
   to survive 320px. Don't remove them without re-running `audit:viewport`.
7. **No `any`/unused vars** — ESLint is the flat config in `eslint.config.mjs`
   (`eslint .`), not `next lint`.

## Environment & shell notes (Windows)

- Shell is PowerShell 5.1. `&&` is not supported — use `cmd1; if ($?) { cmd2 }`.
- `$home` is read-only; name variables `$homePage` etc.
- Do not pass JS with backslashes to `node -e` from PowerShell; write a script
  file instead (this bit us repeatedly).
- Temporary probe scripts belong in `scripts/_probe-*.mjs` and **must be deleted
  before finishing** — `scripts/` should contain only `check-contrast.mjs` and
  `audit-viewport.mjs`.

## Conventions

- Comments explain *why*, not *what*. Match the existing voice.
- No comments that restate the code.
- Prefer `next/link` and the shared `btn` classes over ad-hoc buttons.
- Booking CTAs always go through `whatsappLink()` so nothing becomes a dead end.
- `git`: do not commit unless explicitly asked.
