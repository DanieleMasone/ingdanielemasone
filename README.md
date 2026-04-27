# GitHub Pages – `gh-pages` Branch

This branch contains the compiled static assets of the [Daniele Masone Portfolio & Online CV](https://danielemasone.github.io/ingdanielemasone/), deployed through GitHub Pages.

> Do not edit files in this branch manually.  
> All contents are generated from the `main` branch during the deployment process.

## Purpose of This Branch

The `gh-pages` branch is used only as the public deployment target for GitHub Pages.

Source code, application logic, tests, translations, configuration, and documentation sources are maintained in the `main` branch.

## Contents

This branch may include:

- `index.html`: main entry point for the deployed site
- `assets/`: compiled JavaScript, CSS, images, and static assets
- `docs/`: generated JSDoc documentation
- `test-coverage/`: generated Vitest coverage report
- other generated files required by the GitHub Pages deployment

## Live URLs

- Website: [danielemasone.github.io/ingdanielemasone](https://danielemasone.github.io/ingdanielemasone/)
- Documentation: [danielemasone.github.io/ingdanielemasone/docs](https://danielemasone.github.io/ingdanielemasone/docs)
- Test coverage: [danielemasone.github.io/ingdanielemasone/test-coverage](https://danielemasone.github.io/ingdanielemasone/test-coverage)

## Build and Deployment

The contents of this branch are generated from `main` using:

```bash
npm run deploy:all
```

The deployment flow builds:

- the React production bundle
- JSDoc documentation
- Vitest test coverage report
- static assets required by GitHub Pages

The generated output is then published to this branch.

## Updating the Site

To update the deployed website:

1. Apply changes on the `main` branch  
2. Run the validation/build commands  
3. Deploy using:
 ```bash
npm run deploy:all
```

Do not commit manual changes directly to gh-pages.

## License & Permissions

(c) 2026 Daniele Masone. All rights reserved.

This branch contains generated deployment artifacts only.
The content may not be copied, modified, redistributed, or reused without explicit permission.
