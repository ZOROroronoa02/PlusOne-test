# Contributing

## Setup

```bash
npm install
cp .env.example .env.local   # fill in the two values
npm run dev
```

## Before you claim done

```bash
npx tsc --noEmit
npm run lint
npm run build
npm run check:contrast
```

For layout changes also run `npm run audit:viewport http://localhost:3000`.

## Rules

- No palette hex in components; use CSS variables (`app/globals.css`). Keep
  `lib/themes.ts` in sync.
- No `any` / unused vars (flat ESLint config, `eslint .`).
- Booking CTAs go through `whatsappLink()` in `lib/site.ts`.
- Static pages call `canonical("/path")` from `lib/seo.ts`.
- Do not commit unless explicitly asked.

## Style

- Comments explain *why*, not *what*. No comments restating code.
- Prefer `next/link` and shared `btn` classes.
- Match existing component patterns before adding new ones.
