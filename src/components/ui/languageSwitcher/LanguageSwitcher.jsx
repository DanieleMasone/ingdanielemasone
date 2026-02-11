import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {ChevronDown} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";

const flags = {
    en: "https://flagcdn.com/w20/gb.png",
    it: "https://flagcdn.com/w20/it.png",
    fr: "https://flagcdn.com/w20/fr.png",
    de: "https://flagcdn.com/w20/de.png",
    es: "https://flagcdn.com/w20/es.png",
};

const languageLabels = {
    en: "English",
    it: "Italiano",
    fr: "Français",
    de: "Deutsch",
    es: "Español"
};

export function LanguageSwitcher() {
    const {i18n} = useTranslation();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const currentLang = i18n.language.split("-")[0];

    const toggleDropdown = () => setOpen(prev => !prev);
    const handleChange = (lang) => {
        if (lang !== currentLang) i18n.changeLanguage(lang).catch(console.error);
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
                           px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-100
                           shadow-sm hover:bg-gray-200/80 dark:hover:bg-gray-600/60
                           focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
                           backdrop-blur-sm min-w-[6rem]"
                type="button"
            >
                <img src={flags[currentLang]} alt={`${currentLang} flag`} className="w-5 h-auto rounded-sm"/>
                <span className="uppercase">{currentLang}</span>
                <ChevronDown
                    className={`w-4 h-4 text-gray-500 dark:text-gray-300 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{opacity: 0, y: -8}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -8}}
                        transition={{duration: 0.2, ease: "easeOut"}}
                        className="absolute right-0 mt-2 origin-top-right rounded-xl bg-white/95 dark:bg-gray-800/95
                                   shadow-lg ring-1 ring-black/10 backdrop-blur-md overflow-hidden
                                   w-40 sm:w-44 md:w-48 flex flex-col divide-y divide-gray-200 dark:divide-gray-700"
                        role="menu"
                        aria-label="Selezione lingua"
                    >
                        {Object.entries(flags).map(([lang, flagUrl]) => {
                            const isActive = lang === currentLang;
                            return (
                                <button
                                    key={lang}
                                    onClick={() => handleChange(lang)}
                                    className={`flex items-center px-4 py-2 text-sm w-full
                                               text-gray-800 dark:text-gray-100 transition-colors
                                               hover:bg-gray-100/80 dark:hover:bg-gray-700/60
                                               ${isActive ? "bg-blue-100/80 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-semibold" : ""}`}
                                    role="menuitem"
                                    type="button"
                                >
                                    <span
                                        className={`inline-block w-1 h-6 rounded-r-md mr-3 ${isActive ? "bg-blue-600 dark:bg-blue-400" : "bg-transparent"}`}/>
                                    <img src={flagUrl} alt={`${lang} flag`} className="w-5 h-auto rounded-sm mr-3"/>
                                    <span className="flex-1 text-left">{languageLabels[lang]}</span>
                                </button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
