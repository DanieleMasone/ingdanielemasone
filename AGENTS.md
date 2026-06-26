# AGENTS.md

## Project Context

This repository is Daniele Masone's personal portfolio and online CV.
It is a React/Vite single page application published on GitHub Pages at:

`https://danielemasone.github.io/ingdanielemasone/`

The site is a professional showcase, so every change must preserve:

- clear UX/UI on desktop and mobile;
- accessibility for keyboard and assistive technologies;
- SEO compatibility for a static GitHub Pages deployment;
- localized content across all supported languages;
- test coverage and generated documentation;
- clean, production-quality code.

The project is feature-complete and is maintained in bugfix/maintenance mode.
Treat changes as surgical unless the user explicitly asks for broader product work.

## Stack

- React 19
- Vite 8
- React Router 7
- Tailwind CSS
- i18next / react-i18next
- Vitest / Testing Library
- JSDoc static documentation
- GitHub Pages static hosting

## Non-Negotiable Checklist

Before considering any task complete, always evaluate and apply, when needed:

1. SEO
   - Check whether routes, metadata, canonical URLs, Open Graph/Twitter tags, structured data, sitemap/robots, or GitHub Pages paths are affected.
   - If SEO is affected, update the related implementation and tests.
   - If SEO is not affected, explicitly leave it unchanged.

2. Tests
   - Add or update focused tests for changed behavior.
   - Prefer targeted tests first, then run the broader suite when the change can affect shared behavior.
   - Keep accessibility states covered when UI controls change.
   - Do not add or rewrite tests for unaffected behavior just to increase coverage numbers.

3. Documentation
   - Update JSDoc/TSDoc-style comments when component behavior, helper methods, shared classes, or public project behavior changes.
   - Keep `README.md` and generated docs aligned when the change affects project usage, features, SEO, or published documentation.
   - Leave documentation unchanged when the task does not affect documented behavior or commands.

4. Final Verification
   - Run the appropriate final checks before finishing.
   - For local Windows development, use the repository-pinned Node/npm toolchain:
   
   	 ```powershell
     npm run build:all
     ```
	 
   - For normal code/UI changes, prefer:

     ```powershell
     npm test -- --run
     npm run build:all
     ```

   - For documentation-only or guidance-only changes, inspect the diff, check readability, and check for conflict markers.
   - For package scripts, build config, CI, or browser-test config changes, run:

     ```powershell
     npm test -- --run
     npm run build
     npm run test:e2e
     npm run build:all
     ```

   - For dependency upgrades, run:

     ```powershell
     npm test -- --run
     npm run build
     npm run test:e2e
     npm run build:all
     ```

   - For narrow changes, also run the relevant targeted Vitest file first.
   - Check for conflict markers before the final response.
   - For UI changes, verify the built app or local preview when possible.

## Maintenance Mode

- Make the smallest change that resolves the request.
- Do not perform speculative refactors, architecture rewrites, broad cleanup, or cosmetic UI redesigns unless explicitly requested.
- Do not change dependencies during unrelated bugfixes.
- Do not add new runtime dependencies unless the bug or requested work clearly requires them.
- Keep existing component, service, mock-data, routing, SEO, i18n, and test patterns unless there is a concrete defect.
- Preserve GitHub Pages compatibility, especially the `/ingdanielemasone/` base path.
- Evaluate SEO, accessibility, i18n, tests, and docs on every task, but update them only when the change affects them.

## Project-Specific Rules

- Prefer shared styles from `src/styles/commonClasses.js`.
- Add new shared Tailwind class presets there when the same pattern is reused or should stay visually consistent.
- Keep route-level pages coherent with the existing portfolio structure.
- Keep data access through the existing mock service pattern instead of hardcoding fetch-like data directly in pages.
- For paginated collection pages, reuse `CollectionToolbar` and `getCollectionPaginationState` instead of duplicating range summaries or pagination layout locally.
- Preserve GitHub Pages compatibility, including the `/ingdanielemasone/` base path.
- Treat `npm run build:all` as the authoritative publishing build: it must leave `dist` ready for GitHub Pages, including generated docs and coverage reports.
- In CI, use `npm run test:e2e` followed by `npm run build:reports` when the workflow needs to avoid rebuilding the same app artifact.
- Keep translations aligned across all currently supported languages (Italian, English, French, German, Spanish).
- Represent localized semantic lists as arrays of clean item text; never encode bullets or parse paragraph/list structure from newline-delimited translation strings. Keep corresponding locale value shapes aligned and update localization contract tests when structured content changes.
- Do not introduce visible instructional text inside the portfolio UI unless it improves the real user experience.
- Treat this repo as a public professional showcase: concise copy, polished layout, accessible controls, and no unfinished surfaces.

## Documentation Ownership

- Keep `README.md` as the concise repository landing page for GitHub visitors.
- Keep `AGENTS.md` focused on Codex operating rules and maintenance policy.
- Put narrative engineering documentation in `docs-src/` JSDoc tutorials.
- Use source JSDoc comments for symbol-level contracts, props, parameters, helper behavior, accessibility responsibilities, and non-obvious invariants.
- Treat `docs/`, `coverage/`, and `dist/` as generated output; do not edit or commit them directly.

