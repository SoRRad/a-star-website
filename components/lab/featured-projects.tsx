"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { projects } from "@/lib/projects";
import { phases } from "@/lib/phases";
import { StatusPipeline } from "@/components/lab/status-pipeline";
import { ProjectMediaCard } from "@/components/lab/project-media";
import { logos } from "@/lib/logos";

export function FeaturedProjects() {
  const homepageProjects = projects.filter((project) => project.slug === "gonogonet");

  return (
    <div className="flex flex-col gap-6">
      {homepageProjects.map((project) => {
        const projectPhases = phases.filter((p) =>
          project.phases.includes(p.id as (typeof project.phases)[number]),
        );
        return (
          <motion.div
            key={project.slug}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="card-glass card-glow group relative overflow-hidden rounded-xl"
          >
            <Image
              src={logos.markNeutral}
              alt=""
              aria-hidden="true"
              width={120}
              height={120}
              className="pointer-events-none absolute -top-4 -right-4 h-32 w-32 opacity-[0.04] select-none"
            />

            <div className="flex flex-col gap-8 p-6 lg:flex-row lg:items-center lg:p-8">
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusPipeline status={project.status} />
                  {projectPhases.map((p) => (
                    <span
                      key={p.id}
                      className="rounded-sm border border-white/10 px-2 py-0.5 font-mono text-[10px] tracking-widest text-white/50 uppercase"
                    >
                      {p.code} / {p.title}
                    </span>
                  ))}
                </div>

                <div>
                  <h3
                    className="heading-xl leading-none text-white"
                    style={{ fontSize: "clamp(2.25rem, 4vw, 3.5rem)" }}
                  >
                    {project.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-white/50">{project.longName}</p>
                </div>

                <p className="max-w-lg leading-relaxed text-pretty text-white/65">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#64B5F6] transition-colors hover:text-white"
                  >
                    Open project
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 transition-colors hover:text-white"
                    >
                      Live tool
                    </a>
                  )}
                </div>
              </div>

              <div className="min-w-[240px] lg:min-w-[280px]">
                {project.media?.[0] ? (
                  <ProjectMediaCard media={project.media[0]} compact />
                ) : (
                  <div className="flex min-h-[180px] items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                    <Image
                      src={logos.markNeutral}
                      alt=""
                      aria-hidden="true"
                      width={56}
                      height={56}
                      className="opacity-10"
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
