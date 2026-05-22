# A-STAR Content Guide

## Active Routes

- Main Projects page: `/research`
- Individual project pages: `/projects/[slug]`
- Team: `/team`
- News & Events: `/events`
- Contact, collaboration intake, and Journal Club intake: `/contact`

The standalone publication index is direct-only and should not be added to visible navigation or footer links.

Compatibility redirects only:

- `/projects` redirects to `/research`
- `/news` redirects to `/events`
- `/resources` and `/resources/glossary` redirect to `/events`
- `/join` redirects to `/contact#collaborate`

Do not add active navigation, homepage CTAs, or footer links to the redirect-only pages.

## Projects

Edit project metadata in `lib/projects.ts`. Project detail copy lives in `content/projects/{slug}.ts`.

Generic project links should go to `/research`. Project cards and detail links should go to `/projects/[slug]`.

Project media is defined on each project through the optional `media` array. Media files should live in:

```text
public/projects/media/
```

Suggested names:

- `gonogonet-demo.avif`
- `gonogonet-thumbnail.png`
- `mosi-demo.gif`
- `siris-demo.gif`

Prefer optimized MP4/WebM for larger animations and keep thumbnails reasonably small.

## News & Events

Use `/events` as the public News & Events page.

- `lib/events.ts`: calendar-style events and Journal Club sessions.
- `lib/talks.ts`: talks, webinars, courses, Oxford sessions, ASMBS items, and project-linked education.
- `lib/news.ts`: lab updates and `/news/[slug]` detail pages.

Journal Club images live in:

```text
public/events/
```

The first A-STAR Journal Club image path is:

```text
public/events/journal-club-may20-2026.jpg
```

If the image is missing, `/events` should render the polished placeholder.

SAGES Nashville and ASMBS Bariatric Happy Hour are separate records. Oxford September 2025 items should display month/year only when exact days are not confirmed.

## Contact And Journal Club

Contact and Join are merged at `/contact`.

Journal Club intake fields are limited to:

- Name
- Email
- Affiliation
- Role
- Session interest
- Message

The contact API must not report success when email delivery is not configured. If Resend is missing, the UI should show the direct email fallback.

Required environment variables:

```bash
RESEND_API_KEY=
CONTACT_TO_EMAIL=shahriarirad.reza@mayo.edu
CONTACT_FROM_EMAIL=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Logos

Use only root-level PNG assets from `public/logos/astar/` through `lib/logos.ts`. Do not use old SVG logos, `public/logos/astar/clean/`, or `public/logos/astar/current/` in active UI.

## Team Links

Team social/profile links are optional and render only when present. Supported keys in `lib/team.ts` are `profile`, `email`, `github`, `linkedin`, `twitter`, `scholar`, `cv`, `pubmed`, and `orcid`. Do not add placeholder links.

## Visible UI

Resources, Join, Publications, and Project Index should not appear in visible navigation or footer sections. Resources and Join remain redirect-only compatibility paths, and the shared archive remains linked from `/events` and the footer.
