import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { logos } from "@/lib/logos";
import { siteConfig } from "@/lib/site-config";

// Node runtime, not edge: the image has no per-request inputs, so Next renders it
// once at build time and serves a static PNG. It also lets the mark be read from
// disk. It used to be fetched over HTTP from siteConfig.url, which falls back to
// localhost:3000 and fails behind Vercel preview protection, dropping the logo.
export const alt = `${siteConfig.name} · ${siteConfig.fullName}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const mark = await readFile(join(process.cwd(), "public", logos.markLight));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "80px",
          background: "linear-gradient(135deg, #061632 0%, #0a2150 60%, #061632 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Subtle grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(30,136,229,0.06) 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(30,136,229,0.06) 80px)",
          }}
        />

        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 600,
            height: 400,
            background: "radial-gradient(ellipse at top right, rgba(30,136,229,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Lab name */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders <img>, not next/image */}
          <img src={markSrc} width={64} height={64} alt="" style={{ objectFit: "contain" }} />
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#f1f5f9",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {siteConfig.name}
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 54,
            fontWeight: 700,
            color: "#f1f5f9",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            maxWidth: 800,
          }}
        >
          {siteConfig.tagline}
        </div>

        <div
          style={{
            marginTop: 18,
            fontSize: 24,
            color: "#93c5fd",
            lineHeight: 1.25,
          }}
        >
          {siteConfig.fullName}
        </div>

        {/* Institution */}
        <div
          style={{
            marginTop: 32,
            fontSize: 18,
            color: "#64748b",
            letterSpacing: "0.05em",
          }}
        >
          {`${siteConfig.institution.name} · ${siteConfig.institution.department}`}
        </div>
      </div>
    ),
    { ...size },
  );
}
