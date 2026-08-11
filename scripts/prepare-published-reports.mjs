import fs from "node:fs/promises";
import path from "node:path";
import {fileURLToPath, pathToFileURL} from "node:url";

/**
 * Adds robots metadata and accessibility safeguards to generated report pages,
 * then copies them into the GitHub Pages artifact.
 *
 * The portfolio links to source documentation and coverage as developer resources,
 * but those generated pages are not portfolio landing pages and should not compete
 * with route-level portfolio pages in Google Search Console.
 *
 * @module scripts/prepare-published-reports
 */

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");
const reportDirs = [
    {source: "docs", target: "docs"},
    {source: "coverage", target: "test-coverage"}
];
const robotsMeta = '<meta name="robots" content="noindex, nofollow"/>';
const coverageSummaryName = "coverage-summary.json";
const coverageBadgeName = "coverage-badge.json";
const coverageResponsiveStylesPath = path.join(rootDir, "scripts", "assets", "coverage-responsive.css");
const coverageResponsiveScriptPath = path.join(rootDir, "scripts", "assets", "coverage-responsive.js");

/**
 * Injects or replaces a robots meta tag in an HTML document.
 *
 * @param {string} html - HTML document content.
 * @returns {string} HTML with a noindex robots meta tag in the head.
 * @throws {Error} When the HTML document has no head element.
 */
