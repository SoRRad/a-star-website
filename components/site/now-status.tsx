import Link from "next/link";
import { nowStatus } from "@/lib/now";

/**
 * "Now operating" live status pill.
 * Appears in the hero (top-left) and optionally in the header on scroll.
 * Reads from lib/now.ts — edit that file to update the current focus.
 */
export function NowStatus() {
  return (
    <Link
      href="/now"
      className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1.5 text-xs transition-colors hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-muted)]"
    >
      {/* EKG pulse dot */}
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
        <span className="animate-ekg absolute inline-flex h-full w-full rounded-full bg-[var(--color-status-deployed)] opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-status-deployed)]" />
      </span>
      <span className="font-mono uppercase tracking-wide text-[var(--color-muted-foreground)]">
        Now operating
        <span className="mx-1.5 text-[var(--color-border)]">·</span>
        <span className="text-[var(--color-foreground)]">{nowStatus.focus}</span>
      </span>
    </Link>
  );
}
