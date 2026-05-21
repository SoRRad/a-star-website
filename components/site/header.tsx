"use client";

import Link from "next/link";
import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { primaryNav } from "@/lib/navigation";
import { projects } from "@/lib/projects";
import { Logo } from "@/components/site/logo";
import { CommandPalette } from "@/components/site/command-palette";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="fixed top-0 right-0 left-0 z-[120] border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="A-STAR home"
          className="group relative flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-white/5"
        >
          <Logo
            variant="mark"
            width={24}
            height={24}
            priority
            sizes="24px"
            className="h-5 w-5 sm:h-6 sm:w-6"
          />
        </Link>

        <NavigationMenu.Root className="hidden md:block">
          <NavigationMenu.List className="flex items-center gap-1">
            {primaryNav.map((item) => {
              const active = isActive(item.href);
              const isResearch = item.href === "/research";

              if (isResearch) {
                return <ProjectsNavItem key={item.href} active={active} />;
              }

              return (
                <NavigationMenu.Item key={item.href}>
                  <NavigationMenu.Link asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                        active
                          ? "text-[#64B5F6]"
                          : "text-white/70 hover:bg-white/5 hover:text-white",
                      )}
                    >
                      {item.title}
                      {active && (
                        <motion.span
                          layoutId="nav-active-indicator"
                          className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#64B5F6]"
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
        </div>
      </div>
    </header>
  );
}

function DropdownContent({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence>
      <NavigationMenu.Content asChild>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-full left-0 z-[130] mt-1 w-72 overflow-hidden rounded-xl border border-white/10 bg-black/80 shadow-xl shadow-black/30 backdrop-blur-xl"
        >
          {children}
        </motion.div>
      </NavigationMenu.Content>
    </AnimatePresence>
  );
}

function ProjectsNavItem({ active }: { active: boolean }) {
  const router = useRouter();
  const featured = projects.filter((p) => p.featured);

  return (
    <NavigationMenu.Item className="relative">
      <NavigationMenu.Trigger
        className={cn(
          "relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors outline-none select-none",
          "data-[state=open]:bg-white/5 data-[state=open]:text-white",
          active ? "text-[#64B5F6]" : "text-white/70 hover:bg-white/5 hover:text-white",
        )}
        onClick={() => router.push("/research")}
      >
        Projects
        {active && (
          <motion.span
            layoutId="nav-active-indicator"
            className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#64B5F6]"
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
                className="group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5 focus:bg-white/5 focus:outline-none"
              >
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.03]">
                  <Logo
                    variant="mark"
                    width={16}
                    height={16}
                    sizes="16px"
                    className="h-4 w-4 opacity-80"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white">{project.name}</p>
                  <p className="mt-0.5 truncate text-xs text-white/50">{project.tagline}</p>
                </div>
              </Link>
            </NavigationMenu.Link>
          ))}
        </div>
        <div className="border-t border-white/10 px-3 py-2">
          <NavigationMenu.Link asChild>
            <Link
              href="/research"
              className="text-xs font-medium text-[#64B5F6] hover:underline focus:underline focus:outline-none"
            >
              View research portfolio
            </Link>
          </NavigationMenu.Link>
        </div>
      </DropdownContent>
    </NavigationMenu.Item>
  );
}
