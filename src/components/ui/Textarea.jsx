import React from "react";

export function Textarea({className = "", ...props}) {
    return (
        <textarea
            {...props}
            className={`w-full bg-white border border-gray-300 text-gray-900 rounded-md px-4 py-2
        focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none transition-colors duration-200
        dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-400
        ${className}`}
        />
    );
}
