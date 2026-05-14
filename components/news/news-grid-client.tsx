"use client";

import * as React from "react";
import { NewsCard } from "./news-card";
import { NewsFilters } from "./news-filters";
import type { NewsItem, NewsCategory } from "@/lib/news";

interface NewsGridClientProps {
  items: NewsItem[];
  total: number;
}

export function NewsGridClient({ items, total }: NewsGridClientProps) {
  const [activeCategory, setActiveCategory] = React.useState<NewsCategory | "all">("all");

  const filtered =
    activeCategory === "all"
      ? items
      : items.filter((n) => n.category === activeCategory);

  return (
    <>
      <NewsFilters
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        total={total}
        filtered={filtered.length}
      />

      {filtered.length === 0 ? (
        <div className="py-12 text-center text-[var(--color-muted-foreground)]">
          No news items in this category yet.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </div>
      )}
    </>
  );
}
