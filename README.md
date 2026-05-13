# AIST — Artificial Intelligence in Surgical Technologies

> Intelligence at every phase of surgical care.

The website for **AIST**, a research lab at Mayo Clinic advancing artificial
intelligence across the full surgical journey — pre-operative planning,
intra-operative guidance, post-operative recovery, and external validation.

---

## Stack

| Concern         | Choice                                        |
| --------------- | --------------------------------------------- |
| Framework       | Next.js 15 (App Router) + React 19            |
| Styling         | Tailwind CSS v4                               |
| Components      | Custom + Radix UI primitives                  |
| Content (later) | MDX via Velite                                |
| Search          | `cmdk` palette (Cmd+K)                        |
| Theme           | `next-themes` (dark default; light available) |
| Icons           | `lucide-react`                                |
| Animations      | `motion` (Framer Motion v11) + Lenis scroll   |
| Hosting         | Vercel (auto-deploy from `main`)              |
| Analytics       | Plausible (optional)                          |

---

## Quick start

```bash
# 1. Install
npm install

# 2. Copy environment template
cp .env.example .env.local

# 3. Run the dev server
npm run dev
```

Open <http://localhost:3000>. The site defaults to dark mode.

---

## Project structure

```
aist-website/
├── app/
│   ├── globals.css            # Design system (all CSS variables live here)
│   ├── layout.tsx             # Root layout: fonts, theme, header, footer, cursor
│   └── page.tsx               # Home page (full Step 2 build)
├── components/
│   ├── ui/                    # Primitives (Button, Dialog, …)
│   ├── site/                  # Site chrome (Header, Footer, Logo, Nav, Section)
│   ├── lab/                   # Lab-specific (PhaseWheel, FeaturedProjects)
│   └── motion/                # Motion (Reveal, ScrollProgress, Magnetic, CursorDot, ScrambleCounter)
├── content/                   # MDX content (added in Step 3+)
├── lib/
│   ├── utils.ts               # cn(), date helpers
│   ├── site-config.ts         # Lab name, tagline, address, social — edit this
│   ├── navigation.ts          # Header, footer, command palette nav
│   ├── phases.ts              # Surgical phase data (PhaseWheel)
│   ├── projects.ts            # MOSI & SIRIS metadata
│   ├── stats.ts               # "By the numbers" figures
│   ├── now.ts                 # Current lab focus (NowStatus pill)
│   ├── glossary.ts            # Surgical-AI term definitions
│   ├── mock-news.ts           # Placeholder news (Step 5 → MDX)
│   ├── mock-events.ts         # Placeholder events (Step 5 → MDX)
│   └── mock-team.ts           # Placeholder team (Step 4 → MDX)
├── public/
│   ├── logos/                 # Brand assets (see "Brand assets" below)
│   ├── team/                  # Drop team photos here (Step 4)
│   ├── projects/              # Project images, demo thumbnails (Step 3)
│   ├── og/                    # Open Graph share images
│   └── favicon.svg
└── README.md
```

---

## Customizing

| Want to change            | Edit                          |
| ------------------------- | ----------------------------- |
| Lab name / tagline        | `lib/site-config.ts`          |
| Current lab focus pill    | `lib/now.ts`                  |
| Surgical phase data       | `lib/phases.ts`               |
| Project metadata          | `lib/projects.ts`             |
| "By the numbers" figures  | `lib/stats.ts`                |
| Glossary definitions      | `lib/glossary.ts`             |
| News items (placeholder)  | `lib/mock-news.ts`            |
| Events (placeholder)      | `lib/mock-events.ts`          |
| Team members (placeholder)| `lib/mock-team.ts`            |
| Header navigation         | `lib/navigation.ts → primaryNav` |
| Colors / fonts            | `app/globals.css`             |

---

## Brand assets

All production logos live in `public/logos/`. Follow these conventions:

