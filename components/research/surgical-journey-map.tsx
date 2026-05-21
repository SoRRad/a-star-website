"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Phase } from "@/lib/phases";
import type { Project } from "@/lib/projects";
import type { Publication } from "@/lib/publications";
import { cn } from "@/lib/utils";

export function SurgicalJourneyMap({
  phases,
  projects,
  publications,
}: {
  phases: Phase[];
  projects: Project[];
  publications: Publication[];
}) {
  const [activeId, setActiveId] = React.useState(phases[0]?.id ?? "");
  const activePhase = phases.find((phase) => phase.id === activeId) ?? phases[0];
  const linkedProjects = projects.filter((project) => activePhase?.projects.includes(project.slug));
  const linkedPublications = publications.filter((publication) =>
    publication.projects.some((slug) => activePhase?.projects.includes(slug)),
  );

  if (!activePhase) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-card)]">
      <div className="relative grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-[420px] border-b border-[var(--color-border)] p-6 lg:border-b-0 lg:border-r">
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-40" aria-hidden="true">
            <defs>
              <linearGradient id="journey-line" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="0.75" />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M75 320 C165 120 315 90 450 160 S635 370 760 170"
              fill="none"
              stroke="url(#journey-line)"
              strokeWidth="1.5"
            />
            <path
              d="M90 120 C245 245 425 255 705 90"
              fill="none"
              stroke="var(--color-accent)"
              strokeDasharray="4 8"
              strokeOpacity="0.28"
            />
          </svg>

          <div className="relative z-10 mb-8 max-w-md">
            <p className="eyebrow mb-3">Interactive surgical journey</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              Four translational phases, one validation path.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
              Select a phase to see connected A-STAR projects, methods, applications, and publications.
            </p>
          </div>

          <div className="relative z-10 grid gap-4 sm:grid-cols-2">
            {phases.map((phase, index) => {
              const active = phase.id === activePhase.id;
              return (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => setActiveId(phase.id)}
                  className={cn(
                    "group relative min-h-32 rounded-lg border p-4 text-left transition-all",
                    active
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 shadow-[0_0_28px_rgb(66_165_245/0.12)]"
                      : "border-[var(--color-border)] bg-[var(--color-background)]/50 hover:border-[var(--color-accent)]/40",
                  )}
                >
                  <span
                    className={cn(
                      "mb-4 flex h-8 w-8 items-center justify-center rounded-full border font-mono text-[11px]",
                      active
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-foreground)]"
                        : "border-[var(--color-border)] text-[var(--color-accent)]",
                    )}
                  >
                    {phase.code}
                  </span>
                  <span className="block font-display text-lg font-semibold leading-tight tracking-tight">
                    {phase.title}
                  </span>
                  <span className="mt-2 block text-xs leading-relaxed text-[var(--color-muted-foreground)]">
                    {phase.description}
                  </span>
                  <span
                    className={cn(
                      "absolute right-4 top-4 h-2 w-2 rounded-full bg-[var(--color-accent)] transition-transform",
                      active ? "scale-125" : "opacity-50 group-hover:scale-125",
                    )}
                    style={{ boxShadow: active ? "0 0 18px var(--color-accent)" : undefined }}
                  />
                  <span className="sr-only">Select phase {index + 1}</span>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="p-6">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
            {activePhase.code}
          </p>
          <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight">
            {activePhase.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
            {activePhase.description}
          </p>

          <div className="mt-6">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted-foreground)]">
              Linked projects
            </p>
            {linkedProjects.length > 0 ? (
              <div className="space-y-2">
                {linkedProjects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="flex items-center justify-between gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-background)]/50 px-3 py-2.5 text-sm transition-colors hover:border-[var(--color-accent)]/40"
                  >
                    <span>
                      <span className="block font-semibold">{project.name}</span>
                      <span className="mt-0.5 block text-xs text-[var(--color-muted-foreground)]">
                        {project.tagline}
                      </span>
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="rounded-md border border-dashed border-[var(--color-border)] p-3 text-sm text-[var(--color-muted-foreground)]">
                No public project is listed for this phase yet.
              </p>
            )}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <InfoBlock
              label="Project methods"
              value={linkedProjects.length ? linkedProjects.map((project) => project.modelCard.modelPipeline).join(" ") : "Computer vision, perioperative modeling, and validation methods are being scoped for this phase."}
            />
            <InfoBlock
              label="Project applications"
              value={linkedProjects.length ? linkedProjects.map((project) => project.modelCard.intendedUse).join(" ") : "Future applications will be described after a project reaches public development status."}
            />
          </div>

          <div className="mt-6">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted-foreground)]">
              Related publications
            </p>
            {linkedPublications.length > 0 ? (
              <div className="space-y-2">
                {linkedPublications.slice(0, 3).map((publication) => (
                  <Link
                    key={publication.slug}
                    href={publication.url ?? "/publications"}
                    target={publication.url ? "_blank" : undefined}
                    rel={publication.url ? "noopener noreferrer" : undefined}
                    className="block text-sm leading-snug text-[var(--color-accent)] hover:underline"
                  >
                    {publication.title}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[var(--color-muted-foreground)]">
                Publications will appear here when they are linked to projects in this phase.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-background)]/50 p-3">
      <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
        {label}
      </p>
      <p className="text-xs leading-relaxed text-[var(--color-muted-foreground)]">{value}</p>
    </div>
  );
}
