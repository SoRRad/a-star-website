# Design

## Theme

Dark. The lab operates at the intersection of surgery and machine intelligence — both domains are serious, high-stakes, and precise. A deep cosmos background (`#000814`) signals focus and depth without drama. Light-on-dark is not aesthetic choice; it is register-appropriate: surgeons work under controlled lighting, researchers stare at dark terminals, the work lives in the OR.

## Color

**Strategy: Restrained** — one saturated accent, tinted neutrals throughout, no competing hues.

| Token | Value | Role |
|---|---|---|
| `--color-cosmos-deepest` | `#000814` | Page background |
| `--color-cosmos-deep` | `#01030a` | Deep surface fallback |
| `--color-cosmos-mid` | `#050d20` | Mid-depth surfaces |
| `--color-cosmos-rise` | `#0a1a3a` | Elevated cards, borders |
| `--color-stellar-blue` | `#1e88e5` | Primary accent, CTAs, links |
| `--color-stellar-bright` | `#64b5f6` | Accent highlights, hover states |
| `--color-stellar-glow` | `rgb(30 136 229 / 0.4)` | Shadow/glow effects only |

**Ink scale (white-on-dark):**
- Primary text: `#ffffff`
- Secondary text: `rgb(255 255 255 / 0.8)`
- Tertiary text: `rgb(255 255 255 / 0.6)`
- Muted / metadata: `rgb(255 255 255 / 0.4)`
- Borders: `rgb(255 255 255 / 0.1)` (default), `/ 0.2` (strong)

**Event / category accent system:**
- Conference: `#64B5F6` (stellar-bright)
- Journal Club: `rgb(103 232 249)` (cyan-300)
- Talks: `rgb(110 231 183)` (emerald-300)
- News: `rgb(196 181 253)` (violet-300)
- Publications: `rgb(147 197 253)` (blue-300)

**Never:**
- Pure `#000` or pure `#fff` — always tinted toward the brand hue
- Warm accent colors (coral, amber, gold) — reserved for star-field warm-star detail only
- Gradient text (`background-clip: text`) — banned; use solid `#64B5F6` for accent phrases

## Typography

**Stack:**
| Role | Family | Variable | Weights |
|---|---|---|---|
| Display / headings | Bricolage Grotesque | `--font-bricolage` | 700 (Bold) |
| Body / UI | Geist Sans | `--font-geist` | 400, 500, 600 |
| Mono / metadata / data | Geist Mono | `--font-geist-mono` | 400, 600 |

**Heading utility classes** (defined in `app/globals.css`):

| Class | Size token | Weight | Tracking | Use |
|---|---|---|---|---|
| `.heading-display` | `7rem` | 700 | −0.04em | Hero display only |
| `.heading-xl` | `clamp(2.75rem, 5.5vw, 5rem)` | 700 | −0.03em | Page H1 |
| `.heading-lg` | fluid | 700 | −0.025em | Section H2 |
| `.heading-md` | fluid | 700 | −0.018em | Card/component H3 |
| `.heading-sm` | fluid | 600 | −0.012em | Sub-section labels |

**Body utility classes:**

| Class | Size | Line-height | Use |
|---|---|---|---|
| `.text-lead` | `1.125rem` | `1.65` | Intro paragraphs, hero subtitles |
| `.text-body` | `1rem` | `1.65` | Default body copy |
| `.text-caption` | `0.875rem` | `1.55` | Captions, secondary info |
| `.text-meta` | `0.6875rem` mono | — | ALL-CAPS labels, dates, counts |
| `.eyebrow` | `0.6875rem` mono | — | Section eyebrow labels above headings |

**Light-on-dark compensation:** body `line-height: 1.6`, `letter-spacing: 0.008em`. Applied globally in `html` base styles.

**Rules:**
- Fluid `clamp()` for all heading sizes on brand pages
- `text-wrap: balance` on all headings via utility classes
- `tabular-nums` (`font-feature-settings: "tnum" 1`) on all numeric data, dates, counts
- `font-optical-sizing: auto` on `html` element
- Never set body text below `1rem` (16px)

## Components

### Cards

**`card-glass`** — base glass surface:
```css
background: rgb(255 255 255 / 0.03);
border: 1px solid rgb(255 255 255 / 0.08);
backdrop-filter: blur(8px);
```

**`card-glow`** — adds a blue radial glow pseudo-element that brightens on hover. Applied on top of `card-glass`.

Cards use `rounded-xl` (12px) radius. Hover: `−translateY(1px)` lift + intensified glow.

### Buttons

**`.btn-primary`** — solid stellar-blue, full-rounded pill, `font-weight: 600`, animated glow on hover.

**`.btn-ghost`** — transparent with `border: 1px solid rgb(255 255 255 / 0.15)`, lifts on hover with a faint blue border tint.

### Badges / Pills

Type badges (event type, news category, project status) use the category accent system: rounded-full, `font-mono`, `text-[9px]–text-[10px]`, `uppercase`, `tracking-[0.14em]`. Background at `/0.08` opacity, border at `/0.4`.

### Timeline

Vertical line: `1px` gradient from `#64B5F6/50` → `white/8` → transparent.
Nodes: `14×14px` rounded-full, accent-colored border with matching glow shadow.
Cards: `rounded-xl`, glass surface, left border bar in accent color when expanded.

### Eyebrow labels

`.eyebrow` — mono, 11px, uppercase, `tracking-[0.18em]`, `rgb(255 255 255 / 0.4)`. Always sits above a heading.

## Motion

**Three.js star field** — 2,000 stars, WebGL canvas, lazy-loaded, capability-detected. Disabled on mobile and `prefers-reduced-motion`. DPR capped at 1, antialias off (background canvas).

**Framer Motion `<Reveal>`** — fade + 16px lift on scroll-into-view, `once: true`, 500ms with `[0.22, 1, 0.36, 1]` easing. Used on section headings and card grids.

**Lenis smooth scroll** — `duration: 0.72`, disabled on mobile and `prefers-reduced-motion`.

**Transitions** — card hover: `200ms ease-out`. Badge/filter: `150ms`. Grid-template-rows expand/collapse: `300ms ease-out` (avoids height animation jank).

**Never:** Cursor trails, scroll-jacking, entrance animations on more than 2 elements simultaneously, animations that repeat after first load.

## Layout

Max content width: `max-w-7xl` (1280px), `px-4 sm:px-6 lg:px-8` gutters.
Section vertical rhythm: `py-20 sm:py-24` standard, `py-16` compact.
Grid: 3-column for cards on ≥640px (`sm:grid-cols-3`), 2-column for research/team on ≥1024px.
Timeline: `grid-cols-[6.5rem_1fr]` on ≥640px with 7.25rem left rail for dates.

## Iconography

Lucide React icons only. Size: `h-4 w-4` for inline UI, `h-5 w-5` for feature icons in cards, `h-6 w-6` max. Never decorative-only icons without a label or aria context.
