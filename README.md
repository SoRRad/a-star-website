# A-STAR - AI in Surgical Technology & Augmentation Research

> Augmenting the surgeon. Advancing the science.

The website for **A-STAR**, a Mayo Clinic research group advancing surgical AI across planning, intraoperative guidance, education, outcomes, and validation.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 15 App Router + React 19 |
| Styling | Tailwind CSS v4 |
| Forms | Client validation + server-side contact API |
| Theme | `next-themes` |
| Email | Resend server-side only |
| Hosting | Vercel |

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>.

## Current Routes

- Home: `/`
- Main Projects page: `/research`
- Individual project pages: `/projects/[slug]`
- Team: `/team`
- News & Events: `/events`
- Contact and Join: `/contact`
- Publications: `/publications`

Compatibility redirects:

- `/projects` redirects to `/research`
- `/news` redirects to `/events`
- `/resources` and `/resources/glossary` redirect to `/events`
- `/join` redirects to `/contact#collaborate`

## Content Map

- Logos: `public/logos/astar/` and `lib/logos.ts`
- Projects, model cards, and media metadata: `lib/projects.ts`
- Project detail copy: `content/projects/{slug}.ts`
- Publications: `lib/publications.ts`
- Team: `lib/team.ts` and `public/team/`
- News: `lib/news.ts` and `public/news/`
- Events: `lib/events.ts`
- Talks and education records: `lib/talks.ts`
- Shared archive metadata: `lib/archive.ts`
- Navigation: `lib/navigation.ts`

## Project Media

Project demo assets live in:

```text
public/projects/media/
```

Add GIFs, MP4/WebM videos, thumbnails, and posters there, then reference them from the optional `media` field in `lib/projects.ts`.

Suggested names:

- `gonogonet-demo.gif`
- `mosi-demo.gif`
- `siris-demo.gif`
- `project-slug-thumbnail.png`

Use optimized GIFs or MP4/WebM when possible, and add thumbnails/posters for performance.

## Contact Form Environment

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=
CONTACT_TO_EMAIL=shahriarirad.reza@mayo.edu
CONTACT_FROM_EMAIL=
```

If `RESEND_API_KEY` or `CONTACT_FROM_EMAIL` is missing, the API returns a truthful email-not-configured response and the UI directs users to email the lab directly.

## Logo Notes

Active production logo assets are root-level PNG files in `public/logos/astar/`, exported through `lib/logos.ts`. Do not use old SVG files, `public/logos/astar/clean/`, or `public/logos/astar/current/` in active UI.

## Validation

```bash
npm run typecheck
npm run build
npm run lint
```