| File                    | Usage                                   |
| ----------------------- | --------------------------------------- |
| `aist-mark.png`         | Header mark, phase wheel center, favicons |
| `aist-full-dark.png`    | Hero section in dark mode               |
| `aist-full-light.png`   | Hero section in light mode              |
| `mayo-clinic.svg`       | Affiliation strip + collaborators wall  |

**Partner logos:** Add SVG or PNG files to `public/logos/`. Update the
`collaborators` array in `app/page.tsx` → `CollaboratorsStrip` with the path
and institution name. Prefer SVG; use `width` / `height` attrs to constrain.

**Naming convention:** `partner-{institution-kebab}.{svg|png}` — no spaces,
no version numbers in filenames.

---

## Design system

All theme tokens are declared in `app/globals.css` under `@theme`.

### Palette

- **Navy 900** `#061632` — dominant primary (updated in Step 2 to match logo)
- **Navy 1000** `#03091a` — ultra-deep accent backgrounds ("Get involved" strip)
- **Blue 500** `#1E88E5` — electric accent
- **Coral 400** `#FB7185` — reserved for "new" badges and urgent CTAs

### Typography

- **Display**: Bricolage Grotesque (variable; architectural, tight at −0.03em tracking)
- **Body**: Geist (modern, technical, exceptional reading)
- **Mono**: Geist Mono (BibTeX, code, technical chrome, counters)

### Motion language

- **EKG pulse** (`.animate-ekg`) — live indicators and the scroll progress dot
- **Logo entrance** (`.animate-logo-entrance`) — scale-in + fade on mount
- **Reveal** (`<Reveal>`) — fade + 16px lift, triggered by scroll into view
- **Magnetic** (`<Magnetic>`) — spring-damped cursor attraction on CTA buttons
- **Scramble counter** (`<ScrambleCounter>`) — digit-scramble on first scroll-into-view
- All motion respects `prefers-reduced-motion`

---

## Working with Claude Code

Once Step 3 ships, adding a new team member, publication, or news item
is one file in `content/`. Suggested prompts during the build:

- "Add a new team member: name X, role Y, photo path Z."
- "Add a publication: title, authors, venue, year, PDF link, project tag."
- "Update the MOSI project status from 'validation' to 'clinical'."
- "Replace the mock news with real items from this list: …"

---

## Deployment

### Vercel (recommended)

1. Push the repo to GitHub.
2. Import the repo at <https://vercel.com/new>.
3. Set `NEXT_PUBLIC_SITE_URL` to the production URL.
4. Deploy — every push to `main` redeploys automatically.

---

## Roadmap

- [x] **Step 1** — Foundation: design system, layout shell, command palette, theme
- [x] **Step 2** — Full home: new logo (PNG), Bricolage Grotesque, dark default, Lenis scroll, phase wheel, featured projects, scramble counters, news + events, team preview, collaborators, "get involved" CTA strip, magnetic buttons, cursor dot, scroll progress bar
- [ ] **Step 3** — Projects: MOSI and SIRIS deep pages with embedded live tools
- [ ] **Step 4** — Team & About: members, collaborators, alumni with MDX profiles
- [ ] **Step 5** — Publications, News, Events with filtering and BibTeX export
- [ ] **Step 6** — Resources, Join, Contact, co-authorship graph, accessibility & SEO polish

### Step 2 TODOs for the user

- **Drop the three PNG logo files** into `public/logos/`:
  `aist-full-dark.png`, `aist-full-light.png`, `aist-mark.png`
- **Update `lib/stats.ts`** with real publication count and institution count
- **Replace collaborator logo placeholders** in `app/page.tsx → CollaboratorsStrip`
- **Update `lib/mock-news.ts` and `lib/mock-events.ts`** with real content
- **Add team photos** to `public/team/` and update `lib/mock-team.ts` avatarSrc fields

---

## License

© Mayo Foundation for Medical Education and Research. All rights reserved
unless otherwise specified.
