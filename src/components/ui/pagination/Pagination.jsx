import {useTranslation} from "react-i18next";

/**
 * Reusable pagination component.
 *
 * Displays Previous / Next buttons and the current page number.
 * - Handles disabled states automatically.
 * - Translations via i18next.
 *
 * @component
 * @module components/ui/pagination/Pagination
 * @returns {JSX.Element} The header element with navigation links and controls.
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
        <div className={`flex flex-wrap justify-center items-center gap-3 mt-8 ${className}`}>
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
