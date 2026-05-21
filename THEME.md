# A-STAR Cosmic Theme

## Concept

A-STAR combines two visual systems: an astronomical observatory and a neural network. The background should feel like a quiet star field, while the brighter constellation nodes suggest research themes firing through a surgical AI system.

The goal is memorable without becoming decorative noise: content stays readable, panels are translucent, and motion remains slow.

## Palette

Core tokens live in `app/globals.css`.

| Token | Value | Use |
| --- | --- | --- |
| `--color-cosmos-deepest` | `#000814` | Page base |
| `--color-cosmos-deep` | `#01030a` | Depth gradient |
| `--color-cosmos-mid` | `#050d20` | Dark panels and legacy navy alias |
| `--color-stellar-blue` | `#1E88E5` | Primary accent |
| `--color-stellar-bright` | `#64B5F6` | Active links, hover states, node glow |
| `--surface-glass` | `rgba(255,255,255,0.03)` | Cards and panels |
| `--color-border` | `rgba(255,255,255,0.1)` | Card borders and dividers |

Use `text-white`, `text-white/80`, `text-white/60`, and `text-white/40` for hierarchy. Accent links should use `#64B5F6` or `var(--color-accent)`.

## Typography

Display type uses Bricolage Grotesque through `next/font/google`; body and mono use Geist. Letter spacing is intentionally normal across display text so the site stays clinical and legible.

## Components

Use `.card-glass` for repeated cards and panels. Most sections should be transparent so the global star field remains visible. Add `bg-white/[0.02]` only when a section needs separation.

Buttons use rounded cosmic treatments from `components/ui/button.tsx`:

- `accent`: solid stellar blue.
- `outline`: glass primary CTA.
- `ghost`: subtle text action.

## Cosmic Background

The background system lives in `components/cosmic/`:

- `cosmic-background.tsx`: capability detection, reduced-motion detection, lazy loading.
- `star-field.tsx`: Three.js scene and scroll camera drift.
- `neural-nodes.tsx`: research-theme constellation nodes and hover labels.
- `activation-pulses.tsx`: periodic neural firing pulses.
- `cosmic-fallback.tsx`: static CSS star field.
- `cursor-glow.tsx`: desktop pointer glow.

Default scene constants:

- Star count: `8000`
- Neural nodes: `14`
- Field depth: `800`
- Field radius: `400`

To tune the scene, edit the constants in `star-field.tsx`, the `COSMIC_NODES` array in `neural-nodes.tsx`, and the pulse timing in `activation-pulses.tsx`.

## Performance

The Three.js scene is lazy-loaded with `React.lazy`, so it is split out of the initial app bundle. The CSS fallback renders while capability detection runs and remains active for reduced-motion users, compact/touch devices, and low-capability devices.

Keep new images optimized, avoid adding local animated overlays on top of the global background, and prefer static CSS effects when the page does not need WebGL.
