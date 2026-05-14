import {describe, expect, test} from "vitest";
import {addNoindexRobotsMeta} from "../../scripts/prepare-published-reports.mjs";

describe("prepare-published-reports", () => {
    test("adds noindex robots metadata to report HTML", () => {
        const html = "<!doctype html><html><head><title>Report</title></head><body></body></html>";

        const result = addNoindexRobotsMeta(html);

        expect(result).toContain(
            '<meta name="robots" content="noindex, nofollow"/>'
        );
        expect(result).toContain("<title>Report</title>");
    });

    test("preserves head attributes when adding robots metadata", () => {
        const html = '<html><head data-report="true"><title>Report</title></head><body></body></html>';

        const result = addNoindexRobotsMeta(html);

        expect(result).toContain('<head data-report="true">');
        expect(result).toContain(
            '<meta name="robots" content="noindex, nofollow"/>'
        );
    });

    test("replaces an existing robots meta tag", () => {
        const html = '<html><head><meta name="robots" content="index, follow"><title>Report</title></head></html>';

        const result = addNoindexRobotsMeta(html);

        expect(result).toContain(
            '<meta name="robots" content="noindex, nofollow"/>'
        );
        expect(result).not.toContain("index, follow");
    });

    test("throws when the HTML document has no head element", () => {
        expect(() => addNoindexRobotsMeta("<html><body></body></html>"))
            .toThrow(/missing <head>/i);
    });
});
