"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Deep radial glow — stellar core */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[40%] h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(30,136,229,0.13) 0%, rgba(30,136,229,0.04) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Diagnostic scan line — surgical feel */}
      <div
        aria-hidden="true"
        className="animate-scan-line pointer-events-none absolute inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(100,181,246,0.12) 20%, rgba(100,181,246,0.3) 50%, rgba(100,181,246,0.12) 80%, transparent 100%)",
        }}
      />

      {/* Subtle grid — depth texture */}
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.3]"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 pb-20 pt-24 text-center sm:px-6">
        {/* Logo — smaller, sharper */}
        <div className="animate-fade-up mx-auto mb-14 w-[160px] sm:w-[200px]">
          <Image
            src="/logos/astar/astar-stacked-on-dark.png"
            alt="A-STAR"
            width={720}
            height={780}
            priority
            sizes="(max-width: 640px) 160px, 200px"
            className="h-auto w-full object-contain drop-shadow-[0_0_40px_rgba(100,181,246,0.25)]"
          />
        </div>

        {/* Eyebrow tag */}
        <div className="animate-fade-up-1 mb-8 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#64B5F6]/50" />
          <p className="eyebrow">AI in Surgical Technology &amp; Augmentation Research</p>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#64B5F6]/50" />
        </div>

        {/* Main headline — editorial bold */}
        <h1
          className="animate-fade-up-2 heading-display text-balance text-white"
          style={{ fontSize: "clamp(3.25rem, 7.5vw, 7rem)" }}
        >
          Augmenting the surgeon.
          <br />
          <span className="text-[#64B5F6]">Advancing the science.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lead animate-fade-up-3 mx-auto mt-8 max-w-2xl">
          A-STAR develops surgical AI systems for planning, intraoperative guidance, patient
          education, and rigorous outcomes validation — across the full surgical journey.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up-4 mt-12 flex flex-wrap items-center justify-center gap-4">
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
            Scroll
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
