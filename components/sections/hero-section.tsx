"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Magnetic } from "@/components/motion/magnetic";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const reduced = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, ease: EASE_OUT, delay },
  });

  const fadeIn = (delay: number) => ({
    initial: reduced ? { opacity: 1 } : { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.9, ease: EASE_OUT, delay },
  });

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Stellar core glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[45%] h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
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
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pb-24 lg:pt-28">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-0">

          {/* LEFT: text column ~58% — order-2 on mobile so logo appears above on small screens */}
          <div className="order-2 flex-1 lg:order-1 lg:pr-12">
            {/* Eyebrow */}
            <motion.div
              {...fadeUp(0)}
              className="mb-8 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#64B5F6]/50" />
              <p className="eyebrow">AI in Surgical Technology &amp; Augmentation Research</p>
            </motion.div>

            {/* Headline */}
            <h1 className="text-left" style={{ fontSize: "clamp(3rem, 6.5vw, 6.5rem)" }}>
              <motion.span
                {...fadeUp(0.08)}
                className="heading-heavy block text-[var(--color-text-primary)] leading-[0.95]"
              >
                Augmenting
              </motion.span>
              <motion.span
                {...fadeUp(0.18)}
                className="heading-heavy block text-[var(--color-text-primary)] leading-[0.95]"
              >
                the surgeon.
              </motion.span>
              <motion.span
                {...fadeUp(0.3)}
                className="heading-thin block text-[#64B5F6] leading-[1.05] mt-3"
                style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)" }}
              >
                Advancing the science.
              </motion.span>
            </h1>

            {/* Subheadline */}
            <motion.p
              {...fadeUp(0.44)}
              className="text-lead mt-8 max-w-xl"
            >
              A-STAR develops surgical AI systems for planning, intraoperative guidance, patient
              education, and rigorous outcomes validation across the full surgical journey.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fadeUp(0.56)}
              className="mt-10 flex flex-wrap items-center gap-3"
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
            </motion.div>
          </div>

          {/* RIGHT: large logo column ~42% — order-1 on mobile (shows above text) */}
          <motion.div
            {...fadeIn(0.2)}
            className="relative order-1 flex w-full items-center justify-center lg:order-2 lg:w-[42%] lg:justify-end"
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
            <motion.div
              initial={reduced ? {} : { opacity: 0, scale: 0.88, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.25 }}
              className="relative"
            >
              <Image
                src="/logos/astar/astar-mark-on-dark.png"
                alt="A-STAR mark"
                width={320}
                height={320}
                priority
                className="h-48 w-48 object-contain sm:h-64 sm:w-64 lg:h-72 lg:w-72 xl:h-80 xl:w-80"
                style={{ opacity: 0.88 }}
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
