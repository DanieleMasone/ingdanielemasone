import {describe, expect, it, vi} from "vitest";
import {
    buildRobots,
    buildSeoBlock,
    buildSitemap,
    escapeHtml,
    getRouteUrl,
    injectSeoBlock,
    normalizePath,
    prepareGithubPages
} from "../../scripts/prepare-github-pages.mjs";
import fs from "node:fs/promises";

const config = {
    siteUrl: "https://danielemasone.github.io/ingdanielemasone",
    siteName: "Daniele Masone Portfolio",
    author: "Daniele Masone",
    defaultLanguage: "it-IT",
    defaultLocale: "it_IT",
    keywords: "Daniele Masone, portfolio, CV online, software engineer, frontend architect, React, Angular, JavaScript",
    twitterCreator: "@masone_daniele",
    image: {
        url: "https://danielemasone.github.io/ingdanielemasone/social-preview.png",
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "Daniele Masone portfolio social preview"
    },
    sameAs: [
        "https://www.linkedin.com/in/ingdanielemasone/",
        "https://github.com/DanieleMasone",
        "https://www.udemy.com/user/daniele-masone/",
        "https://twitter.com/masone_daniele"
    ],
    locales: {
        it: "it_IT",
        en: "en_US",
        fr: "fr_FR",
        de: "de_DE",
        es: "es_ES"
    },
    fallback: {path: "/404", pageKey: "notFound", robots: "noindex, follow", sitemap: false},
    routes: [
        {path: "/", pageKey: "home", robots: "index, follow", sitemap: true},
        {path: "/experience", pageKey: "experience", robots: "index, follow", sitemap: true},
        {path: "/projects", pageKey: "projects", robots: "index, follow", sitemap: true},
        {path: "/github-projects", pageKey: "githubProjects", robots: "index, follow", sitemap: true},
        {path: "/courses", pageKey: "courses", robots: "index, follow", sitemap: true},
        {path: "/certifications", pageKey: "certifications", robots: "index, follow", sitemap: true},
        {path: "/testimonials", pageKey: "testimonials", robots: "index, follow", sitemap: true},
        {path: "/trading", pageKey: "trading", robots: "index, follow", sitemap: true},
        {path: "/privacy", pageKey: "privacy", robots: "noindex, follow", sitemap: false},
        {path: "/cookie-policy", pageKey: "cookie", robots: "noindex, follow", sitemap: false}
    ]
};

const translations = {
    seo: {
        home: {
            title: "Daniele Masone | Senior Software Engineer",
            description: "Portfolio personale di Daniele Masone, Senior Software Engineer specializzato in frontend architecture, React, Angular e JavaScript."
        },
        experience: {
            title: "Esperienza | Daniele Masone",
            description: "Esperienza professionale di Daniele Masone nel software engineering."
        },
        projects: {
            title: "Progetti | Daniele Masone",
            description: "Progetti selezionati realizzati da Daniele Masone."
        },
        githubProjects: {
            title: "GitHub Projects | Daniele Masone",
            description: "Repository e progetti open source pubblicati su GitHub."
        },
        courses: {
            title: "Corsi | Daniele Masone",
            description: "Corsi e contenuti formativi creati da Daniele Masone."
        },
        certifications: {
            title: "Certificazioni | Daniele Masone",
            description: "Certificazioni professionali conseguite da Daniele Masone."
        },
        testimonials: {
            title: "Testimonianze | Daniele Masone",
            description: "Feedback e testimonianze professionali."
        },
        trading: {
            title: "Trading | Daniele Masone",
            description: "Contenuti relativi al trading e all’analisi dei mercati."
        },
        privacy: {
            title: "Privacy Policy | Daniele Masone",
            description: "Informativa sulla privacy del sito."
        },
        cookie: {
            title: "Cookie Policy | Daniele Masone",
            description: "Informativa sui cookie del sito."
        },
        notFound: {
            title: "Pagina non trovata | Daniele Masone",
            description: "La pagina richiesta non è disponibile."
        }
    }
};

vi.mock("node:fs/promises", () => ({
    default: {
        readFile: vi.fn(),
        writeFile: vi.fn(),
        mkdir: vi.fn()
    }
}));

