# Daniele Masone - Portfolio & Online CV

[![Deploy Portfolio](https://github.com/DanieleMasone/ingdanielemasone/actions/workflows/deploy-pages.yml/badge.svg?branch=main)](https://github.com/DanieleMasone/ingdanielemasone/actions/workflows/deploy-pages.yml)
[![Coverage](https://img.shields.io/badge/Coverage-97.65%25-brightgreen)](https://danielemasone.github.io/ingdanielemasone/test-coverage)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=fff)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=fff)](https://vitest.dev/)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

Personal portfolio and online CV for Daniele Masone, Senior Software Engineer and Front-End Architect.

- Live site: [danielemasone.github.io/ingdanielemasone](https://danielemasone.github.io/ingdanielemasone/)
- Documentation: [danielemasone.github.io/ingdanielemasone/docs](https://danielemasone.github.io/ingdanielemasone/docs)
- Test coverage: [danielemasone.github.io/ingdanielemasone/test-coverage](https://danielemasone.github.io/ingdanielemasone/test-coverage)

## Overview

This repository contains the source code for my personal portfolio website. The site presents my professional experience, enterprise projects, certifications, courses, testimonials, and selected public links.

The portfolio is built as a modern React single-page application with a focus on:

- Clear presentation of professional experience and technical positioning
- Responsive UI for desktop, tablet, and mobile
- Internationalization in Italian, English, French, German, and Spanish
- SEO metadata, structured data, clean canonical URLs, and GitHub Pages-friendly route files
- Automated tests, coverage reports, and static source documentation for the portfolio
- GitHub Pages deployment

## Tech Stack

- React 19
- Vite 8
- React Router 7
- Tailwind CSS 3
- i18next and react-i18next
- Framer Motion
- Headless UI
- Lucide React and Simple Icons
- Vitest and Testing Library
- JSDoc with Docdash for static source documentation

## Requirements

Use a modern Node.js runtime.

```bash
node -v
npm -v
```

Recommended versions:

- Node.js >= 20
- npm >= 9

Node 22 LTS is recommended for local development and CI-like checks.

## Local Setup

Clone the repository and install dependencies.

```bash
git clone https://github.com/DanieleMasone/ingdanielemasone.git
cd ingdanielemasone
npm install
```

Start the development server.

```bash
npm run dev
```

Build the production bundle.

```bash
npm run build
```

Preview the production build locally.

```bash
npm run preview
```

Because the project is configured for GitHub Pages under `/ingdanielemasone/`, the preview URL is typically:

```text
http://localhost:4173/ingdanielemasone/
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm start` | Alias for the Vite development server |
| `npm run build` | Builds the production bundle |
| `npm run preview` | Serves the production build locally |
| `npm test` | Runs the Vitest test suite |
| `npm run test:watch` | Runs tests in watch mode |
| `npm run coverage` | Generates the test coverage report |
| `npm run doc` | Generates static source documentation in `docs/` |
| `npm run build:all` | Builds app, coverage, and source documentation |

## Project Structure

```text
src/
  @types/         Local ambient type declarations
  assets/          Images and static assets used by the app
  components/      Shared UI and layout components
  consts/          Shared constants
  i18n/            i18next configuration
  locales/         Translation files
  mock/            Portfolio datasets used by the UI
  pages/           Main route-level pages
  services/        Static portfolio data loading helpers
  styles/          Shared Tailwind class presets for reusable components
```

Generated folders such as `dist`, `docs`, `coverage`, and `node_modules` are intentionally excluded from version control.

## Documentation

The static documentation is generated from JSDoc comments with Docdash:

```bash
npm run doc
```

The generated pages describe the portfolio shell, route-level pages, reusable UI components, shared style presets, static datasets, and local data-loading helpers. This is a React/Vite portfolio, so the documentation tooling is intentionally lightweight and focused on source readability rather than framework-heavy application documentation.

## SEO And GitHub Pages

The portfolio is published as a GitHub Pages project site under `/ingdanielemasone/`. The production build uses clean URLs such as `/experience/` and `/projects/`, then the post-build step generates matching static `index.html` files inside `dist/` so those URLs return HTTP 200 on GitHub Pages.

SEO data is centralized in `src/config/seo.json` and consumed by the route-level `SeoHead` component. The build also writes a clean sitemap, route-specific canonical URLs, Open Graph and Twitter card metadata, and JSON-LD structured data for the professional profile.

For Google Search Console, use a URL-prefix property for `https://danielemasone.github.io/ingdanielemasone/`, keep the generated verification file in `public/`, and submit `https://danielemasone.github.io/ingdanielemasone/sitemap.xml` after deployment.

## Quality

Before publishing changes, run:

```bash
npm test -- --run
npm run build
```

For a full local validation including portfolio documentation and coverage:

```bash
npm run build:all
```

## Deployment

The project is configured for deployment to GitHub Pages at:

```text
https://danielemasone.github.io/ingdanielemasone/
```

Deployment is now automated via GitHub Actions with the workflow:

- `.github/workflows/deploy-pages.yml`

What gets published:

- App build from `dist/` at the site root
- Source documentation output in `/docs`
- Vitest coverage report in `/test-coverage`

How to deploy:

1. Push to `main` (automatic deploy), or
2. Run the workflow manually from **Actions > Deploy portfolio, docs and coverage to GitHub Pages > Run workflow**.

Local commands are still useful for validation before push:

```bash
npm run build:all
```

## License

This project is released under the MIT License. See [LICENSE](LICENSE).

Copyright (c) 2026 Daniele Masone.
