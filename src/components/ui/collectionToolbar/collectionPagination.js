/**
 * Shared pagination calculations for portfolio collection pages.
 *
 * The helper normalizes the current page, exposes one-based visible ranges for
 * user-facing summaries, and returns zero-based slice indexes for the rendered
 * items. Empty collections intentionally report a 0-0 range so consumers never
 * render invalid text such as 1-0.
 *
 * @module components/ui/collectionToolbar/collectionPagination
 */

/**
 * Clamps a numeric value inside an inclusive range.
 *
 * @param {number} value - Value to clamp.
 * @param {number} min - Inclusive lower bound.
 * @param {number} max - Inclusive upper bound.
 * @returns {number} Clamped value.
 */
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * Builds normalized pagination state for a collection.
 *
 * @param {object} params - Pagination inputs.
 * @param {number} params.page - Requested one-based page.
 * @param {number} params.totalItems - Total number of collection items.
 * @param {number} params.pageSize - Maximum number of items per page.
 * @returns {{
 *   currentPage: number,
 *   totalPages: number,
 *   range: {start: number, end: number},
 *   startIndex: number,
 *   endIndex: number
 * }} Normalized state for summaries, pagination controls, and array slicing.
 */
export function getCollectionPaginationState({page, totalItems, pageSize}) {
    const normalizedTotalItems = Number.isFinite(totalItems) ? Math.max(Math.floor(totalItems), 0) : 0;
    const normalizedPageSize = Number.isFinite(pageSize) ? Math.max(Math.floor(pageSize), 1) : 1;
    const requestedPage = Number.isFinite(page) ? Math.floor(page) : 1;
    const totalPages = Math.ceil(normalizedTotalItems / normalizedPageSize);

    if (normalizedTotalItems === 0 || totalPages === 0) {
        return {
            currentPage: 1,
            totalPages: 0,
            range: {start: 0, end: 0},
            startIndex: 0,
            endIndex: 0
        };
    }

    const currentPage = clamp(requestedPage, 1, totalPages);
    const start = (currentPage - 1) * normalizedPageSize + 1;
    const end = Math.min(currentPage * normalizedPageSize, normalizedTotalItems);

    return {
        currentPage,
        totalPages,
        range: {start, end},
        startIndex: start - 1,
        endIndex: end
    };
}
