"use client";

import * as React from "react";
import type { ArchiveItem } from "@/lib/archive";
import { ArchiveCard } from "./archive-card";
import {
  ArchiveFilters,
  defaultArchiveFilters,
  type ArchiveFilterState,
} from "./archive-filters";

interface ArchiveClientPageProps {
  items: ArchiveItem[];
}

export function ArchiveClientPage({ items }: ArchiveClientPageProps) {
  const [filters, setFilters] = React.useState<ArchiveFilterState>(defaultArchiveFilters);

  const years = React.useMemo(
    () => [...new Set(items.map((a) => a.date.slice(0, 4)))].sort((a, b) => b.localeCompare(a)),
    [items],
  );

  const filtered = React.useMemo(() => {
    return items
      .filter((item) => {
        if (filters.category !== "all" && item.category !== filters.category) return false;
        if (filters.access !== "all" && item.access !== filters.access) return false;
        if (filters.year !== "all" && !item.date.startsWith(filters.year)) return false;
        if (filters.query) {
          const q = filters.query.toLowerCase();
          const searchable = [
            item.title,
            item.description,
            item.category,
            ...item.people,
            ...item.projects,
          ]
            .join(" ")
            .toLowerCase();
          if (!searchable.includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [items, filters]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-12 max-w-3xl">
        <p className="eyebrow mb-4">Lab archive</p>
        <h1
          className="font-display text-balance text-5xl font-semibold tracking-tight sm:text-6xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          Archive.
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--color-muted-foreground)]">
          Presentations, recorded webinars, journal club sessions, and documents
          from the AIST Lab. Some materials are accessible only to Mayo Clinic
          credentialed users.
        </p>
      </header>

      <ArchiveFilters filters={filters} setFilters={setFilters} years={years} />

      {filtered.length === 0 ? (
        <div className="mt-12 py-16 text-center">
          <p className="text-[var(--color-muted-foreground)]">
            No archive items match the current filters.
          </p>
          <button
            onClick={() => setFilters(defaultArchiveFilters)}
            className="mt-4 rounded-md border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-accent)] hover:border-[var(--color-accent)]/40"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <ArchiveCard key={item.slug} item={item} />
          ))}
        </div>
      )}

      <div className="mt-4 text-right font-mono text-[11px] text-[var(--color-muted-foreground)]">
        {filtered.length === items.length
          ? `${items.length} items`
          : `${filtered.length} of ${items.length}`}
      </div>
    </div>
  );
}
