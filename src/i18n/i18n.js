import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "../locales/en/translation.json";
import it from "../locales/it/translation.json";
import fr from "../locales/fr/translation.json";
import de from "../locales/de/translation.json";
import es from "../locales/es/translation.json";

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: "en",
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
        load: "languageOnly"
    }).catch(error => {
    console.error('Failed to init i18n:', error);
});

export default i18n;
