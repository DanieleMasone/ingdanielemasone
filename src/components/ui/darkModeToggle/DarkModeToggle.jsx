import React, {useEffect, useState} from 'react';
import {Moon, Sun} from 'lucide-react';

/**
 * DarkModeToggle component toggles between dark and light theme modes.
 * It syncs the mode state with localStorage and adds/removes the 'dark' class on the root element.
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
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-md
               bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200
               hover:bg-gray-300 dark:hover:bg-gray-600
               transition-colors duration-200
               focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
    );

}