## Styling Policy

- Use Tailwind utilities for normal layout, spacing, typography, responsive behavior and interaction states.
- Prefer a shared React component for a complete repeated visual pattern. Use `src/styles/commonClasses.js` only for stable Tailwind combinations reused across components or intentionally kept synchronized; keep one-off combinations local.
- Keep `src/index.css` limited to Tailwind directives, document-level base/accessibility rules, browser normalization, rare global utilities and unavoidable third-party overrides.
- Keep shared compile-time design tokens in `tailwind.config.js`. Use native CSS custom properties only for runtime, inherited, contextual or JavaScript-driven values, and do not duplicate tokens across systems.
- Allow a CSS Module only for isolated complex selectors or third-party DOM that Tailwind cannot represent clearly.
- Do not add Sass unless a recurring need exists for compile-time functions, parameterized mixins, generated selectors, substantial legacy Sass or non-trivial stylesheet modules. Nesting alone does not justify it.
- Preserve focus visibility, reduced-motion behavior, contrast, responsive readability and no horizontal overflow whenever styles change.

## Dependency Policy

- During normal bugfix work, do not update dependencies unless required for the bug, a security fix, or a compatibility problem.
- During explicit dependency-maintenance work, check stable package metadata from npm or trusted official sources before changing versions.
- Prefer stable releases over prerelease, beta, alpha, RC, canary, or experimental versions unless the user explicitly asks otherwise.
- Respect peer dependencies, Node engine constraints, Vite/React/React Router compatibility, and GitHub Actions runtime constraints.
- Use the repository-pinned Node/npm toolchain from `.nvmrc`, `packageManager`, and `engines` for dependency work.
- Never change `package.json` without updating `package-lock.json`; never edit `package-lock.json` manually.
- For broad dependency changes, regenerate the lockfile from a clean dependency state by removing `node_modules` and `package-lock.json`, then running `npm install --include=optional` with the pinned npm version.
- After regenerating the lockfile, run `npm run deps:validate` and a clean `npm ci --include=optional`; validate on Linux when native, WASM, or platform-specific optional packages change.
- Do not add transitive native bindings such as Rolldown, Lightning CSS, NAPI, or `@emnapi/*` packages as direct dependencies unless application source imports and owns them.
- Do not replace CI `npm ci` with `npm install`, and do not make CI mutate dependency manifests or lockfiles.
- Keep `"private": true`; this portfolio is not published to the npm registry, and no npm publication workflow should be added.
- For major upgrades, update related config, tests, documentation, CI, and any README/AGENTS stack-version references.
- If an upgrade is risky or introduces breaking changes, stop and explain the trade-off instead of forcing it.
- After dependency upgrades, run the full dependency verification set from the Final Verification section.

## Playwright E2E Rules

- Use Playwright only for deployment-confidence E2E testing; do not duplicate Vitest or Testing Library coverage.
- Test the production build and preview output instead of the Vite dev server.
- Always preserve and verify the `/ingdanielemasone/` GitHub Pages base path.
- In GitHub Actions, install only the Chromium headless shell with `npx playwright install --with-deps --only-shell chromium` unless the config explicitly requires a headed browser, a browser channel, or full Chromium.
- Focus E2E coverage on route smoke tests, GitHub Pages deep links, critical navigation, responsive/mobile behavior, SEO metadata, i18n smoke checks, and keyboard accessibility.
- Add or update E2E tests only when a change affects real browser behavior.
- Prefer stable semantic selectors: roles, labels, landmarks, headings, metadata, and URLs.
- Avoid brittle DOM selectors, broad visual snapshots, and unnecessary `data-testid` attributes.
- Run targeted E2E specs first when possible, then broader suites for shared or deployment-facing changes.

## Privacy and Public-Content Rules

- Do not add analytics, tracking, third-party embeds, remote media, forms, or browser storage without updating the factual data-flow inventory, policies, and focused tests.
- Keep legal notices aligned with runtime behavior; never invent owner details, legal bases, retention periods, transfer safeguards, licences, authorizations, or commercial relationships.
- Legal and compliance changes must preserve product UX/UI quality. Keep disclosure copy factual, proportionate, and placed at the right level: near the relevant CTA when needed, with detail in policy pages, and without repeated boilerplate across cards.
- Trading, broker, referral, testimonial, certification, and public-asset changes require the corresponding generic review rules in `docs-src/tutorials/compliance-and-content-review.md`.
- Public documentation must never contain nominative authorization, consent, withdrawal, legal-review, or owner-action registers. Keep testimonial governance generic in public docs, and keep private evidence, authorization dates, withdrawal records, and legal correspondence outside the public repository.
- Footer legal links must render independently of optional social/profile data loading.
- Remote media or flag CDNs must not be introduced without privacy review. Local decorative language assets may be used only when they create no third-party request, are not the sole accessible label, and native language names remain visible.
- A public LinkedIn source does not remove the need to review republication, attribution accuracy, and correction or removal handling.
- Treat WCAG 2.2 AA as an engineering target, not a legal certification, and do not create an official accessibility declaration without confirmed statutory scope.
