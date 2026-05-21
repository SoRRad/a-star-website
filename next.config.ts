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
  // Allow embedding GitHub Pages projects (MOSI) and Cloud Run apps (SIRIS) via iframe
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
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
