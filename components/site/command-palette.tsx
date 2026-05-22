"use client";

import * as React from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { drawerNav } from "@/lib/navigation";
import { projects } from "@/lib/projects";
import { allNews } from "@/lib/news";
import { activeTeamMembers } from "@/lib/team";
import { upcomingEvents } from "@/lib/events";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";

type CommandResult = {
  category: "Navigate" | "Projects" | "Team" | "News" | "Events";
  title: string;
  href: string;
  description: string;
  keywords: string;
  level?: number;
};

const CATEGORY_ORDER: CommandResult["category"][] = [
  "Navigate",
  "Projects",
  "Team",
  "News",
  "Events",
];

function buildCommandResults(): CommandResult[] {
  const navResults = drawerNav.flatMap((item) => [
    {
      category: "Navigate" as const,
      title: item.title,
      href: item.href,
      description: item.description ?? `Open ${item.title}`,
      keywords: `${item.title} ${item.href} ${item.description ?? ""}`,
      level: 0,
    },
    ...(item.dropdown ?? []).map((sub) => ({
      category: "Navigate" as const,
      title: sub.title,
      href: sub.href,
      description: sub.description,
      keywords: `${sub.title} ${sub.href} ${sub.description}`,
      level: 1,
    })),
  ]);

  return [
    ...navResults,
    ...projects.map((project) => ({
      category: "Projects" as const,
      title: project.name,
      href: `/projects/${project.slug}`,
      description: project.longName,
      keywords: `${project.name} ${project.longName} ${project.tagline} ${project.slug}`,
    })),
    ...activeTeamMembers.map((member) => ({
      category: "Team" as const,
      title: member.name,
      href: `/team/${member.slug}`,
      description: `${member.role} / ${member.affiliation}`,
      keywords: `${member.name} ${member.role} ${member.affiliation} ${member.bio} ${(member.researchFocus ?? []).join(" ")}`,
    })),
    ...allNews.map((item) => ({
      category: "News" as const,
      title: item.title,
      href: `/news/${item.slug}`,
      description: item.excerpt,
      keywords: `${item.title} ${item.excerpt} ${item.category} ${item.projects.join(" ")}`,
    })),
    ...upcomingEvents.map((event) => ({
      category: "Events" as const,
      title: event.title,
      href: "/events#upcoming",
      description: `${event.date} / ${event.location ?? event.format}`,
      keywords: `${event.title} ${event.description} ${event.series ?? ""} ${event.type} ${event.format}`,
    })),
  ];
}

const COMMAND_RESULTS = buildCommandResults();

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredResults = React.useMemo(() => {
    if (!normalizedQuery) return COMMAND_RESULTS;
    return COMMAND_RESULTS.filter((item) =>
      `${item.title} ${item.description} ${item.keywords} ${item.category}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  const groupedResults = CATEGORY_ORDER.map((category) => ({
    category,
    items: filteredResults.filter((item) => item.category === category).slice(0, 8),
  })).filter((group) => group.items.length > 0);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open search and navigation"
        className="relative z-[140] inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-white shadow-sm transition-colors hover:border-[#64B5F6]/50 hover:bg-white/[0.06]"
      >
        <Menu className="h-4 w-4" />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                <motion.div
                  aria-hidden="true"
                  className="fixed inset-0 z-[250] bg-black/45 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  onClick={close}
                />
                <motion.aside
                  role="dialog"
                  aria-modal="true"
                  aria-label="A-STAR search and navigation"
                  className="fixed top-0 right-0 z-[260] flex h-dvh w-full max-w-[400px] flex-col border-l border-white/10 bg-black/85 shadow-2xl shadow-black/30 backdrop-blur-xl"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 360, damping: 36 }}
                >
                  <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3">
                    <Link href="/" className="flex items-center gap-2.5" onClick={close}>
                      <Logo
                        variant="mark"
                        width={28}
                        height={28}
                        sizes="28px"
                        className="h-7 w-7"
                      />
                      <span className="font-display text-lg font-semibold tracking-normal text-white">
                        A-STAR
                      </span>
                    </Link>
                    <button
                      type="button"
                      onClick={close}
                      aria-label="Close navigation"
                      className="rounded-md p-2 text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="border-b border-white/10 p-4">
                    <label className="relative block">
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                      <input
                        ref={inputRef}
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search projects, team, news..."
                        className="h-11 w-full rounded-md border border-white/10 bg-white/[0.04] pl-9 pr-3 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#64B5F6]/60 focus:bg-white/[0.06]"
                      />
                    </label>
                  </div>

                  <nav className="flex-1 overflow-y-auto px-4 py-5" aria-label="Site search">
                    {groupedResults.length > 0 ? (
                      <div className="space-y-6">
                        {groupedResults.map((group) => (
                          <section key={group.category}>
                            <h2 className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#64B5F6]">
                              {group.category}
                            </h2>
                            <div className="space-y-1.5">
                              {group.items.map((item) => {
                                const active = isActive(item.href);
                                return (
                                  <Link
                                    key={`${group.category}-${item.href}-${item.title}`}
                                    href={item.href}
                                    onClick={close}
                                    className={cn(
                                      "block rounded-md border px-3 py-2.5 text-sm transition-colors",
                                      item.level === 1 && "ml-5 border-l-2",
                                      active
                                        ? "border-[#64B5F6]/50 bg-[#64B5F6]/10 text-white"
                                        : "border-white/10 bg-white/[0.03] text-white/75 hover:border-[#64B5F6]/40 hover:bg-white/[0.06] hover:text-white",
                                    )}
                                  >
                                    <span className="block font-medium">{item.title}</span>
                                    <span className="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-white/45">
                                      {item.description}
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                          </section>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm text-white/60">
                        No results for <span className="text-white">&quot;{query}&quot;</span>.
                      </div>
                    )}
                  </nav>
                </motion.aside>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
