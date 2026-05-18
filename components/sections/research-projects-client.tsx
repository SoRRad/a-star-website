"use client";

import { Reveal } from "@/components/motion/reveal";
import { ExploreMore } from "@/components/site/explore-more";
import { PhaseWheel } from "@/components/lab/phase-wheel";

export function ResearchProjectsClient() {
  return (
    <>
      <Reveal showMark>
        <p className="eyebrow mb-4">Projects</p>
        <h2
          className="font-display mb-4 max-w-xl text-balance text-3xl font-semibold tracking-tight lg:text-4xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          Intelligence across the surgical journey.
        </h2>
        <p className="mb-12 max-w-2xl text-pretty text-base leading-relaxed text-[var(--color-muted-foreground)]">
          A-STAR maps AI research to the four phases of surgical care — each phase
          grounded in clinical problems that matter to surgeons and patients.
        </p>
      </Reveal>

      <PhaseWheel />

      <ExploreMore href="/projects">Explore research and projects</ExploreMore>
    </>
  );
}
