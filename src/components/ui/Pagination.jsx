import {useTranslation} from "react-i18next";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

/**
 * Reusable pagination component.
 *
 * Displays Previous / Next buttons and the current page number.
 * - Handles disabled states automatically.
 * - Translations via i18next.
 *
 * @component
 * @module components/ui/Pagination
 * @returns {JSX.Element} The header element with navigation links and controls.
 */
export default function Pagination({
                                       page,
                                       totalPages,
                                       onPageChange,
                                       className = "",
                                   }: PaginationProps) {
    const {t} = useTranslation();

    if (totalPages <= 1) return null;

    return (
        <div className={`flex justify-center mt-8 space-x-4 ${className}`}>
            <button
                onClick={() => onPageChange(Math.max(page - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium
                   text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900
                   hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition"
            >
                ← {t("previous")}
            </button>

            <span
                data-testid="pagination-info"
                className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300"
            >
        {page} / {totalPages}
      </span>

            <button
                onClick={() => onPageChange(Math.min(page + 1, totalPages))}
                disabled={page === totalPages}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium
                   text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900
                   hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition"
            >
                {t("next")} →
            </button>
        </div>
    );
}
