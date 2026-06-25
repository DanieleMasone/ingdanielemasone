import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {describe, expect, test} from "vitest";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const readText = (relativePath) => fs.readFileSync(path.join(rootDir, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(readText(relativePath));

const tutorialIds = [
    "engineering-guide",
    "architecture",
    "content-maintenance",
    "quality-and-testing",
    "seo-and-deployment",
    "compliance-and-content-review"
];

const markdownFiles = [
    "README.md",
    "docs-src/source-docs-home.md",
    ...tutorialIds.map((id) => `docs-src/tutorials/${id}.md`)
];

const publicTutorialUrls = tutorialIds.map(
    (id) => `https://danielemasone.github.io/ingdanielemasone/docs/tutorial-${id}.html`
);

describe("documentation source configuration", () => {
    test("uses docs-src as the JSDoc homepage and tutorial source", () => {
        const config = readJson("jsdoc.json");

        expect(config.source.include).toEqual(expect.arrayContaining(["src", "scripts"]));
        expect(config.source.includePattern).toBe("\\.(js|jsx|mjs)$");
        expect(config.source.excludePattern).toContain("docs-src");
        expect(config.opts.destination).toBe("./docs");
        expect(config.opts.readme).toBe("docs-src/source-docs-home.md");
        expect(config.opts.tutorials).toBe("docs-src/tutorials");
        expect(config.opts.template).toBe("node_modules/docdash");
    });

    test("keeps the expected tutorial hierarchy and source files", () => {
        const tutorials = readJson("docs-src/tutorials/tutorials.json");

        expect(tutorials["engineering-guide"]).toMatchObject({
            title: "Engineering Guide",
            children: [
                "architecture",
                "content-maintenance",
                "quality-and-testing",
                "seo-and-deployment",
                "compliance-and-content-review"
            ]
        });

        for (const id of tutorialIds) {
            expect(tutorials[id].title).toEqual(expect.any(String));
            expect(fs.existsSync(path.join(rootDir, "docs-src", "tutorials", `${id}.md`))).toBe(true);
        }
    });

    test("README links to the published documentation entry points", () => {
        const readme = readText("README.md");

        for (const url of publicTutorialUrls) {
            expect(readme).toContain(url);
        }

        expect(readme).toContain("https://danielemasone.github.io/ingdanielemasone/docs/");
        expect(readme).toContain("https://danielemasone.github.io/ingdanielemasone/test-coverage/");
        expect(readme).not.toContain("For Google Search Console");
        expect(readme).not.toContain("## Project Structure");
    });

    test("keeps the CI browser install and publishing build commands documented", () => {
        const packageJson = readJson("package.json");
        const readme = readText("README.md");
        const workflow = readText(".github/workflows/deploy-pages.yml");
        const qualityGuide = readText("docs-src/tutorials/quality-and-testing.md");

        expect(packageJson.scripts["build:reports"]).toBe(
            "npm run coverage && npm run doc && npm run prepare:reports"
        );
        expect(packageJson.scripts["build:all"]).toBe("npm run build && npm run build:reports");

        for (const content of [readme, workflow, qualityGuide]) {
            expect(content).toContain("npx playwright install --with-deps --only-shell chromium");
        }

        expect(workflow).toContain("run: npm run test:e2e");
        expect(workflow).toContain("run: npm run build:reports");
        expect(workflow).not.toContain("run: npm run build:all");
    });

    test("tracked Markdown local links resolve", () => {
        const markdownLinkPattern = /!?\[[^\]]*]\(([^)#][^)]+)\)/g;

        for (const file of markdownFiles) {
            const content = readText(file);
            const sourceDir = path.dirname(path.join(rootDir, file));

            for (const match of content.matchAll(markdownLinkPattern)) {
                const link = match[1].trim();

                if (/^(https?:|mailto:)/i.test(link)) continue;

                const target = path.resolve(sourceDir, link.split("#")[0]);
                expect(fs.existsSync(target), `${file} links to missing ${link}`).toBe(true);
            }
        }
    });

    test("keeps public compliance documentation generic", () => {
        const complianceGuide = readText("docs-src/tutorials/compliance-and-content-review.md");

        expect(complianceGuide).toContain("## Testimonial governance");
        expect(complianceGuide).not.toContain("## Testimonial authorization checklist");
        expect(complianceGuide).not.toContain("| ID | Displayed name |");
        expect(complianceGuide).not.toContain("Owner confirmation required");
        expect(complianceGuide).not.toContain("device build, capture time, timezone");
    });
});
