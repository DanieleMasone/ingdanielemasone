# Architecture

This tutorial documents the current implemented architecture of the portfolio.

## Application structure

The app is a React 19 SPA built with Vite 8. The Vite base path is `/ingdanielemasone/`, matching the GitHub Pages project-site path.

React Router 7 owns the route tree. Route modules are lazy-loaded so that major pages can be split into separate chunks without adding a server-side rendering layer.

The project has no backend. Route-level portfolio collections are local static data resolved through the service layer so pages do not import those datasets directly. Immutable shell identity and social-profile destinations are synchronous configuration because they have no loading lifecycle.

## Routing and GitHub Pages

`vite.config.mjs` sets:

```js
base: "/ingdanielemasone/"
```

The router uses the same basename through the app constants. This keeps internal links, direct route refreshes and production preview aligned with GitHub Pages.

During `npm run build`, `scripts/prepare-github-pages.mjs` writes route-specific `index.html` files and a noindex `404.html` fallback into `dist`. The SPA still hydrates on the client, but crawlers and link preview tools receive route-level metadata immediately. Unknown GitHub Pages URLs load the portfolio wildcard route instead of the platform's generic error page.

## Pages and components

Route-level pages live in `src/pages`. They own page composition, page-specific transformations, filtering, pagination, empty states and card mapping. `usePortfolioData` owns only the repeated asynchronous service lifecycle: initial loading, errors, retry, stale-request protection and unmount safety.

Shared UI primitives live in `src/components`. Examples include:

- `PageSection` for route section spacing;
- `PageGrid` for animated paginated grids;
- `CollectionToolbar` and `getCollectionPaginationState` for paginated collection ranges;
- `LegalDocument` and `LegalSection` for the shared policy-document outline and responsive reading width;
- card, button, disclosure and selectable controls;
- header, footer, loading and error states;
- `SeoHead` for runtime route metadata.

Page-specific card structures remain inside their route pages when extracting them would add indirection without real reuse.

## Data boundary

Static datasets live in `src/mock`. The service boundary in `src/services/portfolioService.jsx` returns promises to mimic asynchronous loading without coupling route pages to future transport details. One private latency helper owns the shared simulated delay used by all domain-specific loaders; tests use fake timers and assert the asynchronous boundary without treating the exact delay duration as a public contract.

This boundary is intentionally fake. It lets route pages exercise loading and error states while keeping the published site fully static. The shared hook in `src/hooks/usePortfolioData.js` consumes those service functions while deliberately leaving sorting, filtering and pagination visible in each page. The global Footer imports its bundled social links synchronously: simulating a remote request there would delay persistent navigation without representing a real failure mode.

`src/config/siteIdentity.js` is the runtime source of truth for the owner's non-localized name and public profile URLs. Localized professional positioning and accessible label templates remain in the locale files. Build-time SEO identity remains in `src/config/seo.json`, which is consumed independently by the static publication script.

## Internationalization

i18next and react-i18next provide localization. Supported languages are:

- Italian;
- English;
- French;
- German;
- Spanish.

Translation files live under `src/locales/<language>/translation.json`. Visible content, SEO copy, labels and accessibility strings must stay aligned across all supported languages when changed.

## Shared styling

The styling architecture is deliberately Tailwind-first and keeps one small native CSS entry point. Sass was evaluated against the implemented stylesheet and is not part of the stack: the project has no compile-time mixins, generated selector families, legacy Sass modules or substantial custom CSS that would justify another processing layer.

Ownership is split as follows:

- JSX Tailwind utilities own normal component layout, spacing, typography, responsive behavior and interaction states.
- Shared React components own complete repeated visual and behavioral patterns.
- `src/styles/commonClasses.js` owns stable Tailwind combinations reused across components or kept synchronized as part of a shared UI contract. One-off combinations remain close to their component.
- `src/index.css` owns Tailwind directives, document-level base and accessibility rules, browser normalization, and rare global utilities that Tailwind does not express directly.
- `tailwind.config.js` is the source of compile-time design tokens when a color, spacing, radius, shadow or breakpoint becomes a genuinely shared application value.
- Native CSS custom properties are reserved for values that need runtime theme switching, inheritance, contextual overrides, non-Tailwind interoperability or JavaScript updates.

`@layer base` is used for document-level behavior, including reduced-motion handling. `@layer utilities` contains the cross-browser scrollbar utility. There is currently no `@layer components` block because reusable component patterns are represented more clearly by React components and shared class presets.

CSS Modules are an escape hatch for an isolated component with complex selectors or third-party DOM that cannot be expressed clearly with Tailwind. They are not a second default styling system. Sass should be reconsidered only when there is a recurring need for compile-time functions, parameterized mixins, generated selector families, substantial legacy Sass integration or non-trivial stylesheet modules. Nesting alone is not sufficient justification; standards-oriented native CSS is preferred when compatible with the supported browsers.

Do not duplicate the same token between Tailwind configuration, CSS custom properties and a preprocessor. Styling changes must preserve focus visibility, reduced-motion behavior, contrast, responsive readability and the absence of horizontal overflow.

## SEO architecture

Route metadata is configured in `src/config/seo.json` and localized through translation files. `SeoHead` applies runtime metadata in the browser and removes static fallback tags after React mounts. The wildcard fallback has its own `noindex, follow` configuration and is excluded from the sitemap.

`scripts/prepare-github-pages.mjs` generates static route HTML, sitemap and robots output from the same SEO configuration.

## Accessibility architecture

The UI relies on semantic landmarks, visible focus rings, keyboard-accessible controls, localized labels and non-visual alternatives where needed.

The trading chart is visual, but it also exposes a data table for assistive technologies. Paginated collection pages use a shared toolbar with concise visible summaries and polite range announcements after page changes.

## Trade-offs

- Static data keeps the site portable and cheap to host, but updates require repository changes and redeployment.
- Generated route HTML improves static SEO without introducing SSR.
- Playwright coverage is intentionally focused on deployment-confidence risks instead of exhaustive content assertions.
