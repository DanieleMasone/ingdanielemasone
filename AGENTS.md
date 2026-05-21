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
   - For local Windows development, this repository may also use:
   
   	 ```powershell
     & .\.tools\node-v22.12.0-win-x64\npm.cmd run build:all
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
- Preserve GitHub Pages compatibility, including the `/ingdanielemasone/` base path.
- Keep translations aligned across all currently supported languages (Italian, English, French, German, Spanish).
- Do not introduce visible instructional text inside the portfolio UI unless it improves the real user experience.
- Treat this repo as a public professional showcase: concise copy, polished layout, accessible controls, and no unfinished surfaces.

## Dependency Policy

- During normal bugfix work, do not update dependencies unless required for the bug, a security fix, or a compatibility problem.
- During explicit dependency-maintenance work, check stable package metadata from npm or trusted official sources before changing versions.
- Prefer stable releases over prerelease, beta, alpha, RC, canary, or experimental versions unless the user explicitly asks otherwise.
- Respect peer dependencies, Node engine constraints, Vite/React/React Router compatibility, and GitHub Actions runtime constraints.
- For major upgrades, update related config, tests, documentation, CI, and any README/AGENTS stack-version references.
- If an upgrade is risky or introduces breaking changes, stop and explain the trade-off instead of forcing it.
- After dependency upgrades, run the full dependency verification set from the Final Verification section.

## Playwright E2E Rules

- Use Playwright only for deployment-confidence E2E testing; do not duplicate Vitest or Testing Library coverage.
- Test the production build and preview output instead of the Vite dev server.
- Always preserve and verify the `/ingdanielemasone/` GitHub Pages base path.
- Focus E2E coverage on route smoke tests, GitHub Pages deep links, critical navigation, responsive/mobile behavior, SEO metadata, i18n smoke checks, and keyboard accessibility.
- Add or update E2E tests only when a change affects real browser behavior.
- Prefer stable semantic selectors: roles, labels, landmarks, headings, metadata, and URLs.
- Avoid brittle DOM selectors, broad visual snapshots, and unnecessary `data-testid` attributes.
- Run targeted E2E specs first when possible, then broader suites for shared or deployment-facing changes.
