import {useEffect} from 'react';
import {useTranslation} from "react-i18next";
import seoConfig from "../../config/seo.json";

const ROUTE_SEO_ATTRIBUTE = "data-route-seo";
const ROUTE_SEO_SELECTOR = `[${ROUTE_SEO_ATTRIBUTE}="true"]`;
const STATIC_SEO_SELECTOR = "[data-static-seo='true']";

/**
 * SEO settings for a configured portfolio route.
 *
 * @typedef {object} SeoRouteConfig
 * @property {string} [path] - Clean route path.
 * @property {string} [pageKey] - Translation key suffix for route metadata.
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
        || (seoConfig.fallback?.pageKey === pageKey ? seoConfig.fallback : null)
        || {};
};

/**
 * Builds the canonical public URL for a route.
 *
 * @param {string} path - Route path associated with the current page.
 * @returns {string} Absolute canonical URL without hash fragments, using a trailing slash for route directories.
 */
const getCanonicalUrl = (path) => {
    const normalizedPath = getNormalizedPath(path);

    return `${seoConfig.siteUrl}${normalizedPath === "/" ? "/" : `${normalizedPath}/`}`;
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
 * Removes static SEO fallback tags after React has mounted route-level tags.
 *
 * The static tags in index.html remain available to crawlers and social
 * previews that do not execute JavaScript, while rendered portfolio routes keep
 * a single canonical set of metadata for Google Search Console and modern bots.
 *
 * @returns {void}
 */
const removeStaticSeoFallbackTags = () => {
    document.querySelectorAll(STATIC_SEO_SELECTOR).forEach((element) => element.remove());
};

/**
 * Removes previously rendered route-level metadata before writing fresh tags.
 *
 * @returns {void}
 */
const removeRouteSeoTags = () => {
    document.querySelectorAll(ROUTE_SEO_SELECTOR).forEach((element) => element.remove());
};

/**
 * Appends one managed metadata element to the document head.
 *
 * @param {string} tagName - Metadata tag name.
 * @param {Record<string, string>} attributes - Attributes to set on the element.
 * @param {string} [textContent] - Optional text content for script-like elements.
 * @returns {HTMLElement} The appended metadata element.
 */
const appendRouteSeoElement = (tagName, attributes, textContent) => {
    const element = document.createElement(tagName);

    Object.entries({
        ...attributes,
        [ROUTE_SEO_ATTRIBUTE]: "true"
    }).forEach(([key, value]) => element.setAttribute(key, value));

    if (textContent) element.textContent = textContent;

    document.head.appendChild(element);

    return element;
};

/**
 * Writes one canonical route-level metadata set to the document head.
 *
 * @param {object} params - Metadata values for the current route.
 * @param {string} params.title - Localized page title.
 * @param {string} params.description - Localized page description.
 * @param {string} params.url - Absolute canonical URL.
 * @param {string} params.locale - Open Graph locale code.
 * @param {string} params.language - Document language code.
 * @param {string} params.robots - Robots directive for the route.
 * @param {object} params.structuredData - JSON-LD graph for the current route.
 * @returns {void}
 */
const applySeoMetadata = ({title, description, url, locale, language, robots, structuredData}) => {
    removeStaticSeoFallbackTags();
    removeRouteSeoTags();

    document.documentElement.lang = language;
    document.title = title;

    appendRouteSeoElement("meta", {name: "description", content: description});
    appendRouteSeoElement("meta", {name: "author", content: seoConfig.author});
    appendRouteSeoElement("meta", {name: "keywords", content: seoConfig.keywords});
    appendRouteSeoElement("meta", {name: "robots", content: robots});
    appendRouteSeoElement("link", {rel: "canonical", href: url});

    appendRouteSeoElement("meta", {property: "og:title", content: title});
    appendRouteSeoElement("meta", {property: "og:description", content: description});
    appendRouteSeoElement("meta", {property: "og:type", content: "website"});
    appendRouteSeoElement("meta", {property: "og:url", content: url});
    appendRouteSeoElement("meta", {property: "og:image", content: seoConfig.image.url});
    appendRouteSeoElement("meta", {property: "og:image:secure_url", content: seoConfig.image.url});
    appendRouteSeoElement("meta", {property: "og:image:type", content: seoConfig.image.type});
    appendRouteSeoElement("meta", {property: "og:image:alt", content: seoConfig.image.alt});
    appendRouteSeoElement("meta", {property: "og:image:width", content: String(seoConfig.image.width)});
    appendRouteSeoElement("meta", {property: "og:image:height", content: String(seoConfig.image.height)});
    appendRouteSeoElement("meta", {property: "og:site_name", content: seoConfig.siteName});
    appendRouteSeoElement("meta", {property: "og:locale", content: locale});

    appendRouteSeoElement("meta", {name: "twitter:card", content: "summary_large_image"});
    appendRouteSeoElement("meta", {name: "twitter:title", content: title});
    appendRouteSeoElement("meta", {name: "twitter:description", content: description});
    appendRouteSeoElement("meta", {name: "twitter:image", content: seoConfig.image.url});
    appendRouteSeoElement("meta", {name: "twitter:image:alt", content: seoConfig.image.alt});
    appendRouteSeoElement("meta", {name: "twitter:creator", content: seoConfig.twitterCreator});

    appendRouteSeoElement(
        "script",
        {type: "application/ld+json"},
        JSON.stringify(structuredData)
    );
};

/**
 * SEO metadata for a portfolio route.
 *
 * Imperatively writes localized title, description, clean canonical URL, social
 * preview tags, robots directives, and JSON-LD structured data for the
 * professional portfolio. This keeps a single route-level metadata set after
 * React navigation while preserving the static fallback tags in index.html for
 * crawlers and social previews that do not execute JavaScript.
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
    const language = i18n?.resolvedLanguage || i18n?.language || seoConfig.defaultLanguage;
    const languageCode = getLanguageCode(language);
    const locale = seoConfig.locales[languageCode] || seoConfig.defaultLocale;
    const routeConfig = getRouteConfig(pageKey, path);
    const robots = routeConfig.robots || "index, follow";
    const structuredData = buildStructuredData({
        title,
        description,
        url,
        language
    });

    useEffect(() => {
        applySeoMetadata({title, description, url, locale, language, robots, structuredData});
    }, [title, description, url, locale, language, robots, structuredData]);

    return null;
}
