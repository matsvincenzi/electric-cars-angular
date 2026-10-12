# 0002 — Pre-generated responsive images and an SVG icon sprite

- **Status:** accepted
- **Date:** 2026-10-12

## Context

The original project shipped PNGs of up to 6 MB, an icon library and fonts from Google Fonts. The
landing page should load fast on mobile networks without adding an image CDN or a build plugin.

## Decision

**Images** are generated once, outside the app build, as WebP variants named `<name>-<width>w.webp`
under `public/images/`:

| Group                  | Widths          | Notes                                      |
| ---------------------- | --------------- | ------------------------------------------ |
| `hero`                 | 768, 1280, 1920 | LCP image, `priority` (fetchpriority=high) |
| `interior`, `charging` | 640, 1024, 1600 | `fill` inside aspect-ratio boxes           |
| `models/*`             | 320, 640        | transparent, normalised to a 16:10 canvas  |

`IMAGE_WIDTHS` in `core/images/responsive-image-loader.ts` is the single source of truth: the
loader maps `NgOptimizedImage` requests to files and **throws** for an unregistered group or width,
so a typo fails loudly in development instead of producing a broken image. `srcsetFor(group)`
derives each `ngSrcset` from the same table.

To add an image: export WebP variants at the group's widths (quality around 70–80, `sharp` or
Squoosh work well), follow the naming convention and, for a new group, register its widths.

**Icons** live in `public/icons.svg` as `<symbol>` elements (Lucide for interface icons, Simple
Icons for brands, simplified flags) and render through `<app-icon name="…">`, a typed `IconName`
union and `<use href>`. This avoids `[innerHTML]`, so Angular's sanitizer is never bypassed, and
the sprite is a single cached request. To add an icon, paste the Lucide SVG's inner markup as a new
`<symbol id="name" viewBox="0 0 24 24" …>` and add `name` to `IconName`.

**Fonts** (Sora and Manrope, variable) are self-hosted through Fontsource, so there are no
third-party requests, and the CSS uses `font-display: swap` with `unicode-range` subsets.

## Consequences

- No runtime image transformation or extra dependency, at the cost of a manual step when images
  change.
- The sprite must be edited by hand when icons are added; the `IconName` union keeps usages honest.
