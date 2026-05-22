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
          Intelligence across the surgical journey.
        </h2>
        <p className="mb-14 max-w-2xl text-base leading-relaxed text-pretty text-white/60">
          A-STAR maps AI research to surgical planning, intraoperative guidance, patient education,
          and validation — each project grounded in a clinical question that matters to surgeons and
          patients.
        </p>
      </Reveal>

      <FeaturedProjects />

      <ExploreMore href="/research">Open the Projects page</ExploreMore>
    </>
  );
}
