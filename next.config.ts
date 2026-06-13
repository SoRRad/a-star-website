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
    const headers = [
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
      {
        // Report-only for now — observe before enforcing. Tighten and switch to
        // Content-Security-Policy once a reporting endpoint is in place.
        key: "Content-Security-Policy-Report-Only",
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: https:",
          "font-src 'self' data:",
          "connect-src 'self' https:",
          "frame-src 'self' https:",
        ].join("; "),
      },
    ];

    if (process.env.NODE_ENV === "production") {
      headers.push({
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      });
    }

    return [{ source: "/(.*)", headers }];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "static.wixstatic.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "opengraph.githubassets.com" },
    ],
  },
};

export default nextConfig;
