"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export type CompactEventItem = {
  id: string;
  title: string;
  dateLabel: string;
  sortDate?: string;
  type: string;
  accent: "default" | "journal" | "conference" | "talk" | "news";
  shortDescription: string;
  description: string;
  topics?: string[];
  projects?: string[];
  links?: { label: string; href: string }[];
  cta?: { label: string; href: string };
};

const ACCENTS: Record<CompactEventItem["accent"], string> = {
  default: "border-white/15 bg-white/[0.04] text-white/72",
  journal: "border-cyan-300/35 bg-cyan-300/10 text-cyan-200",
  conference: "border-[#64B5F6]/35 bg-[#64B5F6]/10 text-[#64B5F6]",
  talk: "border-emerald-300/35 bg-emerald-300/10 text-emerald-200",
  news: "border-violet-300/35 bg-violet-300/10 text-violet-200",
};

export function CompactEventList({
  upcoming,
  past,
}: {
  upcoming: CompactEventItem[];
  past: CompactEventItem[];
}) {
  return (
    <div className="space-y-14">
      <TimelineGroup id="upcoming" title="Upcoming" items={upcoming} />
      <TimelineGroup id="past" title="Past" items={past} />
    </div>
  );
}

function TimelineGroup({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: CompactEventItem[];
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">{title}</p>
          <h2 className="font-display text-3xl font-semibold tracking-normal">
            {title === "Upcoming" ? "What is next." : "Recent activity."}
          </h2>
        </div>
        <span className="font-mono text-xs text-white/45">{items.length} items</span>
      </div>

      <div className="relative space-y-3 before:absolute before:bottom-4 before:left-3 before:top-4 before:w-px before:bg-gradient-to-b before:from-[#64B5F6]/60 before:via-white/10 before:to-transparent sm:before:left-[7.25rem]">
        {items.map((item) => (
          <TimelineRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function TimelineRow({ item }: { item: CompactEventItem }) {
  const [open, setOpen] = React.useState(false);

  return (
    <article className="relative grid gap-3 sm:grid-cols-[6.5rem_1fr] sm:gap-6">
      <div className="hidden pt-5 text-right font-mono text-xs text-white/45 sm:block">
        {item.dateLabel}
      </div>
      <div className="absolute left-1 top-6 h-4 w-4 rounded-full border border-[#64B5F6]/50 bg-[#000814] shadow-[0_0_18px_rgb(100_181_246/0.18)] sm:left-[6.75rem]" />

      <div className="ml-8 overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] sm:ml-0">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="grid w-full gap-3 px-4 py-4 text-left transition-colors hover:bg-white/[0.035] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
        >
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className={cn("rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest", ACCENTS[item.accent])}>
                {item.type}
              </span>
              <span className="font-mono text-xs text-white/45 sm:hidden">{item.dateLabel}</span>
            </div>
            <h3 className="font-display text-lg font-semibold tracking-normal text-white">
              {item.title}
            </h3>
            <p className="mt-1 line-clamp-1 text-sm text-white/62">{item.shortDescription}</p>
          </div>
          <span className="inline-flex items-center gap-2 text-xs font-medium text-white/55">
            {open ? "Collapse" : "Expand"}
            <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
          </span>
        </button>

        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-out",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden">
            <div className="border-t border-white/10 px-4 py-4">
              <p className="max-w-3xl text-sm leading-relaxed text-white/70">{item.description}</p>

              {item.topics?.length ? (
                <ul className="mt-3 space-y-1.5 text-sm text-white/70">
                  {item.topics.map((topic) => (
                    <li key={topic} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#64B5F6]" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {item.projects?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.projects.map((project) => (
                    <span
                      key={project}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-white/60"
                    >
                      {project}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-4 flex flex-wrap gap-3">
                {item.cta && (
                  <Link
                    href={item.cta.href}
                    className="inline-flex items-center gap-1.5 rounded-md bg-[var(--color-accent)] px-3 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
                  >
                    {item.cta.label}
                  </Link>
                )}
                {item.links?.map((link) =>
                  link.href.startsWith("/") ? (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs font-medium text-white/72 transition-colors hover:border-[#64B5F6]/45 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs font-medium text-white/72 transition-colors hover:border-[#64B5F6]/45 hover:text-white"
                    >
                      {link.label}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
