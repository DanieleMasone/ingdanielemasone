import React from 'react';
import {Helmet} from 'react-helmet-async';
import {useTranslation} from "react-i18next";

/**
 * SeoHead is a React component for injecting SEO-related meta tags into the document head
 * using `react-helmet`. It supports dynamic title and description localization via `react-i18next`,
 * and constructs canonical/Open Graph/Twitter metadata based on the provided `pageKey` and `path`.
 *
 * @component
 * @module components/seoHead/SeoHead
 * @example
 * // Inside a page component
 * <SeoHead pageKey="home" path="/" />
 *
 * @param {string} pageKey - The translation key suffix for fetching SEO title and description.
 * @param {string} path - The relative URL path of the page (e.g., "/projects").
 *
 * @returns {JSX.Element} A Helmet component injecting meta tags into the <head>.
 */
export default function SeoHead({pageKey, path}) {
    const {t} = useTranslation();

    const title = t(`seo.${pageKey}.title`);
    const description = t(`seo.${pageKey}.description`);
    const url = `https://danielemasone.github.io/ingdanielemasone/#${path}`;
    const logo = "https://danielemasone.github.io/ingdanielemasone/logo.png";

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <link rel="canonical" href={url}/>

            {/* Open Graph */}
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={url}/>
            <meta property="og:image" content={logo}/>

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" content={title}/>
            <meta name="twitter:description" content={description}/>
            <meta name="twitter:image" content={logo}/>
        </Helmet>
    );
}
