# Architecture

This tutorial documents the current implemented architecture of the portfolio.

## Application structure

The app is a React 19 SPA built with Vite 8. The Vite base path is `/ingdanielemasone/`, matching the GitHub Pages project-site path.

React Router 7 owns the route tree. Route modules are lazy-loaded so that major pages can be split into separate chunks without adding a server-side rendering layer.

The project has no backend. Portfolio content is local static data, resolved through the service layer so pages do not import datasets directly.

## Routing and GitHub Pages

`vite.config.mjs` sets:

```js
base: "/ingdanielemasone/"
```

The router uses the same basename through the app constants. This keeps internal links, direct route refreshes and production preview aligned with GitHub Pages.

During `npm run build`, `scripts/prepare-github-pages.mjs` writes route-specific `index.html` files into `dist`. The SPA still hydrates on the client, but crawlers and link preview tools receive route-level metadata immediately.

## Pages and components

Route-level pages live in `src/pages`. They own page composition, data loading state, filtering and card mapping.

Shared UI primitives live in `src/components`. Examples include:

- `PageSection` for route section spacing;
- `PageGrid` for animated paginated grids;
- `CollectionToolbar` and `getCollectionPaginationState` for paginated collection ranges;
- card, button, disclosure and selectable controls;
- header, footer, loading and error states;
- `SeoHead` for runtime route metadata.

Page-specific card structures remain inside their route pages when extracting them would add indirection without real reuse.

## Data boundary

Static datasets live in `src/mock`. The service boundary in `src/services/portfolioService.jsx` returns promises to mimic asynchronous loading without coupling pages to future transport details.

This boundary is intentionally fake. It lets route pages exercise loading and error states while keeping the published site fully static.

## Internationalization

i18next and react-i18next provide localization. Supported languages are:

- Italian;
- English;
- French;
- German;
- Spanish.

Translation files live under `src/locales/<language>/translation.json`. Visible content, SEO copy, labels and accessibility strings must stay aligned across all supported languages when changed.

## Shared styling

Tailwind CSS is the styling layer. Reused class presets live in `src/styles/commonClasses.js`.

Use shared presets when a layout, surface, control or accessibility pattern is reused across routes. Keep page-local classes when a style is genuinely specific to one card or route.

## SEO architecture

Route metadata is configured in `src/config/seo.json` and localized through translation files. `SeoHead` applies runtime metadata in the browser and removes static fallback tags after React mounts.

`scripts/prepare-github-pages.mjs` generates static route HTML, sitemap and robots output from the same SEO configuration.

## Accessibility architecture

The UI relies on semantic landmarks, visible focus rings, keyboard-accessible controls, localized labels and non-visual alternatives where needed.

The trading chart is visual, but it also exposes a data table for assistive technologies. Paginated collection pages use a shared toolbar with concise visible summaries and polite range announcements after page changes.

## Trade-offs

- Static data keeps the site portable and cheap to host, but updates require repository changes and redeployment.
- Generated route HTML improves static SEO without introducing SSR.
- Playwright coverage is intentionally focused on deployment-confidence risks instead of exhaustive content assertions.
