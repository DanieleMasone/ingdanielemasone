import {useTranslation} from "react-i18next";
import {ChevronLeft, ChevronRight} from "lucide-react";
import clsx from "clsx";
import {interactiveClasses} from "@/styles/commonClasses";

/**
 * Reusable pagination controls for paged portfolio sections.
 *
 * Renders localized previous/next buttons inside a localized navigation
 * landmark, disables boundary actions, and exposes the current page out of the
 * total page count with `aria-current`.
 *
 * @component
 * @module components/ui/pagination/Pagination
 * @param {Object} props - Component props.
 * @param {number} props.page - Current one-based page number.
 * @param {number} props.totalPages - Total number of available pages.
 * @param {function(number): void} props.onPageChange - Callback fired with the next page.
 * @param {string} [props.className] - Optional layout classes for the wrapper.
 * @returns {React.JSX.Element} Pagination navigation, or null when only one page exists.
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
        <nav
            className={clsx("flex flex-wrap items-center gap-3", className || "justify-center")}
            aria-label={t("pagination_label")}
        >
            <button
                type="button"
                onClick={() => onPageChange(Math.max(page - 1, 1))}
                disabled={page === 1}
                className={clsx(interactiveClasses.paginationButton, interactiveClasses.focusRing, "inline-flex items-center justify-center gap-1.5")}
            >
                <ChevronLeft className="h-4 w-4" aria-hidden="true"/>
                {t("previous")}
            </button>

            <span
                data-testid="pagination-info"
                aria-current="page"
                className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap"
            >
                {page} / {totalPages}
            </span>

            <button
                type="button"
                onClick={() => onPageChange(Math.min(page + 1, totalPages))}
                disabled={page === totalPages}
                className={clsx(interactiveClasses.paginationButton, interactiveClasses.focusRing, "inline-flex items-center justify-center gap-1.5")}
            >
                {t("next")}
                <ChevronRight className="h-4 w-4" aria-hidden="true"/>
            </button>
        </nav>
    );
}
