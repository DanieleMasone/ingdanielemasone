import React, {useEffect, useState} from 'react';
import {Moon, Sun} from 'lucide-react';
import clsx from "clsx";
import {interactiveClasses} from "../../../styles/commonClasses";

/**
 * DarkModeToggle switches between dark and light theme modes.
 *
 * It syncs the mode state with localStorage, updates the root `dark` class, and
 * exposes the current pressed state for assistive technologies.
 *
 * @component
 * @module components/ui/darkModeToggle/DarkModeToggle
 * @returns {JSX.Element} A button to toggle dark mode.
 */
export function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(() =>
        localStorage.getItem('theme') === 'dark'
    );

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className={clsx(
                "flex items-center space-x-2 rounded-md bg-gray-200 px-3 py-1.5 text-gray-800 transition-colors duration-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
                interactiveClasses.focusRing
            )}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={darkMode}
        >
            {darkMode ? (
                <Sun className="h-5 w-5" aria-hidden="true"/>
            ) : (
                <Moon className="h-5 w-5" aria-hidden="true"/>
            )}
        </button>
    );

}
