# A-STAR - AI in Surgical Technology & Augmentation Research

> Augmenting the surgeon. Advancing the science.

The website for **A-STAR**, a Mayo Clinic research group advancing surgical AI across planning, intraoperative guidance, education, outcomes, and validation.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 15 App Router + React 19 |
| Styling | Tailwind CSS v4 |
| 3D / background | `three`, `@react-three/fiber`, `@react-three/drei` |
| Motion | `motion` |
| Forms | Client validation + server-side contact API |
| Theme | Dark-only cosmic identity |
| Email | Resend server-side only |
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

## Contact Form Environment

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=
CONTACT_TO_EMAIL=shahriarirad.reza@mayo.edu
CONTACT_FROM_EMAIL=
```

If `RESEND_API_KEY` or `CONTACT_FROM_EMAIL` is missing, the API returns `email_not_configured` and the UI tells the user that email delivery is not configured. The site does not pretend a message was sent.

## Logo Notes

Active production logo assets are root-level PNG files in `public/logos/astar/`, exported through `lib/logos.ts`. The site renders one dark-first logo asset per location.

## Validation

```bash
npm run typecheck
npm run build
npm run lint
```
