import { cn } from "@/lib/utils";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/news";
import type { NewsCategory } from "@/lib/news";

interface CategoryPillProps {
  category: NewsCategory;
  className?: string;
}

export function CategoryPill({ category, className }: CategoryPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest",
        CATEGORY_COLORS[category],
        className,
      )}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}
