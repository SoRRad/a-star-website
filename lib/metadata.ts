import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

/** The site-wide social card, rendered by app/opengraph-image.tsx. */
export const defaultOgImage = {
  url: siteConfig.ogImage,
  width: 1200,
  height: 630,
  alt: siteConfig.name,
} as const;

/**
 * Metadata for a top-level page: title, description, canonical URL, and the social
 * tags that go with them.
 *
 * Use this instead of writing `openGraph: { url }` by hand. Next merges metadata one
 * top-level key at a time, so a page that sets its own `openGraph` replaces the
 * layout's entirely — a page that only meant to set og:url silently lost og:image,
 * og:site_name and og:type, and shared links rendered with no preview image. Twitter
 * cards likewise kept the layout's generic title and description.
 *
 * `image` defaults to the site card; pass a route's own card (e.g. a project's
 * opengraph-image) to use it for both Open Graph and Twitter.
 */
export function pageMetadata({
  path,
  title,
  description,
  image = defaultOgImage.url,
}: {
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      url: path,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          ...defaultOgImage,
          url: image,
          // A page-specific card shows that page's title, so describe it as such.
          alt: image === defaultOgImage.url ? defaultOgImage.alt : `${title} · ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      // Matches the `%s · A-STAR` template the layout applies to <title> and og:title,
      // which Next does not apply to an explicitly set twitter.title.
      title: `${title} · ${siteConfig.name}`,
      description,
      images: [image],
    },
  };
}
