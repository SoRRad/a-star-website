# A-STAR Content Guide

## Route Structure

- Main Projects page: `/research`
- Individual project pages: `/projects/[slug]`
- News & Events: `/events`
- Contact, collaboration intake, and Journal Club intake: `/contact`
- Publications: `/publications`

Removed from active navigation:

- Project index route `/projects` now redirects to `/research`.
- News index `/news` now redirects to `/events`; `/news/[slug]` detail pages remain.
- Resources routes redirect to `/events`.
- Join route redirects to `/contact#collaborate`.

## Projects

Edit project metadata in `lib/projects.ts`.

Each project supports:

- `slug`
- `name`
- `longName`
- `tagline`
- `description`
- `status`
- `phases`
- `team`
- `collaborators`
- `media`
- `modelCard`

Project detail prose lives in `content/projects/{slug}.ts`. Individual pages are generated automatically at `/projects/[slug]`.

## Project Media

Media assets live in:

```text
public/projects/media/
```

Suggested file names:

- `gonogonet-demo.gif`
- `mosi-demo.gif`
- `siris-demo.gif`
- `project-slug-thumbnail.png`

Use optimized GIFs or MP4/WebM when possible. Add thumbnail/poster images for videos to keep the Projects page fast.

Example media entry:

```ts
media: [
  {
    type: "gif",
    src: "/projects/media/gonogonet-demo.gif",
    alt: "GoNoGoNet demo",
    caption: "GoNoGoNet safety-zone visualization demo",
  },
]
```

If media is not ready, use placeholder entries with captions such as `Demo GIF forthcoming`, `Annotated video preview forthcoming`, or `Model output thumbnail forthcoming`.

## GoNoGoNet

GoNoGoNet is configured in `lib/projects.ts` with linked publications and talks. Add future GoNoGoNet media to `public/projects/media/` and reference it from the project `media` array.

Linked PubMed records are in `lib/publications.ts`:

- PMID 35918549
- PMID 37697115

Do not invent publication metadata. If a title, venue, date, or author list cannot be verified, mark the record clearly as metadata to confirm.

## News & Events

Use:

- `lib/events.ts` for Journal Club and lab calendar events.
- `lib/talks.ts` for talks, courses, webinars, Oxford sessions, ASMBS items, and project-linked education records.
- `lib/news.ts` for lab updates and news detail pages.

The merged public page is `/events`.

Grouping rules currently used on `/events`:

- Oxford September 2025 items are grouped under `Sixth IBC Oxford University World Congress 2025`.
- ASMBS 2026 talks are grouped under `ASMBS Annual Meeting 2026`.
- SAGES Nashville remains separate from ASMBS Bariatric Happy Hour.
- ASMBS Bariatric Happy Hour includes both the ASMBS page and YouTube URL.

Shared archive CTA:

```text
https://drive.google.com/drive/folders/14j7C__2NIsRNPPbnrschwiKW7UKv7uOu
```

## Contact Forms

Contact and Join are merged at `/contact`.

Forms:

- General inquiry: `app/contact/contact-form.tsx`
- Collaboration/project intake: `app/contact/project-intake-form.tsx`
- Journal Club intake: `app/contact/journal-club-form.tsx`
- Server route: `app/api/contact/route.ts`

Journal Club fields are intentionally limited to:

- Name
- Email
- Affiliation
- Role
- Session interest
- Message

Environment variables:

```bash
RESEND_API_KEY=
CONTACT_TO_EMAIL=shahriarirad.reza@mayo.edu
CONTACT_FROM_EMAIL=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

If email delivery is not configured, the API returns a truthful fallback and the UI directs users to email the lab directly.

## Logos

Use only root-level PNG files from `public/logos/astar/` through `lib/logos.ts`.

Do not use old SVG logos, `public/logos/astar/clean/`, or `public/logos/astar/current/` in active UI.

## Spelling

Use US spelling across visible content:

- theater
- behavior
- optimize
- visualization
- modeling
- analyzed
- center
- program

Prefer `intraoperative`, `preoperative`, and `postoperative` unless a formal title requires another spelling.
