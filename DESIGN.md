# Design

## Theme

**Dark.** Physical scene: a surgical AI researcher at their workstation late in the evening, dark monitor, scanning publications and project pages for technical detail. The dark surface is register-correct, not a trend choice. It matches where this audience works, what they trust, and the seriousness of the domain — surgery is high-stakes and the design should feel like it.

Color strategy: **Restrained** by deliberate choice. One saturated accent (stellar blue) against deep tinted neutrals. This is not laziness — it is the anti-reference constraint: AI startup pages use committed or drenched color strategies, which is exactly what A-STAR should not look like. The accent appears only where it earns its place: CTAs, active states, data highlights, the star field.

## Color

| Token | Value | Role |
|---|---|---|
| `--color-cosmos-deepest` | `#000814` | Page background |
| `--color-cosmos-deep` | `#01030a` | Deep surface fallback |
| `--color-cosmos-mid` | `#050d20` | Mid-depth surfaces |
| `--color-cosmos-rise` | `#0a1a3a` | Elevated cards, active borders |
| `--color-stellar-blue` | `#1e88e5` | Primary accent, CTAs |
| `--color-stellar-bright` | `#64b5f6` | Hover states, accent text, star glow |
| `--color-stellar-glow` | `rgb(30 136 229 / 0.4)` | Glow/shadow only — never fill |

**Ink scale:**
| Name | Value | Use |
|---|---|---|
| Primary | `#ffffff` | Headlines, labels |
| Secondary | `rgb(255 255 255 / 0.8)` | Body text |
| Tertiary | `rgb(255 255 255 / 0.6)` | Supporting copy |
| Muted | `rgb(255 255 255 / 0.4)` | Metadata, eyebrows, dates |
| Whisper | `rgb(255 255 255 / 0.2)` | Borders, dividers |

**Category accent palette** (events, news, badges):
| Category | Color | Tailwind approx |
|---|---|---|
| Conference | `#64B5F6` | `[#64B5F6]` |
| Journal Club | `rgb(103 232 249)` | `cyan-300` |
| Talks | `rgb(110 231 183)` | `emerald-300` |
| News / Lab Update | `rgb(196 181 253)` | `violet-300` |
| Publications | `rgb(147 197 253)` | `blue-300` |

**Absolute color rules:**
- Never `#000` or `#fff` — always tinted toward the brand hue
- No gradient text (`background-clip: text`) — use solid `#64B5F6` for accent phrases
- No warm accent colors (coral, amber, gold) — reserved for star-field warm-star particles only
- No competing accent hues on the same surface

## Typography

### Type stack

| Role | Family | CSS variable | Loaded weights |
|---|---|---|---|
| Display / headings | Bricolage Grotesque | `--font-bricolage` | 700 |
| Body / UI | Geist Sans | `--font-geist` | 400, 500, 600 |
| Mono / metadata / data | Geist Mono | `--font-geist-mono` | 400, 600 |

These are identity fonts — do not swap them without a brand-level decision.

### Heading utility classes (`app/globals.css`)

| Class | Size | Weight | Tracking | Line-height | Use |
|---|---|---|---|---|---|
| `.heading-display` | `7rem` | 700 | −0.04em | 0.95 | Hero display only |
| `.heading-xl` | `clamp(2.75rem, 5.5vw, 5rem)` | 700 | −0.03em | 1.0 | Page H1 |
| `.heading-lg` | fluid | 700 | −0.025em | 1.1 | Section H2 |
| `.heading-md` | fluid | 700 | −0.018em | 1.15 | Card / component H3 |
| `.heading-sm` | fluid | 600 | −0.012em | 1.2 | Sub-section labels |

All heading classes include `text-wrap: balance` and `font-family: var(--font-bricolage)`.

### Body utility classes

| Class | Size | Line-height | Letter-spacing | Use |
|---|---|---|---|---|
| `.text-lead` | `1.125rem` | `1.65` | `0.005em` | Hero subtitles, intro paragraphs |
| `.text-body` | `1rem` | `1.65` | `0.008em` | Default body copy |
| `.text-caption` | `0.875rem` | `1.55` | `0.01em` | Captions, secondary info |
| `.text-meta` | `0.6875rem` mono | `1` | `0.18em` uppercase | ALL-CAPS data labels |
| `.eyebrow` | `0.6875rem` mono | `1` | `0.18em` uppercase | Section eyebrow above headings |

### Typography rules

