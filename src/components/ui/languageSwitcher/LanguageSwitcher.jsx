import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {ChevronDown} from "lucide-react";

const flags = {
    en: "https://flagcdn.com/w20/gb.png",
    it: "https://flagcdn.com/w20/it.png",
};

const languageLabels = {
    en: "English",
    it: "Italiano",
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
 * @module components/ui/languageSwitcher/LanguageSwitcher
 * @returns {JSX.Element} The language switcher UI.
 */
export default function LanguageSwitcher() {
    const {i18n} = useTranslation();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setOpen(prev => !prev);
    const handleChange = (lang) => {
        if (lang !== i18n.language) i18n.changeLanguage(lang).catch(console.error);
        setOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setOpen(false);
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
                className="flex items-center justify-between gap-2 rounded-md bg-gray-100/80 dark:bg-gray-700/70
                           px-3 py-1.5 text-sm font-medium text-gray-900 dark:text-gray-100
                           shadow-sm hover:bg-gray-200/80 dark:hover:bg-gray-600/60
                           focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
                           backdrop-blur-sm min-w-[6rem]"
                type="button"
            >
                <img src={flags[i18n.language]} alt={`${i18n.language} flag`} className="w-5 h-auto rounded-sm"
                     loading="lazy"/>
                <span className="uppercase">{i18n.language}</span>
                <ChevronDown
                    className={`w-4 h-4 text-gray-500 dark:text-gray-300 transition-transform ${open ? "rotate-180" : "rotate-0"}`}/>
            </button>

            {open && (
                <div
                    className="absolute right-0 mt-2 origin-top-right rounded-xl bg-white/90 dark:bg-gray-800/90
                               shadow-lg ring-1 ring-black/10 backdrop-blur-md overflow-hidden animate-fade-in
                               w-auto min-w-[8rem]"
                    role="menu"
                    aria-label="Selezione lingua"
                >
                    {Object.entries(flags).map(([lang, flagUrl]) => {
                        const isActive = lang === i18n.language;
                        return (
                            <button
                                key={lang}
                                onClick={() => handleChange(lang)}
                                className={`flex items-center px-3 py-2 text-sm w-full
                                           text-gray-800 dark:text-gray-100 transition-all
                                           hover:bg-gray-100/80 dark:hover:bg-gray-700/60
                                ${isActive ? "bg-blue-100/80 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-semibold" : ""}`}
                                role="menuitem"
                                type="button"
                            >
                                {/* status sidebar */}
                                <span
                                    className={`inline-block w-1 h-6 rounded-r-md mr-3 ${isActive ? "bg-blue-600 dark:bg-blue-400" : "bg-transparent"}`}/>
                                <img src={flagUrl} alt={`${lang} flag`} className="w-5 h-auto rounded-sm mr-2"
                                     loading="lazy"/>
                                <span>{languageLabels[lang]}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}