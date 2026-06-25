/**
 * Supported language metadata used by compact language controls.
 *
 * Native labels remain the visible language identifier. Decorative flag assets
 * may be added here only if they are bundled locally, hidden from assistive
 * technologies, and never replace the native language name.
 *
 * @module config/languages
 */

/**
 * Ordered list of languages supported by the portfolio UI.
 *
 * @type {Array<{code: string, nativeLabel: string}>}
 */
export const supportedLanguages = [
    {code: "en", nativeLabel: "English"},
    {code: "it", nativeLabel: "Italiano"},
    {code: "fr", nativeLabel: "Français"},
    {code: "de", nativeLabel: "Deutsch"},
    {code: "es", nativeLabel: "Español"}
];

/**
 * Language metadata indexed by language code.
 *
 * @type {Record<string, {code: string, nativeLabel: string}>}
 */
export const supportedLanguageMap = supportedLanguages.reduce((acc, language) => {
    acc[language.code] = language;
    return acc;
}, {});
