import {
    getCourses,
    getCertifications,
    getExperiences,
    getGithubProjects,
    getProjects,
    getTestimonials,
    getTradingPerformance
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
        ["getGithubProjects", getGithubProjects],
        ["getProjects", getProjects],
        ["getTestimonials", getTestimonials],
        ["getTradingPerformance", getTradingPerformance],
    ];

    it.each(cases)("%s returns a Promise", async (_, fn) => {
        const result = fn();
        expect(result).toBeInstanceOf(Promise);
        await vi.runAllTimersAsync();
        await result;
    });

    it.each(cases)("%s preserves an asynchronous loading boundary", async (_, fn) => {
        const promise = fn();

        let resolved = false;
        promise.then(() => {
            resolved = true;
        });

        await Promise.resolve();
        expect(resolved).toBe(false);

        await vi.runAllTimersAsync();
        expect(resolved).toBe(true);
    });

    it.each(cases)("%s resolves with defined data", async (_, fn) => {
        const promise = fn();
        await vi.runAllTimersAsync();
        const data = await promise;

        expect(data).toBeDefined();
    });

});
