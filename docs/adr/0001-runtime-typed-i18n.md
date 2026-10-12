# 0001 — Runtime i18n with typed dictionaries

- **Status:** accepted
- **Date:** 2026-10-12

## Context

The page must be available in English and Brazilian Portuguese, switchable from a toggle in the
header, footer and mobile menu. The choice should be remembered, and first-time visitors should get
their browser language.

## Options considered

1. **`@angular/localize`** (official). Translations are compiled into one bundle per locale, which
   gives the best runtime performance and per-locale URLs. Switching language means navigating to
   another build (a full reload), and `ng serve` serves a single locale at a time, so a toggle would
   be broken in local development.
2. **Transloco / ngx-translate.** Runtime switching and lazy JSON files, but string keys are not
   checked by the compiler and it adds a dependency for roughly 200 strings.
3. **Typed dictionaries in TypeScript** (chosen). A `Messages` interface is the contract; `en.ts` and
   `pt-br.ts` implement it. An `I18nStore` exposes the active locale and its messages as signals.

## Decision

Option 3.

- A missing or misspelled key in either language fails the build. Per-entity copy is typed as
  `Record<EvTypeId, …>`, so adding a new EV type without translating it does not compile.
- Interpolation uses plain functions (`rights: (year) => …`) instead of a template mini-language.
- `resolveInitialLocale()` is a pure function: a valid stored preference wins, then the browser
  languages are matched by primary subtag, then English is the default. A tampered stored value is
  ignored.
- A root effect (`provideDocumentLocaleSync`) keeps `<html lang>`, the meta description and the
  Open Graph locale in sync. A custom `TitleStrategy` translates the page title per route and
  re-translates it when the language changes.

## Consequences

- Both dictionaries ship in the main bundle (a few KB gzipped). If the content or the number of
  languages grows a lot, the store can lazy-load dictionaries with dynamic `import()` behind the
  same signal API.
- The language lives in client state, not in the URL, so search engines index the default language
  only. Moving to `@angular/localize` with per-locale paths, or prerendering both languages, is the
  path if bilingual SEO ever matters.
- Number and date formatting are not needed today; if they are, register `pt` locale data and use
  `Intl` with the active locale.
