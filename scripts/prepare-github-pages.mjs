import fs from "node:fs/promises";
import path from "node:path";
import {fileURLToPath, pathToFileURL} from "node:url";

/**
 * Generates GitHub Pages-friendly route files and SEO artifacts after Vite builds the portfolio.
 *
 * @module scripts/prepare-github-pages
 */

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");
const seoConfigPath = path.join(rootDir, "src", "config", "seo.json");
const translationsPath = path.join(rootDir, "src", "locales", "it", "translation.json");
const seoStart = "<!-- SEO_START -->";
const seoEnd = "<!-- SEO_END -->";
const staticSeoAttribute = 'data-static-seo="true"';

/**
 * Reads and parses a UTF-8 JSON file.
 *
 * @param {string} filePath - Absolute path of the JSON file.
 * @returns {Promise<object>} Parsed JSON content.
 */
const readJson = async (filePath) => JSON.parse(await fs.readFile(filePath, "utf8"));

/**
 * Escapes text that will be injected into HTML attributes or tags.
 *
 * @param {unknown} value - Value to escape for HTML output.
 * @returns {string} HTML-safe string.
 */
export const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

/**
 * Normalizes a route path to a clean pathname.
 *
 * @param {string} routePath - Route path from the SEO configuration.
 * @returns {string} Normalized path with a leading slash and no trailing slash, except `/`.
 */
export const normalizePath = (routePath) => {
    if (!routePath || routePath === "/") return "/";

    return `/${routePath.replace(/^\/+|\/+$/g, "")}`;
};

/**
 * Builds the absolute public URL for a configured route.
 *
 * @param {string} siteUrl - Absolute GitHub Pages site URL.
 * @param {string} routePath - Route path from the SEO configuration.
 * @returns {string} Absolute route URL without hash fragments, using a trailing slash for route directories.
 */
export const getRouteUrl = (siteUrl, routePath) => {
    const normalizedPath = normalizePath(routePath);

    return `${siteUrl}${normalizedPath === "/" ? "/" : `${normalizedPath}/`}`;
};

/**
 * Creates JSON-LD structured data for a static route entry.
 *
 * @param {{config: object, title: string, description: string, url: string}} params - Route metadata inputs.
 * @returns {{'@context': string, '@graph': Array<object>}} Schema.org graph for the rendered route.
 */
const buildStructuredData = ({config, title, description, url}) => ({
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Person",
            "@id": `${config.siteUrl}/#person`,
            "name": config.author,
            "url": `${config.siteUrl}/`,
            "image": config.image.url,
            "jobTitle": "Senior Software Engineer",
            "sameAs": config.sameAs
        },
        {
            "@type": "WebSite",
            "@id": `${config.siteUrl}/#website`,
            "url": `${config.siteUrl}/`,
            "name": config.siteName,
            "publisher": {
                "@id": `${config.siteUrl}/#person`
            },
            "inLanguage": config.defaultLanguage
        },
        {
            "@type": "WebPage",
            "@id": `${url}#webpage`,
            "url": url,
            "name": title,
            "description": description,
            "isPartOf": {
                "@id": `${config.siteUrl}/#website`
            },
            "about": {
                "@id": `${config.siteUrl}/#person`
            },
            "primaryImageOfPage": {
                "@type": "ImageObject",
                "url": config.image.url,
                "width": config.image.width,
                "height": config.image.height
            },
            "inLanguage": config.defaultLanguage
        }
    ]
});

/**
 * Builds the full SEO head block for a static route.
 *
 * Generated tags are marked as static fallbacks so SeoHead can remove them at
 * runtime before writing the active route metadata set for the SPA.
 *
 * @param {{config: object, route: object, translations: object}} params - SEO config, route config, and Italian translations.
 * @returns {string} HTML fragment that replaces the SEO marker block in the Vite template.
 */
