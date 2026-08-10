import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const repoRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: repoRoot,
  // Canonical route redirects — /research is the primary projects page
  async redirects() {
    return [
      { source: "/projects", destination: "/research", permanent: true },
      { source: "/news", destination: "/events", permanent: true },
      { source: "/resources", destination: "/events", permanent: true },
      { source: "/resources/glossary", destination: "/events", permanent: true },
      { source: "/join", destination: "/contact#collaborate", permanent: true },
    ];
  },
  // Security headers applied to every route. MOSI/SIRIS are linked out to (target="_blank"),
  // not embedded via iframe, so X-Frame-Options: SAMEORIGIN is safe here.
  async headers() {
    const isProduction = process.env.NODE_ENV === "production";

    const headers = [
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
      {
        // Enforced. Every directive here is one this site provably cannot violate:
        // there are no <form>s, no <base>, no plugins, and nothing embeds the site
        // in a frame. Kept separate from the report-only policy below so the strict
        // parts take effect now instead of waiting on the script-src rollout.
        key: "Content-Security-Policy",
        value: [
          "base-uri 'self'",
          "object-src 'none'",
          "form-action 'self'",
          "frame-ancestors 'self'",
        ].join("; "),
      },
      {
        // Report-only while the script-src story is settled. 'unsafe-inline' is still
        // required by Next's hydration bootstrap and the corporate-safe detect script;
        // moving to a nonce is the remaining step before this can be enforced.
        // img-src/connect-src are scoped to what the site actually uses — all images
        // are local, so no remote hosts are permitted.
        key: "Content-Security-Policy-Report-Only",
        value: [
          "default-src 'self'",
          // 'unsafe-eval' is only needed by the dev-mode React refresh runtime.
          isProduction
            ? "script-src 'self' 'unsafe-inline'"
            : "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob:",
          "font-src 'self' data:",
          "connect-src 'self'",
          "frame-src 'none'",
          "worker-src 'self' blob:",
        ].join("; "),
      },
    ];

    if (isProduction) {
      headers.push({
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      });
    }

    return [{ source: "/(.*)", headers }];
  },
};

export default nextConfig;
