import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";

const flags = {
    en: "https://flagcdn.com/w20/gb.png",
    it: "https://flagcdn.com/w20/it.png",
};

/**
 * LanguageSwitcher component provides a dropdown button to switch between supported languages.
 *
 * Shows current language with corresponding flag and allows user to select a different language
 * from a dropdown menu. On selection, the language changes via `i18n.changeLanguage`.
 *
 * Supported languages: English ("en") and Italian ("it").
 *
 * @component
 * @module components/ui/LanguageSwitcher
 * @returns {JSX.Element} The language switcher UI.
 */
export default function LanguageSwitcher() {
    const {i18n} = useTranslation();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setOpen((prev) => !prev);

    const handleChange = (lang) => {
        if (lang !== i18n.language) {
            i18n.changeLanguage(lang).catch(console.error);
        }
        setOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        if (open) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    return (
        <div ref={dropdownRef} className="relative inline-block text-left z-20">
            <button
                onClick={toggleDropdown}
                aria-haspopup="true"
                aria-expanded={open}
                aria-label="Seleziona lingua"
                className="flex items-center gap-2 rounded bg-gray-200 px-3 py-1 text-sm font-medium text-gray-900
                          hover:ring-2 hover:ring-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500
                          dark:bg-gray-700 dark:text-white dark:hover:ring-blue-300 transition
                          min-w-[5.5rem] sm:min-w-[6.5rem]"
                type="button"
            >
                <img
                    src={flags[i18n.language]}
                    alt={`${i18n.language} flag`}
                    className="w-5 h-auto rounded-sm shadow"
                    loading="lazy"
                />
                <span className="uppercase select-none">{i18n.language}</span>
                <svg
                    className={`w-4 h-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>

            {open && (
                <div
                    className="absolute right-0 mt-2 w-full max-w-[12rem] sm:max-w-[16rem] origin-top-right
                                rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5
                                focus:outline-none dark:bg-gray-800 animate-fade-in"
                    role="menu"
                    aria-label="Selezione lingua"
                    style={{zIndex: 9999}}
                >
                    {Object.entries(flags).map(([lang, flagUrl]) => (
                        <button
                            key={lang}
                            onClick={() => handleChange(lang)}
                            className={` flex w-full items-center gap-3 px-4 py-3 text-base
                                        text-gray-900 hover:bg-gray-100 focus:bg-gray-100
                                        dark:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 transition-colors truncate
                                        ${lang === i18n.language ? "font-semibold bg-gray-200 dark:bg-gray-700 cursor-default" : "cursor-pointer"}
                                      `}
                            role="menuitem"
                            type="button"
                            disabled={lang === i18n.language}
                            aria-current={lang === i18n.language ? "true" : undefined}
                            style={{minHeight: 44}} // Touch target min 44px height
                        >
                            <img
                                src={flagUrl}
                                alt={`${lang} flag`}
                                className="w-6 h-auto rounded-sm shadow"
                                loading="lazy"
                            />
                            <span>{lang === "en" ? "En" : "Ita"}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}