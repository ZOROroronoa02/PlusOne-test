# PlusOne

A production-ready marketing + booking site for a **100% platonic** companion
service ("rent a plus-one"): weddings, office parties, gigs, café hangouts and
virtual company. There is no backend in v1 — every booking flows through a
pre-filled WhatsApp deep link, confirmed by a human.

Built with Next.js 15 (App Router), React 19, Tailwind CSS v4 and TypeScript.

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in the two values
npm run dev                  # http://localhost:3000
```

### Environment

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | yes | Digits only with country code, e.g. `919876543210`. Non-digits are stripped at runtime, so `+91 98765 43210` also works. Falls back to a placeholder if unset. |
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical origin, e.g. `https://plusone.in`. Drives metadata, OpenGraph, sitemap and robots. Falls back to `https://plusone.in`. |

`NEXT_PUBLIC_*` values are inlined at **build time**, so set them in the
deployment environment before building (they are not read per-request).

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server. |
| `npm run build` | Production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | ESLint (flat config, `next/core-web-vitals` + `next/typescript`). |
| `npm run typecheck` | `tsc --noEmit`. |
| `npm run check:contrast` | Parses `app/globals.css` and fails if any of the 40 text/background pairs drops below WCAG AA. |
| `npm run audit:viewport` | Headless-Chrome audit for horizontal overflow across 11 routes × 8 widths (320–1440px). Needs a running server; pass a URL as the first arg. |

`audit:viewport` needs a Chrome/Edge binary — it checks `CHROME_PATH`, then the
usual Windows/macOS/Linux install paths.

## Editing content (no code required)

All copy, pricing, companions, FAQs, areas and reviews live in `content/`:

- `content/companions.ts` — the ad deck. Each card carries its own colour
  palette, so flipping ads morphs the whole site's theme.
- `content/pricing.ts`, `content/booking-options.ts` — rates and wizard options.
- `content/faq.ts`, `content/trust.ts`, `content/reviews.ts`, `content/areas.ts`.
- `content/blog/*.mdx` + `content/blog/posts.ts` — long-form posts.

Reviews are currently **sample data**: `REVIEWS_ARE_SAMPLES` in
`content/reviews.ts` renders a public "these are examples" note. Set it to
`false` once real reviews are in.

## Design system

Five palettes — Hot Pink, Periwinkle, Acid Lime, Stark Black, Paper (default) —
selected per `<html data-theme>`. The token contract (`--bg`, `--ink`, `--muted`,
`--line`, `--accent`, `--panel`, `--danger`, …) is defined in `app/globals.css`
and mirrored for the switcher UI in `lib/themes.ts`; keep the two in sync.

Fonts are Unbounded (display), Space Grotesk (body) and Space Mono (labels).
All three use `font-display: optional` on purpose — it makes CLS deterministic
at ~0 instead of re-wrapping headings when a webfont lands late. See the comment
in `app/layout.tsx` before changing it.

## Deployment

Shipping to Vercel needs no extra config: set the two env vars, point the
domain, deploy. Security headers (`X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy`, `Permissions-Policy`, basic HSTS) are set in `next.config.ts`.

`Strict-Transport-Security` deliberately omits `includeSubDomains; preload`,
since both are effectively irreversible for the max-age window — add them once
you have confirmed every subdomain is HTTPS-only.

## Known limitations

- No payment or booking persistence: WhatsApp is the system of record.
- `npm audit` reports 5 high advisories from the `braces → micromatch →
  fast-glob` chain under `@next/eslint-plugin-next`. They are dev-only and have
  no fix upstream yet.
