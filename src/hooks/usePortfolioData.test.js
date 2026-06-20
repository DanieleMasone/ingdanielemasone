import {act, renderHook, waitFor} from "@testing-library/react";
import {describe, expect, test, vi} from "vitest";
import {usePortfolioData} from "./usePortfolioData";

describe("usePortfolioData", () => {
    test("loads data and exposes the resolved value", async () => {
        const loadData = vi.fn().mockResolvedValue(["project"]);
        const {result} = renderHook(() => usePortfolioData(loadData, []));

        expect(result.current.loading).toBe(true);

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.data).toEqual(["project"]);
        expect(result.current.error).toBeNull();
        expect(loadData).toHaveBeenCalledTimes(1);
    });

    test("exposes errors and retries the same service function", async () => {
        const loadData = vi.fn()
            .mockRejectedValueOnce(new Error("unavailable"))
            .mockResolvedValueOnce(["recovered"]);
        const {result} = renderHook(() => usePortfolioData(loadData, []));

        await waitFor(() => expect(result.current.error).toEqual(new Error("unavailable")));

        await act(async () => {
            await result.current.retry();
        });

        expect(result.current.data).toEqual(["recovered"]);
        expect(result.current.error).toBeNull();
        expect(result.current.loading).toBe(false);
        expect(loadData).toHaveBeenCalledTimes(2);
    });

    test("ignores an older request that settles after a retry", async () => {
        let resolveFirst;
        const firstRequest = new Promise((resolve) => {
            resolveFirst = resolve;
        });
        const loadData = vi.fn()
            .mockReturnValueOnce(firstRequest)
            .mockResolvedValueOnce(["latest"]);
        const {result} = renderHook(() => usePortfolioData(loadData, []));

        await waitFor(() => expect(loadData).toHaveBeenCalledTimes(1));

        await act(async () => {
            await result.current.retry();
        });

        await act(async () => {
            resolveFirst(["stale"]);
            await firstRequest;
        });

        expect(result.current.data).toEqual(["latest"]);
        expect(result.current.loading).toBe(false);
    });
});
