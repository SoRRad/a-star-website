"use client";

import Image from "next/image";
import { useState } from "react";
import { logos } from "@/lib/logos";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "mark" | "horizontal" | "stacked";
  animated?: boolean;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
}

/**
 * A-STAR logo — renders both light and dark variants and lets CSS hide one.
 * No useTheme(), no mounted check, no FOUC, fully SSR-correct.
 *
 * Naming semantics used throughout this file:
 *   onLight = logo intended for light backgrounds (dark ink)  → markDark / fullHorizontalDark / fullStackedDark
 *   onDark  = logo intended for dark backgrounds (light ink)  → markLight / fullHorizontalLight / fullStackedLight
 *
 * All active UI sources are root-level PNG files in public/logos/astar.
 * The SVG files under public/logos/astar/legacy are outdated and must not be
 * imported here.
 */
export function Logo({
  className,
  variant = "mark",
  animated = false,
  priority = false,
  sizes,
  width,
  height,
}: LogoProps) {
  const [failedSources, setFailedSources] = useState<Record<string, boolean>>({});

  // onLight = shown in light mode (CSS `dark:hidden`)
  // onDark  = shown in dark mode  (CSS `dark:block`)
  const sources = {
    mark: { onLight: logos.markDark, onDark: logos.markLight },
    horizontal: { onLight: logos.fullHorizontalDark, onDark: logos.fullHorizontalLight },
    stacked: { onLight: logos.fullStackedDark, onDark: logos.fullStackedLight },
  };

  // Intrinsic dimensions derived from the root-level PNG files.
  // These set the srcset optimization hints and aspect-ratio for layout.
  // horizontal PNG is ~1500×500 after cleanup (ratio ≈ 3.0).
  // stacked  PNG is ~980×1060 after cleanup (ratio ≈ 0.92).
  // mark     PNG is square-ish after cleanup.
  const dims = {
    mark: { w: width ?? 80, h: height ?? 80 },
    horizontal: { w: width ?? 282, h: height ?? 100 },
    stacked: { w: width ?? 195, h: height ?? 210 },
  }[variant];

  const defaultSizes = {
    mark: "80px",
    horizontal: "280px",
    stacked: "(max-width: 640px) 200px, 280px",
  }[variant];

  const { onLight, onDark } = sources[variant];
  const onImageError = (src: string) => {
    setFailedSources((current) => ({ ...current, [src]: true }));
  };
  const alt =
    variant === "mark"
      ? "A-STAR logo mark"
      : "A-STAR — AI in Surgical Technology & Augmentation Research";
  const wrapClass = cn("relative", animated && "animate-logo-entrance", className);

  return (
    <div className={wrapClass}>
      {/* Light mode: dark-ink logo on light background */}
      {failedSources[onLight] ? (
        <LogoFallback variant={variant} className="flex dark:hidden" />
      ) : (
        <Image
          src={onLight}
          alt={alt}
          width={dims.w}
          height={dims.h}
          priority={priority}
          sizes={sizes ?? defaultSizes}
          onError={() => onImageError(onLight)}
          className="block h-auto w-full object-contain dark:hidden"
        />
      )}
      {/* Dark mode: light-ink logo on dark background */}
      {failedSources[onDark] ? (
        <LogoFallback variant={variant} className="hidden dark:flex" />
      ) : (
        <Image
          src={onDark}
          alt=""
          aria-hidden="true"
          width={dims.w}
          height={dims.h}
          priority={priority}
          sizes={sizes ?? defaultSizes}
          onError={() => onImageError(onDark)}
          className="hidden h-auto w-full object-contain dark:block"
        />
      )}
    </div>
  );
}

function LogoFallback({
  variant,
  className,
}: {
  variant: NonNullable<LogoProps["variant"]>;
  className?: string;
}) {
  if (variant === "mark") {
    return (
      <span
        aria-label="A-STAR"
        role="img"
        className={cn(
          "h-full min-h-7 w-full min-w-7 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-card)] px-1 font-display text-[0.72em] font-semibold leading-none text-[var(--color-foreground)] shadow-sm",
          className,
        )}
      >
        A★
      </span>
    );
  }

  return (
    <span
      aria-label="A-STAR"
      role="img"
      className={cn(
        "w-full flex-col justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-[var(--color-foreground)] shadow-sm",
        className,
      )}
    >
      <span className="font-display text-lg font-semibold leading-none tracking-tight">A-STAR</span>
      {variant === "stacked" && (
        <span className="mt-1 text-[10px] font-medium uppercase tracking-widest text-[var(--color-muted-foreground)]">
          Surgical AI Lab
        </span>
      )}
    </span>
  );
}
