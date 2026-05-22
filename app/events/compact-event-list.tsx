"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, ExternalLink, X } from "lucide-react";
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

const BADGE_STYLES: Record<CompactEventItem["accent"], string> = {
  default: "border-white/15 bg-white/[0.04] text-white/60",
  journal: "border-cyan-300/40 bg-cyan-300/[0.08] text-cyan-200",
  conference: "border-[#64B5F6]/40 bg-[#64B5F6]/[0.08] text-[#64B5F6]",
  talk: "border-emerald-300/40 bg-emerald-300/[0.08] text-emerald-200",
  news: "border-violet-300/40 bg-violet-300/[0.08] text-violet-300",
};

const CARD_GLOW: Record<CompactEventItem["accent"], string> = {
  default: "hover:border-white/20",
  journal: "hover:border-cyan-300/25",
  conference: "hover:border-[#64B5F6]/25",
  talk: "hover:border-emerald-300/25",
  news: "hover:border-violet-300/25",
};

const LEFT_BAR: Record<CompactEventItem["accent"], string> = {
  default: "bg-white/20",
  journal: "bg-cyan-300/60",
  conference: "bg-[#64B5F6]/70",
  talk: "bg-emerald-300/60",
  news: "bg-violet-300/60",
};

const NODE_GLOW: Record<CompactEventItem["accent"], string> = {
  default: "border-white/30 shadow-[0_0_14px_rgba(255,255,255,0.08)]",
  journal: "border-cyan-300/50 shadow-[0_0_14px_rgba(103,232,249,0.2)]",
  conference: "border-[#64B5F6]/50 shadow-[0_0_14px_rgba(100,181,246,0.2)]",
  talk: "border-emerald-300/50 shadow-[0_0_14px_rgba(110,231,183,0.2)]",
  news: "border-violet-300/50 shadow-[0_0_14px_rgba(196,181,253,0.2)]",
};

type FilterKey = "all" | CompactEventItem["accent"];

const FILTER_OPTIONS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "journal", label: "Journal Club" },
  { key: "conference", label: "Conference" },
  { key: "talk", label: "Talks" },
  { key: "news", label: "News" },
];

const FILTER_ACTIVE: Record<FilterKey, string> = {
  all: "border-[#64B5F6]/60 bg-[#64B5F6]/10 text-[#64B5F6]",
  default: "border-white/30 bg-white/[0.06] text-white/70",
  journal: "border-cyan-300/50 bg-cyan-300/10 text-cyan-200",
  conference: "border-[#64B5F6]/60 bg-[#64B5F6]/10 text-[#64B5F6]",
  talk: "border-emerald-300/50 bg-emerald-300/10 text-emerald-200",
  news: "border-violet-300/50 bg-violet-300/10 text-violet-300",
};

