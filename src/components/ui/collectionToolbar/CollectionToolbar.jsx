import React, {useEffect, useMemo, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Pagination} from "@/components/ui/pagination/Pagination";
import {getCollectionPaginationState} from "./collectionPagination";
import {layoutClasses} from "@/styles/commonClasses";

/**
 * Compact collection toolbar for paginated portfolio sections.
 *
 * The toolbar centralizes visible result summaries, page-count normalization,
 * pagination placement, and polite range announcements while leaving each page
 * free to render its own cards. It intentionally does not manage focus after a
 * page change, so keyboard focus remains on the activated pagination control.
 *
 * @component
 * @module components/ui/collectionToolbar/CollectionToolbar
 * @param {object} props - Component props.
 * @param {number} props.page - Requested one-based page.
 * @param {number} props.totalItems - Total collection size.
 * @param {number} props.pageSize - Maximum items shown per page.
 * @param {function(number): void} props.onPageChange - Callback fired with the requested page.
 * @param {string} props.itemLabel - Singular localized collection label.
 * @param {string} props.itemLabelPlural - Plural localized collection label.
 * @returns {React.JSX.Element | null} Result summary and pagination controls, or null for empty collections.
 */
export function CollectionToolbar({
                                      page,
                                      totalItems,
                                      pageSize,
                                      onPageChange,
                                      itemLabel,
                                      itemLabelPlural
                                  }) {
    const {t} = useTranslation();
    const [liveAnnouncement, setLiveAnnouncement] = useState("");
    const hasRendered = useRef(false);
    const pagination = getCollectionPaginationState({page, totalItems, pageSize});
    const normalizedTotalItems = Number.isFinite(totalItems) ? Math.max(Math.floor(totalItems), 0) : 0;
    const label = normalizedTotalItems === 1 ? itemLabel : itemLabelPlural;

    const summary = t("collection.range_summary", {
        start: pagination.range.start,
        end: pagination.range.end,
        total: normalizedTotalItems,
        label
    });

    const announcement = useMemo(() => t("collection.range_announcement", {
        start: pagination.range.start,
        end: pagination.range.end,
        total: normalizedTotalItems,
        label
    }), [label, normalizedTotalItems, pagination.range.end, pagination.range.start, t]);

    useEffect(() => {
        if (normalizedTotalItems <= 0) return;

        if (hasRendered.current) {
            setLiveAnnouncement(announcement);
            return;
        }

        hasRendered.current = true;
    }, [announcement, normalizedTotalItems]);

    if (normalizedTotalItems <= 0) return null;

    return (
        <div className={layoutClasses.collectionToolbar}>
            <p className={layoutClasses.collectionSummary} data-testid="collection-summary">
                {summary}
            </p>
            <span
                className={layoutClasses.screenReaderOnly}
                aria-live="polite"
                aria-atomic="true"
                data-testid="collection-range-announcement"
            >
                {liveAnnouncement}
            </span>
            <Pagination
                page={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={onPageChange}
                className={layoutClasses.collectionPagination}
            />
        </div>
    );
}
