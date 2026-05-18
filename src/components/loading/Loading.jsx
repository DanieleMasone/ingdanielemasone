import React from "react";
import {useTranslation} from "react-i18next";

/**
 * Full-screen localized loading state for lazy routes and static data loaders.
 *
 * The layout fills the viewport height and centers a spinning indicator both
 * vertically and horizontally. A localized screen-reader-only label announces
 * the loading state while the visible spinner remains decorative.
 *
 * Intended usage:
 * - As a Suspense fallback for lazy-loaded routes or components
 * - As a temporary placeholder while async data is being fetched
 *
 * @component
 * @module components/loading/Loading
 *
 * @returns {JSX.Element} A full-screen loading spinner view.
 */
export function Loading() {
    const {t} = useTranslation();
    const label = t("loading_content");

    return (
        <div
            role="status"
            aria-label={label}
            className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div
                aria-hidden="true"
                className="w-12 h-12 border-4 border-t-blue-500 border-gray-300 dark:border-gray-700 rounded-full animate-spin"/>
            <span className="sr-only">{label}</span>
        </div>
    );
}
