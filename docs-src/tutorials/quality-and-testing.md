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
- shared asynchronous data lifecycle, including retry and stale-request handling;
- build scripts where practical.

Run the full suite once with:

```bash
npm test -- --run
```

Use targeted Vitest files first when a change is narrow, then the full suite when shared behavior is affected.

## Dependency lock validation

Dependency work uses the exact Node/npm versions pinned by `.nvmrc`, `packageManager`, and `engines`.

After changing `package.json`, regenerate `package-lock.json` from a clean dependency state with:

```bash
npm install --include=optional
```

Then verify the committed lockfile before running the broader suite:

```bash
npm run deps:validate
npm ci --include=optional
```

The validation script checks the lockfile structure, public registry URLs, root dependency alignment and referenced dependency nodes, including optional dependencies. It does not encode package-specific native bindings and does not replace `npm ci`, which remains the authoritative frozen install check used by CI.

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

The E2E runner starts the repository-installed Vite preview through its Node API, resolves the Playwright CLI through the package's public `@playwright/test/cli` export, uses `/ingdanielemasone/` as the base URL, and closes the server after Playwright exits. Playwright runs one worker for deterministic browser teardown on local Windows and CI Linux environments. CI installs the Chromium headless shell because the suite runs headlessly without a branded browser channel.

CI runs `npm run test:e2e:run` after the production build so Playwright checks the exact application files that are later packaged. The all-in-one `npm run test:e2e` command remains the convenient local entry point.

Do not add Playwright tests for every static card. Prefer semantic selectors such as roles, headings, labels, landmarks, metadata and URLs.

## Coverage

Coverage uses Vitest with the V8 provider:

```bash
npm run coverage
```

The HTML report and machine-readable summary are generated in `coverage/`. `npm run build:all` publishes them into `dist/test-coverage/`, applies `noindex, nofollow` to the published HTML, and generates the Shields endpoint payload used by the README badge.

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

It runs the production build and then `npm run build:reports`. `build:reports` generates coverage, JSDoc output and report preparation for an existing app build. The final artifact validator then checks route HTML, SEO files, reports, public assets and the absence of application source maps before `dist/` is considered ready for GitHub Pages.

## Generated artifacts

Do not commit:

- `dist/`;
- `docs/`;
- `coverage/`;
- `playwright-report/`;
- `test-results/`;
- `node_modules/`.

These folders are generated locally or in CI.
