import React, {useEffect, useId, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Check, ChevronDown, Languages} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import clsx from "clsx";
import {interactiveClasses, layoutClasses} from "@/styles/commonClasses";

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
 * Shows the active language, opens an accessible group of language choices,
 * marks the current choice with `aria-pressed`, closes on outside click or
 * Escape, and persists the chosen language through the shared i18next instance.
 *
 * @component
 * @module components/ui/languageSwitcher/LanguageSwitcher
 * @returns {JSX.Element} Language dropdown control.
 */
export function LanguageSwitcher() {
    const {i18n, t} = useTranslation();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const menuId = useId();

    const normalizedLanguage = i18n.language?.split("-")[0] ?? "en";
    const currentLang = Object.prototype.hasOwnProperty.call(languageLabels, normalizedLanguage) ? normalizedLanguage : "en";
    const currentLanguageLabel = languageLabels[currentLang];
    const selectLanguageLabel = t("language_switcher.select_language");
    const optionsLabel = t("language_switcher.options_label");
    const currentLanguageText = t("language_switcher.current_language");

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
                aria-expanded={open}
                aria-controls={menuId}
                aria-label={`${selectLanguageLabel}: ${currentLanguageLabel}`}
                className={clsx(
                    interactiveClasses.toolbarButton,
                    "min-w-[6rem] justify-between gap-2 px-3 py-2",
                    interactiveClasses.focusRing
                )}
                type="button"
            >
                <Languages className="h-5 w-5" aria-hidden="true"/>
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
                        className={clsx(
                            interactiveClasses.dropdownPanel,
                            "w-40 sm:w-44 md:w-48 flex flex-col divide-y divide-gray-200 dark:divide-gray-700"
                        )}
                        role="group"
                        id={menuId}
                        aria-label={optionsLabel}
                    >
                        {Object.keys(languageLabels).map((lang) => {
                            const isActive = lang === currentLang;
                            return (
                                <button
                                    key={lang}
                                    onClick={() => handleChange(lang)}
                                    className={clsx(
                                        interactiveClasses.dropdownOption,
                                        interactiveClasses.focusRingInset,
                                        isActive && interactiveClasses.dropdownOptionActive
                                    )}
                                    aria-pressed={isActive}
                                    type="button"
                                >
                                    <span
                                        className={`inline-block w-1 h-6 rounded-r-md mr-3 ${isActive ? "bg-blue-600 dark:bg-blue-400" : "bg-transparent"}`}/>
                                    <span
                                        aria-hidden="true"
                                        className="mr-3 w-6 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400"
                                    >
                                        {lang}
                                    </span>
                                    <span className="flex-1 text-left">{languageLabels[lang]}</span>
                                    {isActive && (
                                        <>
                                            <Check className="h-4 w-4 shrink-0" aria-hidden="true"/>
                                            <span
                                                className={layoutClasses.screenReaderOnly}>{currentLanguageText}</span>
                                        </>
                                    )}
                                </button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
