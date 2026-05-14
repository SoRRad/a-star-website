interface ContentPlaceholderProps {
  section: string;
  slug?: string;
}

export function ContentPlaceholder({ section, slug }: ContentPlaceholderProps) {
  return (
    <div className="rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-muted)]/30 px-6 py-8">
      <p className="eyebrow mb-2 text-[var(--color-muted-foreground)]">{section}</p>
      <p className="text-sm text-[var(--color-muted-foreground)]">Content coming soon.</p>
      {slug && process.env.NODE_ENV === "development" && (
        <p className="mt-2 font-mono text-[10px] text-[var(--color-muted-foreground)]/60">
          Edit in <code>content/projects/{slug}.ts</code>
        </p>
      )}
    </div>
  );
}