- Fluid `clamp()` on all headings on brand pages; fixed `rem` for dense UI components
- `text-wrap: balance` on headings via utility class (never Tailwind `text-balance` alone)
- `tabular-nums` on all numeric data, dates, counts, metrics
- `font-optical-sizing: auto` set on `html` globally
- Body text minimum: `1rem` (16px) — never smaller
- Line-length cap: `max-w-2xl` (≈65ch) on readable prose blocks
- Light-on-dark compensation: `line-height: 1.6`, `letter-spacing: 0.008em` on body globally

## Components

### Surfaces

**`card-glass`** — base glass card:
```css
background: rgb(255 255 255 / 0.03);
border: 1px solid rgb(255 255 255 / 0.08);
backdrop-filter: blur(8px);
```
Use `rounded-xl` (12px). Hover: `−translateY(4px)` + border brightens slightly.

**`card-glow`** — layered on top of `card-glass`. Adds a blue radial pseudo-element glow that intensifies on hover via `::before`.

### Buttons

**`.btn-primary`** — stellar-blue pill, `font-weight: 600`, animated glow shadow on hover. For primary CTAs only.

**`.btn-ghost`** — transparent with `border: 1px solid rgb(255 255 255 / 0.15)`. Lifts on hover with a faint blue border tint.

**Compact CTA** (inside cards/rows): `rounded-lg bg-[var(--color-accent)] px-3.5 py-1.5 text-xs font-semibold` — not `.btn-primary` (wrong padding scale).

### Badges / Pills

Category badges: `rounded-full border px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.14em]`. Background at `/0.08` opacity, border at `/0.4`. Use category accent colors above.

### Timeline (events page)

- Vertical spine: `1px` gradient `#64B5F6/50` → `white/8` → `transparent`, positioned at `left-3` mobile / `left-[7.25rem]` desktop
- Nodes: `14×14px` `rounded-full`, accent-colored border + matching box-shadow glow
- Cards: `rounded-xl glass` surface, expand/collapse via `grid-template-rows` transition
- Date rail: `6.5rem` fixed column, `font-mono text-[11px] tabular-nums`, right-aligned

### Eyebrow labels

`.eyebrow` — always precedes a heading. Mono, 11px, uppercase, `tracking-[0.18em]`, `rgb(255 255 255 / 0.4)`. Never used without a heading immediately after.

### Filter bars

Pill buttons: `rounded-full border font-mono text-[10px] uppercase tracking-widest`. Inactive: `border-white/10 text-white/40`. Active: category accent color (border + background tint + text). Always include an item count inside each pill.

## Motion

**Three.js star field** — 2,000 stars, WebGL canvas, `dpr={[1,1]}`, antialias off. Lazy-loaded via `React.lazy`. Capability-detected: disabled on mobile (`max-width: 767px`), disabled on `prefers-reduced-motion`. `powerPreference: "default"`.

**Framer Motion `<Reveal>`** — `opacity: 0 → 1` + `y: 16 → 0` on scroll-into-view. `once: true`, 500ms, `[0.22, 1, 0.36, 1]` easing. Applied to section headings and card grids, never to individual list items (too much noise).

**Lenis smooth scroll** — `duration: 0.72`. Disabled on mobile and `prefers-reduced-motion`.

**Transition speeds** — card hover: `200ms ease-out`. Filter/badge: `150ms`. Expand/collapse: `300ms ease-out` via `grid-template-rows` (not `height` — avoids layout thrashing).

**Motion rules:**
- Ease out only (exponential). No bounce, no elastic, no spring overshoot
- Never animate layout properties (`width`, `height`, `padding`, `margin`) — use `transform` and `grid-template-rows`
- No entrance animations on more than 2 elements simultaneously
- No animations that repeat after first load
- No cursor trails, scroll-jacking, or parallax on content

## Layout

- Max content width: `max-w-7xl` (1280px)
- Gutters: `px-4 sm:px-6 lg:px-8`
- Section vertical rhythm: `py-20 sm:py-24` standard, `py-16` compact
- Card grids: `sm:grid-cols-3` for news/features, `lg:grid-cols-2` for research/team
- Timeline rail: `grid-cols-[6.5rem_1fr]` on `sm:` breakpoint
- Prose line length: `max-w-2xl` or `max-w-3xl` depending on context

## Iconography

Lucide React only. `h-4 w-4` inline UI, `h-5 w-5` card feature icons, `h-6 w-6` max. Never purely decorative without accessible label.