export const addNoindexRobotsMeta = (html) => {
    const robotsMetaPattern = /<meta\s+name=["']robots["'][^>]*>/i;

    if (robotsMetaPattern.test(html)) {
        return html.replace(robotsMetaPattern, robotsMeta);
    }

    if (!/<head(?:\s[^>]*)?>/i.test(html)) {
        throw new Error("Cannot add robots meta tag: missing <head> element");
    }

    return html.replace(/<head([^>]*)>/i, `<head$1>\n    ${robotsMeta}`);
};

/**
 * Makes generated Istanbul coverage tables keyboard-focusable so their
 * responsive horizontal scrolling is available without overflowing the page.
 *
 * @param {string} html - Generated coverage HTML document.
 * @returns {string} HTML with accessible coverage tables.
 */
export const makeCoverageTablesScrollable = (html) => html.replace(
    /<pre>\s*<table\b[^>]*\bclass=(["'])coverage\1[^>]*>[\s\S]*?<\/table>\s*<\/pre>/gi,
    (table) => `<div class="portfolio-coverage-scroll" role="region" aria-label="Scrollable coverage data" tabindex="0">\n${table}\n</div>`
).replace(
    /<table\b[^>]*\bclass=(["'])coverage-summary\1[^>]*>[\s\S]*?<\/table>/gi,
    (table) => `<div class="portfolio-coverage-scroll" role="region" aria-label="Scrollable coverage data" tabindex="0">\n${table}\n</div>`
);

/**
 * Recursively lists HTML files inside a directory.
 *
 * @param {string} directory - Absolute directory path.
 * @returns {Promise<Array<string>>} HTML file paths.
 */
const listHtmlFiles = async (directory) => {
    const entries = await fs.readdir(directory, {withFileTypes: true});
    const nestedFiles = await Promise.all(entries.map(async (entry) => {
        const entryPath = path.join(directory, entry.name);

        if (entry.isDirectory()) return listHtmlFiles(entryPath);
        if (entry.isFile() && entry.name.endsWith(".html")) return [entryPath];

        return [];
    }));

    return nestedFiles.flat();
};

/**
 * Adds publishing metadata and optional coverage-table accessibility to every
 * generated HTML file in a report directory.
 *
 * @param {string} directory - Absolute report directory path.
 * @param {object} [options] - Report-specific preparation options.
 * @param {boolean} [options.coverage=false] - Whether to enhance Istanbul coverage tables.
 * @returns {Promise<number>} Number of processed HTML files.
 */
const prepareReportDirectory = async (directory, {coverage = false} = {}) => {
    const files = await listHtmlFiles(directory);

    if (files.length === 0) {
        throw new Error(`Generated report contains no HTML files: ${directory}`);
    }

    await Promise.all(files.map(async (filePath) => {
        const html = await fs.readFile(filePath, "utf8");

        const preparedHtml = addNoindexRobotsMeta(
            coverage ? makeCoverageTablesScrollable(html) : html
        );

        await fs.writeFile(filePath, preparedHtml, "utf8");
    }));

    return files.length;
};

/**
 * Creates a Shields endpoint payload from Vitest's line-coverage summary.
 *
 * @param {object} summary - Parsed Vitest `coverage-summary.json` content.
 * @returns {{schemaVersion: number, label: string, message: string, color: string}} Shields endpoint payload.
 * @throws {Error} When the summary does not expose a finite line-coverage percentage.
 */
export const createCoverageBadge = (summary) => {
    const percentage = Number(summary?.total?.lines?.pct);

    if (!Number.isFinite(percentage)) {
        throw new Error("Coverage summary is missing total.lines.pct.");
    }

    const color = percentage >= 90 ? "15803d" : percentage >= 80 ? "b45309" : "b91c1c";

    return {
        schemaVersion: 1,
        label: "coverage",
        message: `${percentage}%`,
        color
    };
};

/**
 * Copies required documentation and coverage reports into `dist`, applies
 * noindex metadata only to the published copies, and writes the coverage badge.
 *
 * @returns {Promise<{reports: Array<{target: string, htmlFiles: number}>, coverage: number}>} Published report counts.
 * @throws {Error} When a required report, HTML output, or coverage summary is missing or invalid.
 */
export const preparePublishedReports = async () => {
    await Promise.all(reportDirs.map(({source}) => fs.access(path.join(rootDir, source))));

    const [coverageResponsiveStyles, coverageResponsiveScript] = await Promise.all([
        fs.readFile(coverageResponsiveStylesPath, "utf8"),
        fs.readFile(coverageResponsiveScriptPath, "utf8")
    ]);
    const reports = await Promise.all(reportDirs.map(async ({source, target}) => {
        const sourceDir = path.join(rootDir, source);
        const targetDir = path.join(distDir, target);

        await fs.rm(targetDir, {recursive: true, force: true});
        await fs.cp(sourceDir, targetDir, {recursive: true});

        if (target === "test-coverage") {
            const targetStylesPath = path.join(targetDir, "base.css");
            const targetScriptPath = path.join(targetDir, "block-navigation.js");

            await Promise.all([
                fs.access(targetStylesPath),
                fs.access(targetScriptPath)
            ]);
            await Promise.all([
                fs.appendFile(
                    targetStylesPath,
                    `\n${coverageResponsiveStyles.trim()}\n`,
                    "utf8"
                ),
                fs.appendFile(
                    targetScriptPath,
                    `\n${coverageResponsiveScript.trim()}\n`,
                    "utf8"
                )
            ]);
        }

        return {
            target,
            htmlFiles: await prepareReportDirectory(targetDir, {coverage: target === "test-coverage"})
        };
    }));

    const coverageSummaryPath = path.join(distDir, "test-coverage", coverageSummaryName);
    const coverageSummary = JSON.parse(await fs.readFile(coverageSummaryPath, "utf8"));
    const coverageBadge = createCoverageBadge(coverageSummary);

    await fs.writeFile(
        path.join(distDir, coverageBadgeName),
        `${JSON.stringify(coverageBadge, null, 2)}\n`,
        "utf8"
    );

    return {
        reports,
        coverage: Number(coverageSummary.total.lines.pct)
    };
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    preparePublishedReports()
        .then(({reports, coverage}) => {
            const reportSummary = reports.map(({target, htmlFiles}) => `${target}: ${htmlFiles} HTML`).join(", ");
            console.log(`Published reports prepared (${reportSummary}); line coverage: ${coverage}%.`);
        })
        .catch((error) => {
            console.error(error);
            process.exitCode = 1;
        });
}
