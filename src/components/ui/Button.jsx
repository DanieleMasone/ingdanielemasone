import React from "react";

export function Button({children, className = "", ...props}) {
    return (
        <button
            {...props}
            className={`bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-400 hover:to-blue-500
        text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300
        hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
        dark:from-blue-600 dark:to-indigo-700 dark:hover:from-indigo-600 dark:hover:to-blue-700
        ${className}`}
        >
            {children}
        </button>
    );
}