describe("prepare-github-pages", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("writes route-specific HTML files, sitemap and robots artifacts", async () => {
        const template = [
            "<html>",
            "<head>",
            "    <!-- SEO_START -->",
            "    <!-- SEO_END -->",
            "</head>",
            "<body></body>",
            "</html>"
        ].join("\n");

        fs.readFile.mockImplementation(async (filePath) => {
            const normalizedPath = filePath.toString().replaceAll("\\", "/");

            if (normalizedPath.endsWith("/src/config/seo.json")) {
                return JSON.stringify(config);
            }

            if (normalizedPath.endsWith("/src/locales/it/translation.json")) {
                return JSON.stringify(translations);
            }

            if (normalizedPath.endsWith("/dist/index.html")) {
                return template;
            }

            throw new Error(`Unexpected readFile path: ${filePath}`);
        });

        await prepareGithubPages();

        expect(fs.readFile).toHaveBeenCalledTimes(3);

        expect(fs.mkdir).toHaveBeenCalledWith(
            expect.stringMatching(/dist$/),
            {recursive: true}
        );

        expect(fs.mkdir).toHaveBeenCalledWith(
            expect.stringMatching(/dist[/\\]experience$/),
            {recursive: true}
        );

        expect(fs.mkdir).toHaveBeenCalledWith(
            expect.stringMatching(/dist[/\\]github-projects$/),
            {recursive: true}
        );

        expect(fs.writeFile).toHaveBeenCalledWith(
            expect.stringMatching(/dist[/\\]index\.html$/),
            expect.stringContaining('<title data-static-seo="true">Daniele Masone | Senior Software Engineer</title>'),
            "utf8"
        );

        expect(fs.writeFile).toHaveBeenCalledWith(
            expect.stringMatching(/dist[/\\]experience[/\\]index\.html$/),
            expect.stringContaining('<link rel="canonical" data-static-seo="true" href="https://danielemasone.github.io/ingdanielemasone/experience/"/>'),
            "utf8"
        );

        expect(fs.writeFile).toHaveBeenCalledWith(
            expect.stringMatching(/dist[/\\]privacy[/\\]index\.html$/),
            expect.stringContaining('<meta name="robots" data-static-seo="true" content="noindex, follow"/>'),
            "utf8"
        );

        expect(fs.writeFile).toHaveBeenCalledWith(
            expect.stringMatching(/dist[/\\]404\.html$/),
            expect.stringContaining('<meta name="robots" data-static-seo="true" content="noindex, follow"/>'),
            "utf8"
        );

        expect(fs.writeFile).toHaveBeenCalledWith(
            expect.stringMatching(/dist[/\\]sitemap\.xml$/),
            expect.stringContaining("<loc>https://danielemasone.github.io/ingdanielemasone/github-projects/</loc>"),
            "utf8"
        );

        expect(fs.writeFile).toHaveBeenCalledWith(
            expect.stringMatching(/dist[/\\]robots\.txt$/),
            expect.stringContaining("Sitemap: https://danielemasone.github.io/ingdanielemasone/sitemap.xml"),
            "utf8"
        );

        expect(fs.writeFile).toHaveBeenCalledTimes(config.routes.length + 3);
    });

    it("normalizes route paths", () => {
        expect(normalizePath("/")).toBe("/");
        expect(normalizePath("experience")).toBe("/experience");
        expect(normalizePath("/projects/")).toBe("/projects");
        expect(normalizePath("///github-projects///")).toBe("/github-projects");
    });

    it("builds canonical route URLs with trailing slash", () => {
        expect(getRouteUrl(config.siteUrl, "/")).toBe(
            "https://danielemasone.github.io/ingdanielemasone/"
        );

        expect(getRouteUrl(config.siteUrl, "/experience")).toBe(
            "https://danielemasone.github.io/ingdanielemasone/experience/"
        );

        expect(getRouteUrl(config.siteUrl, "/github-projects")).toBe(
            "https://danielemasone.github.io/ingdanielemasone/github-projects/"
        );
    });

    it("escapes HTML-sensitive characters", () => {
        expect(escapeHtml(`Daniele & <Portfolio> "SEO"`)).toBe(
            "Daniele &amp; &lt;Portfolio&gt; &quot;SEO&quot;"
        );
    });

    it("builds SEO metadata for the home route", () => {
        const html = buildSeoBlock({
            config,
            route: config.routes[0],
            translations
        });

        expect(html).toContain('<title data-static-seo="true">Daniele Masone | Senior Software Engineer</title>');
        expect(html).toContain(
            '<meta name="author" data-static-seo="true" content="Daniele Masone"/>'
        );
        expect(html).toContain(
            '<meta name="robots" data-static-seo="true" content="index, follow"/>'
        );
        expect(html).toContain(
            '<link rel="canonical" data-static-seo="true" href="https://danielemasone.github.io/ingdanielemasone/"/>'
        );
        expect(html).toContain(
            '<meta property="og:image" data-static-seo="true" content="https://danielemasone.github.io/ingdanielemasone/social-preview.png"/>'
        );
        expect(html).toContain(
            '<meta name="twitter:creator" data-static-seo="true" content="@masone_daniele"/>'
        );
        expect(html).toContain('"@context":"https://schema.org"');
        expect(html).toContain('"jobTitle":"Senior Software Engineer"');
        expect(html).toContain('"inLanguage":"it-IT"');
    });

    it("builds SEO metadata with noindex robots for privacy route", () => {
        const privacyRoute = config.routes.find((route) => route.path === "/privacy");

        const html = buildSeoBlock({
            config,
            route: privacyRoute,
            translations
        });

        expect(html).toContain('<title data-static-seo="true">Privacy Policy | Daniele Masone</title>');
        expect(html).toContain(
            '<meta name="robots" data-static-seo="true" content="noindex, follow"/>'
        );
        expect(html).toContain(
            '<link rel="canonical" data-static-seo="true" href="https://danielemasone.github.io/ingdanielemasone/privacy/"/>'
        );
    });

    it("injects SEO block between markers", () => {
        const template = [
            "<html>",
            "<head>",
            "    <!-- SEO_START -->",
            "    <!-- OLD_SEO -->",
            "    <!-- SEO_END -->",
            "</head>",
            "<body></body>",
            "</html>"
        ].join("\n");

        const result = injectSeoBlock({
            html: template,
            config,
            route: config.routes[2],
            translations
        });

        expect(result).toContain('<title data-static-seo="true">Progetti | Daniele Masone</title>');
        expect(result).toContain(
            '<link rel="canonical" data-static-seo="true" href="https://danielemasone.github.io/ingdanielemasone/projects/"/>'
        );
        expect(result).not.toContain("OLD_SEO");
    });

    it("throws when SEO markers are missing", () => {
        expect(() =>
            injectSeoBlock({
                html: "<html><head></head><body></body></html>",
                config,
                route: config.routes[0],
                translations
            })
        ).toThrow("SEO markers not found in dist/index.html");
    });

    it("builds sitemap only for sitemap-enabled routes", () => {
        const sitemap = buildSitemap({config});

        expect(sitemap).toContain(
            "<loc>https://danielemasone.github.io/ingdanielemasone/</loc>"
        );
        expect(sitemap).toContain(
            "<loc>https://danielemasone.github.io/ingdanielemasone/experience/</loc>"
        );
        expect(sitemap).toContain(
            "<loc>https://danielemasone.github.io/ingdanielemasone/projects/</loc>"
        );
        expect(sitemap).toContain(
            "<loc>https://danielemasone.github.io/ingdanielemasone/github-projects/</loc>"
        );
        expect(sitemap).toContain(
            "<loc>https://danielemasone.github.io/ingdanielemasone/trading/</loc>"
        );

        expect(sitemap).not.toContain("/privacy/");
        expect(sitemap).not.toContain("/cookie-policy/");
        expect(sitemap).not.toContain("/404/");
        expect(sitemap).not.toContain("<lastmod>");
        expect(sitemap).not.toContain("<priority>");
    });

    it("builds robots.txt for GitHub Pages project path", () => {
        const robots = buildRobots({config});

        expect(robots).toContain("User-agent: *");
        expect(robots).toContain("Allow: /ingdanielemasone/");
        expect(robots).toContain(
            "Sitemap: https://danielemasone.github.io/ingdanielemasone/sitemap.xml"
        );
    });
});
