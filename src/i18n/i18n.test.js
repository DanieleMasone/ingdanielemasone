import {describe, expect, test} from "vitest";
import {resolveInitialLanguage} from "./i18n";

describe("resolveInitialLanguage", () => {
    test.each(["it", "en", "fr", "de", "es"])("restores the supported %s locale", (locale) => {
        const storage = {getItem: () => locale};

        expect(resolveInitialLanguage(storage)).toBe(locale);
    });

    test("normalizes regional language codes", () => {
        expect(resolveInitialLanguage({getItem: () => "de-DE"})).toBe("de");
    });

    test("falls back to Italian for unsupported, missing or inaccessible values", () => {
        expect(resolveInitialLanguage({getItem: () => "pt"})).toBe("it");
        expect(resolveInitialLanguage({getItem: () => null})).toBe("it");
        expect(resolveInitialLanguage({getItem: () => {
            throw new Error("storage unavailable");
        }})).toBe("it");
        expect(resolveInitialLanguage(null)).toBe("it");
    });
});
