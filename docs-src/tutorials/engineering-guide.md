# Engineering Guide

This repository is Daniele Masone's public portfolio and online CV. It is maintained as a production-minded front-end application, not as a static resume page, because the repository itself is part of the professional showcase.

The project demonstrates how the portfolio is structured, tested, localized, documented and deployed when the hosting target is GitHub Pages.

## Ownership

- `README.md` is the concise repository landing page.
- `AGENTS.md` is the operational policy for Codex and maintenance work.
- `docs-src/` contains narrative engineering documentation.
- Source-level JSDoc comments document component contracts, helpers, services, build scripts and non-obvious implementation invariants.
- `docs/`, `coverage/` and `dist/` are generated outputs and must not be committed.

## Static-first model

The portfolio has no backend API. Portfolio data is stored locally, loaded through the mock service layer, and rendered by route-level React pages.

This keeps the GitHub Pages deployment simple:

- no server runtime;
- no database;
- no private credentials;
- deterministic publication through a static artifact;
- route-specific HTML generated during the build for indexable portfolio routes.

## Directory responsibilities

```text
src/
  assets/        Images, course covers and certificates
  components/    Shared UI, layout, SEO, header/footer and states
  config/        SEO route configuration
  consts/        Shared constants
  i18n/          i18next setup
  locales/       Italian, English, French, German and Spanish copy
  mock/          Static portfolio datasets
  pages/         Route-level portfolio pages
  services/      Local data-loading boundary
  styles/        Shared Tailwind class presets

scripts/         GitHub Pages and report publication helpers
tests/e2e/       Focused Playwright deployment-confidence checks
docs-src/        Source Markdown for generated engineering tutorials
```

## Where to go next

- {@tutorial architecture} explains the implemented application structure and trade-offs.
- {@tutorial content-maintenance} explains how to update portfolio content and translations.
- {@tutorial quality-and-testing} explains unit, integration, coverage and E2E responsibilities.
- {@tutorial seo-and-deployment} explains GitHub Pages, static SEO generation, Search Console and publication.

The generated symbol reference is available from the `/docs/` navigation. The coverage report is published at `/test-coverage/`.
