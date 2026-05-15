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
- test coverage and generated documentation.

## Stack

- React 19
- Vite
- React Router
- Tailwind CSS
- i18next
- Vitest
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

3. Documentation
   - Update JSDoc/TSDoc-style comments when component behavior, helper methods, shared classes, or public project behavior changes.
   - Keep `README.md` and generated docs aligned when the change affects project usage, features, SEO, or published documentation.

4. Final Verification
   - Run the appropriate final checks before finishing.
   - For normal code/UI changes, prefer:

     ```powershell
     & .\.tools\node-v22.12.0-win-x64\npm.cmd run build:all
     ```

   - For narrow changes, also run the relevant targeted Vitest file first.
   - Check for conflict markers before the final response.
   - For UI changes, verify the built app or local preview when possible.

## Project-Specific Rules

- Prefer shared styles from `src/styles/commonClasses.js`.
- Add new shared Tailwind class presets there when the same pattern is reused or should stay visually consistent.
- Keep route-level pages coherent with the existing portfolio structure.
- Keep data access through the existing mock service pattern instead of hardcoding fetch-like data directly in pages.
- Preserve GitHub Pages compatibility, including the `/ingdanielemasone/` base path.
- Keep translations aligned across all currently supported languages.
- Do not introduce visible instructional text inside the portfolio UI unless it improves the real user experience.
- Treat this repo as a public professional showcase: concise copy, polished layout, accessible controls, and no unfinished surfaces.

