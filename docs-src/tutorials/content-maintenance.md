# Content and Localization Maintenance

This tutorial describes recurring content updates for the portfolio. It does not replace `AGENTS.md`; it explains where the current content lives and what must be checked when it changes.

## Supported languages

Update all supported locale files whenever visible copy or SEO copy changes:

- `src/locales/it/translation.json`
- `src/locales/en/translation.json`
- `src/locales/fr/translation.json`
- `src/locales/de/translation.json`
- `src/locales/es/translation.json`

Avoid leaving raw i18n keys visible in the UI. Prefer concise professional wording over keyword stuffing.

## GitHub projects

Source data:

- `src/mock/githubProjects.js`
- localized project copy under `github_projects_page.projects.*`

Check:

- slug and category conventions;
- repository, live, package, documentation and coverage links;
- technologies and highlights;
- ordering strategy used by the existing data;
- card link names and mobile wrapping;
- pagination impact on `/github-projects/`.

Focused tests usually live in `src/pages/githubProjects/GithubProjects.test.jsx`. Update E2E only when browser behavior, pagination, routing or published links change in a deployment-relevant way.

## Professional projects

Source data:

- `src/mock/projects.js`
- localized project type copy under `project_types`

Check:

- company grouping;
- date period format;
- current project ordering;
- filter behavior;
- concise descriptions suitable for a portfolio visitor.

Keep a short project description as a localized string. When a project has
multiple narrative paragraphs followed by one or more real responsibility
lists, use the shared structured-description contract documented below instead
of serializing headings and `-` markers inside a string.

Focused tests usually live in `src/pages/projects/Projects.test.jsx`.

## Certifications

Source data:

- `src/mock/certifications.js`
- localized certification page copy under `certifications_page`

Check:

- issue date format;
- certificate links or static certificate assets;
- sort order by date;
- accessible link labels;
- pagination range summary.

Focused tests usually live in `src/pages/certifications/Certifications.test.jsx`.

## Courses

Source data:

- `src/mock/courses.js`
- course cover assets under `src/assets`
- localized course copy under `courses_page`

Check:

- title, description, duration and technology labels;
- Udemy link and optional direct purchase link;
- image import and rendering constraints;
- accessible external link names;
- pagination range summary.

Focused tests usually live in `src/pages/courses/Courses.test.jsx`.

## Testimonials

Source data:

- `src/mock/testimonials.js`
- localized page copy under `testimonials_page`

Check:

- name, role, quote and optional avatar handling;
- quote length on mobile;
- semantic quote rendering;
- pagination range summary.

Focused tests usually live in `src/pages/testimonials/Testimonials.test.jsx`.

## Experience entries

Source data:

- `src/mock/experiences.js`
- localized experience descriptions and labels near the root translation keys

Experience descriptions and the detailed AI-assisted RPG project use the
shared localized structure:

```js
{
  paragraphs: ["Narrative paragraph"],
  sections: [
    {
      label: "Optional visible heading",
      items: ["Clean list-item text"]
    }
  ]
}
```

Keep genuinely simple labels and prose as strings. Use `paragraphs` when copy
contains distinct narrative paragraphs, and `sections` when the UI presents a
real list. A section label is optional only when the preceding paragraph
already introduces the list clearly.

List items contain text only: never prefix them with `-`, `*`, `•` or `–`, and
do not store HTML, Markdown or formatting-only line breaks in structured
content. `StructuredDescription` owns `<p>`, headings, `<ul>`, `<li>`, visual
markers and expandable layout.

Every locale must preserve the same object shape, paragraph count, section
count, label presence and corresponding item counts. The localization contract
tests validate those rules, primitive/object/array type parity, empty values
and interpolation variables. Multiline testimonial quotes remain strings
because preserving the quoted source is more important than treating their
line breaks as portfolio-authored document structure.

Check:

- period format;
- current role ordering;
- timeline density;
- long translated descriptions;
- paragraph and section-list semantics for structured descriptions;
- accessibility of status badges and timeline structure.

For long translations, verify expand/collapse after changing language and at
mobile and desktop widths. `ExpandableText` remeasures content after content,
font, zoom and viewport changes, but browser checks should still cover German
and French wrapping and horizontal overflow.

Focused tests usually live in `src/pages/experience/Experience.test.jsx`.

## Trading data

Source data:

- `src/mock/trading.js`

Check:

- monthly and yearly performance values;
- cumulative performance behavior;
- compact unavailable-value labels;
- chart colors and legend contrast;
- non-visual table fallback.

Focused tests usually live near `TradingPerformanceChart` and `src/pages/trading`.

## SEO and verification

When content affects page meaning, update route SEO copy in all locale files and check `src/config/seo.json` only if route policy changes.

Typical verification:

```bash
npm test -- --run
npm run build
```

For published documentation, coverage, sitemap, robots or GitHub Pages artifact changes, run:

```bash
npm run build:all
```
