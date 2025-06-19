import React from "react";

export function Input({className = "", ...props}) {
    return (
        <input
            {...props}
            className={`
                w-full
                bg-white dark:bg-gray-800
                border border-gray-300 dark:border-gray-600
                text-sm sm:text-base
                text-gray-900 dark:text-gray-100
                rounded-md
                px-3 sm:px-4 py-2 sm:py-2.5
                focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400
                transition-colors duration-200
                placeholder-gray-400 dark:placeholder-gray-500
                ${className}
            `}
        />
    );
}
