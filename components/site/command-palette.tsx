"use client";

import * as React from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { sidebarNav } from "@/lib/navigation";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";

export function SiteSidebar() {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
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
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open site navigation"
        className="relative z-[140] inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-foreground)] shadow-sm transition-colors hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-muted)]"
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
                  aria-label="A-STAR site navigation"
                  className="fixed right-0 top-0 z-[260] flex h-dvh w-full max-w-[360px] flex-col border-l border-[var(--color-border)] bg-[var(--color-background)] shadow-2xl shadow-black/30"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 360, damping: 36 }}
                >
                  <div className="flex shrink-0 items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
                    <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
                      <Logo variant="mark" width={28} height={28} sizes="28px" className="h-7 w-7" />
                      <span className="font-display text-lg font-semibold tracking-tight text-[var(--color-foreground)]">
                        A-STAR
                      </span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label="Close navigation"
                      className="rounded-md p-2 text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <nav className="flex-1 px-4 py-5" aria-label="Sidebar navigation">
                    <div className="space-y-2">
                      {sidebarNav.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "flex min-h-12 items-center gap-3 rounded-md border px-3 text-sm font-medium transition-colors",
                              active
                                ? "border-[var(--color-accent)]/50 bg-[var(--color-accent)]/10 text-[var(--color-foreground)]"
                                : "border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-muted-foreground)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-foreground)]",
                            )}
                          >
                            {Icon && <Icon className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />}
                            <span>{item.title}</span>
                          </Link>
                        );
                      })}
                    </div>
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
