import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import type { Project } from "@/lib/projects";
import type { Publication } from "@/lib/publications";

export function ModelCard({
  project,
  publications = [],
  compact = false,
}: {
  project: Project;
  publications?: Publication[];
  compact?: boolean;
}) {
  const modelCard = project.modelCard;
  const related = publications.filter((publication) =>
    modelCard.relatedPublications.includes(publication.slug),
  );

  return (
    <article className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">A-STAR model card</p>
          <h3 className="font-display text-2xl font-semibold tracking-tight">
            {project.name}
          </h3>
          <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
            {project.longName}
          </p>
        </div>
        <ShieldCheck className="h-5 w-5 shrink-0 text-[var(--color-accent)]" />
      </div>

      <dl className={`mt-6 grid gap-4 ${compact ? "sm:grid-cols-2" : "md:grid-cols-2"}`}>
        <ModelField label="Intended use" value={modelCard.intendedUse} />
        <ModelField label="Clinical phase" value={modelCard.clinicalPhase} />
        <ModelList label="Input data" values={modelCard.inputData} />
        <ModelList label="Output" values={modelCard.output} />
        <ModelField label="Model/pipeline" value={modelCard.modelPipeline} />
        <ModelField label="Validation status" value={modelCard.validationStatus} />
        <ModelField label="Deployment readiness" value={modelCard.deploymentReadiness} />
        <ModelField label="Limitations" value={modelCard.limitations} />
      </dl>

      <div className="mt-6 border-t border-[var(--color-border)] pt-4">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[var(--color-muted-foreground)]">
          Related publications
        </p>
        {related.length > 0 ? (
          <div className="space-y-2">
            {related.map((publication) => (
              <Link
                key={publication.slug}
                href={publication.url ?? `/publications?query=${encodeURIComponent(publication.title)}`}
                target={publication.url ? "_blank" : undefined}
                rel={publication.url ? "noopener noreferrer" : undefined}
                className="block text-sm leading-snug text-[var(--color-accent)] hover:underline"
              >
                {publication.title}
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[var(--color-muted-foreground)]">
            Related publications will be linked as they become available.
          </p>
        )}
      </div>
    </article>
  );
}

function ModelField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="mb-1 font-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">{value}</dd>
    </div>
  );
}

function ModelList({ label, values }: { label: string; values: string[] }) {
  return (
    <div>
      <dt className="mb-1 font-mono text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
        {label}
      </dt>
      <dd>
        <ul className="space-y-1">
          {values.map((value) => (
            <li key={value} className="flex gap-2 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
              {value}
            </li>
          ))}
        </ul>
      </dd>
    </div>
  );
}
