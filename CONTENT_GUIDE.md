# AIST Website — Content Guide

Everything you'll commonly need to update lives in a small number of files.
No code changes are needed for routine updates — just edit data files and
drop images into the right folders.

## Quick reference

| What you want to change          | Where to edit                          |
| -------------------------------- | -------------------------------------- |
| Lab name, tagline, address       | `lib/site-config.ts`                   |
| Header / footer navigation       | `lib/navigation.ts`                    |
| Team members                     | `lib/team.ts` + photos in `/public/team/` |
| Collaborators                    | `lib/collaborators.ts` + logos in `/public/logos/partners/` |
| Projects (metadata)              | `lib/projects.ts`                      |
| Project page content             | `content/projects/{slug}.ts`           |
| Publications                     | `lib/publications.ts`                  |
| Open positions / hiring          | `lib/openings.ts`                      |
| Home page stats (counters)       | `lib/stats.ts`                         |
| Surgical phases                  | `lib/phases.ts`                        |
| Glossary terms                   | `lib/glossary.ts`                      |
| Latest news (mock)               | `lib/mock-news.ts`                     |
| Upcoming events (mock)           | `lib/mock-events.ts`                   |

---

## Adding a new team member

1. Open `lib/team.ts`.
2. Add a new entry to the `team` array. Required fields:
   - `slug`: lowercase-with-dashes, e.g. `"jane-doe"`. This becomes their URL: `/team/jane-doe`.
   - `name`, `role`, `affiliation`, `bio`
   - `photo`: path like `"/team/jane-doe.jpg"` — file goes in `/public/team/`
   - `initials`: use period notation, e.g. `"J.D."` — shown on playing cards until photo loads
   - `links`: any of `profile`, `email`, `github`, `linkedin`, `twitter`, `scholar`
   - `order`: where they appear in the list (lower = earlier)
   - `featured: true` if they should show on the home page preview
3. Save a square photo (recommend 600×600 minimum) to `/public/team/` matching the path in `photo`.
4. Until the photo is added, the card shows the person's initials on a gradient — no broken images.

### Example entry

```ts
{
  slug: "jane-doe",
  name: "Jane Doe, Ph.D.",
  role: "Research Fellow",
  affiliation: "Mayo Clinic",
  bio: "One paragraph bio about Jane.",
  photo: "/team/jane-doe.jpg",
  initials: "J.D.",
  links: {
    email: "doe.jane@mayo.edu",
    github: "https://github.com/janedoe",
  },
  featured: true,
  order: 8,
},
```

---

## Adding a collaborator

1. Open `lib/collaborators.ts`.
2. Add a new entry with `slug`, `name`, `shortName`, `description`, `logo`, `url`, `order`.
3. Save the logo (PNG or SVG, transparent background preferred) to `/public/logos/partners/` matching the path in `logo`.
4. Without a logo file, the card shows the institution's short name as a styled placeholder.

---

## Adding a project

1. Open `lib/projects.ts` and add the project metadata entry (slug, name, status, phases, URLs, team, etc.).
2. Create `content/projects/{slug}.ts` with the scientific page content (see below).

The project automatically:
- Appears in the home page compact summary (if `featured: true`)
- Appears in the `/projects` index
- Gets its own detail page at `/projects/{slug}`
- Shows in the surgical phase wheel under each of its `phases`
- Links from each `team` member's detail page

### Updating project page content

Each project has a content file at `content/projects/{slug}.ts` that exports a content object with these fields:

```ts
export const myProjectContent = {
  problem: "What is broken clinically...",
  clinicalNeed: "Why this matters...",
  dataSources: "Where the data comes from...",
  methods: "Technical approach...",
  validationPlan: "How claims will be tested...",  // empty string = shows placeholder
  currentStatus: "What stage we're at...",
  modelCard: {
    intendedUse: "...",
    inputs: ["Input A", "Input B"],
    outputs: ["Output A", "Output B"],
    performanceMetrics: "...",
    datasetSize: "...",
    validationStatus: "...",
    limitations: "...",
    deploymentReadiness: "...",
  },
};
```

