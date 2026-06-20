import {useCallback, useEffect, useRef, useState} from "react";

/**
 * Resolves one static portfolio dataset through the asynchronous service layer.
 *
 * The hook centralizes the loading, error, retry, and unmount lifecycle shared
 * by route pages. Page-specific sorting, filtering, pagination, and empty-state
 * rendering intentionally remain with each consumer. When a retry starts before
 * an earlier request settles, only the newest request may update state.
 *
 * @template T
 * @param {function(): Promise<T>} loadData - Stable service function that resolves the dataset.
 * @param {T} initialData - Initial value exposed before the first request settles.
 * @returns {{data: T, loading: boolean, error: *, retry: function(): Promise<(T|undefined)>}}
 * Data state, request status, latest error, and an explicit retry function.
 */
export function usePortfolioData(loadData, initialData) {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const requestVersionRef = useRef(0);

    const retry = useCallback(() => {
        const requestVersion = ++requestVersionRef.current;

        setLoading(true);
        setError(null);

        return Promise.resolve()
            .then(loadData)
            .then((nextData) => {
                if (requestVersion === requestVersionRef.current) {
                    setData(nextData);
                }

                return nextData;
            })
            .catch((nextError) => {
                if (requestVersion === requestVersionRef.current) {
                    setError(nextError);
                }

                return undefined;
            })
            .finally(() => {
                if (requestVersion === requestVersionRef.current) {
                    setLoading(false);
                }
            });
    }, [loadData]);

    useEffect(() => {
        retry();

        return () => {
            requestVersionRef.current += 1;
        };
    }, [retry]);

    return {data, loading, error, retry};
}
