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
RESEND_API_KEY=
CONTACT_TO_EMAIL=shahriarirad.reza@mayo.edu
CONTACT_FROM_EMAIL=
```

`CONTACT_FROM_EMAIL` must be a verified Resend sender. If email is not configured, the contact API returns an email-not-configured error and the forms show direct email fallbacks.

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
- Confirm Journal Club RSVP links open `/contact#journal-club`.
- Confirm contact forms do not show fake success when email is not configured.
- Confirm light and dark modes are readable.
- Confirm mobile has no horizontal overflow and the robotic scroll indicator is hidden.
