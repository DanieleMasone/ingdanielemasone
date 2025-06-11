import React, {useState} from "react";
import {useTranslation} from "react-i18next";

const flags = {
    en: "https://flagcdn.com/w20/gb.png", // UK flag
    it: "https://flagcdn.com/w20/it.png", // IT flag
};

/**
 * LanguageSwitcher component
 *
 * Renders a button showing the current language with its flag.
 * Clicking the button toggles a dropdown list of available languages.
 * Selecting a language switches the app language using i18next.
 *
 * Uses React state to control dropdown visibility and react-i18next for localization.
 *
 * Supported languages and flags are defined in the `flags` object.
 *
 * Behavior:
 * - Button shows current language code (uppercase) and flag.
 * - Dropdown toggles on button click.
 * - Dropdown options display language flag and name.
 * - Clicking an option changes language and closes dropdown.
 *
 * Styling is done with Tailwind CSS classes.
 */
export default function LanguageSwitcher() {
    const {i18n} = useTranslation();
    const [open, setOpen] = useState(false);

    const handleChange = (lang) => {
        i18n.changeLanguage(lang).catch(console.error);
        setOpen(false);
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setOpen(!open)}
                className="bg-gray-200 text-gray-900 p-2 rounded text-sm flex items-center gap-2
          dark:bg-gray-700 dark:text-white"
            >
                <img src={flags[i18n.language]} alt={i18n.language}/>
                {i18n.language.toUpperCase()}
            </button>

            {open && (
                <div className="absolute mt-2 bg-white rounded shadow-lg w-40 max-w-xs
          dark:bg-gray-700">
                    {Object.entries(flags).map(([lang, flagUrl]) => (
                        <div
                            key={lang}
                            onClick={() => handleChange(lang)}
                            className="cursor-pointer flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-600 truncate"
                            style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}
                        >
                            <img src={flagUrl} alt={lang}/>
                            <span>{lang === "en" ? "English" : "Italiano"}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
