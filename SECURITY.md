# Security

## Reporting

Report vulnerabilities privately to the project maintainer. Do not open public
issues for security problems.

## Scope notes

- No backend, auth, or payment persistence in v1. Bookings flow through
  WhatsApp deep links; the chat is the system of record.
- `NEXT_PUBLIC_*` values are inlined at build time and shipped to the client.
  Do not put secrets in them.
- Security headers are set in `next.config.ts`. `Strict-Transport-Security`
  intentionally omits `includeSubDomains; preload` until all subdomains are
  confirmed HTTPS-only.
