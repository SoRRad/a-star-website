"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { logos } from "@/lib/logos";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** mark = icon only | horizontal = wide lockup | stacked = vertical lockup (hero) */
  variant?: "mark" | "horizontal" | "stacked";
  animated?: boolean;
  priority?: boolean;
  sizes?: string;
}

/**
 * AIST logo component — thin wrapper around next/image.
 * Picks the correct transparent PNG from lib/logos.ts based on variant + theme.
 * Hydration-safe: renders a layout placeholder until mounted.
 */
export function Logo({
  className,
  variant = "mark",
  animated = false,
  priority = false,
  sizes,
}: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  if (variant === "stacked") {
    const src = isDark ? logos.fullStackedDark : logos.fullStackedLight;
    return (
      <div className={cn("relative", animated && "animate-logo-entrance", className)}>
        {mounted ? (
          <Image
            src={src}
            alt="AIST — Artificial Intelligence in Surgical Technologies"
            width={420}
            height={210}
            priority={priority}
            sizes={sizes ?? "(max-width: 640px) 280px, 420px"}
            className="h-auto w-full"
          />
        ) : (
          <div className="h-[210px] w-[420px] max-w-full" aria-hidden="true" />
        )}
      </div>
    );
  }

  if (variant === "horizontal") {
    const src = isDark ? logos.fullHorizontalDark : logos.fullHorizontalLight;
    return (
      <div className={cn("relative", animated && "animate-logo-entrance", className)}>
        {mounted ? (
          <Image
            src={src}
            alt="AIST"
            width={200}
            height={50}
            priority={priority}
            sizes={sizes ?? "200px"}
            className="h-auto w-full"
          />
        ) : (
          <div className="h-10 w-40" aria-hidden="true" />
        )}
      </div>
    );
  }

  // Default: mark
  return (
    <div className={cn("relative", animated && "animate-logo-entrance", className)}>
      {mounted ? (
        <Image
          src={isDark ? logos.markDark : logos.markLight}
          alt="AIST logo mark"
          width={80}
          height={80}
          priority={priority}
          className="h-auto w-auto"
        />
      ) : (
        <div className={cn("rounded-sm", className)} aria-hidden="true" />
      )}
    </div>
  );
}
