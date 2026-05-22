"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Phase } from "@/lib/phases";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function SurgicalJourneyMap({
  phases,
  projects,
}: {
  phases: Phase[];
  projects: Project[];
}) {
  const [activeId, setActiveId] = React.useState(phases[0]?.id ?? "");
  const activePhase = phases.find((phase) => phase.id === activeId) ?? phases[0];
  const exampleSystems = projects.filter((project) => activePhase?.projects.includes(project.slug));

  if (!activePhase) return null;

  const methodSummary = exampleSystems.length
    ? exampleSystems.map((project) => project.modelCard.modelPipeline).join(" ")
    : "Methods are scoped around the clinical risk, workflow, education, or validation question for this phase.";

  const outputSummary = exampleSystems.length
    ? exampleSystems.map((project) => project.modelCard.output.join(", ")).join("; ")
    : "Outputs are defined only after the clinical question and validation path are clear.";

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-card)]">
      <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[380px] border-b border-[var(--color-border)] p-6 lg:border-b-0 lg:border-r">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-35"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="journey-line" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="0.75" />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M75 300 C165 120 315 90 450 160 S635 350 760 150"
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
            <h2 className="font-display text-3xl font-semibold tracking-normal">
              Four phases, one validation path.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
              Select a phase to see the focus, methods, example systems, and validation outputs.
            </p>
          </div>

          <div className="relative z-10 grid gap-3 sm:grid-cols-2">
            {phases.map((phase, index) => {
              const active = phase.id === activePhase.id;
              return (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => setActiveId(phase.id)}
                  className={cn(
                    "group relative min-h-28 rounded-lg border p-4 text-left transition-all",
                    active
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 shadow-[0_0_28px_rgb(66_165_245/0.12)]"
                      : "border-[var(--color-border)] bg-[var(--color-background)]/50 hover:border-[var(--color-accent)]/40",
                  )}
                >
                  <span
                    className={cn(
                      "mb-3 flex h-8 w-8 items-center justify-center rounded-full border font-mono text-[11px]",
                      active
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-foreground)]"
                        : "border-[var(--color-border)] text-[var(--color-accent)]",
                    )}
                  >
                    {phase.code}
                  </span>
                  <span className="block font-display text-lg font-semibold leading-tight tracking-normal">
                    {phase.title}
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
          <h3 className="mt-2 font-display text-3xl font-semibold tracking-normal">
            {activePhase.title}
          </h3>

          <div className="mt-6 grid gap-4">
            <InfoBlock label="Focus" value={activePhase.description} />
            <InfoBlock label="Methods" value={methodSummary} />

            <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-background)]/50 p-3">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
                Example systems
              </p>
              {exampleSystems.length > 0 ? (
                <div className="space-y-2">
                  {exampleSystems.map((project) => (
                    <Link
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      className="flex items-center justify-between gap-3 rounded-md border border-[var(--color-border)] bg-white/[0.03] px-3 py-2.5 text-sm transition-colors hover:border-[var(--color-accent)]/40"
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
                <p className="text-sm text-[var(--color-muted-foreground)]">
                  Example systems will be added when this phase has a public project.
                </p>
              )}
            </div>

            <InfoBlock label="Validation / outputs" value={outputSummary} />
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
