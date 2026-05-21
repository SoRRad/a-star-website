"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[42%] h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(30,136,229,0.15) 0%, transparent 60%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 pb-16 pt-20 text-center sm:px-6">
        <div className="mx-auto mb-10 w-[260px] sm:mb-12 sm:w-[340px]">
          <Image
            src="/logos/astar/astar-stacked-on-dark.png"
            alt="A-STAR"
            width={720}
            height={780}
            priority
            sizes="(max-width: 640px) 260px, 340px"
            className="h-auto w-full object-contain drop-shadow-[0_0_28px_rgba(100,181,246,0.18)]"
          />
        </div>

        <h1 className="font-display text-balance text-5xl font-semibold tracking-normal text-white sm:text-7xl">
          Augmenting the surgeon.
          <br />
          <span className="text-[#64B5F6]">Advancing the science.</span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-white/70">
          AI in Surgical Technology &amp; Augmentation Research develops surgical AI
          systems for planning, guidance, education, and validation.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <Link
              href="/research"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-all hover:border-[#64B5F6] hover:bg-[#64B5F6]/10"
            >
              Explore research
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/team"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              Meet the team
            </Link>
          </Magnetic>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-white/40">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