export function CompactEventList({
  upcoming,
  past,
}: {
  upcoming: CompactEventItem[];
  past: CompactEventItem[];
}) {
  const [filter, setFilter] = React.useState<FilterKey>("all");

  const applyFilter = (items: CompactEventItem[]) =>
    filter === "all" ? items : items.filter((item) => item.accent === filter);

  const filteredUpcoming = applyFilter(upcoming);
  const filteredPast = applyFilter(past);
  const totalVisible = filteredUpcoming.length + filteredPast.length;

  const counts = React.useMemo(() => {
    const all = [...upcoming, ...past];
    return {
      all: all.length,
      journal: all.filter((i) => i.accent === "journal").length,
      conference: all.filter((i) => i.accent === "conference").length,
      talk: all.filter((i) => i.accent === "talk").length,
      news: all.filter((i) => i.accent === "news").length,
      default: all.filter((i) => i.accent === "default").length,
    };
  }, [upcoming, past]);

  return (
    <div className="space-y-12">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.06] pb-6">
        <span className="mr-1 font-mono text-[10px] uppercase tracking-widest text-white/30">
          Filter
        </span>
        {FILTER_OPTIONS.map(({ key, label }) => {
          const count = key === "all" ? counts.all : counts[key as Exclude<FilterKey, "all">];
          if (key !== "all" && count === 0) return null;
          const isActive = filter === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest transition-all duration-150",
                isActive
                  ? FILTER_ACTIVE[key]
                  : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/60",
              )}
            >
              {label}
              <span className={cn("tabular-nums", isActive ? "opacity-70" : "opacity-40")}>
                {count}
              </span>
            </button>
          );
        })}

        <div className="ml-auto flex items-center gap-3">
          {filter !== "all" && (
            <button
              type="button"
              onClick={() => setFilter("all")}
              className="inline-flex items-center gap-1 font-mono text-[10px] text-white/30 transition-colors hover:text-white/60"
            >
              <X className="h-3 w-3" />
              clear
            </button>
          )}
          <span className="font-mono text-[10px] tabular-nums text-white/25">
            {totalVisible} item{totalVisible !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Upcoming section */}
      {filteredUpcoming.length > 0 && (
        <TimelineGroup id="upcoming" title="Upcoming" items={filteredUpcoming} />
      )}

      {/* Past section */}
      {filteredPast.length > 0 && (
        <TimelineGroup id="past" title="Past" items={filteredPast} />
      )}

      {totalVisible === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="font-mono text-sm text-white/30">No items in this category.</p>
          <button
            type="button"
            onClick={() => setFilter("all")}
            className="mt-4 font-mono text-xs text-[#64B5F6]/60 underline underline-offset-2 hover:text-[#64B5F6]"
          >
            Show all
          </button>
        </div>
      )}
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
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">{title}</p>
          <h2 className="heading-lg text-3xl text-white">
            {title === "Upcoming" ? "What is next." : "Recent activity."}
          </h2>
        </div>
        <span className="font-mono text-[10px] tabular-nums text-white/30">
          {items.length} item{items.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="relative space-y-2.5 before:absolute before:bottom-4 before:left-3 before:top-4 before:w-px before:bg-gradient-to-b before:from-[#64B5F6]/50 before:via-white/8 before:to-transparent sm:before:left-[7.25rem]">
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
      {/* Date — desktop */}
      <div className="hidden pt-[1.35rem] text-right font-mono text-[11px] tabular-nums leading-tight text-white/40 sm:block">
        {item.dateLabel}
      </div>

      {/* Timeline node */}
      <div
        className={cn(
          "absolute left-1 top-[1.35rem] h-3.5 w-3.5 rounded-full border bg-[#000814] sm:left-[6.85rem]",
          NODE_GLOW[item.accent],
        )}
      />

      {/* Card */}
      <div
        className={cn(
          "ml-8 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.025] transition-all duration-200 sm:ml-0",
          CARD_GLOW[item.accent],
          open && "border-white/[0.12] bg-white/[0.04]",
        )}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="grid w-full gap-3 px-4 py-4 text-left sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
        >
          <div className="min-w-0">
            <div className="mb-2.5 flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "rounded-full border px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em]",
                  BADGE_STYLES[item.accent],
                )}
              >
                {item.type}
              </span>
              <span className="font-mono text-[10px] tabular-nums text-white/35 sm:hidden">
                {item.dateLabel}
              </span>
            </div>
            <h3 className="heading-md text-base text-white">{item.title}</h3>
            <p className="mt-1.5 line-clamp-1 text-sm leading-relaxed text-white/50">
              {item.shortDescription}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-white/35 transition-colors hover:text-white/60">
            {open ? "Collapse" : "Expand"}
            <ChevronDown
              className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")}
            />
          </span>
        </button>

        {/* Expandable body */}
        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-out",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden">
            <div
              className={cn(
                "border-t border-white/[0.06] px-4 py-5",
                "border-l-2",
                LEFT_BAR[item.accent],
              )}
            >
              <p className="max-w-3xl text-sm leading-relaxed text-white/65">
                {item.description}
              </p>

              {item.topics?.length ? (
                <ul className="mt-4 space-y-2 text-sm">
                  {item.topics.map((topic) => (
                    <li key={topic} className="flex gap-2.5 text-white/60">
                      <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-[#64B5F6]/70" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {item.projects?.length ? (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.projects.map((project) => (
                    <span
                      key={project}
                      className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10px] text-white/45"
                    >
                      {project}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-2.5">
                {item.cta && (
                  <Link
                    href={item.cta.href}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-accent)] px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:bg-[#1976d2] hover:shadow-[0_0_20px_rgba(30,136,229,0.4)]"
                  >
                    {item.cta.label}
                  </Link>
                )}
                {item.links?.map((link) =>
                  link.href.startsWith("/") ? (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/12 px-3.5 py-1.5 text-xs font-medium text-white/60 transition-colors hover:border-[#64B5F6]/40 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/12 px-3.5 py-1.5 text-xs font-medium text-white/60 transition-colors hover:border-[#64B5F6]/40 hover:text-white"
                    >
                      {link.label}
                      <ExternalLink className="h-3 w-3 opacity-60" />
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
