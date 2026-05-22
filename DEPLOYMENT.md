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

Contact uses `mailto:` links only. No Resend API key or email service is required.

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
- Confirm mobile has no horizontal overflow and the robotic scroll indicator is hidden.
