import fs from "node:fs/promises";
import {beforeEach, describe, expect, test, vi} from "vitest";

vi.mock("node:fs/promises", () => ({
    default: {
        access: vi.fn(),
        cp: vi.fn(),
        readdir: vi.fn(),
        readFile: vi.fn(),
        rm: vi.fn(),
        writeFile: vi.fn()
    }
}));

import {
    addNoindexRobotsMeta,
    preparePublishedReports
} from "../../scripts/prepare-published-reports.mjs";

const dirent = ({directory = false, file = false} = {}) => ({
    isDirectory: () => directory,
    isFile: () => file
});

describe("prepare-published-reports", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        fs.access.mockResolvedValue(undefined);
        fs.cp.mockResolvedValue(undefined);
        fs.rm.mockResolvedValue(undefined);
    });

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

    test("replaces an existing robots meta tag with single quotes and mixed casing", () => {
        const html = "<html><head><META name='robots' content='index, follow'><title>Report</title></head></html>";

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

    test("adds noindex metadata to html files and publishes docs and coverage into dist", async () => {
        fs.readdir.mockImplementation(async (directory) => {
            const normalizedPath = directory.toString().replaceAll("\\", "/");

            if (normalizedPath.endsWith("/docs")) {
                return [
                    {name: "index.html", ...dirent({file: true})},
                    {name: "architecture", ...dirent({directory: true})},
                    {name: "assets.css", ...dirent({file: true})}
                ];
            }

            if (normalizedPath.endsWith("/docs/architecture")) {
                return [
                    {name: "index.html", ...dirent({file: true})}
                ];
            }

            if (normalizedPath.endsWith("/coverage")) {
                return [
                    {name: "index.html", ...dirent({file: true})}
                ];
            }

            return [];
        });

        fs.readFile.mockResolvedValue(
            "<html><head><title>Report</title></head><body></body></html>"
        );

        await preparePublishedReports();

        expect(fs.readFile).toHaveBeenCalledTimes(3);
        expect(fs.writeFile).toHaveBeenCalledTimes(3);

        expect(fs.writeFile).toHaveBeenCalledWith(
            expect.stringMatching(/docs[/\\]index\.html$/),
            expect.stringContaining('<meta name="robots" content="noindex, nofollow"/>'),
            "utf8"
        );

        expect(fs.writeFile).toHaveBeenCalledWith(
            expect.stringMatching(/docs[/\\]architecture[/\\]index\.html$/),
            expect.stringContaining('<meta name="robots" content="noindex, nofollow"/>'),
            "utf8"
        );

        expect(fs.writeFile).toHaveBeenCalledWith(
            expect.stringMatching(/coverage[/\\]index\.html$/),
            expect.stringContaining('<meta name="robots" content="noindex, nofollow"/>'),
            "utf8"
        );

        expect(fs.writeFile).not.toHaveBeenCalledWith(
            expect.stringContaining("assets.css"),
            expect.any(String),
            "utf8"
        );

        expect(fs.rm).toHaveBeenCalledWith(
            expect.stringMatching(/dist[/\\]docs$/),
            {recursive: true, force: true}
        );
        expect(fs.rm).toHaveBeenCalledWith(
            expect.stringMatching(/dist[/\\]test-coverage$/),
            {recursive: true, force: true}
        );

        expect(fs.cp).toHaveBeenCalledWith(
            expect.stringMatching(/docs$/),
            expect.stringMatching(/dist[/\\]docs$/),
            {recursive: true}
        );
        expect(fs.cp).toHaveBeenCalledWith(
            expect.stringMatching(/coverage$/),
            expect.stringMatching(/dist[/\\]test-coverage$/),
            {recursive: true}
        );
    });

    test("ignores missing report directories", async () => {
        const enoent = new Error("Directory not found");

        enoent.code = "ENOENT";

        fs.access.mockRejectedValue(enoent);

        await expect(preparePublishedReports()).resolves.toBeUndefined();

        expect(fs.readFile).not.toHaveBeenCalled();
        expect(fs.cp).not.toHaveBeenCalled();
        expect(fs.rm).not.toHaveBeenCalled();
        expect(fs.writeFile).not.toHaveBeenCalled();
    });

    test("rethrows unexpected filesystem errors", async () => {
        fs.access.mockRejectedValue(new Error("Permission denied"));

        await expect(preparePublishedReports()).rejects.toThrow("Permission denied");
    });
});
