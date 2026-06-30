import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {afterEach, describe, expect, test} from "vitest";
import {validatePagesArtifact} from "../../scripts/validate-pages-artifact.mjs";

const temporaryDirectories = [];

const writeFixture = (rootDirectory, relativePath, content = "fixture") => {
    const filePath = path.join(rootDirectory, relativePath);
    fs.mkdirSync(path.dirname(filePath), {recursive: true});
    fs.writeFileSync(filePath, content);
};

const createArtifactFixture = () => {
    const rootDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "pages-artifact-"));
    temporaryDirectories.push(rootDirectory);

    const config = {
        siteUrl: "https://example.test/repo",
        image: {url: "https://example.test/repo/social-preview.png"},
        fallback: {path: "/404", robots: "noindex, follow"},
        routes: [
            {path: "/", robots: "index, follow", sitemap: true},
            {path: "/privacy", robots: "noindex, follow", sitemap: false}
        ]
    };
    const routeHtml = (routePath, robots) => [
        '<link rel="canonical" data-static-seo="true"',
        `href="https://example.test/repo${routePath === "/" ? "/" : `${routePath}/`}">`,
        `<meta name="robots" data-static-seo="true" content="${robots}">`
    ].join(" ");

    writeFixture(rootDirectory, "src/config/seo.json", JSON.stringify(config));
    writeFixture(rootDirectory, "dist/index.html", routeHtml("/", "index, follow"));
    writeFixture(rootDirectory, "dist/privacy/index.html", routeHtml("/privacy", "noindex, follow"));
    writeFixture(rootDirectory, "dist/404.html", '<meta name="robots" content="noindex, follow">');
    writeFixture(rootDirectory, "dist/sitemap.xml", "<loc>https://example.test/repo/</loc>");
    writeFixture(rootDirectory, "dist/robots.txt", "Allow: /repo/\nSitemap: https://example.test/repo/sitemap.xml\n");
    writeFixture(rootDirectory, "dist/docs/index.html", '<meta name="robots" content="noindex, nofollow"/>');
    writeFixture(rootDirectory, "dist/test-coverage/index.html", '<meta name="robots" content="noindex, nofollow"/>');
    writeFixture(rootDirectory, "dist/coverage-badge.json", JSON.stringify({schemaVersion: 1, label: "coverage", message: "97.56%"}));
    writeFixture(rootDirectory, "dist/logo.png");
    writeFixture(rootDirectory, "dist/social-preview.png");
    writeFixture(rootDirectory, "dist/google-verification.html");
    writeFixture(rootDirectory, "dist/assets/app.js");
    writeFixture(rootDirectory, "dist/assets/app.css");

    return rootDirectory;
};

afterEach(() => {
    while (temporaryDirectories.length > 0) {
        fs.rmSync(temporaryDirectories.pop(), {recursive: true, force: true});
    }
});

describe("validate-pages-artifact", () => {
    test("accepts a complete GitHub Pages artifact", async () => {
        const rootDirectory = createArtifactFixture();

        await expect(validatePagesArtifact({rootDirectory})).resolves.toEqual({
            routes: 2,
            reports: 2,
            assets: 2
        });
    });

    test("rejects an artifact missing a required report", async () => {
        const rootDirectory = createArtifactFixture();
        fs.rmSync(path.join(rootDirectory, "dist", "docs"), {recursive: true, force: true});

        await expect(validatePagesArtifact({rootDirectory})).rejects.toThrow(/Required Pages artifact file is missing/);
    });

    test("rejects application source maps", async () => {
        const rootDirectory = createArtifactFixture();
        writeFixture(rootDirectory, "dist/assets/app.js.map");

        await expect(validatePagesArtifact({rootDirectory})).rejects.toThrow(/source map/);
    });
});
