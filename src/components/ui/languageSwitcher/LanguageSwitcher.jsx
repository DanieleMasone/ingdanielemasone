import React, {useEffect, useId, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Check, ChevronDown, Languages} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import clsx from "clsx";
import {supportedLanguageMap, supportedLanguages} from "@/config/languages";
import {interactiveClasses, layoutClasses} from "@/styles/commonClasses";

/**
 * Language selector for the portfolio.
 *
 * Shows the active language code, opens an accessible group of native language
 * names, marks the current choice with `aria-pressed`, closes on outside click
 * or Escape, and persists the chosen language through the shared i18next
 * instance. The selector intentionally uses text labels instead of remote flag
 * assets so language choice remains clear and privacy-friendly.
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
    const currentLang = Object.prototype.hasOwnProperty.call(supportedLanguageMap, normalizedLanguage)
        ? normalizedLanguage
        : "en";
    const currentLanguageLabel = supportedLanguageMap[currentLang].nativeLabel;
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
        <div ref={dropdownRef} className="relative z-20 inline-block text-left">
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
                    className={`h-4 w-4 text-gray-500 transition-transform dark:text-gray-300 ${open ? "rotate-180" : "rotate-0"}`}
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
                            "flex w-40 flex-col divide-y divide-gray-200 dark:divide-gray-700 sm:w-44 md:w-48"
                        )}
                        role="group"
                        id={menuId}
                        aria-label={optionsLabel}
                    >
                        {supportedLanguages.map(({code, nativeLabel}) => {
                            const isActive = code === currentLang;

                            return (
                                <button
                                    key={code}
                                    onClick={() => handleChange(code)}
                                    className={clsx(
                                        interactiveClasses.dropdownOption,
                                        interactiveClasses.focusRingInset,
                                        isActive && interactiveClasses.dropdownOptionActive
                                    )}
                                    aria-pressed={isActive}
                                    type="button"
                                >
                                    <span
                                        className={`mr-3 inline-block h-6 w-1 rounded-r-md ${isActive ? "bg-blue-600 dark:bg-blue-400" : "bg-transparent"}`}
                                        aria-hidden="true"
                                    />
                                    <span
                                        aria-hidden="true"
                                        className="mr-3 w-6 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400"
                                    >
                                        {code}
                                    </span>
                                    <span className="flex-1 text-left">{nativeLabel}</span>
                                    {isActive && (
                                        <>
                                            <Check className="h-4 w-4 shrink-0" aria-hidden="true"/>
                                            <span className={layoutClasses.screenReaderOnly}>{currentLanguageText}</span>
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
