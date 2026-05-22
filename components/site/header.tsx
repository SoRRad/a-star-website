"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/lib/navigation";
import { Logo } from "@/components/site/logo";
import { CommandPalette } from "@/components/site/command-palette";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="fixed left-0 right-0 top-0 z-[120] border-b border-white/10 bg-black/60 backdrop-blur-xl">
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

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-white/[0.07] text-white"
                  : "text-white/68 hover:bg-white/[0.05] hover:text-white",
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CommandPalette />
        </div>
      </div>
    </header>
  );
}
