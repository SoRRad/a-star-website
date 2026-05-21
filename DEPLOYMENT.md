# A-STAR Website - Deployment Guide

## Pre-deployment Checklist

### Content

- [ ] Project metadata, model cards, media placeholders, and linked publications reviewed in `lib/projects.ts`.
- [ ] Individual project content reviewed in `content/projects/{slug}.ts`.
- [ ] GoNoGoNet media can be added later under `public/projects/media/`.
- [ ] News & Events records reviewed in `lib/events.ts`, `lib/news.ts`, and `lib/talks.ts`.
- [ ] Contact and Journal Club direct fallback emails confirmed.
- [ ] Production PNG logos are present in `public/logos/astar/` and mapped in `lib/logos.ts`.

### Configuration

- [ ] `NEXT_PUBLIC_SITE_URL` set to production URL.
- [ ] `RESEND_API_KEY` set in Vercel env.
- [ ] `CONTACT_TO_EMAIL` set in Vercel env.
- [ ] `CONTACT_FROM_EMAIL` set to a verified Resend sender.
- [ ] Optional social links updated in `lib/site-config.ts`.

### Email Service

1. Create or use a Resend account.
2. Verify the sending domain in Resend.
3. Add DNS records required by Resend.
4. Create a sending API key.
5. Add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` in Vercel.

If email is not configured, the contact API returns an email-not-configured response instead of reporting success.

## Route Validation

Primary routes:

- [ ] `/`
- [ ] `/research`
- [ ] `/team`
- [ ] `/events`
- [ ] `/contact`
- [ ] `/projects/gonogonet`
- [ ] `/projects/mosi`
- [ ] `/projects/siris`

Compatibility redirects:

- [ ] `/projects` redirects to `/research`
- [ ] `/news` redirects to `/events`
- [ ] `/resources` redirects to `/events`
- [ ] `/resources/glossary` redirects to `/events`
- [ ] `/join` redirects to `/contact#collaborate`

Kept detail routes:

- [ ] `/news/[slug]` detail pages render and link back to `/events`.
- [ ] `/projects/[slug]` detail pages render and link back to `/research`.

## Manual Test Pass

- [ ] Run `npm run typecheck`.
- [ ] Run `npm run build`.
- [ ] Run `npm run lint`.
- [ ] Start production server with `npm run start`.
- [ ] Hard refresh the key routes above.
- [ ] Check no hydration errors.
- [ ] Check no broken image icons.
- [ ] Check no horizontal overflow on mobile.
- [ ] Check robotic progress indicator is hidden below `md`.
- [ ] Check scrolling is responsive on desktop and native on mobile.
- [ ] Check light and dark themes remain readable.
- [ ] Check contact, collaboration, and Journal Club form fallbacks are truthful when email is not configured.

## Current Information Architecture

- Main Projects page is `/research`.
- Individual project pages are `/projects/[slug]`.
- News and Events are merged at `/events`.
- Contact and Join are merged at `/contact`.
- Resources page is removed from active navigation; selected materials are linked from `/events` and the footer shared archive link.
