import {useTranslation} from "react-i18next";

/**
 * Reusable pagination controls for paged portfolio sections.
 *
 * Renders localized previous/next buttons, disables boundary actions, and reports
 * the current page out of the total page count.
 *
 * @component
 * @module components/ui/pagination/Pagination
 * @param {Object} props - Component props.
 * @param {number} props.page - Current one-based page number.
 * @param {number} props.totalPages - Total number of available pages.
 * @param {function(number): void} props.onPageChange - Callback fired with the next page.
 * @param {string} [props.className] - Optional layout classes for the wrapper.
 * @returns {JSX.Element|null} Pagination controls, or null when only one page exists.
 */
export function Pagination({
                                       page,
                                       totalPages,
                                       onPageChange,
                                       className = "",
                                   }) {
    const {t} = useTranslation();

    if (totalPages <= 1) return null;

    return (
        <div className={`flex flex-wrap justify-center items-center gap-3 ${className}`}>
            <button
                onClick={() => onPageChange(Math.max(page - 1, 1))}
                disabled={page === 1}
                className="min-w-[110px] px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium
                           text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900
                           hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition text-center"
            >
                ← {t("previous")}
            </button>

            <span
                data-testid="pagination-info"
                className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap"
            >
                {page} / {totalPages}
            </span>

            <button
                onClick={() => onPageChange(Math.min(page + 1, totalPages))}
                disabled={page === totalPages}
                className="min-w-[110px] px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium
                           text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900
                           hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition text-center"
            >
                {t("next")} →
            </button>
        </div>
    );
}
