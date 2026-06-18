# Quality and Testing

The portfolio uses focused automated checks instead of a broad tool stack.

## Vitest and Testing Library

Vitest is the main test runner. Testing Library is used for React components and route-level behavior from the user's perspective.

Vitest covers:

- reusable UI components;
- route pages;
- local service behavior;
- SEO helper behavior;
- i18n-sensitive rendering;
- pagination and collection helpers;
- build scripts where practical.

Run the full suite once with:

```bash
npm test -- --run
```

Use targeted Vitest files first when a change is narrow, then the full suite when shared behavior is affected.

## Playwright

Playwright is intentionally small. It is used for deployment-confidence E2E tests that are hard to prove in jsdom:

- GitHub Pages base-path routing;
- direct route refresh and deep links;
- critical navigation;
- mobile menu behavior;
- SEO metadata in built output;
- i18n smoke checks;
- keyboard accessibility smoke checks;
- responsive collection pagination smoke checks.

Run:

```bash
npx playwright install --with-deps --only-shell chromium
npm run test:e2e
```

The Playwright config starts production preview through `npm run preview` and uses `/ingdanielemasone/` as the base URL. CI installs the Chromium headless shell because the suite runs headlessly without a branded browser channel.

Do not add Playwright tests for every static card. Prefer semantic selectors such as roles, headings, labels, landmarks, metadata and URLs.

## Coverage

Coverage uses Vitest with the V8 provider:

```bash
npm run coverage
```

The HTML report is generated in `coverage/`. `npm run build:all` publishes it into `dist/test-coverage/` after applying `noindex, nofollow`.

There is no configured coverage threshold. Use the report to catch meaningful gaps, not as a reason to add low-value assertions.

## Generated documentation

Source reference and tutorials are generated with:

```bash
npm run doc
```

The output folder is `docs/`. It is generated output and must not be committed.

## Publishing build

The canonical publishing command is:

```bash
npm run build:all
```

It runs the production build and then `npm run build:reports`. `build:reports` generates coverage, JSDoc output and report preparation for an existing app build. The final `dist/` folder contains the app, `/docs/` and `/test-coverage/` resources ready for GitHub Pages.

## Generated artifacts

Do not commit:

- `dist/`;
- `docs/`;
- `coverage/`;
- `playwright-report/`;
- `test-results/`;
- `node_modules/`.

These folders are generated locally or in CI.
