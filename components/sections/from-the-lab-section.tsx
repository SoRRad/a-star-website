"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ExploreMore } from "@/components/site/explore-more";
import { formatDateShort } from "@/lib/utils";
import type { Publication } from "@/lib/publications";
import { mockNews } from "@/lib/mock-news";
import { mockEvents } from "@/lib/mock-events";

interface FromTheLabSectionProps {
  publications: Publication[];
}

export function FromTheLabSection({ publications }: FromTheLabSectionProps) {
  return (
    <>
      <Reveal>
        <p className="eyebrow mb-8">From the lab</p>
      </Reveal>
      <div className="grid gap-12 lg:grid-cols-3">
        {/* News */}
        <div>
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
            Latest news
          </h3>
          <ul className="space-y-6">
            {mockNews.map((item) => (
              <li key={item.href} className="group">
                <time className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted-foreground)]">
                  {formatDateShort(item.date)}
                </time>
                <h4 className="mt-1.5 text-base font-medium leading-snug text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-accent)]">
                  {item.title}
                </h4>
                <Link href={item.href} className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-accent)] hover:underline">
                  Read more <ArrowRight className="h-3 w-3" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Events */}
        <div>
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
            Upcoming events
          </h3>
          <ul className="space-y-6">
            {mockEvents.map((item) => (
              <li key={item.href} className="group">
                <time className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
                  {formatDateShort(item.date)}
                </time>
                <h4 className="mt-1.5 text-base font-medium leading-snug text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-accent)]">
                  {item.title}
                </h4>
                <Link href={item.href} className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-accent)] hover:underline">
                  Details <ArrowRight className="h-3 w-3" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent publications */}
        <div>
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
            Recent publications
          </h3>
          <ul className="space-y-6">
            {publications.map((pub) => (
              <li key={pub.slug} className="group">
                <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted-foreground)]">
                  {pub.venue} · {pub.year}
                </p>
                <h4 className="mt-1.5 text-sm font-medium leading-snug text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-accent)] line-clamp-3">
                  {pub.title}
                </h4>
                {pub.url && (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-accent)] hover:underline"
                  >
                    View paper <ArrowUpRight className="h-3 w-3" />
                  </a>
                )}
              </li>
            ))}
          </ul>
          <ExploreMore href="/publications">All publications</ExploreMore>
        </div>
      </div>
    </>
  );
}
