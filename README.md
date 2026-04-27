# Daniele Masone - Portfolio & Online CV

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
- SEO metadata for each main page
- Automated tests, coverage reports, and JSDoc documentation
- GitHub Pages deployment

## Tech Stack

- React 19
- Vite 7
- React Router 7
- Tailwind CSS 3
- i18next and react-i18next
- Framer Motion
- Headless UI
- Lucide React and Simple Icons
- Vitest and Testing Library
- JSDoc with Docdash

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
| `npm run doc` | Generates JSDoc documentation |
| `npm run build:all` | Builds app, coverage, and documentation |
| `npm run deploy` | Publishes generated artifacts to GitHub Pages |
| `npm run deploy:all` | Runs the full build and deploy flow |

## Project Structure

```text
src/
  assets/          Images and static assets used by the app
  components/      Shared UI and layout components
  consts/          Shared constants
  i18n/            i18next configuration
  locales/         Translation files
  mock/            Portfolio datasets used by the UI
  pages/           Main route-level pages
  services/        Data access helpers
```

Generated folders such as `dist`, `docs`, `coverage`, and `node_modules` are intentionally excluded from version control.

## Quality

Before publishing changes, run:

```bash
npm test -- --run
npm run build
```

For a full local validation including documentation and coverage:

```bash
npm run build:all
```

## Deployment

The project is configured for deployment to GitHub Pages at:

```text
https://danielemasone.github.io/ingdanielemasone/
```

To build and deploy all generated artifacts:

```bash
npm run deploy:all
```

## License & Permissions

(c) 2026 Daniele Masone. All rights reserved.

This code may not be copied, modified, redistributed, or reused without explicit permission.
