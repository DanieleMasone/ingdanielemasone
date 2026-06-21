import React, {useEffect, useState} from 'react';
import {Moon, Sun} from 'lucide-react';
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import {interactiveClasses} from "@/styles/commonClasses";

const THEME_STORAGE_KEY = "theme";

/**
 * Reads the persisted theme preference when browser storage is available.
 *
 * @returns {string|null} Stored theme value, or null when no preference exists.
 */
function getStoredTheme() {
    try {
        return localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
        return null;
    }
}

/**
 * Persists the selected theme while keeping the toggle resilient to storage errors.
 *
 * @param {"dark"|"light"} theme - Theme value to store for future visits.
 * @returns {void}
 */
function setStoredTheme(theme) {
    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
        // Ignore storage failures so the visual theme can still be applied.
    }
}

/**
 * Resolves the initial theme from saved preference first, then system preference.
 *
 * @returns {boolean} True when the portfolio should start in dark mode.
 */
function getInitialDarkMode() {
    const storedTheme = getStoredTheme();

    if (storedTheme === "dark") return true;
    if (storedTheme === "light") return false;

    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

/**
 * DarkModeToggle switches between dark and light theme modes.
 *
 * It uses a saved preference before the operating-system colour scheme, writes
 * browser storage only after an explicit toggle action, updates the root
 * `dark` class, and exposes the current pressed state to assistive technologies.
 *
 * @component
 * @module components/ui/darkModeToggle/DarkModeToggle
 * @returns {JSX.Element} A button to toggle dark mode.
 */
export function DarkModeToggle() {
    const {t} = useTranslation();
    const [darkMode, setDarkMode] = useState(getInitialDarkMode);
    const buttonLabel = darkMode ? t("theme_toggle.switch_to_light") : t("theme_toggle.switch_to_dark");

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [darkMode]);

    const handleToggle = () => {
        const nextDarkMode = !darkMode;

        setStoredTheme(nextDarkMode ? "dark" : "light");
        setDarkMode(nextDarkMode);
    };

    return (
        <button
            type="button"
            onClick={handleToggle}
            className={clsx(
                interactiveClasses.toolbarIconButton,
                interactiveClasses.focusRing
            )}
            aria-label={buttonLabel}
            aria-pressed={darkMode}
            title={buttonLabel}
        >
            {darkMode ? (
                <Sun className="h-5 w-5" aria-hidden="true"/>
            ) : (
                <Moon className="h-5 w-5" aria-hidden="true"/>
            )}
        </button>
    );

}
