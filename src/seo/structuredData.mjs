/**
 * Pure Schema.org builders shared by runtime and static portfolio SEO.
 *
 * The module intentionally has no React, browser, Node.js, i18n, or filesystem
 * dependencies so route metadata uses the same graph in every environment.
 *
 * @module seo/structuredData
 */

/**
 * Returns the stable identifier for the portfolio owner.
 *
 * @param {object} config - Portfolio SEO configuration.
 * @returns {string} Stable Person identifier.
 */
export const getPersonId = (config) => `${config.siteUrl}/#person`;

/**
 * Returns the stable identifier for the portfolio website.
 *
 * @param {object} config - Portfolio SEO configuration.
 * @returns {string} Stable WebSite identifier.
 */
export const getWebsiteId = (config) => `${config.siteUrl}/#website`;

/**
 * Builds the shared social preview image entity.
 *
 * @param {object} config - Portfolio SEO configuration.
 * @returns {object} Schema.org ImageObject.
 */
const buildImageObject = (config) => ({
    "@type": "ImageObject",
    "url": config.image.url,
    "width": config.image.width,
    "height": config.image.height
});

/**
 * Builds the privacy-conscious professional identity represented by the site.
 *
 * @param {object} config - Portfolio SEO configuration.
 * @returns {object} Schema.org Person entity.
 */
export const buildPersonStructuredData = (config) => ({
    "@type": "Person",
    "@id": getPersonId(config),
    "name": config.person.name,
    "url": `${config.siteUrl}/`,
    "image": buildImageObject(config),
    "description": config.person.description,
    "jobTitle": config.person.jobTitle,
    "worksFor": {
        "@type": "Organization",
        "name": config.person.worksFor
    },
    "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": config.person.alumniOf
    },
    "knowsAbout": config.person.knowsAbout,
    "sameAs": config.person.sameAs
});

/**
 * Builds the portfolio website entity and links its publisher to the owner.
 *
 * @param {{config: object, language: string}} params - Website inputs.
 * @returns {object} Schema.org WebSite entity.
 */
export const buildWebsiteStructuredData = ({config, language}) => ({
    "@type": "WebSite",
    "@id": getWebsiteId(config),
    "url": `${config.siteUrl}/`,
    "name": config.siteName,
    "publisher": {
        "@id": getPersonId(config)
    },
    "inLanguage": language || config.defaultLanguage
});

/**
 * Builds one route-level page entity linked to the website and owner.
 *
 * @param {{config: object, title: string, description: string, url: string, language: string}} params - Page inputs.
 * @returns {object} Schema.org WebPage entity.
 */
export const buildWebPageStructuredData = ({config, title, description, url, language}) => ({
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    "url": url,
    "name": title,
    "description": description,
    "isPartOf": {
        "@id": getWebsiteId(config)
    },
    "about": {
        "@id": getPersonId(config)
    },
    "primaryImageOfPage": buildImageObject(config),
    "inLanguage": language || config.defaultLanguage
});

/**
 * Builds the complete linked JSON-LD graph for a portfolio route.
 *
 * @param {{config: object, title: string, description: string, url: string, language: string}} params - Structured data inputs.
 * @returns {{'@context': string, '@graph': object[]}} Linked Schema.org graph.
 */
export const buildStructuredData = ({config, title, description, url, language}) => ({
    "@context": "https://schema.org",
    "@graph": [
        buildPersonStructuredData(config),
        buildWebsiteStructuredData({config, language}),
        buildWebPageStructuredData({config, title, description, url, language})
    ]
});
