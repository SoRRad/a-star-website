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

/**
 * Static signature panel for projects without media assets. Echoes the
 * vocabulary of the interactive demo on the project page (MOSI staging,
 * SIRIS education chat) so the card previews what the project actually does.
 */
function ProjectSignature({ slug }: { slug: string }) {
  if (slug === "mosi") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none min-h-[180px] select-none rounded-lg border border-white/10 bg-[#000a18]/80 p-4"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
            Severity stage
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
            M3 · O2
          </span>
        </div>
        <div className="mt-2.5 grid grid-cols-4 gap-1.5">
          {[
            { label: "I", color: "#34d399", dim: true },
            { label: "II", color: "#38bdf8", dim: false },
            { label: "III", color: "#fbbf24", dim: true },
            { label: "IV", color: "#fb7185", dim: true },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div
                className="h-1.5 rounded-full"
                style={{ backgroundColor: s.color, opacity: s.dim ? 0.35 : 1 }}
              />
              <p
                className="mt-1.5 font-mono text-[10px]"
                style={{ color: s.dim ? "rgb(255 255 255 / 0.35)" : "rgb(255 255 255 / 0.85)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-1.5">
          {[
            ["Tier B target", "≥ 15% TWL"],
            ["Procedure review", "SG / RYGB"],
            ["Validation", "3,097 patients"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between text-[11px]">
              <span className="text-white/45">{k}</span>
              <span className="font-mono tabular-nums text-white/75">{v}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 border-t border-white/[0.07] pt-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#64B5F6]/70">
          Interactive preview on project page
        </p>
      </div>
    );
  }

  if (slug === "siris") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none min-h-[180px] select-none rounded-lg border border-white/10 bg-[#000a18]/80 p-4"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
          Patient education
        </span>
        <div className="mt-3 space-y-2.5">
          <div className="ml-auto w-fit max-w-[85%] rounded-lg rounded-br-sm bg-[#64B5F6]/15 px-3 py-1.5 text-[11px] leading-snug text-white/80">
            How do I prepare the week before surgery?
          </div>
          <div className="w-fit max-w-[90%] rounded-lg rounded-bl-sm border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] leading-snug text-white/60">
            Your pre-surgery checklist covers diet, medications, and what to bring...
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Pre-op diet guide", "Questions for your team"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-[#64B5F6]/25 bg-[#64B5F6]/[0.06] px-2 py-0.5 text-[10px] text-[#64B5F6]/85"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-4 border-t border-white/[0.07] pt-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#64B5F6]/70">
          Interactive preview on project page
        </p>
      </div>
    );
  }

  return (
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
  );
}

export function FeaturedProjects() {
  const homepageProjects = projects
    .filter((project) => project.featured)
    .sort((a, b) => a.order - b.order);

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
                  <ProjectSignature slug={project.slug} />
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
