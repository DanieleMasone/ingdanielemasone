import React from "react";

/**
 * Loading component – displays a centered spinner used as a global loading state.
 *
 * The layout fills the viewport height and centers a spinning indicator both
 * vertically and horizontally. It supports light and dark themes through Tailwind classes.
 *
 * Intended usage:
 * - As a Suspense fallback for lazy-loaded routes or components
 * - As a temporary placeholder while async data is being fetched
 *
 * @component
 * @module components/loading/Loading
 *
 * @returns {JSX.Element} A full-screen loading spinner view
 */
export function Loading() {
    return (
        <div
            role="status"
            aria-label="loading"
            className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div
                className="w-12 h-12 border-4 border-t-blue-500 border-gray-300 dark:border-gray-700 rounded-full animate-spin"/>
        </div>
    );
}
