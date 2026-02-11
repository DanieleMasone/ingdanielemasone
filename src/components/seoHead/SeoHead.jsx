import React from 'react';
import {useTranslation} from "react-i18next";

/**
 * SeoHead is a React component for injecting SEO-related meta tags into the document head
 * using React 19 native <head> support. Supports dynamic title and description localization.
 *
 * @component
 * @module components/seoHead/SeoHead
 * @example
 * <SeoHead pageKey="home" path="/" />
 *
 * @param {string} pageKey - Translation key suffix for SEO title and description.
 * @param {string} path - Relative URL path of the page (e.g., "/projects").
 *
 * @returns {JSX.Element} Meta tags injected into <head>.
 */
export function SeoHead({pageKey, path}) {
    const {t} = useTranslation();

    const title = t(`seo.${pageKey}.title`);
    const description = t(`seo.${pageKey}.description`);
    const url = `https://danielemasone.github.io/ingdanielemasone/#${path}`;
    const logo = "https://danielemasone.github.io/ingdanielemasone/logo.png";

    return (
        <>
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
        </>
    );
}
