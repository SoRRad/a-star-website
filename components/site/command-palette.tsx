"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import Fuse from "fuse.js";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  FlaskConical,
  Mail,
  Menu,
  Newspaper,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { allNav } from "@/lib/navigation";
import { projects } from "@/lib/projects";
import { team } from "@/lib/team";
import { publications } from "@/lib/publications";
import { allNews } from "@/lib/news";
import { archiveItems } from "@/lib/archive";
import { logos } from "@/lib/logos";
import { cn } from "@/lib/utils";

type ResultKind = "page" | "project" | "team" | "publication" | "news" | "resource";

type SearchResult = {
  id: string;
  kind: ResultKind;
  title: string;
  subtitle?: string;
  href: string;
  external?: boolean;
};

const corpus: SearchResult[] = [
  ...allNav.map((item) => ({
    id: `page-${item.href}`,
    kind: "page" as const,
    title: item.title,
    subtitle: item.href,
    href: item.href,
  })),
  ...projects.map((project) => ({
    id: `project-${project.slug}`,
    kind: "project" as const,
    title: project.name,
    subtitle: project.tagline,
    href: `/projects/${project.slug}`,
  })),
  ...team.map((member) => ({
    id: `team-${member.slug}`,
    kind: "team" as const,
    title: member.name,
    subtitle: `${member.role} - ${member.affiliation}`,
    href: member.isOpenPosition ? "/join" : `/team/${member.slug}`,
  })),
  ...publications.map((publication) => ({
    id: `publication-${publication.slug}`,
    kind: "publication" as const,
    title: publication.title,
    subtitle: `${publication.venue} - ${publication.year}`,
    href: publication.url ?? `/publications?query=${encodeURIComponent(publication.title)}`,
    external: Boolean(publication.url),
  })),
  ...allNews.map((item) => ({
    id: `news-${item.slug}`,
    kind: "news" as const,
    title: item.title,
    subtitle: item.excerpt,
    href: `/news/${item.slug}`,
  })),
  ...archiveItems.map((item) => ({
    id: `resource-${item.slug}`,
    kind: "resource" as const,
    title: item.title,
    subtitle: item.description,
    href: "/resources",
  })),
];

const fuse = new Fuse(corpus, {
  keys: ["title", "subtitle"],
  threshold: 0.34,
});

const GROUP_LABEL: Record<ResultKind, string> = {
  page: "Pages",
  project: "Projects",
  team: "People",
  publication: "Publications",
  news: "News",
  resource: "Resources",
};

