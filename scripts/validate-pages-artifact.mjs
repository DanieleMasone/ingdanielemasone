import fs from "node:fs/promises";
import path from "node:path";
import {fileURLToPath, pathToFileURL} from "node:url";
import {getRouteUrl, normalizePath} from "./prepare-github-pages.mjs";

/**
 * Validates the complete GitHub Pages artifact before upload.
 *
 * @module scripts/validate-pages-artifact
 */

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const readJson = async (filePath) => JSON.parse(await fs.readFile(filePath, "utf8"));

const requireFile = async (filePath) => {
    try {
        const stats = await fs.stat(filePath);

        if (!stats.isFile()) throw new Error(`Expected a file: ${filePath}`);
    } catch (error) {
        if (error.code === "ENOENT") throw new Error(`Required Pages artifact file is missing: ${filePath}`);
        throw error;
    }
};

const listFiles = async (directory) => {
    const entries = await fs.readdir(directory, {withFileTypes: true});
    const files = await Promise.all(entries.map(async (entry) => {
        const entryPath = path.join(directory, entry.name);

        return entry.isDirectory() ? listFiles(entryPath) : [entryPath];
    }));

    return files.flat();
};

const routeOutputPath = (distDir, routePath) => {
    const normalizedPath = normalizePath(routePath);

    return normalizedPath === "/"
        ? path.join(distDir, "index.html")
        : path.join(distDir, normalizedPath.slice(1), "index.html");
};

const requireContent = (content, expected, filePath) => {
    if (!content.includes(expected)) {
        throw new Error(`${filePath} is missing expected content: ${expected}`);
    }
};

/**
 * Checks route HTML, SEO files, reports, public assets and build output in `dist`.
 *
 * @param {object} [options] - Validation options.
 * @param {string} [options.rootDirectory] - Optional repository root override for tests.
 * @returns {Promise<{routes: number, reports: number, assets: number}>} Validated artifact counts.
 */
export const validatePagesArtifact = async ({rootDirectory = repositoryRoot} = {}) => {
    const distDir = path.join(rootDirectory, "dist");
    const config = await readJson(path.join(rootDirectory, "src", "config", "seo.json"));
    const sitemapPath = path.join(distDir, "sitemap.xml");
    const robotsPath = path.join(distDir, "robots.txt");
    const reportIndexes = [
        path.join(distDir, "docs", "index.html"),
        path.join(distDir, "test-coverage", "index.html")
    ];

    await Promise.all([
        requireFile(path.join(distDir, "index.html")),
        requireFile(path.join(distDir, "404.html")),
        requireFile(sitemapPath),
        requireFile(robotsPath),
        requireFile(path.join(distDir, "coverage-badge.json")),
        requireFile(path.join(distDir, "logo.png")),
        ...reportIndexes.map(requireFile)
    ]);

    const sitePath = new URL(`${config.siteUrl}/`).pathname;
    const socialImagePath = new URL(config.image.url).pathname;

    if (!socialImagePath.startsWith(sitePath)) {
        throw new Error("The configured social image is outside the GitHub Pages base path.");
    }

    await requireFile(path.join(distDir, socialImagePath.slice(sitePath.length)));

    for (const route of config.routes) {
        const outputPath = routeOutputPath(distDir, route.path);
        await requireFile(outputPath);

        const html = await fs.readFile(outputPath, "utf8");
        requireContent(html, `rel="canonical" data-static-seo="true" href="${getRouteUrl(config.siteUrl, route.path)}"`, outputPath);
        requireContent(html, `name="robots" data-static-seo="true" content="${route.robots}"`, outputPath);
    }

    const fallbackHtml = await fs.readFile(path.join(distDir, "404.html"), "utf8");
    requireContent(fallbackHtml, 'content="noindex, follow"', path.join(distDir, "404.html"));

    const sitemap = await fs.readFile(sitemapPath, "utf8");
    for (const route of config.routes) {
        const routeUrl = getRouteUrl(config.siteUrl, route.path);

        if (route.sitemap) requireContent(sitemap, `<loc>${routeUrl}</loc>`, sitemapPath);
        if (!route.sitemap && sitemap.includes(`<loc>${routeUrl}</loc>`)) {
            throw new Error(`${sitemapPath} unexpectedly contains non-indexable route ${routeUrl}.`);
        }
    }

    const robots = await fs.readFile(robotsPath, "utf8");
    requireContent(robots, `Allow: ${sitePath}`, robotsPath);
    requireContent(robots, `Sitemap: ${config.siteUrl}/sitemap.xml`, robotsPath);

    for (const reportIndex of reportIndexes) {
        const html = await fs.readFile(reportIndex, "utf8");
        requireContent(html, '<meta name="robots" content="noindex, nofollow"/>', reportIndex);
    }

    const coverageBadge = await readJson(path.join(distDir, "coverage-badge.json"));
    if (coverageBadge.schemaVersion !== 1 || coverageBadge.label !== "coverage" || !/^\d+(?:\.\d+)?%$/.test(coverageBadge.message)) {
        throw new Error("coverage-badge.json is not a valid Shields coverage endpoint payload.");
    }

    const rootFiles = await fs.readdir(distDir);
    if (!rootFiles.some((fileName) => /^google[\w-]+\.html$/i.test(fileName))) {
        throw new Error("Google Search Console verification file is missing from the Pages artifact.");
    }

    const assetsDir = path.join(distDir, "assets");
    const assetFiles = await listFiles(assetsDir);
    if (!assetFiles.some((filePath) => filePath.endsWith(".js")) || !assetFiles.some((filePath) => filePath.endsWith(".css"))) {
        throw new Error("The Pages artifact does not contain both JavaScript and CSS application assets.");
    }
    if (assetFiles.some((filePath) => filePath.endsWith(".map"))) {
        throw new Error("Unexpected application source map found in the Pages artifact.");
    }

    return {
        routes: config.routes.length,
        reports: reportIndexes.length,
        assets: assetFiles.length
    };
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    validatePagesArtifact()
        .then(({routes, reports, assets}) => {
            console.log(`Pages artifact validation passed: ${routes} routes, ${reports} reports, ${assets} assets.`);
        })
        .catch((error) => {
            console.error(error);
            process.exitCode = 1;
        });
}
