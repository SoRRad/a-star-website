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
          className="font-display mb-4 max-w-xl text-3xl font-semibold tracking-normal text-balance lg:text-4xl"
          style={{ letterSpacing: "0" }}
        >
          Intelligence across the surgical journey.
        </h2>
        <p className="mb-12 max-w-2xl text-base leading-relaxed text-pretty text-white/70">
          A-STAR maps AI research to surgical planning, intraoperative guidance, patient education,
          and validation, with each project grounded in a clinical question that matters to surgeons
          and patients.
        </p>
      </Reveal>

      <FeaturedProjects />

      <ExploreMore href="/research">Open the Projects page</ExploreMore>
    </>
  );
}
