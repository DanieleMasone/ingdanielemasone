import React from 'react';
import {useTranslation} from "react-i18next";
import seoConfig from "../../config/seo.json";

/**
 * SEO settings for a configured portfolio route.
 *
 * @typedef {object} SeoRouteConfig
 * @property {string} [path] - Clean route path.
 * @property {string} [pageKey] - Translation key suffix for route metadata.
 * @property {string} [priority] - Sitemap priority value.
 * @property {string} [robots] - Robots directive rendered for the route.
 * @property {boolean} [sitemap] - Whether the route should be included in the sitemap.
 */

/**
 * Normalizes a route path to the clean pathname format used by GitHub Pages.
 *
 * @param {string} [path="/"] - Route path received by SeoHead.
 * @returns {string} A pathname that always starts with `/` and has no trailing slash, except for the root path.
 */
const getNormalizedPath = (path = "/") => {
    if (!path || path === "/") return "/";

    return `/${path.replace(/^\/+|\/+$/g, "")}`;
};

/**
 * Finds the SEO route configuration that matches the current page.
 *
 * @param {string} pageKey - Translation key suffix used by the route SEO metadata.
 * @param {string} path - Route path associated with the current page.
 * @returns {SeoRouteConfig} Matching route SEO settings.
 */
const getRouteConfig = (pageKey, path) => {
    const normalizedPath = getNormalizedPath(path);

    return seoConfig.routes.find((route) => route.pageKey === pageKey && route.path === normalizedPath)
        || seoConfig.routes.find((route) => route.path === normalizedPath)
        || {};
};

/**
 * Builds the canonical public URL for a route.
 *
 * @param {string} path - Route path associated with the current page.
 * @returns {string} Absolute canonical URL without hash fragments.
 */
const getCanonicalUrl = (path) => {
    const normalizedPath = getNormalizedPath(path);

    return `${seoConfig.siteUrl}${normalizedPath === "/" ? "/" : normalizedPath}`;
};

/**
 * Extracts the base language code from a browser or i18next locale.
 *
 * @param {string} language - Language value such as `it`, `it-IT`, or `en-US`.
 * @returns {string} Base language code used to resolve Open Graph locale metadata.
 */
const getLanguageCode = (language) => (language || seoConfig.defaultLanguage).split("-")[0];

/**
 * Creates JSON-LD structured data for the portfolio owner, website, and page.
 *
 * @param {{title: string, description: string, url: string, language: string}} params - Structured data inputs.
 * @returns {{'@context': string, '@graph': Array<object>}} Schema.org graph rendered in the document head.
 */
const buildStructuredData = ({title, description, url, language}) => ({
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Person",
            "@id": `${seoConfig.siteUrl}/#person`,
            "name": seoConfig.author,
            "url": `${seoConfig.siteUrl}/`,
            "image": seoConfig.image.url,
            "jobTitle": "Senior Software Engineer",
            "sameAs": seoConfig.sameAs
        },
        {
            "@type": "WebSite",
            "@id": `${seoConfig.siteUrl}/#website`,
            "url": `${seoConfig.siteUrl}/`,
            "name": seoConfig.siteName,
            "publisher": {
                "@id": `${seoConfig.siteUrl}/#person`
            },
            "inLanguage": language
        },
        {
            "@type": "WebPage",
            "@id": `${url}#webpage`,
            "url": url,
            "name": title,
            "description": description,
            "isPartOf": {
                "@id": `${seoConfig.siteUrl}/#website`
            },
            "about": {
                "@id": `${seoConfig.siteUrl}/#person`
            },
            "primaryImageOfPage": {
                "@type": "ImageObject",
                "url": seoConfig.image.url,
                "width": seoConfig.image.width,
                "height": seoConfig.image.height
            },
            "inLanguage": language
        }
    ]
});

/**
 * SEO metadata for a portfolio route.
 *
 * Uses React 19 native head support to render localized title, description,
 * clean canonical URL, social preview tags, robots directives, and JSON-LD
 * structured data for the professional portfolio.
 *
 * @component
 * @module components/seoHead/SeoHead
 * @example
 * <SeoHead pageKey="home" path="/" />
 *
 * @param {string} pageKey - Translation key suffix for SEO title and description.
 * @param {string} path - Relative URL path of the page (e.g., "/projects").
 *
 * @returns {JSX.Element} Route metadata rendered into the document head.
 */
export function SeoHead({pageKey, path}) {
    const {t, i18n} = useTranslation();

    const title = t(`seo.${pageKey}.title`);
    const description = t(`seo.${pageKey}.description`);
    const url = getCanonicalUrl(path);
    const languageCode = getLanguageCode(i18n?.resolvedLanguage || i18n?.language);
    const locale = seoConfig.locales[languageCode] || seoConfig.defaultLocale;
    const routeConfig = getRouteConfig(pageKey, path);
    const robots = routeConfig.robots || "index, follow";
    const structuredData = buildStructuredData({
        title,
        description,
        url,
        language: i18n?.resolvedLanguage || i18n?.language || seoConfig.defaultLanguage
    });

    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <meta name="author" content={seoConfig.author}/>
            <meta name="keywords" content={seoConfig.keywords}/>
            <meta name="robots" content={robots}/>
            <link rel="canonical" href={url}/>

            {/* Open Graph */}
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={url}/>
            <meta property="og:image" content={seoConfig.image.url}/>
            <meta property="og:image:alt" content={seoConfig.image.alt}/>
            <meta property="og:image:width" content={String(seoConfig.image.width)}/>
            <meta property="og:image:height" content={String(seoConfig.image.height)}/>
            <meta property="og:site_name" content={seoConfig.siteName}/>
            <meta property="og:locale" content={locale}/>

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" content={title}/>
            <meta name="twitter:description" content={description}/>
            <meta name="twitter:image" content={seoConfig.image.url}/>
            <meta name="twitter:image:alt" content={seoConfig.image.alt}/>
            <meta name="twitter:creator" content={seoConfig.twitterCreator}/>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
            />
        </>
    );
}
