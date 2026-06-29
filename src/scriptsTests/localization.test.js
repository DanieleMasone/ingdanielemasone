import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {describe, expect, test} from "vitest";
import {projects} from "@/mock/projects";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const localeCodes = ["it", "en", "fr", "de", "es"];
const approvedProjectTitle = "Technical Lead – AI-Assisted Refactoring for RPG on IBM i (AS/400)";
const structuredDescriptionKeys = [
    "exp_intesa_description",
    "project_types.intesa.exp_ai_as400",
    "exp_rgi_description",
    "exp_iol_description",
    "exp_tecnavia_description",
    "exp_teoresi_description",
    "exp_hpe_description",
    "exp_digiCamere_description",
    "exp_piksel_description",
    "exp_coach_description",
    "exp_salesiani_description",
    "exp_polimi_description"
];
const listMarkerPattern = /^\s*[-*•–]\s+/;
const forbiddenStructuredFormattingPattern = /\n|<\/?[a-z][^>]*>|^\s*[-*•–]\s+/i;

const readLocale = (locale) => JSON.parse(
    fs.readFileSync(path.join(rootDir, "src", "locales", locale, "translation.json"), "utf8")
);

const getValue = (object, keyPath) => keyPath.split(".").reduce((value, key) => value?.[key], object);

const valueCategory = (value) => {
    if (value === null) return "null";
    if (Array.isArray(value)) return "array";
    return typeof value;
};

const collectShape = (value, prefix = "", output = []) => {
    if (prefix) output.push(`${prefix}:${valueCategory(value)}`);

    if (Array.isArray(value)) {
        value.forEach((child, index) => collectShape(child, `${prefix}[${index}]`, output));
    } else if (value && typeof value === "object") {
        for (const [key, child] of Object.entries(value)) {
            collectShape(child, prefix ? `${prefix}.${key}` : key, output);
        }
    }

    return output;
};

const walkValues = (value, prefix = "", output = []) => {
    if (Array.isArray(value)) {
        value.forEach((item, index) => walkValues(item, `${prefix}[${index}]`, output));
    } else if (value && typeof value === "object") {
        Object.entries(value).forEach(([key, child]) => (
            walkValues(child, prefix ? `${prefix}.${key}` : key, output)
        ));
    } else {
        output.push([prefix, value]);
    }

    return output;
};

const collectStructuredStrings = (description) => [
    ...description.paragraphs,
    ...description.sections.flatMap((section) => [section.label, ...section.items].filter(Boolean))
];

const interpolationVariables = (value) => (
    [...value.matchAll(/{{\s*([\w.-]+)\s*}}/g)].map((match) => match[1]).sort()
);

const expectStructuredDescription = (description) => {
    expect(description).toEqual({
        paragraphs: expect.any(Array),
        sections: expect.any(Array)
    });
    expect(description.paragraphs.length).toBeGreaterThan(0);
    expect(description.sections.length).toBeGreaterThan(0);

    description.paragraphs.forEach((paragraph) => {
        expect(typeof paragraph).toBe("string");
        expect(paragraph.trim()).not.toBe("");
    });

    description.sections.forEach((section) => {
        expect(section).toEqual(expect.objectContaining({items: expect.any(Array)}));
        expect(Object.keys(section).sort()).toEqual(
            Object.hasOwn(section, "label") ? ["items", "label"] : ["items"]
        );
        expect(section.items.length).toBeGreaterThan(0);
        if (Object.hasOwn(section, "label")) {
            expect(typeof section.label).toBe("string");
            expect(section.label.trim()).not.toBe("");
        }
        section.items.forEach((item) => {
            expect(typeof item).toBe("string");
            expect(item.trim()).not.toBe("");
            expect(item).not.toMatch(listMarkerPattern);
        });
    });
};

describe("localized portfolio content", () => {
    test("keeps locale keys and JSON value categories aligned", () => {
        const [baseLocale, ...otherLocales] = localeCodes.map(readLocale);
        const baseShape = collectShape(baseLocale).sort();

        for (const locale of otherLocales) {
            expect(collectShape(locale).sort()).toEqual(baseShape);
        }
    });

    test("keeps structured descriptions valid and cardinalities aligned", () => {
        const locales = Object.fromEntries(localeCodes.map((code) => [code, readLocale(code)]));

        for (const key of structuredDescriptionKeys) {
            const baseDescription = getValue(locales.it, key);
            expectStructuredDescription(baseDescription);

            for (const localeCode of localeCodes.slice(1)) {
                const description = getValue(locales[localeCode], key);
                expectStructuredDescription(description);
                expect(description.paragraphs).toHaveLength(baseDescription.paragraphs.length);
                expect(description.sections).toHaveLength(baseDescription.sections.length);

                description.sections.forEach((section, index) => {
                    expect(Object.hasOwn(section, "label"))
                        .toBe(Object.hasOwn(baseDescription.sections[index], "label"));
                    expect(section.items).toHaveLength(baseDescription.sections[index].items.length);
                });
            }
        }
    });

    test("keeps presentation syntax out of structured localized content", () => {
        for (const localeCode of localeCodes) {
            const locale = readLocale(localeCode);

            for (const key of structuredDescriptionKeys) {
                const description = getValue(locale, key);
                for (const value of collectStructuredStrings(description)) {
                    expect(value).not.toMatch(forbiddenStructuredFormattingPattern);
                }
            }

            for (const skill of locale.avatar.skills) {
                expect(skill).not.toMatch(listMarkerPattern);
            }
        }
    });

    test("keeps interpolation variables aligned across languages", () => {
        const [baseLocale, ...otherLocales] = localeCodes.map(readLocale);
        const baseStrings = new Map(
            walkValues(baseLocale).filter(([, value]) => typeof value === "string")
        );

        for (const locale of otherLocales) {
            const localizedStrings = new Map(
                walkValues(locale).filter(([, value]) => typeof value === "string")
            );

            for (const [key, value] of baseStrings) {
                expect(interpolationVariables(localizedStrings.get(key) ?? ""))
                    .toEqual(interpolationVariables(value));
            }
        }
    });

    test("keeps immutable identity out of localized shell data", () => {
        for (const localeCode of localeCodes) {
            const locale = readLocale(localeCode);

            expect(locale.avatar).not.toHaveProperty("name");
            expect(interpolationVariables(locale.header.home_aria)).toContain("name");
            expect(interpolationVariables(locale.footer_copyright)).toEqual(["name", "year"]);
            expect(interpolationVariables(locale.footer_external_profile_label)).toEqual(["label", "name"]);
        }
    });

    test("does not contain empty localized strings", () => {
        for (const localeCode of localeCodes) {
            for (const [key, value] of walkValues(readLocale(localeCode))) {
                if (typeof value === "string") {
                    expect(value.trim(), key).not.toBe("");
                }
            }
        }
    });

    test("uses the approved canonical title for the Intesa AI-assisted RPG project", () => {
        expect(projects.find((project) => project.type === "intesa.exp_ai_as400")?.name)
            .toBe(approvedProjectTitle);
    });
});
