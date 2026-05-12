import fs from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";

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
const escapeHtml = (value) => String(value)
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
const normalizePath = (routePath) => {
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
const getRouteUrl = (siteUrl, routePath) => {
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
 * @param {{config: object, route: object, translations: object}} params - SEO config, route config, and Italian translations.
 * @returns {string} HTML fragment that replaces the SEO marker block in the Vite template.
 */
const buildSeoBlock = ({config, route, translations}) => {
    const pageSeo = translations.seo[route.pageKey];
    const url = getRouteUrl(config.siteUrl, route.path);
    const title = pageSeo.title;
    const description = pageSeo.description;
    const structuredData = buildStructuredData({config, title, description, url});

    return [
        `    <title>${escapeHtml(title)}</title>`,
        `    <meta name="description" content="${escapeHtml(description)}"/>`,
        `    <meta name="author" content="${escapeHtml(config.author)}"/>`,
        `    <meta name="keywords" content="${escapeHtml(config.keywords)}"/>`,
        `    <meta name="robots" content="${escapeHtml(route.robots || "index, follow")}"/>`,
        `    <link rel="canonical" href="${escapeHtml(url)}"/>`,
        `    <meta property="og:title" content="${escapeHtml(title)}"/>`,
        `    <meta property="og:description" content="${escapeHtml(description)}"/>`,
        `    <meta property="og:type" content="website"/>`,
        `    <meta property="og:url" content="${escapeHtml(url)}"/>`,
        `    <meta property="og:image" content="${escapeHtml(config.image.url)}"/>`,
        `    <meta property="og:image:secure_url" content="${escapeHtml(config.image.url)}"/>`,
        `    <meta property="og:image:type" content="${escapeHtml(config.image.type)}"/>`,
        `    <meta property="og:image:alt" content="${escapeHtml(config.image.alt)}"/>`,
        `    <meta property="og:image:width" content="${escapeHtml(config.image.width)}"/>`,
        `    <meta property="og:image:height" content="${escapeHtml(config.image.height)}"/>`,
        `    <meta property="og:site_name" content="${escapeHtml(config.siteName)}"/>`,
        `    <meta property="og:locale" content="${escapeHtml(config.defaultLocale)}"/>`,
        `    <meta name="twitter:card" content="summary_large_image"/>`,
        `    <meta name="twitter:title" content="${escapeHtml(title)}"/>`,
        `    <meta name="twitter:description" content="${escapeHtml(description)}"/>`,
        `    <meta name="twitter:image" content="${escapeHtml(config.image.url)}"/>`,
        `    <meta name="twitter:image:alt" content="${escapeHtml(config.image.alt)}"/>`,
        `    <meta name="twitter:creator" content="${escapeHtml(config.twitterCreator)}"/>`,
        `    <script type="application/ld+json">${JSON.stringify(structuredData)}</script>`
    ].join("\n");
};

/**
 * Replaces the SEO marker block in the built index template.
 *
 * @param {{html: string, config: object, route: object, translations: object}} params - Static HTML and route metadata inputs.
 * @returns {string} HTML with route-specific SEO metadata.
 * @throws {Error} When the SEO markers are missing from the built template.
 */
const injectSeoBlock = ({html, config, route, translations}) => {
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
const buildSitemap = ({config}) => {
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
const buildRobots = ({config}) => [
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
const prepareGithubPages = async () => {
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

prepareGithubPages().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
