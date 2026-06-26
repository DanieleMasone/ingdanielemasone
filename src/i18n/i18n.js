import i18n from "i18next";
import {initReactI18next} from "react-i18next/initReactI18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "../locales/en/translation.json";
import it from "../locales/it/translation.json";
import fr from "../locales/fr/translation.json";
import de from "../locales/de/translation.json";
import es from "../locales/es/translation.json";

const DEFAULT_LANGUAGE = "it";
const SUPPORTED_LANGUAGES = new Set(["it", "en", "fr", "de", "es"]);

/**
 * Resolves the initial locale from the persisted first-party preference.
 *
 * Unsupported, unavailable or inaccessible storage values fall back to
 * Italian, preserving the portfolio's established default language.
 *
 * @param {{getItem: function(string): string | null} | null} [storage] - Storage-compatible preference source.
 * @returns {string} Supported two-letter language code.
 */
export const resolveInitialLanguage = (storage) => {
    try {
        const preferenceStorage = storage === undefined ? globalThis.localStorage : storage;
        const storedLanguage = preferenceStorage?.getItem("i18nextLng")?.split("-")[0];
        return SUPPORTED_LANGUAGES.has(storedLanguage) ? storedLanguage : DEFAULT_LANGUAGE;
    } catch {
        return DEFAULT_LANGUAGE;
    }
};

/**
 * Keeps the root HTML language attribute aligned with the active i18next locale.
 *
 * @param {string} language - Current language emitted by i18next.
 * @returns {void}
 */
const updateDocumentLanguage = (language) => {
    if (typeof document === "undefined") return;

    document.documentElement.lang = (language || DEFAULT_LANGUAGE).split("-")[0];
};

/**
 * i18next instance used by the portfolio.
 *
 * The configuration loads all bundled translations, restores a supported
 * first-party language preference, defaults to Italian, falls back to English,
 * caches language changes in localStorage, and keeps the root document language
 * aligned with the active locale for accessibility and search crawlers.
 *
 * @module i18n/i18n
 */
i18n.on("languageChanged", updateDocumentLanguage);

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        lng: resolveInitialLanguage(),
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {translation: en},
            it: {translation: it},
            fr: {translation: fr},
            de: {translation: de},
            es: {translation: es}
        },
        react: {
            useSuspense: false
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage']
        }
    })
    .then(() => updateDocumentLanguage(i18n.resolvedLanguage || i18n.language))
    .catch(error => {
        console.error('Failed to init i18n:', error);
    });

export default i18n;
