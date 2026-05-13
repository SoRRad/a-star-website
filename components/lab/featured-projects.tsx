"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { projects } from "@/lib/projects";
import { phases } from "@/lib/phases";
import { statusBadgeVariants, statusLabels } from "@/lib/status";
import { cn } from "@/lib/utils";

/**
 * Featured project cards for MOSI and SIRIS.
 *
 * Each card shows: project name, tagline, phase tags, status badge, and a
 * placeholder visual. The visual will become micro-demos in Step 3.
 */
export function FeaturedProjects() {
  return (
    <div className="flex flex-col gap-6">
      {projects.map((project) => {
        const projectPhases = phases.filter((p) => project.phases.includes(p.id));
        return (
          <motion.div
            key={project.id}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] transition-colors hover:border-[var(--color-accent)]/40"
          >
            <div className="flex flex-col gap-8 p-8 lg:flex-row lg:items-center">
              {/* Left: text */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={cn(statusBadgeVariants({ status: project.status }))}>
                    {statusLabels[project.status]}
                  </span>
                  {projectPhases.map((p) => (
                    <span
                      key={p.id}
                      className="rounded-sm border border-[var(--color-border)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted-foreground)]"
                    >
                      {p.code} / {p.title}
                    </span>
                  ))}
                </div>

                <div>
                  <h3
                    className="font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-none tracking-tight"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    {project.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[var(--color-muted-foreground)]">
                    {project.fullName}
                  </p>
                </div>

                <p className="max-w-lg text-pretty leading-relaxed text-[var(--color-muted-foreground)]">
                  {project.description}
                </p>

                <Link
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-foreground)]"
                >
                  Open project
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              {/* Right: placeholder visual — becomes a micro-demo in Step 3 */}
              <div className="flex min-h-[180px] min-w-[240px] items-center justify-center rounded-lg border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-muted)] to-[var(--color-card)] lg:min-w-[280px]">
                {/* AIST mark watermark — replace with live demo in Step 3 */}
                <Image
                  src="/logos/aist-mark.png"
                  alt=""
                  aria-hidden="true"
                  width={56}
                  height={56}
                  className="opacity-10"
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
