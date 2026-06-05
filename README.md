# A-STAR - AI in Surgical Technology & Augmentation Research

> Augmenting the surgeon. Advancing the science.

The website for **A-STAR**, a Mayo Clinic research group advancing surgical AI across planning, intraoperative guidance, education, outcomes, and validation.

Official Mayo Clinic research page:
<https://www.mayo.edu/research/labs/artificial-intelligence-surgical-technologies/overview>

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 15 App Router + React 19 |
| Styling | Tailwind CSS v4 |
| 3D / background | `three`, `@react-three/fiber`, `@react-three/drei` |
| Motion | `motion` |
| Contact | mailto: email draft links (no backend required) |
| Theme | Dark-only cosmic identity |
| Hosting | Vercel |

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>.

## Theme

A-STAR is dark-only. The visual system fuses a stellar observatory language with neural network visualization: a deep cosmic field, blue stellar accents, glass panels, and research-theme constellation nodes around the home hero.

Core theme docs live in `THEME.md`. In code, global tokens live in `app/globals.css`; cards and panels should use `.card-glass` or the same glass values: `bg-white/[0.03]`, `border-white/10`, and `backdrop-blur-sm`.

The global background is mounted once in `app/layout.tsx` via `components/cosmic/cosmic-background.tsx`. It lazy-loads the Three.js scene so the first paint is not blocked. Reduced-motion users, compact/touch devices, and lower-capability devices receive the static CSS star fallback instead of the WebGL scene. Desktop-capable users see the star field, neural constellation nodes, hover labels, activation pulses, scroll camera drift, and cursor glow.

## Current Routes

- Home: `/`
- Main Projects page: `/research`
- Individual project pages: `/projects/[slug]`
- Team: `/team`
- News & Events: `/events`
- Contact and collaboration intake: `/contact`

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
- Navigation: `lib/navigation.ts`

## Updating Site Content

Most public copy and structured content is data-driven. Keep updates focused to the files below so
the site stays easy to review and deploy.

### Site-wide information

- Edit `lib/site-config.ts` for the lab name, tagline, canonical site URL, official Mayo Clinic
  lab URL, institution name, and institution address.
- Edit `lib/navigation.ts` for visible navigation and footer links. Do not add visible
  `/publications`, shared archive, or redirect-only route links.
- Edit `app/contact/page.tsx` for contact recipients, mailto subjects, location text, and contact
  card copy.
- Keep the site dark-only. Do not add light-mode language, theme toggles, or light-mode assets.

### Adding pictures and media

- News images live in `public/news/` and are referenced from `lib/news.ts` with paths such as
  `/news/example.jpg`.
- Journal Club or event source images live in `public/events/`, but the compact `/events` page does
  not display Journal Club photos.
- Project media lives in `public/projects/media/` and is referenced from each project's optional
  `media` field in `lib/projects.ts`.
- Team photos live in `public/team/` and are referenced from `lib/team.ts`.
- Use browser-friendly formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.mp4`, or `.webm`.
  Do not reference HEIC uploads directly from the website.
- Keep images optimized. Large news/gallery images should usually stay below 500KB unless detail
  review is the reason for the image.

### Updating news and events

- Add news stories in `lib/news.ts`. Use complete `summary` and `details` fields so the `/events`
  expandable rows do not repeat an incomplete teaser.
- Put conference attendance, summits, research meetings, abstracts, and poster presentations in the
  `conference` news category.
- Put invited lectures, webinars, courses, panels, moderation, and educational presentations in
  `lib/talks.ts`.
- Put Journal Club sessions and calendar-style lab events in `lib/events.ts`.
- Keep Journal Club CTAs pointed at `/contact#journal-club`.
- Add meaningful `tags`, `people`, `projects`, and `publications` only when those relationships are
  accurate.

### Updating projects

- Edit project metadata in `lib/projects.ts`.
- Edit long-form project detail copy in `content/projects/{slug}.ts`.
- Project detail pages are served from `/projects/[slug]`, while the main public project index is
  `/research`.
- Add or update model-card, validation, media, and publication relationships in the project data
  rather than hardcoding them into pages.

### Updating homepage sections

- Homepage composition lives in `app/page.tsx`.
- Section components live in `components/sections/`.
- Collaborator information lives in `lib/collaborators.ts` and renders through the collaborator
  marquee.
- Team data lives in `lib/team.ts`; do not add placeholder social/profile links.

## Project Media

Project demo assets live in:

```text
public/projects/media/
```

Add GIFs, MP4/WebM videos, thumbnails, and posters there, then reference them from the optional `media` field in `lib/projects.ts`.

Suggested names:

- `gonogonet-demo.avif`
- `mosi-demo.gif`
- `siris-demo.gif`
- `project-slug-thumbnail.png`

Use optimized GIFs or MP4/WebM when possible, and add thumbnails/posters for performance.

## Visible Navigation

The visible site navigation is intentionally focused on Projects, Team, News & Events, and Contact. Resources and Join are redirect-only compatibility routes. Shared archive links and the publication index are not part of the visible site navigation, footer, contact page, or command/menu UI.

Team social links render only when a confirmed link is present in `lib/team.ts`.

## Contact

Contact uses `mailto:` links that open the visitor's email client with subject and CC pre-filled. No backend, no API key, no environment variables required beyond `NEXT_PUBLIC_SITE_URL`.

## Logo Notes

Active production logo assets are root-level PNG files in `public/logos/astar/`, exported through `lib/logos.ts`. The site renders one dark-first logo asset per location.

## Validation

```bash
npm run typecheck
npm run build
npm run lint
```
