"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/lib/news";
import type { NewsCategory } from "@/lib/news";

const ALL_CATEGORIES: NewsCategory[] = [
  "conference",
  "publication",
  "award",
  "press",
  "lab-update",
  "newsletter",
];

interface NewsFiltersProps {
  activeCategory: NewsCategory | "all";
  onCategoryChange: (cat: NewsCategory | "all") => void;
  total: number;
  filtered: number;
}

export function NewsFilters({ activeCategory, onCategoryChange, total, filtered }: NewsFiltersProps) {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-2">
      <button
        onClick={() => onCategoryChange("all")}
        className={cn(
          "rounded-full border px-3 py-1 text-sm font-medium transition-colors",
          activeCategory === "all"
            ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
            : "border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-foreground)]",
        )}
      >
        All
      </button>
      {ALL_CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={cn(
            "rounded-full border px-3 py-1 text-sm font-medium transition-colors",
            activeCategory === cat
              ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
              : "border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-foreground)]",
          )}
        >
          {CATEGORY_LABELS[cat]}
        </button>
      ))}
      <span className="ml-auto font-mono text-[11px] text-[var(--color-muted-foreground)]">
        {filtered === total ? `${total} items` : `${filtered} of ${total}`}
      </span>
    </div>
  );
}
