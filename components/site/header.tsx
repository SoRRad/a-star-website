"use client";

import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { primaryNav } from "@/lib/navigation";
import { phases } from "@/lib/phases";
import { projects } from "@/lib/projects";
import { logos } from "@/lib/logos";
import { Logo } from "@/components/site/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandPalette } from "@/components/site/command-palette";
import { MobileNav } from "@/components/site/mobile-nav";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-[120] w-full">
      <div
        className={cn(
          "w-full transition-all duration-200",
          scrolled
            ? "border-b border-[var(--color-border)] bg-[var(--color-background)]/95 backdrop-blur-xl"
            : "border-b border-transparent bg-[var(--color-background)]/0",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-200 sm:px-6 lg:px-8",
            scrolled ? "h-14" : "h-16",
          )}
        >
          {/* Logo */}
          <Link href="/" aria-label="AIST home" className="shrink-0">
            <Logo
              variant="horizontal"
              priority
              width={scrolled ? 140 : 160}
              height={scrolled ? 32 : 40}
              className={cn("hidden sm:block w-auto transition-all duration-200", scrolled ? "h-8" : "h-9")}
            />
            <Image
              src={logos.markNeutral}
              alt="AIST"
              width={36}
              height={36}
              priority
              className="block h-9 w-auto sm:hidden"
            />
          </Link>

          {/* Primary nav — Radix Navigation Menu for a11y */}
          <NavigationMenu.Root className="hidden md:block">
            <NavigationMenu.List className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const active = isActive(item.href);
                const isProjects = item.href === "/projects";
                const isResearch = item.href === "/research";

                if (isProjects) {
                  return (
                    <ProjectsNavItem key={item.href} active={active} />
                  );
                }
                if (isResearch) {
                  return (
                    <ResearchNavItem key={item.href} active={active} />
                  );
                }

                return (
                  <NavigationMenu.Item key={item.href}>
                    <NavigationMenu.Link asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          active
                            ? "text-[var(--color-foreground)]"
                            : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]",
                        )}
                      >
                        {item.title}
                        {active && (
                          <motion.span
                            layoutId="nav-active-indicator"
                            className="absolute inset-x-2 -bottom-[1px] h-0.5 rounded-full bg-[var(--color-accent)]"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </Link>
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                );
              })}
            </NavigationMenu.List>
          </NavigationMenu.Root>

          <div className="flex items-center gap-2">
            <CommandPalette />
            <ThemeToggle />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── Shared dropdown content ─────────────────────────────────────────────── */

function DropdownContent({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence>
      <NavigationMenu.Content asChild>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-full z-[130] mt-1 w-72 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] shadow-xl shadow-black/10"
        >
          {children}
        </motion.div>
      </NavigationMenu.Content>
    </AnimatePresence>
  );
}

/* ── Projects nav item ───────────────────────────────────────────────────── */

function ProjectsNavItem({ active }: { active: boolean }) {
  const featured = projects.filter((p) => p.featured);
  return (
    <NavigationMenu.Item className="relative">
      <NavigationMenu.Trigger
        className={cn(
          "relative rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none select-none",
          "data-[state=open]:bg-[var(--color-muted)] data-[state=open]:text-[var(--color-foreground)]",
          active
            ? "text-[var(--color-foreground)]"
            : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]",
        )}
      >
        Projects
        {active && (
          <motion.span
            layoutId="nav-active-indicator"
            className="absolute inset-x-2 -bottom-[1px] h-0.5 rounded-full bg-[var(--color-accent)]"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </NavigationMenu.Trigger>
      <DropdownContent>
        <div className="p-2">
          {featured.map((project) => (
            <NavigationMenu.Link key={project.slug} asChild>
              <Link
                href={`/projects/${project.slug}`}
                className="group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-[var(--color-muted)] focus:bg-[var(--color-muted)] focus:outline-none"
              >
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-card)]">
                  <Image src={logos.markNeutral} alt="" width={16} height={16} className="h-4 w-4 opacity-70" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[var(--color-foreground)]">{project.name}</p>
                  <p className="mt-0.5 truncate text-xs text-[var(--color-muted-foreground)]">{project.tagline}</p>
                </div>
              </Link>
            </NavigationMenu.Link>
          ))}
        </div>
        <div className="border-t border-[var(--color-border)] px-3 py-2">
          <NavigationMenu.Link asChild>
            <Link href="/projects" className="text-xs font-medium text-[var(--color-accent)] hover:underline focus:outline-none focus:underline">
              View all projects →
            </Link>
          </NavigationMenu.Link>
        </div>
      </DropdownContent>
    </NavigationMenu.Item>
  );
}

/* ── Research nav item ───────────────────────────────────────────────────── */

function ResearchNavItem({ active }: { active: boolean }) {
  return (
    <NavigationMenu.Item className="relative">
      <NavigationMenu.Trigger
        className={cn(
          "relative rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none select-none",
          "data-[state=open]:bg-[var(--color-muted)] data-[state=open]:text-[var(--color-foreground)]",
          active
            ? "text-[var(--color-foreground)]"
            : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]",
        )}
      >
        Research
        {active && (
          <motion.span
            layoutId="nav-active-indicator"
            className="absolute inset-x-2 -bottom-[1px] h-0.5 rounded-full bg-[var(--color-accent)]"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </NavigationMenu.Trigger>
      <DropdownContent>
        <div className="p-2">
          {phases.map((phase) => (
            <NavigationMenu.Link key={phase.id} asChild>
              <Link
                href={`/research#${phase.id}`}
                className="group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-[var(--color-muted)] focus:bg-[var(--color-muted)] focus:outline-none"
              >
                <span className="mt-0.5 shrink-0 font-mono text-[10px] font-semibold tracking-wider text-[var(--color-accent)]">
                  {phase.code}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[var(--color-foreground)]">{phase.title}</p>
                  <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-[var(--color-muted-foreground)]">
                    {phase.description.slice(0, 80)}…
                  </p>
                </div>
              </Link>
            </NavigationMenu.Link>
          ))}
        </div>
        <div className="border-t border-[var(--color-border)] px-3 py-2">
          <NavigationMenu.Link asChild>
            <Link href="/research" className="text-xs font-medium text-[var(--color-accent)] hover:underline focus:outline-none focus:underline">
              View research focus →
            </Link>
          </NavigationMenu.Link>
        </div>
      </DropdownContent>
    </NavigationMenu.Item>
  );
}
