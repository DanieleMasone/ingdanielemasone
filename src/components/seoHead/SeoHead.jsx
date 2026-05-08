import React from 'react';
import {useTranslation} from "react-i18next";
import seoConfig from "../../config/seo.json";

const getNormalizedPath = (path = "/") => {
    if (!path || path === "/") return "/";

    return `/${path.replace(/^\/+|\/+$/g, "")}`;
};

const getRouteConfig = (pageKey, path) => {
    const normalizedPath = getNormalizedPath(path);

    return seoConfig.routes.find((route) => route.pageKey === pageKey && route.path === normalizedPath)
        || seoConfig.routes.find((route) => route.path === normalizedPath)
        || {};
};

const getCanonicalUrl = (path) => {
    const normalizedPath = getNormalizedPath(path);

    return `${seoConfig.siteUrl}${normalizedPath === "/" ? "/" : normalizedPath}`;
};

const getLanguageCode = (language) => (language || seoConfig.defaultLanguage).split("-")[0];

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
