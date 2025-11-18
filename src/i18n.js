import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import translationEN from "./locales/en/translation.json";
import translationIT from "./locales/it/translation.json";
import translationFR from "./locales/fr/translation.json";
import translationDE from "./locales/de/translation.json";
import translationES from "./locales/es/translation.json";

const resources = {
    en: {translation: translationEN},
    it: {translation: translationIT},
    fr: {translation: translationFR},
    de: {translation: translationDE},
    es: {translation: translationES}
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
    load: "languageOnly"
}).catch(error => {
    console.error('Failed to init i18n:', error);
});

export default i18n;