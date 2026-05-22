import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { CategoryPill } from "@/components/news/category-pill";
import { NewsCard } from "@/components/news/news-card";
import { NewsGallery } from "@/components/news/news-gallery";
import {
  allNews,
  getNewsBySlug,
  getNewsImages,
  getNewsPrimaryImage,
  getRelatedNews,
} from "@/lib/news";
import { publications } from "@/lib/publications";
import { projects } from "@/lib/projects";
import { team } from "@/lib/team";

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return allNews.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsBySlug(slug);

  if (!item) {
    return {
      title: "News",
    };
  }

  const primaryImage = getNewsPrimaryImage(item);

  return {
    title: item.title,
    description: item.excerpt,
    alternates: {
      canonical: `/news/${item.slug}`,
    },
    openGraph: {
      title: item.title,
      description: item.excerpt,
      type: "article",
      url: `/news/${item.slug}`,
      publishedTime: item.date,
      images: primaryImage
        ? [
            {
              url: primaryImage.src,
              alt: primaryImage.alt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.excerpt,
      images: primaryImage ? [primaryImage.src] : undefined,
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);

  if (!item) notFound();

  const date = new Date(item.date + "T00:00:00");
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const primaryImage = getNewsPrimaryImage(item);
  const galleryImages = getNewsImages(item);
  const related = getRelatedNews(item, 3);
  const mentionedPeople = team.filter((member) => item.people.includes(member.slug));
  const mentionedProjects = projects.filter((project) => item.projects.includes(project.slug));
  const mentionedPublications = publications.filter((publication) =>
    item.publications.includes(publication.slug),
  );

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/events"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to News & Events
      </Link>

      <header className="max-w-4xl">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <CategoryPill category={item.category} />
          <time dateTime={item.date} className="font-mono text-xs text-[var(--color-muted-foreground)]">
            {formattedDate}
          </time>
        </div>
        <h1
          className="font-display text-balance text-4xl font-semibold leading-[1.02] tracking-normal sm:text-5xl lg:text-6xl"
          style={{ letterSpacing: "0" }}
        >
          {item.title}
        </h1>
        <p className="mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-[var(--color-muted-foreground)]">
          {item.excerpt}
        </p>
      </header>

      {primaryImage && (
        <figure className="mt-10 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-card)]">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={primaryImage.src}
              alt={primaryImage.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
          {primaryImage.caption && (
            <figcaption className="border-t border-[var(--color-border)] px-4 py-3 text-sm text-[var(--color-muted-foreground)]">
              {primaryImage.caption}
            </figcaption>
          )}
        </figure>
      )}

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <div className="space-y-5 text-base leading-relaxed text-[var(--color-foreground)]">
            {renderBody(item.body)}
          </div>

          {galleryImages.length > 1 && <NewsGallery images={galleryImages} />}

          {(item.externalLink || item.relatedLinks?.length) && (
            <section className="mt-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-5">
              <h2 className="font-display text-xl font-semibold tracking-normal">Related resources</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {item.externalLink && (
                  <SafeLinkButton href={item.externalLink} label="View external resource" />
                )}
                {item.relatedLinks?.map((link) => (
                  <SafeLinkButton key={link.url} href={link.url} label={link.label} />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <MetaBlock title="People">
            {mentionedPeople.length ? (
              mentionedPeople.map((person) => (
                <Link key={person.slug} href={`/team/${person.slug}`} className="text-[var(--color-accent)] hover:underline">
                  {person.name}
                </Link>
              ))
            ) : (
              <span className="text-[var(--color-muted-foreground)]">No people tagged</span>
            )}
          </MetaBlock>

          <MetaBlock title="Projects">
            {mentionedProjects.length ? (
              mentionedProjects.map((project) => (
                <Link key={project.slug} href={`/projects/${project.slug}`} className="text-[var(--color-accent)] hover:underline">
                  {project.name}
                </Link>
              ))
            ) : (
              <span className="text-[var(--color-muted-foreground)]">No projects tagged</span>
            )}
          </MetaBlock>

          <MetaBlock title="Publications">
            {mentionedPublications.length ? (
              mentionedPublications.map((publication) =>
                publication.url ? (
                  <Link
                    key={publication.slug}
                    href={publication.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-accent)] hover:underline"
                  >
                    {publication.title}
                  </Link>
                ) : (
                  <span key={publication.slug} className="text-[var(--color-muted-foreground)]">
                    {publication.title}
                  </span>
                ),
              )
            ) : (
              <span className="text-[var(--color-muted-foreground)]">No publications tagged</span>
            )}
          </MetaBlock>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-[var(--color-border)] pt-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold tracking-normal">Related news</h2>
            <Link
              href="/events"
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] hover:underline"
            >
              News & Events <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((relatedItem) => (
              <NewsCard key={relatedItem.slug} item={relatedItem} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function renderBody(body: string) {
  return body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => (
      <p key={paragraph} className="text-pretty">
        {renderInlineMarkdownLinks(paragraph)}
      </p>
    ));
}

function renderInlineMarkdownLinks(text: string) {
  const parts: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    const [fullMatch, label, href] = match;
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));

    if (isSafeHref(href)) {
      const external = isExternalHref(href);
      parts.push(
        <Link
          key={`${href}-${match.index}`}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="font-medium text-[var(--color-accent)] underline decoration-[var(--color-accent)]/30 transition-colors hover:text-[var(--color-foreground)]"
        >
          {label}
        </Link>,
      );
    } else {
      parts.push(label);
    }

    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

function SafeLinkButton({ href, label }: { href: string; label: string }) {
  if (!isSafeHref(href)) return null;
  const external = isExternalHref(href);

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-3 py-2 text-sm font-medium text-[var(--color-foreground)] transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]"
    >
      {label}
      {external && <ExternalLink className="h-3.5 w-3.5" />}
    </Link>
  );
}

function MetaBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4">
      <h2 className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-accent)]">
        {title}
      </h2>
      <div className="mt-3 flex flex-col gap-2 text-sm">{children}</div>
    </section>
  );
}

function isSafeHref(href: string) {
  return href.startsWith("/") && !href.startsWith("//") ? true : isExternalHref(href);
}

function isExternalHref(href: string) {
  return href.startsWith("https://") || href.startsWith("http://") || href.startsWith("mailto:");
}
