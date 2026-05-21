"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import type { NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function PrimaryNavItem({ item, active }: { item: NavItem; active: boolean }) {
  const linkClass = cn(
    "relative inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
    active ? "text-[#64B5F6]" : "text-white/70 hover:bg-white/5 hover:text-white",
  );

  if (item.dropdown) {
    return (
      <NavigationMenuItem className="relative">
        <NavigationMenuTrigger
          asChild
          className="bg-transparent p-0 hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent"
        >
          <Link href={item.href} className={linkClass}>
            {item.title}
            <ChevronDown
              className="relative top-px h-3 w-3 transition-transform group-data-[state=open]:rotate-180"
              aria-hidden="true"
            />
            {active && <ActiveDot />}
          </Link>
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <div className="grid w-[420px] gap-1 p-3">
            {item.dropdown.map((sub) => (
              <Link
                key={sub.href}
                href={sub.href}
                className="block rounded-md px-3 py-2 transition-colors hover:bg-white/5 focus:bg-white/5 focus:outline-none"
              >
                <div className="text-sm font-medium text-white">{sub.title}</div>
                <div className="mt-0.5 text-xs leading-relaxed text-white/50">{sub.description}</div>
              </Link>
            ))}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <Link href={item.href} className={linkClass}>
        {item.title}
        {active && <ActiveDot />}
      </Link>
    </NavigationMenuItem>
  );
}

function ActiveDot() {
  return (
    <motion.span
      layoutId="active-indicator"
      className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#64B5F6]"
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
    />
  );
}
