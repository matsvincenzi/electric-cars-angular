# electric-cars-angular — Repository Rules

> Bilingual (EN / PT-BR) landing page about electric and sustainable cars. Angular rewrite of the
> academic `electric-cars` project (React). Static SPA: no backend, no forms, no SSR (ADR 0003).

## Language

Everything committed here — code, comments, tests, commit messages, branch names — is in
**English**. User-facing copy exists in both languages through the i18n dictionaries.

## Stack

- Angular ^21.2: standalone components, zoneless, signals, `OnPush`, `inject()`
- SCSS + CSS custom properties (`src/styles/_tokens.scss`); Sora + Manrope via Fontsource
- Vitest via `@angular/build:unit-test`, Playwright + `@axe-core/playwright`, angular-eslint, Prettier

## Structure

```
src/app/core/{images,navigation,storage}   # cross-cutting; knows nothing about features
src/app/i18n/                               # locale, Messages contract, dictionaries, store, title/meta sync
src/app/layout/{site-header,site-footer,language-toggle}
src/app/shared/{icon,flag,brand-mark,section-heading}   # presentational only
src/app/features/landing/{data,sections/*}
src/app/features/not-found/
src/testing/                                # shared TestBed providers (excluded from the app build)
e2e/                                        # *.e2e.ts journeys and axe audits
docs/adr/                                   # decisions — read before changing i18n, assets or scope
```

## Conventions

- File names follow the 2025 style guide (`hero.ts`, class `Hero`). New components are standalone,
  `OnPush`, use `input()`/`viewChild()` signals and `inject()`.
- **Copy never lives in templates.** Add the key to `Messages` (`src/app/i18n/messages.ts`) and to
  both `en.ts` and `pt-br.ts`; the build fails if one is missing. Non-translatable data (ids, icons,
  attributes) goes in `features/landing/data/` as typed unions.
- Subscriptions use `toSignal()` or `takeUntilDestroyed()` — never a bare `.subscribe()`.
- Images go through `NgOptimizedImage` and the registered groups in `IMAGE_WIDTHS` (ADR 0002).
  Icons go through `<app-icon>` and the sprite — no `[innerHTML]`, no sanitizer bypass.
- External links: `target="_blank" rel="noopener noreferrer"` plus the visually hidden
  "opens in a new tab" text (an app spec enforces it).
- Interactive patterns follow WAI-ARIA (tabs, toggle buttons, native `<dialog>`). Do not add hover
  effects to non-interactive elements, and keep accessible names free of concatenated words
  (Angular strips whitespace between elements — use a visually hidden separator).
- Format with Prettier (100 columns, single quotes) before committing.

## Comments

Default is **no comment**. Keep one only when deleting it would leave a reader surprised or misled
(an external constraint, a rule that contradicts what the code looks like it does, a security
caveat, a justified tool suppression). Never: file or class docblocks, narration of changes,
section dividers, JSDoc repeating signatures, `TODO` without an owner.

## Checks

```bash
npm run verify    # format:check + lint + unit tests + production build
npm run e2e       # Playwright journeys + axe (desktop and mobile projects)
```

A green e2e run covers the UI only — there is no backend contract to verify.

## Git workflow

- Branches: `main` / `type/short-description` (`feat|fix|refactor|docs|chore|test|perf|build|ci`).
- Conventional Commits, English, imperative subject. No usernames or tracker IDs in branch names.
