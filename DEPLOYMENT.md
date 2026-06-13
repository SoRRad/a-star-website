# A-STAR Deployment Notes

## Checks

Run before deployment:

```bash
npm run typecheck
npm run build
npm run lint
```

## Required Environment

```bash
NEXT_PUBLIC_SITE_URL=https://a-starlab.com
```

Set this in the Vercel project settings (Production environment) so `siteConfig.url`,
`metadataBase`, the sitemap, and `robots.txt` all resolve to `https://a-starlab.com` instead of
the Vercel preview/production domain.

Contact uses `mailto:` links only. No Resend API key or email service is required.

## Security Headers

Configured in `next.config.ts`'s `headers()` and applied to every route:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Content-Security-Policy-Report-Only` — observation-only for now. It reports violations without
  blocking anything; review reports before tightening it into an enforced
  `Content-Security-Policy`.
- `Strict-Transport-Security` (HSTS) — added only when `NODE_ENV === "production"`, since HSTS
  should not be sent over plain HTTP in local/dev environments.

## Route Validation

Primary routes:

- `/`
- `/research`
- `/team`
- `/events`
- `/contact`
- `/projects/gonogonet`
- `/projects/mosi`
- `/projects/siris`

Compatibility redirects:

- `/projects` -> `/research`
- `/news` -> `/events`
- `/resources` -> `/events`
- `/resources/glossary` -> `/events`
- `/join` -> `/contact#collaborate`

These redirects are for old links only and should not appear as active navigation destinations.

## Manual Smoke Test

- Hard refresh the primary routes.
- Confirm `/research` has no global publication dashboard.
- Confirm individual project pages show project-linked publications/media.
- Confirm Journal Club links open `/contact#journal-club` and the mailto button opens an email draft.
- Confirm Project/Collaboration mailto button opens email with correct CC.
- Confirm the dark-only cosmic theme is readable.
- Confirm mobile has no horizontal overflow.
