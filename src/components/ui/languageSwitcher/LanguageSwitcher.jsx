import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {ChevronDown} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import clsx from "clsx";
import {interactiveClasses} from "../../../styles/commonClasses";

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

/**
 * Language selector for the portfolio.
 *
 * Shows the active language, opens a language menu, marks the current choice
 * with `aria-current`, closes on outside click or Escape, and persists the
 * chosen language through the shared i18next instance.
 *
 * @component
 * @module components/ui/languageSwitcher/LanguageSwitcher
 * @returns {JSX.Element} Language dropdown control.
 */
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

        const handleEscape = (event) => {
            if (event.key === "Escape") setOpen(false);
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [open]);

    return (
        <div ref={dropdownRef} className="relative inline-block text-left z-20">
            <button
                onClick={toggleDropdown}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-controls="language-menu"
                aria-label="Seleziona lingua"
                className={clsx(
                    "flex min-w-[6rem] items-center justify-between gap-2 rounded-md bg-gray-100/80 px-3 py-2 text-sm font-medium text-gray-900 shadow-sm backdrop-blur-sm transition-all hover:bg-gray-200/80 dark:bg-gray-700/70 dark:text-gray-100 dark:hover:bg-gray-600/60",
                    interactiveClasses.focusRing
                )}
                type="button"
            >
                <img src={flags[currentLang]} alt="" aria-hidden="true" className="w-5 h-auto rounded-sm"/>
                <span className="uppercase">{currentLang}</span>
                <ChevronDown
                    aria-hidden="true"
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
                        id="language-menu"
                        aria-label="Selezione lingua"
                    >
                        {Object.entries(flags).map(([lang, flagUrl]) => {
                            const isActive = lang === currentLang;
                            return (
                                <button
                                    key={lang}
                                    onClick={() => handleChange(lang)}
                                    className={clsx(
                                        "flex w-full items-center px-4 py-2 text-sm text-gray-800 transition-colors hover:bg-gray-100/80 dark:text-gray-100 dark:hover:bg-gray-700/60",
                                        interactiveClasses.focusRingInset,
                                        isActive && "bg-blue-100/80 font-semibold text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
                                    )}
                                    role="menuitem"
                                    aria-current={isActive ? "true" : undefined}
                                    type="button"
                                >
                                    <span
                                        className={`inline-block w-1 h-6 rounded-r-md mr-3 ${isActive ? "bg-blue-600 dark:bg-blue-400" : "bg-transparent"}`}/>
                                    <img src={flagUrl} alt="" aria-hidden="true" className="w-5 h-auto rounded-sm mr-3"/>
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
