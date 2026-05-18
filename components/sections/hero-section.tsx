"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { siteConfig } from "@/lib/site-config";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const markScale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const taglineOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section ref={heroRef} className="relative isolate min-h-[90vh] overflow-hidden">
      <div
        className="animate-nebula absolute left-1/2 top-0 -z-10 h-[700px] w-[1100px] rounded-full opacity-10 dark:opacity-20"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, #3b82f6 0%, #6366f1 45%, transparent 70%)",
          transform: "translate(-50%, -25%)",
          filter: "blur(48px)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute left-[30%] top-[20%] -z-10 h-[400px] w-[600px] rounded-full opacity-5 dark:opacity-10"
        style={{
          background: "radial-gradient(ellipse at center, #1e88e5 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" aria-hidden="true" />

      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 pb-32 pt-20 text-center sm:px-6 sm:pt-28 lg:px-8">
        <motion.div style={{ scale: markScale }} className="relative mt-4 flex justify-center">
          <div
            className="pointer-events-none absolute inset-0 -z-10 hidden rounded-full dark:block"
            style={{
              background: "radial-gradient(circle, rgba(66,165,245,0.3) 0%, rgba(30,136,229,0.12) 42%, transparent 70%)",
              filter: "blur(28px)",
              transform: "scale(1.8)",
            }}
            aria-hidden="true"
          />
          <Logo
            variant="mark"
            animated
            priority
            width={120}
            height={120}
            sizes="(max-width: 640px) 96px, 128px"
            className="h-24 w-24 sm:h-32 sm:w-32"
          />
        </motion.div>

        <Reveal delay={0.15}>
          <p className="eyebrow mt-7">{siteConfig.name}</p>
        </Reveal>

        <motion.h1
          className="font-display mt-5 text-balance font-semibold leading-[0.95]"
          style={{ opacity: taglineOpacity, fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          {siteConfig.tagline}
        </motion.h1>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-8 max-w-2xl text-pretty text-base leading-relaxed text-[var(--color-muted-foreground)] sm:text-lg">
            AI in Surgical Technology &amp; Augmentation Research develops surgical AI
            systems for planning, guidance, education, and validation.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <Magnetic>
              <Button asChild variant="accent" size="lg">
                <a
                  href="#research"
                  onClick={(event) => {
                    event.preventDefault();
                    document.getElementById("research")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Explore Research
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild variant="outline" size="lg">
                <Link href="/team">Meet the Team</Link>
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
