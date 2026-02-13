import {
    getCourses,
    getCertifications,
    getExperiences,
    getProjects,
    getTestimonials,
    getTradingPerformance,
    getLinks
} from "./portfolioService";

import {vi, describe, it, expect, beforeEach} from "vitest";

describe("portfolio.service", () => {

    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    const cases = [
        ["getCourses", getCourses],
        ["getCertifications", getCertifications],
        ["getExperiences", getExperiences],
        ["getProjects", getProjects],
        ["getTestimonials", getTestimonials],
        ["getTradingPerformance", getTradingPerformance],
        ["getLinks", getLinks],
    ];

    it.each(cases)("%s returns a Promise", async (_, fn) => {
        const result = fn();
        expect(result).toBeInstanceOf(Promise);
    });

    it.each(cases)("%s resolves only after delay", async (_, fn) => {
        const promise = fn();

        let resolved = false;
        promise.then(() => {
            resolved = true;
        });

        // ahead of time → unresolved
        await vi.advanceTimersByTimeAsync(299);
        expect(resolved).toBe(false);

        // after 300 → solved
        await vi.advanceTimersByTimeAsync(1);
        expect(resolved).toBe(true);
    });

    it.each(cases)("%s resolves with defined data", async (_, fn) => {
        const promise = fn();
        await vi.advanceTimersByTimeAsync(300);
        const data = await promise;

        expect(data).toBeDefined();
    });

});
