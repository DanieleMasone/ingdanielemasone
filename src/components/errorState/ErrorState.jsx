import {useTranslation} from "react-i18next";
import React from "react";
import {CircleAlert} from "lucide-react";
import clsx from "clsx";
import {interactiveClasses} from "@/styles/commonClasses";

/**
 * Full-screen alert state for failed portfolio data loading.
 *
 * Intended usage:
 * - As a fallback UI when async data loading fails
 * - As an error boundary visual replacement
 * - Inside pages or route-level error states
 *
 * @component
 * @module components/errorState/ErrorState
 *
 * @param {Object} props - Component props.
 * @param {string} [props.message] - Custom error message translation key.
 * @param {function(): void} [props.onRetry] - Optional retry callback handler.
 *
 * @returns {JSX.Element} A full-screen alert-style error state view.
 */
export function ErrorState({message = "error_generic", onRetry}) {
    const {t} = useTranslation();

    return (
        <div
            role="alert"
            className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-900"
        >
            <div className="text-center">
                <CircleAlert
                    className="mx-auto mb-4 h-12 w-12 text-amber-500 dark:text-amber-300"
                    aria-hidden="true"
                />

                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    {t("error_title")}
                </h2>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {t(message)}
                </p>

                {onRetry && (
                    <button
                        type="button"
                        onClick={onRetry}
                        className={clsx(
                            "rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700",
                            interactiveClasses.focusRing
                        )}
                    >
                        {t("error_retry")}
                    </button>
                )}
            </div>
        </div>
    );
}
