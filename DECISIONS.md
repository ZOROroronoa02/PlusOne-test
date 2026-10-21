# Decisions

Architecture Decision Record log for PlusOne. Newest first. Each entry records
*why* a choice was made, not just what. Supersedes earlier entries when noted.

## 2026-10-21 â€” WhatsApp is the system of record (no backend in v1)

- **Status:** Accepted
- **Context:** Need bookings without payment/persistence infra; solo operator.
- **Decision:** Every booking flows through a pre-filled WhatsApp deep link
  (`lib/site.ts` â†’ `whatsappLink()`). No DB, no API routes, no auth.
- **Consequences:** Zero infra cost and dead-simple ops; no automated
  confirmation, no payment capture, no audit trail beyond chat history.
- **Revisit when:** Booking volume or no-show rate makes manual confirmation
  unsustainable.

## 2026-10-21 â€” `font-display: optional` for all webfonts

- **Status:** Accepted
- **Context:** Measured CLS ~0.21 on the article page with `swap`.
- **Decision:** Use `display: "optional"` for Unbounded / Space Grotesk / Space
  Mono (see `app/layout.tsx`).
- **Consequences:** No late reflow; first-time visitors may see fallback fonts
  for the whole session. Do not revert without re-measuring CLS.

## 2026-10-21 â€” Palette tokens live in CSS, mirrored in TS

- **Status:** Accepted
- **Context:** Five palettes selected via `<html data-theme>`; switcher UI needs
  the same values.
- **Decision:** Canonical tokens in `app/globals.css`; mirror in `lib/themes.ts`.
  `scripts/check-contrast.mjs` audits only `globals.css`.
- **Consequences:** Two sources of truth â€” keep in sync manually. Drift in
  `themes.ts` passes the audit but fails in browser.

## 2026-10-21 â€” Currency glyph via local `PlusOneCurrency` face

- **Status:** Accepted
- **Context:** The rupee sign otherwise pulls ~144KB of latin-ext webfonts.
- **Decision:** `--font-display/body/mono` each prefixed with `PlusOneCurrency`
  (see comment in `app/globals.css`). Do not drop it or point a var at itself
  (cycle silently drops text to the system stack).

