# Daniele Masone - Portfolio & Online CV

[![Portfolio CI/CD](https://github.com/DanieleMasone/ingdanielemasone/actions/workflows/deploy-pages.yml/badge.svg?branch=main)](https://github.com/DanieleMasone/ingdanielemasone/actions/workflows/deploy-pages.yml)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Coverage](https://img.shields.io/endpoint?url=https%3A%2F%2Fdanielemasone.github.io%2Fingdanielemasone%2Fcoverage-badge.json)](https://danielemasone.github.io/ingdanielemasone/test-coverage/)
[![React](https://img.shields.io/badge/React-19-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=fff)](https://vite.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=fff)](https://vitest.dev/)

Personal portfolio and online CV for **Daniele Masone**, built as a production-minded React application rather than a static resume page.

- **Live portfolio:** [danielemasone.github.io/ingdanielemasone](https://danielemasone.github.io/ingdanielemasone/)
- **Engineering Guide:** [docs/tutorial-engineering-guide.html](https://danielemasone.github.io/ingdanielemasone/docs/tutorial-engineering-guide.html)
- **Source documentation:** [docs](https://danielemasone.github.io/ingdanielemasone/docs/)
- **Coverage report:** [test-coverage](https://danielemasone.github.io/ingdanielemasone/test-coverage/)

## What This Repository Demonstrates

- React 19 and Vite 8 application architecture with route-level lazy loading.
- GitHub Pages-compatible SPA routing under `/ingdanielemasone/`, including a noindex 404 fallback.
- Static portfolio data loaded through a local mock service boundary.
- Responsive, accessible UI primitives with centralized Tailwind class presets.
- Internationalized content in Italian, English, French, German, and Spanish.
- Route-level SEO metadata, generated static route HTML, sitemap and robots output.
- Focused Vitest, Testing Library and Playwright checks.
- Generated JSDoc source reference, engineering tutorials and V8 coverage reports.

## Product Surface

The portfolio presents home, experience, professional projects, GitHub projects, courses, certifications, testimonials, trading performance, privacy and cookie-policy routes.

It has no backend API. The repository intentionally keeps portfolio content static so that the published GitHub Pages artifact remains inspectable, portable and inexpensive to maintain.

## Architecture And Quality

The app uses React Router 7 with the Vite base path `/ingdanielemasone/`. Shared components live under `src/components`, route pages under `src/pages`, static datasets under `src/mock`, localized copy under `src/locales`, and SEO route metadata under `src/config/seo.json`.

`npm run build` creates the production app and route-specific GitHub Pages HTML. `npm run build:reports` adds required coverage and JSDoc reports to the existing `dist` artifact, marks the published copies `noindex, nofollow`, and generates the coverage badge data. `npm run build:all` runs both steps and validates the complete publishing artifact.

## Tech Stack

| Area | Tools |
| --- | --- |
| UI | React 19, React DOM, React Router 7 |
| Build | Vite 8, npm |
| Styling | Tailwind CSS, clsx |
| Motion and UI utilities | Framer Motion, Headless UI |
| Internationalization | i18next, react-i18next, browser language detector |
| Charts | Chart.js, react-chartjs-2 |
| Icons and visuals | Lucide React, Simple Icons |
| Testing | Vitest, Testing Library, Playwright, jsdom, V8 coverage |
| Documentation | JSDoc, Docdash |
| Deployment | GitHub Actions, GitHub Pages |

## Quick Start

Use Node.js `24.18.0` and npm `11.17.0` as pinned by `.nvmrc` and `package.json`.

```bash
git clone https://github.com/DanieleMasone/ingdanielemasone.git
cd ingdanielemasone
npm ci --include=optional
npm run dev
```

Development runs at `http://localhost:3000/`.

Production preview uses the GitHub Pages base path:

```bash
npm run build
npm run preview
```

Then open `http://localhost:4173/ingdanielemasone/`.

## Essential Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build the production app and GitHub Pages route HTML |
| `npm run preview` | Preview the production build locally |
| `npm run deps:validate` | Validate the committed npm lockfile structure |
| `npm test -- --run` | Run the Vitest suite once |
| `npx playwright install --with-deps --only-shell chromium` | Install the Chromium headless shell used by CI E2E checks |
| `npm run test:e2e` | Run focused Playwright checks against production preview |
| `npm run test:e2e:run` | Run Playwright against an existing production build |
| `npm run coverage` | Generate the V8 HTML coverage report |
| `npm run doc` | Generate JSDoc source documentation and tutorials in `docs/` |
| `npm run build:reports` | Add coverage, docs, tutorials and final published reports to an existing build |
| `npm run artifact:validate` | Validate routes, SEO files, reports and assets in `dist` |
| `npm run build:all` | Build and validate the complete publishable artifact |

## Documentation Map

- [Engineering Guide](https://danielemasone.github.io/ingdanielemasone/docs/tutorial-engineering-guide.html)
- [Architecture](https://danielemasone.github.io/ingdanielemasone/docs/tutorial-architecture.html)
- [Content and Localization Maintenance](https://danielemasone.github.io/ingdanielemasone/docs/tutorial-content-maintenance.html)
- [Quality and Testing](https://danielemasone.github.io/ingdanielemasone/docs/tutorial-quality-and-testing.html)
- [SEO and GitHub Pages Deployment](https://danielemasone.github.io/ingdanielemasone/docs/tutorial-seo-and-deployment.html)
- [Privacy, Accessibility and Content Review](https://danielemasone.github.io/ingdanielemasone/docs/tutorial-compliance-and-content-review.html)
- [Generated source documentation](https://danielemasone.github.io/ingdanielemasone/docs/)
- [Coverage report](https://danielemasone.github.io/ingdanielemasone/test-coverage/)

## Deployment

The portfolio is deployed by `.github/workflows/deploy-pages.yml` to GitHub Pages. Pull requests run the same coverage, documentation, production build, Playwright and artifact checks used by `main`, without deployment permissions. Main-branch runs reuse that tested build, upload only the validated `dist` folder, and deploy it through the official GitHub Pages actions.

The published artifact keeps:

- application routes under `https://danielemasone.github.io/ingdanielemasone/`;
- generated source documentation and tutorials under `/docs/`;
- coverage under `/test-coverage/`.

Generated developer documentation and coverage are published for transparency, but are marked `noindex, nofollow` and excluded from the public sitemap.

## License

The source code is released under the MIT License. See [LICENSE](LICENSE).

The licence does not relicense personal portfolio content, photographs, testimonials, certificates, course artwork, or third-party names and marks. Those materials remain subject to their respective rights and authorizations.

Copyright (c) 2026 Daniele Masone.
