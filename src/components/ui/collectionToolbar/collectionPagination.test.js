import {describe, expect, test} from "vitest";
import {getCollectionPaginationState} from "./collectionPagination";

describe("getCollectionPaginationState", () => {
    test("returns the first-page range and slice indexes", () => {
        expect(getCollectionPaginationState({page: 1, totalItems: 17, pageSize: 6}))
            .toEqual({
                currentPage: 1,
                totalPages: 3,
                range: {start: 1, end: 6},
                startIndex: 0,
                endIndex: 6
            });
    });

    test("returns the middle-page range", () => {
        expect(getCollectionPaginationState({page: 2, totalItems: 17, pageSize: 6}).range)
            .toEqual({start: 7, end: 12});
    });

    test("returns the last-page range", () => {
        expect(getCollectionPaginationState({page: 3, totalItems: 17, pageSize: 6}).range)
            .toEqual({start: 13, end: 17});
    });

    test("handles zero items without invalid ranges", () => {
        expect(getCollectionPaginationState({page: 1, totalItems: 0, pageSize: 6}))
            .toEqual({
                currentPage: 1,
                totalPages: 0,
                range: {start: 0, end: 0},
                startIndex: 0,
                endIndex: 0
            });
    });

    test("handles one item", () => {
        expect(getCollectionPaginationState({page: 1, totalItems: 1, pageSize: 6}))
            .toMatchObject({
                currentPage: 1,
                totalPages: 1,
                range: {start: 1, end: 1}
            });
    });

    test("handles totals smaller than the page size", () => {
        expect(getCollectionPaginationState({page: 1, totalItems: 5, pageSize: 6}).range)
            .toEqual({start: 1, end: 5});
    });

    test("handles totals exactly divisible by the page size", () => {
        expect(getCollectionPaginationState({page: 2, totalItems: 12, pageSize: 6}))
            .toMatchObject({
                currentPage: 2,
                totalPages: 2,
                range: {start: 7, end: 12}
            });
    });

    test("normalizes pages outside the available range", () => {
        expect(getCollectionPaginationState({page: 99, totalItems: 12, pageSize: 6}).currentPage)
            .toBe(2);
        expect(getCollectionPaginationState({page: -4, totalItems: 12, pageSize: 6}).currentPage)
            .toBe(1);
    });

    test("normalizes invalid page sizes to one item per page", () => {
        expect(getCollectionPaginationState({page: 2, totalItems: 3, pageSize: 0}))
            .toMatchObject({
                currentPage: 2,
                totalPages: 3,
                range: {start: 2, end: 2}
            });
    });
});

