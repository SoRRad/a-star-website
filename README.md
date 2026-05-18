# A-STAR — AI in Surgical Technology & Augmentation Research

> Augmenting the surgeon. Advancing the science.

The website for **A-STAR**, a Mayo Clinic research group advancing artificial intelligence across the surgical journey: planning, intraoperative intelligence, patient education, outcomes, and validation.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 15 App Router + React 19 |
| Styling | Tailwind CSS v4 |
| Search | Fuse.js inside the site sidebar |
| Forms | React Hook Form / client forms + server-side contact API |
| Theme | `next-themes` with dark default and light mode available |
| Email | Resend server-side only |
| Hosting | Vercel |

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. The site defaults to dark mode; light mode remains available from the theme toggle.

## Content Map

- Logos: `public/logos/astar/` and `lib/logos.ts`
- Publications: `lib/publications.ts`
- Projects and model cards: `lib/projects.ts` and `content/projects/`
- Team: `lib/team.ts` and `public/team/`
- News: `lib/news.ts` and `public/news/`
- Events: `lib/events.ts`
- Talks and education resources: `lib/talks.ts`
- Resources: `lib/archive.ts`, `app/resources/`, and `app/resources/glossary/`
- Navigation: `lib/navigation.ts`
- Site metadata: `lib/site-config.ts`

## Project Structure

```text
app/
  layout.tsx              Root layout, metadata, theme anti-flash script
  page.tsx                Home page
  research/               Research dashboard, journey map, model cards
  resources/              Resources hub and glossary
  join/                   Open positions and project intake form
  news/                   News index and detail pages
  api/contact/            Server-side contact endpoint
components/
  site/                   Header, sidebar, footer, layout chrome
  resources/              Talk/resource cards
  research/               Surgical journey map and model cards
  sections/               Home page sections
  lab/                    Project/team/cards and lab UI
lib/
  *.ts                    Structured content and config
public/
  logos/astar/            Production A-STAR logo assets
  news/                   News images
  team/                   Team headshots
```

## Security And Environment

Keep secrets server-side. Do not expose `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, or `CONTACT_FROM_EMAIL` to client code.

Required/optional environment variables:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=
CONTACT_TO_EMAIL=shahriarirad.reza@mayo.edu
CONTACT_FROM_EMAIL=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
GITHUB_TOKEN=
```

Node is pinned to `20.x` in `package.json`; `.nvmrc` should contain `20`. Do not add `output: "export"` because the contact API and dynamic metadata rely on server runtime behavior.

## Git Workflow

```bash
git status
npm run typecheck
npm run build
npm run lint
git add .
git commit -m "Describe change"
git push
```

Avoid committing `.next`, `node_modules`, `.env.local`, or raw local design assets. Production logo assets belong in `public/logos/astar/`; the temporary `New logos` folder is only a local handoff source.

## Logo Notes

Current production logo assets are PNG files in `public/logos/astar/`. Existing SVG files are legacy/outdated and should not be used until regenerated from the new logo. Use mark-only PNGs for the hero/header/sidebar, horizontal PNGs for footer wordmark contexts, `favicon-512.png` for favicon metadata, `apple-touch-icon.png` for Apple icons, and `astar-og-image.png` or the dynamic `/opengraph-image` route for social sharing.

## Talks

Add selected talks, courses, and educational resources in `lib/talks.ts`. Use verified titles, dates, venues, and links when available. For planned talks without exact details, mark `status: "details-forthcoming"` and replace the placeholder once exact dates, titles, images, or resource URLs are confirmed.

## Deployment Checklist

- Set `NEXT_PUBLIC_SITE_URL` to the production domain.
- Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` in Vercel.
- Verify `/news` remains accessible.
- Verify all paths in `lib/logos.ts`, `lib/team.ts`, and `lib/news.ts` resolve to files in `public/`.
- Submit `{domain}/sitemap.xml` after launch.

© Mayo Foundation for Medical Education and Research. All rights reserved unless otherwise specified.
