# News images

Place news images here. Filenames should match the `image` or `images` fields
in each news item's entry in `lib/news.ts`.

Recommended dimensions: 1600x900 or larger in the same aspect family,
optimized JPEG/WebP/PNG, and preferably under 500KB for large gallery images.

Do not reference HEIC uploads directly from the website. Convert source HEIC
files to `.jpg`, `.jpeg`, `.png`, or `.webp` before adding them to `lib/news.ts`.

If an image is missing, the news card will gracefully fall back to a styled
gradient placeholder showing the category and date.

## Current news items expecting images

- `balfour-symposium-2025.jpg`: Balfour Surgery Research Symposium 2025
- `madani-visit-2025.jpg`: Dr. Amin Madani visit to Mayo Clinic
- `madani-visit-2025-2.jpg`: A-STAR team with Dr. Madani
- `sages-2026.jpg`: SAGES Annual Meeting 2026
- `asmbs-2026.jpg`: ASMBS Annual Meeting 2026
- `asmbs-poster1-2026.jpg`: ASMBS MOSI poster
- `aisummit2026-1.jpg`: A-STAR team at the 2026 AI Research Summit
- `aisummit2026-2.jpg`: Poster presentation at the 2026 AI Research Summit

## Optimization tip

Use Squoosh or a local image optimizer to compress images before committing. A
large 4:3 or 16:9 photo should usually stay below 500KB unless detail review is
the primary purpose of the image.
