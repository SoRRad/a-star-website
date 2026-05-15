# AIST — Artificial Intelligence in Surgical Technologies

> Intelligence at every phase of surgical care.

The website for **AIST**, a research lab at Mayo Clinic advancing artificial
intelligence across the full surgical journey — pre-operative planning,
intra-operative guidance, patient education, and external validation.

---

## Stack

| Concern         | Choice                                        |
| --------------- | --------------------------------------------- |
| Framework       | Next.js 15 (App Router) + React 19            |
| Styling         | Tailwind CSS v4                               |
| Components      | Custom + Radix UI primitives                  |
| Content         | TypeScript content files in `content/`        |
| Search          | Custom Fuse.js drawer (Cmd+K)                 |
| Form validation | React Hook Form + Zod                         |
| Theme           | `next-themes` (dark default; light available) |
| Icons           | `lucide-react`                                |
| Animations      | `motion` (Framer Motion v11) + Lenis scroll   |
| Hosting         | Vercel (auto-deploy from `main`)              |
| Analytics       | Plausible (optional, not yet wired)           |

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
│   ├── page.tsx               # Home page
│   ├── opengraph-image.tsx    # Default OG image (edge runtime, 1200×630)
│   ├── projects/[slug]/       # Project detail pages (scientific structure)
│   ├── resources/glossary/    # Glossary page (15 surgical AI terms)
│   ├── contact/               # Contact form (React Hook Form + Zod)
│   ├── join/                  # Open positions + Why AIST
│   └── api/contact/           # Contact form API route handler
├── components/
│   ├── ui/                    # Primitives (Button, Dialog)
│   ├── site/                  # Site chrome (Header, Footer, Logo, Section)
│   ├── sections/              # Page-level sections (CredibilityStrip)
│   ├── lab/                   # Lab-specific (PhaseWheel, PlayingCard, StatusPipeline)
│   └── motion/                # Motion (Reveal, ScalpelProgress, Magnetic, CursorDot)
├── content/
│   └── projects/              # Per-project scientific content (mosi.ts, siris.ts)
├── lib/
│   ├── utils.ts               # cn(), date helpers
│   ├── site-config.ts         # Lab name, tagline, address, social
│   ├── navigation.ts          # Header, footer, search nav
│   ├── phases.ts              # Surgical phase data
│   ├── projects.ts            # MOSI & SIRIS metadata
│   ├── stats.ts               # "By the numbers" figures
│   ├── glossary.ts            # 15 surgical AI terms with categories
│   ├── team.ts                # Team member data
│   ├── publications.ts        # Research publications
│   ├── collaborators.ts       # Partner institutions
│   └── openings.ts            # Job postings
└── public/
    ├── logos/                 # Brand assets
    ├── team/                  # Team member headshots (drop here)
    └── projects/              # Project screenshots
```

---

## Design system

All theme tokens are declared in `app/globals.css` under `@theme`.

### Typography

- **Display**: Bricolage Grotesque (variable, −0.03em tracking)
- **Body**: Geist (modern, technical)
- **Mono**: Geist Mono (labels, counters, BibTeX chrome)

### Motion language

- **Scalpel progress** — scroll indicator: suture wave + No.10 scalpel at leading edge
- **Reveal** (`<Reveal>`) — fade + 16px lift on scroll-into-view
- **Magnetic** (`<Magnetic>`) — spring-damped cursor attraction on CTAs
- **Scramble counter** (`<ScrambleCounter>`) — digit-scramble on first scroll-into-view
- All motion respects `prefers-reduced-motion`

---

## Deployment checklist (production prep)

Before going live:

- [ ] Replace placeholder team photos in `/public/team/` with real headshots
- [ ] Replace placeholder partner logos in `/public/logos/partners/`
- [ ] Update real author lists in `lib/publications.ts`
- [ ] Wire a real email service in `app/api/contact/route.ts` (Resend or Mailgun recommended)
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain
- [ ] Set up Plausible or another analytics provider if desired
- [ ] Register domain and point DNS to Vercel
- [ ] Submit sitemap to Google Search Console: `{domain}/sitemap.xml`

---

## Roadmap

- [x] **Step 1** — Foundation: design system, layout shell, search, theme
- [x] **Step 2** — Home: logo, phase wheel, projects, team, collaborators, "get involved"
- [x] **Step 3** — Projects deep pages with embedded live tools
- [x] **Step 4** — Team, Publications, Logo polish, PlayingCard, Konami egg, scalpel progress
- [x] **Step 5** — Credibility, scientific project pages, glossary, contact form, performance
- [x] **Step 6** — Publications system, Journal Club events, homepage server component, deployment guide

---

## License

© Mayo Foundation for Medical Education and Research. All rights reserved
unless otherwise specified.
