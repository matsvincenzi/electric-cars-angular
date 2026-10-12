# 0003 — A static, client-rendered SPA without backend or SSR

- **Status:** accepted
- **Date:** 2026-10-12

## Context

The project is an informational landing page. It has no user accounts, no data that changes at
runtime and no form that needs to be stored anywhere.

## Decision

- No backend, no API calls and no forms. Every interactive element (navigation, language toggle,
  types explorer, drivetrain diagram, carousel, mobile menu) works entirely on the client.
- No SSR or prerendering for now. The routes are lazy-loaded, the initial transfer is about 80 KB of
  JavaScript, and the hero image is prioritised.
- Two routes: the landing page and a localized not-found page. Navigation to sections uses router
  fragments (`routerLink="/" fragment="types"`) with anchor scrolling enabled and the fixed-header
  height as the scroll offset, so section links also work from the not-found page.

## Consequences

- Hosting is any static file server with an SPA fallback.
- Crawlers that do not execute JavaScript see only the static `index.html` metadata. If organic
  search becomes a goal, enabling Angular's prerendering (`outputMode: 'static'`) is the next step;
  the i18n store would then need to avoid a flash of the default language before hydration.
- If a contact or newsletter form is added later, it should go through a service behind an
  injection token (an HTTP implementation plus an in-memory one for tests and local development),
  with relative API URLs and validation at the boundary.