Any field set to an empty string `""` renders a "Content coming soon" placeholder card.
In development mode, placeholders show a note pointing to the content file.

### Phases available

| Value                   | Description                   |
| ----------------------- | ----------------------------- |
| `"risk-stratification"` | Pre-op risk assessment        |
| `"intra-op-intelligence"` | Real-time during surgery    |
| `"patient-journey"`     | Patient education and prep    |
| `"outcomes-validation"` | External validation cohorts   |

### Status values

| Value         | Meaning                                 |
| ------------- | --------------------------------------- |
| `"concept"`   | Idea / early design stage               |
| `"development"` | Active development                    |
| `"validation"` | Undergoing validation study            |
| `"clinical"`  | In clinical trial                       |
| `"deployed"`  | Deployed to production                  |

---

## Adding a glossary term

1. Open `lib/glossary.ts`.
2. Add a new entry to the `glossary` array:

```ts
{
  slug: "my-term",          // URL-safe identifier
  term: "My Term",          // Display name
  definition: "...",        // 1-2 sentence professional definition
  related: ["other-slug"],  // Optional cross-links to other terms
  category: "Clinical AI",  // Optional category badge
},
```

3. The term appears automatically on `/resources/glossary`, sorted alphabetically.

> **When to add**: add a term when a technical concept appears 3+ times across the site, or when a project page uses specialist vocabulary that a general academic audience might not know.

---

## Updating home page stats

Edit `lib/stats.ts`. The animated counters on the home page pull from this file.

```ts
export const stats = [
  { value: 3097, suffix: "+", label: "Patients validated", sublabel: "Across MOSI cohort" },
  { value: 12, label: "Publications", sublabel: "Peer-reviewed journals" },
  ...
];
```

---

## Image asset guide

| Folder                       | What goes here                                | Recommended format       |
| ---------------------------- | --------------------------------------------- | ------------------------ |
| `/public/logos/`             | AIST official logos                           | PNG (2×) or SVG          |
| `/public/logos/partners/`    | Collaborator institution logos                | PNG transparent or SVG   |
| `/public/team/`              | Team member headshots                         | JPG, square, 600×600+    |
| `/public/projects/`          | Project screenshots, demo thumbnails          | PNG or JPG               |

All images should be optimized before commit (use [Squoosh](https://squoosh.app) or similar).
Logo PNGs above 200KB should be converted to WebP for ~70% size reduction.

---

## Adding a publication

1. Open `lib/publications.ts`.
2. Add a new entry with `slug`, `title`, `authors`, `venue`, `year`, `date`, `url`, `projects`, `team`, `order`.
3. Set `featured: true` to show on the home page "Recent publications" strip.
4. Add the project slug to the `projects` array — the publication then appears on that project's detail page under "Related Publications".

## Adding an open position

1. Open `lib/openings.ts`.
2. Add an entry with `slug`, `title`, `type`, `location`, `summary`, `applyUrl`, `postedAt`.
3. The position appears on `/join`. The home page "Join Us" section surfaces the most recent opening.

## Home page section order

The canonical section order as of Step 5:

| Code | ID               | Label              |
| ---- | ---------------- | ------------------ |
| 01   | `#mission`       | Mission            |
| —    | (after mission)  | Credibility strip  |
| 02   | `#numbers`       | By the numbers     |
| 03   | `#research`      | Research & Projects|
| 04   | `#team`          | Team               |
| 05   | `#news`          | From the lab       |
| 06   | `#collaborators` | Collaborators      |
| 07   | `#join`          | Join Us            |

**Do not reorder sections without updating nav anchor links in `lib/navigation.ts`.**

## Development workflow

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev          # → http://localhost:3000

# Type check
npm run typecheck

# Lint
npm run lint

# Production build
npm run build
```

After editing any data file (`lib/*.ts`) or content file (`content/projects/*.ts`), the dev server hot-reloads automatically.
