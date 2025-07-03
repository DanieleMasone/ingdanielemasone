# GitHub Pages – `gh-pages` Branch

This branch contains the **compiled static assets** of the [Daniele Masone Portfolio Website](https://danielemasone.github.io/ingdanielemasone/), deployed via **GitHub Pages**.

> ⚠️ Do not edit files in this branch manually. All contents are auto-generated from the `main` branch.

---

## 📁 What’s in this branch?

- `/index.html`: Main entry point for the site
- `/docs/`: Auto-generated project documentation
- `/test-coverage/`: Test coverage reports from the test suite
- `/assets/`, `/static/`, etc.: JS/CSS/images bundled at build time

---

## 🚀 Live URLs

- **Website:**  
  👉 [https://danielemasone.github.io/ingdanielemasone/](https://danielemasone.github.io/ingdanielemasone/)

- **Documentation:**  
  📚 [https://danielemasone.github.io/ingdanielemasone/docs](https://danielemasone.github.io/ingdanielemasone/docs)

- **Test Coverage Report:**  
  ✅ [https://danielemasone.github.io/ingdanielemasone/test-coverage](https://danielemasone.github.io/ingdanielemasone/test-coverage)

---

## 🛠️ How it's built

The contents of this branch are generated automatically using the following command:

```bash
npm run deploy:all
```
This command builds:

- The React app (`npm run build`)
- JSDoc documentation (`npm run doc`)
- Test coverage (`npm run coverage`)
- Then pushes everything to `gh-pages` via the deployment script

## 🧼 Can I delete or modify this?

No. This branch should only be managed by automated deployment tools.

To update the site, edit the source code in `main`, then run the deploy command.

# License & Permissions
### © 2025 Daniele Masone. All rights reserved.

This content is for deployment purposes only and may not be copied, modified, or redistributed.
