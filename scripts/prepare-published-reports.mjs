import fs from "node:fs/promises";
import path from "node:path";
import {fileURLToPath, pathToFileURL} from "node:url";

/**
 * Adds robots metadata to generated report pages before they are published on GitHub Pages.
 *
 * The portfolio links to source documentation and coverage as developer resources,
 * but those generated pages are not portfolio landing pages and should not compete
 * with route-level portfolio pages in Google Search Console.
 *
 * @module scripts/prepare-published-reports
 */

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const reportDirs = ["docs", "coverage"];
const robotsMeta = '<meta name="robots" content="noindex, nofollow"/>';

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
 * Adds noindex metadata to all generated HTML files in a report directory.
 *
 * @param {string} directory - Absolute report directory path.
 * @returns {Promise<number>} Number of processed HTML files.
 */
const prepareReportDirectory = async (directory) => {
    try {
        const files = await listHtmlFiles(directory);

        await Promise.all(files.map(async (filePath) => {
            const html = await fs.readFile(filePath, "utf8");

            await fs.writeFile(filePath, addNoindexRobotsMeta(html), "utf8");
        }));

        return files.length;
    } catch (error) {
        if (error.code === "ENOENT") return 0;

        throw error;
    }
};

/**
 * Applies noindex metadata to generated documentation and coverage reports.
 *
 * @returns {Promise<void>}
 */
export const preparePublishedReports = async () => {
    await Promise.all(reportDirs.map((dir) => prepareReportDirectory(path.join(rootDir, dir))));
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    preparePublishedReports().catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
}
