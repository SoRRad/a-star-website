import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";

// Entrance timings were Framer `initial`/`animate` props. They are CSS animations now
// (.anim-* in globals.css) so the hero paints and animates without waiting for
// hydration, and stays visible if the bundle never arrives.

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Stellar core glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[45%] left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(30,136,229,0.11) 0%, rgba(30,136,229,0.03) 45%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Diagnostic scan line */}
      <div
        aria-hidden="true"
        className="animate-scan-line pointer-events-none absolute inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(100,181,246,0.10) 20%, rgba(100,181,246,0.28) 50%, rgba(100,181,246,0.10) 80%, transparent 100%)",
          willChange: "transform",
        }}
      />

      {/* Asymmetric two-column layout */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-24 pb-20 sm:px-6 lg:px-8 lg:pt-28 lg:pb-24">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-0">
          {/* LEFT: text column ~58% — order-2 on mobile so logo appears above on small screens */}
          <div className="order-2 flex-1 lg:order-1 lg:pr-12">
            {/* Eyebrow */}
            <div
              className="anim-fade-up mb-8 flex items-center gap-3"
              style={{ animationDelay: "0s" }}
            >
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#64B5F6]/50" />
              <p className="eyebrow">AI in Surgical Technology &amp; Augmentation Research</p>
            </div>

            {/* Headline */}
            <h1 className="text-left" style={{ fontSize: "clamp(3rem, 6.5vw, 6.5rem)" }}>
              <span
                className="anim-fade-up heading-heavy block leading-[0.95] text-[var(--color-text-primary)]"
                style={{ animationDelay: "0.08s" }}
              >
                Augmenting
              </span>
              <span
                className="anim-fade-up heading-heavy block leading-[0.95] text-[var(--color-text-primary)]"
                style={{ animationDelay: "0.18s" }}
              >
                the surgeon.
              </span>
              <span
                className="anim-fade-up heading-thin mt-3 block leading-[1.05] text-[#64B5F6]"
                style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)", animationDelay: "0.3s" }}
              >
                Advancing the science.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="anim-fade-up text-lead mt-8 max-w-xl" style={{ animationDelay: "0.44s" }}>
              A-STAR develops surgical AI systems for planning, intraoperative guidance, patient
              education, and rigorous outcomes validation across the full surgical journey.
            </p>

            {/* CTAs */}
            <div
              className="anim-fade-up mt-10 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "0.56s" }}
            >
              <Magnetic>
                <Link href="/research" className="btn-primary group animate-glow-pulse">
                  Explore research
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/team" className="btn-ghost">
                  Meet the team
                </Link>
              </Magnetic>
            </div>
          </div>

          {/* RIGHT: large logo column ~42% — order-1 on mobile (shows above text) */}
          <div
            className="anim-fade-in relative order-1 flex w-full items-center justify-center lg:order-2 lg:w-[42%] lg:justify-end"
            style={{ animationDelay: "0.2s" }}
            aria-hidden="true"
          >
            {/* Halo behind logo */}
            <div
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 55% 50%, rgba(30,136,229,0.18) 0%, rgba(30,136,229,0.05) 45%, transparent 70%)",
                filter: "blur(32px)",
              }}
            />
            <div className="anim-logo-in relative" style={{ animationDelay: "0.25s" }}>
              <Image
                src="/logos/astar/astar-mark-on-dark.png"
                alt=""
                width={320}
                height={320}
                priority
                className="h-48 w-48 object-contain sm:h-64 sm:w-64 lg:h-72 lg:w-72 xl:h-80 xl:w-80"
                style={{ opacity: 0.88 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
