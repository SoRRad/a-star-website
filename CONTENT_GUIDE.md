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

## Theme And Surfaces

The site is dark-only. There is no user theme toggle and no runtime theme detection.

Use `.card-glass` for cards and panels, or match its values directly when a utility class is clearer:

```tsx
className="rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-sm"
```

Text color should follow the cosmic pattern:

- Headings: `text-white`
- Primary body: `text-white/80`
- Secondary body: `text-white/60` or `text-[var(--color-muted-foreground)]`
- Fine print: `text-white/40`
- Accent links: `text-[#64B5F6]` or `text-[var(--color-accent)]`

Avoid solid section backgrounds unless the content needs separation; prefer transparent sections or subtle `bg-white/[0.02]`.

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

The compact `/events` page does not display Journal Club photos. Keep the path documented for a
future detail page or media archive, but do not add it back to the visible event list.

SAGES Nashville and ASMBS Bariatric Happy Hour are separate records. Oxford September 2025 items should display month/year only when exact days are not confirmed.

## Contact And Journal Club

Contact and Join are merged at `/contact`.

The contact page uses `mailto:` links only — no forms, no backend, no API keys required.
Three options are presented:

- **General Inquiry**: to `laplante.simon@mayo.edu`, subject "A-STAR inquiry"
- **Journal Club**: to `laplante.simon@mayo.edu`, CC `Alomar.Abdulrahman@mayo.edu`, subject "A-STAR Journal Club inquiry"
- **Project / Collaboration**: to `laplante.simon@mayo.edu`, CC `shahriarirad.reza@mayo.edu`, subject "A-STAR project collaboration inquiry"

Each card shows the recipient addresses as a fallback for visitors whose email client does not open automatically. To update contacts or subjects, edit `app/contact/page.tsx`.

## Logos

Use only root-level PNG assets from `public/logos/astar/` through `lib/logos.ts`. The live site uses the dark-background variants and the transparent neutral mark. Do not render paired logo images for different themes in the DOM.

## Team Links

Team social/profile links are optional and render only when present. Supported keys in `lib/team.ts` are `profile`, `email`, `github`, `linkedin`, `twitter`, `scholar`, `cv`, `pubmed`, and `orcid`. Do not add placeholder links.

## Visible UI

Resources, Join, Publications, Project Index, and Shared archive should not appear in visible
navigation, footer, contact sections, or command/menu UI. Resources and Join remain redirect-only
compatibility paths.
