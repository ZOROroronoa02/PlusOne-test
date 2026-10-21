import type { NextConfig } from "next";

// Baseline hardening for every response. Deliberately no Content-Security-
// Policy: Next injects inline bootstrap scripts and we ship an inline
// no-flash theme script plus JSON-LD, so a meaningful policy needs nonces
// (out of scope for a static marketing site). The rest of these are free wins.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    // Kept conservative on purpose: add `includeSubDomains; preload` once you
    // have confirmed every subdomain of the domain is HTTPS-only, since both
    // are effectively irreversible for the max-age window.
    key: "Strict-Transport-Security",
    value: "max-age=63072000",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
