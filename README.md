# Daniele Masone - Portfolio & Online CV

[![Portfolio CI/CD](https://github.com/DanieleMasone/ingdanielemasone/actions/workflows/deploy-pages.yml/badge.svg?branch=main)](https://github.com/DanieleMasone/ingdanielemasone/actions/workflows/deploy-pages.yml)
[![React](https://img.shields.io/badge/React-19-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=fff)](https://vite.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=fff)](https://vitest.dev/)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

Personal portfolio and online CV for **Daniele Masone**, built as a production-minded React application rather than a static resume page.

- **Live site:** [danielemasone.github.io/ingdanielemasone](https://danielemasone.github.io/ingdanielemasone/)
- **Source documentation:** [danielemasone.github.io/ingdanielemasone/docs](https://danielemasone.github.io/ingdanielemasone/docs)
- **Coverage report:** [danielemasone.github.io/ingdanielemasone/test-coverage](https://danielemasone.github.io/ingdanielemasone/test-coverage)

## What This Repository Shows

This repository is meant to be a technical showcase for people who land on my GitHub profile. It presents my professional background, but it also demonstrates how I approach front-end engineering in a real project:

- React application architecture with route-level code splitting
- Reusable UI components and centralized Tailwind class presets
- Responsive UX for desktop and mobile portfolio browsing
- Accessibility-minded controls, focus states, semantic sections, and non-canvas chart alternatives
- Internationalization in Italian, English, French, German, and Spanish
- A dedicated GitHub projects page for inspectable public repositories, live demos, docs, and coverage reports
- SEO metadata, structured data, sitemap, robots, social preview, and GitHub Pages-friendly routing
- Automated tests, coverage output, and generated source documentation
- CI/CD deployment to GitHub Pages

There is no backend API in this project. Portfolio data is intentionally static and local, because the repository is a front-end showcase and online CV.

## Product Surface

The application includes the main pages a visitor would expect from a professional portfolio:

- **Home** - positioning, focus areas, social links, and first impression
- **Experience** - professional roles and responsibilities
- **Projects** - enterprise and technical project highlights
- **GitHub Projects** - paginated public repositories with architecture, tests, documentation, and deploy links
- **Courses** - teaching and course material
- **Certifications** - professional certifications and certificates
- **Testimonials** - feedback from students and collaborators
- **Trading** - investment-performance section with an accessible Chart.js visualization
- **Privacy / Cookie policy** - legal pages with SEO `noindex`

## Engineering Highlights

### Front-end architecture

- React 19 with Vite 8
- React Router 7 with lazy-loaded route modules
- Shared UI primitives for cards, grids, sections, pagination, buttons, language switching, and disclosure content
- Tailwind CSS class presets centralized in `src/styles/commonClasses.js`
- Local fake-service data loading for both CV content and public repository showcases
- Manual chunking in Vite to keep large dependency groups readable in the production bundle

### SEO and GitHub Pages

SEO configuration is centralized in `src/config/seo.json` and consumed by `SeoHead`.

The post-build script `scripts/prepare-github-pages.mjs` generates:

- route-specific `index.html` files for clean GitHub Pages URLs
- canonical URLs
- Open Graph and Twitter card metadata
- JSON-LD structured data
- `sitemap.xml`
- `robots.txt`

This keeps the SPA compatible with GitHub Pages while still serving indexable, route-specific HTML for portfolio pages.

For Google Search Console, the project is intended to be configured as a **URL-prefix property**:

```text
https://danielemasone.github.io/ingdanielemasone/
```

The verification file lives in `public/` and is published at the property root. After deployment, submit:

```text
https://danielemasone.github.io/ingdanielemasone/sitemap.xml
```

Generated developer resources under `/docs` and `/test-coverage` are published for transparency, but `npm run build:all` marks their HTML files as `noindex, nofollow` so they do not compete with the actual portfolio pages in search results.

### Accessibility and UX

The UI is built around keyboard-friendly controls, visible focus states, semantic headings, responsive spacing, and localized labels.

The trading performance chart uses Chart.js for visual exploration and also exposes a hidden data table for assistive technologies, so the chart is not the only way to access the information.

### Quality

The project uses Vitest and Testing Library to cover:

- route-level pages
- reusable UI components
- SEO metadata behavior
- i18n-sensitive rendering
- data-loading helpers
- GitHub Pages-related behavior where practical

Source documentation is generated with JSDoc and Docdash. It documents components, helpers, static data, and build scripts; it is source documentation for the portfolio, not API documentation.

## Tech Stack

| Area | Tools |
| --- | --- |
| UI | React 19, React DOM, React Router 7 |
| Build | Vite 8, npm |
| Styling | Tailwind CSS, clsx |
| Motion and UI utilities | Framer Motion, Headless UI |
| Internationalization | i18next, react-i18next, browser language detector |
| Charts | Chart.js, react-chartjs-2 |
| Icons and visuals | Lucide React, React Icons, Simple Icons, Boring Avatars |
| Testing | Vitest, Testing Library, jsdom, V8 coverage |
| Documentation | JSDoc, Docdash |
| Deployment | GitHub Actions, GitHub Pages |

## Project Structure

```text
src/
  assets/        Images, course covers, certificates
  components/    Shared UI, layout, SEO, header/footer, states
  config/        SEO and public route configuration
  consts/        Shared constants
  i18n/          i18next setup
  locales/       Translation files: it, en, fr, de, es
  mock/          Static portfolio datasets
  pages/         Route-level portfolio pages
  services/      Local data-loading helpers
  styles/        Shared Tailwind class presets

scripts/
  prepare-github-pages.mjs
  prepare-published-reports.mjs

public/
  logo, social preview, fallback robots, Search Console file
```

Generated outputs such as `dist`, `docs`, `coverage`, and `node_modules` are not part of the source tree.

## Run Locally

Use Node.js `20.19+`, `22.13+`, or `24+`.

```bash
git clone https://github.com/DanieleMasone/ingdanielemasone.git
cd ingdanielemasone
npm ci
npm run dev
```

The development server runs on:

```text
http://localhost:3000/
```

Production preview uses the GitHub Pages base path:

```bash
npm run build
npm run preview
```

```text
http://localhost:4173/ingdanielemasone/
```

## Useful Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build the production app and run the GitHub Pages post-build step |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run Vitest in interactive/watch mode |
| `npm test -- --run` | Run the test suite once |
| `npm run coverage` | Generate the HTML coverage report |
| `npm run doc` | Generate static source documentation in `docs/` |
| `npm run prepare:reports` | Add `noindex, nofollow` metadata to generated docs and coverage HTML |
| `npm run build:all` | Build app, coverage, and documentation |

## Deployment

The portfolio is deployed to GitHub Pages through `.github/workflows/deploy-pages.yml`.

On every push to `main`, the workflow:

1. Installs dependencies with npm
2. Runs `npm run build:all`
3. Publishes the app from `dist`
4. Publishes source documentation under `/docs`
5. Publishes the coverage report under `/test-coverage`

The workflow can also be started manually from GitHub Actions.

## License

Released under the MIT License. See [LICENSE](LICENSE).

Copyright (c) 2026 Daniele Masone.
