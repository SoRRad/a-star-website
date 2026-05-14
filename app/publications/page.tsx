"use client";

import * as React from "react";
import Link from "next/link";
import { ExternalLink, Copy, Check } from "lucide-react";
import { publications } from "@/lib/publications";
import type { Publication } from "@/lib/publications";

export default function PublicationsPage() {
  const [copiedSlug, setCopiedSlug] = React.useState<string | null>(null);
  const [filterYear, setFilterYear] = React.useState<number | "all">("all");
  const [filterProject, setFilterProject] = React.useState<string>("all");

  const years = [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a);
  const projectSlugs = [
    ...new Set(publications.flatMap((p) => p.projects)),
  ].filter(Boolean);

  const filtered = publications.filter((p) => {
    if (filterYear !== "all" && p.year !== filterYear) return false;
    if (filterProject !== "all" && !p.projects.includes(filterProject)) return false;
    return true;
  });

  const copyBibTeX = (pub: Publication) => {
    const bibtex = `@article{${pub.slug},
  title   = {${pub.title}},
  author  = {${pub.authors.join(" and ")}},
  journal = {${pub.venue}},
  year    = {${pub.year}},
  url     = {${pub.url}},
}`;
    navigator.clipboard.writeText(bibtex).then(() => {
      setCopiedSlug(pub.slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    });
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="eyebrow mb-4">Research output</p>
        <h1
          className="font-display text-balance text-5xl font-semibold tracking-tight sm:text-6xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          Publications.
        </h1>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-3">
        <select
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value === "all" ? "all" : Number(e.target.value))}
          className="rounded-md border border-[var(--color-border)] bg-[var(--color-muted)] px-3 py-1.5 text-sm text-[var(--color-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
        >
          <option value="all">All years</option>
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>

        <select
          value={filterProject}
          onChange={(e) => setFilterProject(e.target.value)}
          className="rounded-md border border-[var(--color-border)] bg-[var(--color-muted)] px-3 py-1.5 text-sm text-[var(--color-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
        >
          <option value="all">All projects</option>
          {projectSlugs.map((s) => <option key={s} value={s}>{s.toUpperCase()}</option>)}
        </select>

        {(filterYear !== "all" || filterProject !== "all") && (
          <button
            onClick={() => { setFilterYear("all"); setFilterProject("all"); }}
            className="text-xs text-[var(--color-accent)] hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="flex flex-col gap-6">
        {filtered.map((pub) => (
          <article
            key={pub.slug}
            className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-colors hover:border-[var(--color-accent)]/40"
          >
            <p className="font-display text-base font-semibold leading-snug text-[var(--color-foreground)] sm:text-lg">
              {pub.title}
            </p>

            <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
              {pub.authors.join(", ")}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-[var(--color-accent)]">{pub.venue}</span>
              <span className="text-xs text-[var(--color-muted-foreground)]">·</span>
              <span className="font-mono text-xs text-[var(--color-muted-foreground)]">{pub.year}</span>
              {pub.projects.map((s) => (
                <Link
                  key={s}
                  href={`/projects/${s}`}
                  className="rounded-sm border border-[var(--color-border)] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--color-muted-foreground)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  {s}
                </Link>
              ))}
            </div>

            <div className="mt-4 flex gap-3">
              <a
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-foreground)]"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View paper
              </a>
              <button
                onClick={() => copyBibTeX(pub)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
              >
                {copiedSlug === pub.slug ? (
                  <><Check className="h-3.5 w-3.5 text-[var(--color-status-deployed)]" /> Copied!</>
                ) : (
                  <><Copy className="h-3.5 w-3.5" /> Cite (BibTeX)</>
                )}
              </button>
            </div>
          </article>
        ))}

        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-[var(--color-muted-foreground)]">
            No publications match the current filters.
          </p>
        )}
      </div>
    </section>
  );
}