export function SiteSidebar() {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = React.useRef<HTMLInputElement>(null);

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
    setQuery("");
    window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const results = React.useMemo(() => {
    const trimmed = query.trim();
    const items = trimmed ? fuse.search(trimmed).map((result) => result.item) : corpus;
    return items.slice(0, trimmed ? 18 : 10);
  }, [query]);

  const grouped = React.useMemo(() => {
    const map = new Map<ResultKind, SearchResult[]>();
    for (const result of results) {
      if (!map.has(result.kind)) map.set(result.kind, []);
      map.get(result.kind)?.push(result);
    }
    return map;
  }, [results]);

  const go = (result: SearchResult) => {
    setOpen(false);
    if (result.external || result.href.startsWith("http")) {
      window.open(result.href, "_blank", "noopener,noreferrer");
      return;
    }
    router.push(result.href);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open site sidebar"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-muted)] text-[var(--color-foreground)] transition-colors hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-card)]"
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
                  onClick={() => setOpen(false)}
                />
                <motion.aside
                  role="dialog"
                  aria-modal="true"
                  aria-label="A-STAR navigation and search"
                  className="fixed right-0 top-0 z-[260] flex h-dvh w-full max-w-[440px] flex-col border-l border-[var(--color-border)] bg-[var(--color-background)] shadow-2xl shadow-black/30"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 330, damping: 34 }}
                >
                  <div className="flex shrink-0 items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
                    <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
                      <Image src={logos.markNeutral} alt="" width={26} height={26} className="h-6 w-6" />
                      <span className="font-display text-lg font-semibold tracking-tight">A-STAR</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label="Close sidebar"
                      className="rounded-md p-2 text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="border-b border-[var(--color-border)] p-4">
                    <label className="relative block">
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted-foreground)]" />
                      <input
                        ref={inputRef}
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search pages, projects, people, papers..."
                        className="h-11 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-card)] pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-[var(--color-muted-foreground)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30"
                      />
                    </label>
                  </div>

                  <div className="flex-1 overflow-y-auto px-4 py-5">
                    <SidebarSection title="Navigation">
                      <div className="grid grid-cols-2 gap-2">
                        {allNav.map((item) => {
                          const Icon = item.icon ?? Sparkles;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className="flex min-h-12 items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-sm font-medium transition-colors hover:border-[var(--color-accent)]/40"
                            >
                              <Icon className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                              <span className="truncate">{item.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </SidebarSection>

                    <SidebarSection title={query ? "Search results" : "Suggested results"}>
                      {(["page", "project", "team", "publication", "news", "resource"] as ResultKind[]).map(
                        (kind) => {
                          const items = grouped.get(kind);
                          if (!items?.length) return null;
                          return (
                            <div key={kind} className="mb-4 last:mb-0">
                              <p className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted-foreground)]">
                                {GROUP_LABEL[kind]}
                              </p>
                              <div className="space-y-1">
                                {items.slice(0, 5).map((item) => (
                                  <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => go(item)}
                                    className="group flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left transition-colors hover:bg-[var(--color-muted)]"
                                  >
                                    <span className="min-w-0 flex-1">
                                      <span className="block truncate text-sm font-medium text-[var(--color-foreground)]">
                                        {item.title}
                                      </span>
                                      {item.subtitle && (
                                        <span className="mt-0.5 block truncate text-xs text-[var(--color-muted-foreground)]">
                                          {item.subtitle}
                                        </span>
                                      )}
                                    </span>
                                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[var(--color-accent)] opacity-40 transition-opacity group-hover:opacity-100" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          );
                        },
                      )}
                      {query && results.length === 0 && (
                        <p className="rounded-md border border-dashed border-[var(--color-border)] p-4 text-sm text-[var(--color-muted-foreground)]">
                          No matching A-STAR pages, projects, people, papers, or resources.
                        </p>
                      )}
                    </SidebarSection>

                    <SidebarSection title="Project shortcuts">
                      <div className="space-y-2">
                        {projects.map((project) => (
                          <Link
                            key={project.slug}
                            href={`/projects/${project.slug}`}
                            onClick={() => setOpen(false)}
                            className="flex items-start gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-card)] p-3 transition-colors hover:border-[var(--color-accent)]/40"
                          >
                            <FlaskConical className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                            <span>
                              <span className="block text-sm font-semibold">{project.name}</span>
                              <span className="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-[var(--color-muted-foreground)]">
                                {project.tagline}
                              </span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </SidebarSection>

                    <div className="rounded-lg border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 p-4">
                      <div className="flex items-start gap-3">
                        <Newspaper className="mt-0.5 h-4 w-4 text-[var(--color-accent)]" />
                        <div>
                          <p className="text-sm font-semibold">From the lab</p>
                          <p className="mt-1 text-xs leading-relaxed text-[var(--color-muted-foreground)]">
                            News, journal club dates, and collaboration updates stay available outside the primary header.
                          </p>
                          <Link
                            href="/news"
                            onClick={() => setOpen(false)}
                            className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-accent)] hover:underline"
                          >
                            Read news <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 border-t border-[var(--color-border)] p-4">
                    <Link
                      href="/join#project-intake"
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-md bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-[var(--color-accent-foreground)]",
                        "transition-opacity hover:opacity-90",
                      )}
                    >
                      <Mail className="h-4 w-4" />
                      Collaborate with A-STAR
                    </Link>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6 last:mb-0">
      <h2 className="eyebrow mb-3 text-[10px]">{title}</h2>
      {children}
    </section>
  );
}
