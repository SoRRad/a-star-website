"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { ExploreMore } from "@/components/site/explore-more";
import { CategoryPill } from "@/components/news/category-pill";
import { NewsImage } from "@/components/news/news-image";
import type { NewsItem } from "@/lib/news";

interface FromTheLabSectionProps {
  newsItems: NewsItem[];
}

export function FromTheLabSection({ newsItems }: FromTheLabSectionProps) {
  return (
    <>
      <Reveal>
        <p className="eyebrow mb-8">From the lab</p>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-3">
        {newsItems.map((item) => {
          const date = new Date(item.date + "T00:00:00");
          const formatted = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          return (
            <Link
              key={item.slug}
              href={`/news/${item.slug}`}
              className="card-glass group flex flex-col overflow-hidden rounded-lg transition-all hover:-translate-y-0.5"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <NewsImage
                  src={item.image}
                  alt={item.imageAlt}
                  category={item.category}
                  date={item.date}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 flex items-center gap-2">
                  <CategoryPill category={item.category} />
                  <time className="font-mono text-[10px] text-white/50">{formatted}</time>
                </div>
                <h3 className="font-display mb-2 line-clamp-2 text-sm leading-snug font-semibold tracking-tight text-white transition-colors group-hover:text-[#64B5F6]">
                  {item.title}
                </h3>
                <p className="line-clamp-2 flex-1 text-xs leading-relaxed text-white/70">
                  {item.excerpt}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <ExploreMore href="/events">See all news and events</ExploreMore>
    </>
  );
}
