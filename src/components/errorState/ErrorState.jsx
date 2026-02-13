import {useTranslation} from "react-i18next";
import React from "react";

/**
 * ErrorState component – displays a full-screen error view with optional retry action.
 *
 * Features:
 * - Centered error layout with icon, title and message
 * - Localized texts via react-i18next
 * - Optional retry button rendered only when a callback is provided
 * - Light/dark theme support through Tailwind classes
 *
 * Intended usage:
 * - As a fallback UI when async data loading fails
 * - As an error boundary visual replacement
 * - Inside pages or route-level error states
 *
 * @component
 * @module components/errorState/ErrorState
 *
 * @param {Object} props - Component props
 * @param {string} [props.message] - Custom error message translation key
 * @param {Function} [props.onRetry] - Optional retry callback handler
 *
 * @returns {JSX.Element} A full-screen error state view
 */
export function ErrorState({message = "error_generic", onRetry}) {
    const {t} = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
            <div className="text-center">
                <div className="text-5xl mb-4">⚠️</div>

                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    {t("error_title")}
                </h2>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {t(message)}
                </p>

                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700
                       text-white font-medium transition-colors
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {t("error_retry")}
                    </button>
                )}
            </div>
        </div>
    );
}
