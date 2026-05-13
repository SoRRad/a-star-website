import { cn } from "@/lib/utils";

/**
 * Typographic accent — wraps the letter "I" in the brand blue with
 * slightly tighter tracking. Use sparingly in eyebrow labels and section codes.
 *
 * Examples:
 *   <I /> in "01 / MISS<I/>ON"
 *   <I /> in "AIST" in a headline context
 */
export function I({ className }: { className?: string }) {
  return (
    <span
      className={cn("text-[var(--color-accent)]", className)}
      style={{ letterSpacing: "-0.04em" }}
    >
      I
    </span>
  );
}
