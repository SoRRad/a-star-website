import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { RouteProgress } from "@/components/site/route-progress";
import { RoboticArmProgress } from "@/components/motion/robotic-arm-progress";
import { ScrollToTop } from "@/components/site/scroll-to-top";
import { CosmicBackground } from "@/components/cosmic/cosmic-background";
import { CursorGlow } from "@/components/cosmic/cursor-glow";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const sans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  /* Variable font — axes enable optical size and width variation.
   * Weight range is controlled by the axes; do not specify static weights. */
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.fullName}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "surgical AI",
    "surgical computer vision",
    "AI in surgery",
    "Mayo Clinic",
    "decision support",
    "surgical education",
    "MOSI",
    "SIRIS",
    "A-STAR",
    "surgical augmentation",
  ],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.fullName}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.tagline,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: [
      { url: "/logos/astar/favicon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/logos/astar/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#000814",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`dark ${sans.variable} ${mono.variable} ${display.variable}`}
    >
      {/* suppressHydrationWarning silences browser-extension attribute injections (e.g. Grammarly) */}
      <body suppressHydrationWarning className="relative isolate min-h-screen overflow-x-hidden font-sans antialiased">
        <Providers>
          <CosmicBackground />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[var(--color-foreground)] focus:px-4 focus:py-2 focus:text-[var(--color-background)]"
          >
            Skip to main content
          </a>
          <Suspense fallback={null}>
            <ScrollToTop />
          </Suspense>
          <RouteProgress />
          <RoboticArmProgress />
          <CursorGlow />
          <SiteHeader />
          <main id="main" className="relative z-10">
            {children}
          </main>
          <div className="relative z-10">
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
