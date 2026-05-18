import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";
export const alt = `${siteConfig.name} — ${siteConfig.fullName}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  const markUrl = new URL("/logos/astar/astar-mark-dark.png", siteConfig.url).toString();

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
          <div
            style={{
              width: 64,
              height: 64,
              backgroundImage: `url(${markUrl})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
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
          {siteConfig.institution.name} · {siteConfig.institution.department}
        </div>
      </div>
    ),
    { ...size },
  );
}
