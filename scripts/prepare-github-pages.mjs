import fs from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");
const seoConfigPath = path.join(rootDir, "src", "config", "seo.json");
const translationsPath = path.join(rootDir, "src", "locales", "it", "translation.json");
const seoStart = "<!-- SEO_START -->";
const seoEnd = "<!-- SEO_END -->";

const readJson = async (filePath) => JSON.parse(await fs.readFile(filePath, "utf8"));

const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const normalizePath = (routePath) => {
    if (!routePath || routePath === "/") return "/";

    return `/${routePath.replace(/^\/+|\/+$/g, "")}`;
};

const getRouteUrl = (siteUrl, routePath) => {
    const normalizedPath = normalizePath(routePath);

    return `${siteUrl}${normalizedPath === "/" ? "/" : normalizedPath}`;
};

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

const injectSeoBlock = ({html, config, route, translations}) => {
    const block = `${seoStart}\n${buildSeoBlock({config, route, translations})}\n    ${seoEnd}`;
    const pattern = new RegExp(`${seoStart}[\\s\\S]*?${seoEnd}`);

    if (!pattern.test(html)) {
        throw new Error("SEO markers not found in dist/index.html");
    }

    return html.replace(pattern, block);
};

const getRouteOutputPath = (routePath) => {
    const normalizedPath = normalizePath(routePath);

    if (normalizedPath === "/") return path.join(distDir, "index.html");

    return path.join(distDir, normalizedPath.slice(1), "index.html");
};

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

const buildRobots = ({config}) => [
    "User-agent: *",
    "Allow: /ingdanielemasone/",
    "Disallow: /ingdanielemasone/docs/",
    "Disallow: /ingdanielemasone/test-coverage/",
    "",
    `Sitemap: ${config.siteUrl}/sitemap.xml`,
    ""
].join("\n");

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
