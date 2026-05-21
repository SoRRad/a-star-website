"use client";

import { Reveal } from "@/components/motion/reveal";
import { ExploreMore } from "@/components/site/explore-more";
import { FeaturedProjects } from "@/components/lab/featured-projects";

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
          A-STAR maps AI research to surgical planning, intraoperative guidance,
          patient education, and validation, with each project grounded in a
          clinical question that matters to surgeons and patients.
        </p>
      </Reveal>

      <FeaturedProjects />

      <ExploreMore href="/research">Open the Projects page</ExploreMore>
    </>
  );
}
