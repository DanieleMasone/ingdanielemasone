import React, {useEffect, useState} from 'react';

export default function DarkModeToggle() {
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
            <span className="text-lg">{darkMode ? '☀️' : '🌙'}</span>
            <span className="text-sm font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
    );

}
