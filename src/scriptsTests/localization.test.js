import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {describe, expect, test} from "vitest";
import {projects} from "@/mock/projects";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const localeCodes = ["it", "en", "fr", "de", "es"];
const approvedProjectTitle = "Technical Lead – AI-Assisted Refactoring for RPG on IBM i (AS/400)";

const readLocale = (locale) => JSON.parse(
    fs.readFileSync(path.join(rootDir, "src", "locales", locale, "translation.json"), "utf8")
);

const flattenKeys = (value, prefix = "") => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return [prefix];

    return Object.entries(value).flatMap(([key, child]) => (
        flattenKeys(child, prefix ? `${prefix}.${key}` : key)
    ));
};

describe("localized portfolio content", () => {
    test("keeps locale key structures aligned across supported languages", () => {
        const [baseLocale, ...otherLocales] = localeCodes.map(readLocale);
        const baseKeys = flattenKeys(baseLocale).sort();

        for (const locale of otherLocales) {
            expect(flattenKeys(locale).sort()).toEqual(baseKeys);
        }
    });

    test("keeps the current Intesa experience structured in every supported language", () => {
        for (const locale of localeCodes) {
            const description = readLocale(locale).exp_intesa_description;

            expect(description).toEqual({
                paragraphs: expect.arrayContaining([
                    expect.any(String),
                    expect.any(String),
                    expect.any(String)
                ]),
                focusLabel: expect.any(String),
                focusItems: expect.arrayContaining([
                    "RPG / IBM AS/400",
                    expect.any(String)
                ])
            });
            expect(description.paragraphs).toHaveLength(3);
            expect(description.focusItems).toHaveLength(8);
        }
    });

    test("uses the approved canonical title for the Intesa AI-assisted RPG project", () => {
        expect(projects.find((project) => project.type === "intesa.exp_ai_as400")?.name)
            .toBe(approvedProjectTitle);
    });
});