export const buildSeoBlock = ({config, route, translations}) => {
    const pageSeo = translations.seo[route.pageKey];
    const url = getRouteUrl(config.siteUrl, route.path);
    const title = pageSeo.title;
    const description = pageSeo.description;
    const structuredData = buildStructuredData({config, title, description, url});

    return [
        `    <title ${staticSeoAttribute}>${escapeHtml(title)}</title>`,
        `    <meta name="description" ${staticSeoAttribute} content="${escapeHtml(description)}"/>`,
        `    <meta name="author" ${staticSeoAttribute} content="${escapeHtml(config.author)}"/>`,
        `    <meta name="keywords" ${staticSeoAttribute} content="${escapeHtml(config.keywords)}"/>`,
        `    <meta name="robots" ${staticSeoAttribute} content="${escapeHtml(route.robots || "index, follow")}"/>`,
        `    <link rel="canonical" ${staticSeoAttribute} href="${escapeHtml(url)}"/>`,
        `    <meta property="og:title" ${staticSeoAttribute} content="${escapeHtml(title)}"/>`,
        `    <meta property="og:description" ${staticSeoAttribute} content="${escapeHtml(description)}"/>`,
        `    <meta property="og:type" ${staticSeoAttribute} content="website"/>`,
        `    <meta property="og:url" ${staticSeoAttribute} content="${escapeHtml(url)}"/>`,
        `    <meta property="og:image" ${staticSeoAttribute} content="${escapeHtml(config.image.url)}"/>`,
        `    <meta property="og:image:secure_url" ${staticSeoAttribute} content="${escapeHtml(config.image.url)}"/>`,
        `    <meta property="og:image:type" ${staticSeoAttribute} content="${escapeHtml(config.image.type)}"/>`,
        `    <meta property="og:image:alt" ${staticSeoAttribute} content="${escapeHtml(config.image.alt)}"/>`,
        `    <meta property="og:image:width" ${staticSeoAttribute} content="${escapeHtml(config.image.width)}"/>`,
        `    <meta property="og:image:height" ${staticSeoAttribute} content="${escapeHtml(config.image.height)}"/>`,
        `    <meta property="og:site_name" ${staticSeoAttribute} content="${escapeHtml(config.siteName)}"/>`,
        `    <meta property="og:locale" ${staticSeoAttribute} content="${escapeHtml(config.defaultLocale)}"/>`,
        `    <meta name="twitter:card" ${staticSeoAttribute} content="summary_large_image"/>`,
        `    <meta name="twitter:title" ${staticSeoAttribute} content="${escapeHtml(title)}"/>`,
        `    <meta name="twitter:description" ${staticSeoAttribute} content="${escapeHtml(description)}"/>`,
        `    <meta name="twitter:image" ${staticSeoAttribute} content="${escapeHtml(config.image.url)}"/>`,
        `    <meta name="twitter:image:alt" ${staticSeoAttribute} content="${escapeHtml(config.image.alt)}"/>`,
        `    <meta name="twitter:creator" ${staticSeoAttribute} content="${escapeHtml(config.twitterCreator)}"/>`,
        `    <script type="application/ld+json" ${staticSeoAttribute}>${JSON.stringify(structuredData)}</script>`
    ].join("\n");
};

/**
 * Replaces the SEO marker block in the built index template.
 *
 * @param {{html: string, config: object, route: object, translations: object}} params - Static HTML and route metadata inputs.
 * @returns {string} HTML with route-specific SEO metadata.
 * @throws {Error} When the SEO markers are missing from the built template.
 */
export const injectSeoBlock = ({html, config, route, translations}) => {
    const block = `${seoStart}\n${buildSeoBlock({config, route, translations})}\n    ${seoEnd}`;
    const pattern = new RegExp(`${seoStart}[\\s\\S]*?${seoEnd}`);

    if (!pattern.test(html)) {
        throw new Error("SEO markers not found in dist/index.html");
    }

    return html.replace(pattern, block);
};

/**
 * Resolves where a route-specific `index.html` file should be written.
 *
 * @param {string} routePath - Route path from the SEO configuration.
 * @returns {string} Absolute output path in the `dist` folder.
 */
const getRouteOutputPath = (routePath) => {
    const normalizedPath = normalizePath(routePath);

    if (normalizedPath === "/") return path.join(distDir, "index.html");

    return path.join(distDir, normalizedPath.slice(1), "index.html");
};

/**
 * Builds the XML sitemap from indexable routes.
 *
 * @param {{config: object}} params - SEO configuration containing route priorities and sitemap flags.
 * @returns {string} XML sitemap content.
 */
export const buildSitemap = ({config}) => {
    const today = new Date().toISOString().slice(0, 10);
    const urls = config.routes
        .filter((route) => route.sitemap)
        .map((route) => [
            "    <url>",
            `        <loc>${getRouteUrl(config.siteUrl, route.path)}</loc>`,
            `        <lastmod>${today}</lastmod>`,
            `        <priority>${route.priority}</priority>`,
            "    </url>"
        ].join("\n"))
        .join("\n\n");

    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        "",
        urls,
        "",
        "</urlset>",
        ""
    ].join("\n");
};

/**
 * Builds a robots file for the GitHub Pages project path.
 *
 * @param {{config: object}} params - SEO configuration containing the public site URL.
 * @returns {string} Robots file content.
 */
export const buildRobots = ({config}) => [
    "User-agent: *",
    "Allow: /ingdanielemasone/",
    "",
    `Sitemap: ${config.siteUrl}/sitemap.xml`,
    ""
].join("\n");

/**
 * Writes route-specific HTML files, sitemap, and robots artifacts into `dist`.
 *
 * @returns {Promise<void>}
 */
export const prepareGithubPages = async () => {
    const [config, translations, templateHtml] = await Promise.all([
        readJson(seoConfigPath),
        readJson(translationsPath),
        fs.readFile(path.join(distDir, "index.html"), "utf8")
    ]);

    await Promise.all(config.routes.map(async (route) => {
        const outputPath = getRouteOutputPath(route.path);
        const routeHtml = injectSeoBlock({
            html: templateHtml,
            config,
            route,
            translations
        });

        await fs.mkdir(path.dirname(outputPath), {recursive: true});
        await fs.writeFile(outputPath, routeHtml, "utf8");
    }));

    const sitemap = buildSitemap({config});
    const robots = buildRobots({config});

    await Promise.all([
        fs.writeFile(path.join(distDir, "sitemap.xml"), sitemap, "utf8"),
        fs.writeFile(path.join(distDir, "robots.txt"), robots, "utf8")
    ]);
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    prepareGithubPages().catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
}
