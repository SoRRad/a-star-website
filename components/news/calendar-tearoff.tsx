interface CalendarTearoffProps {
  date: string;
  endDate?: string;
}

export function CalendarTearoff({ date, endDate }: CalendarTearoffProps) {
  const d = new Date(date + "T00:00:00");
  const day = d.getDate();
  const month = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();

  const hasRange = endDate && endDate !== date;
  const endD = hasRange ? new Date(endDate + "T00:00:00") : null;
  const endDay = endD?.getDate();

  return (
    <div
      className="flex h-[72px] w-[56px] shrink-0 flex-col items-center justify-center rounded-lg"
      style={{ background: "var(--color-navy-800)" }}
    >
      <span
        className="font-display font-semibold leading-none text-[var(--color-ink-100)]"
        style={{ fontSize: hasRange ? "16px" : "22px", letterSpacing: "-0.03em" }}
      >
        {hasRange ? `${day}–${endDay}` : day}
      </span>
      <span className="mt-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-[var(--color-accent)]">
        {month}
      </span>
    </div>
  );
}
