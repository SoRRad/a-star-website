"use client";

import { Reveal } from "@/components/motion/reveal";
import { ExploreMore } from "@/components/site/explore-more";
import { FeaturedProjects } from "@/components/lab/featured-projects";

export function ResearchProjectsClient() {
  return (
    <>
      <Reveal showMark>
        <p className="eyebrow mb-5">Projects</p>
        <h2
          className="heading-xl mb-5 max-w-2xl text-balance text-white"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
        >
          From clinical questions to validated systems.
        </h2>
        <p className="mb-14 max-w-2xl text-base leading-relaxed text-pretty text-white/60">
          Each A-STAR project begins with a surgical problem, then moves through data curation,
          model development, validation, and translational planning. The portfolio highlights
          focused examples of how AI can support safer surgery, better education, and more
          measurable outcomes.
        </p>
      </Reveal>

      <FeaturedProjects />

      <ExploreMore href="/research">Open the Projects page</ExploreMore>
    </>
  );
}
