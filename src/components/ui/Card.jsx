import React from "react";

export function Card({children, className = ""}) {
    return (
        <div
            className={`
                rounded-2xl
                bg-gray-100 dark:bg-gray-800
                border border-gray-300 dark:border-gray-700
                shadow-md hover:shadow-lg transition-shadow
                p-4 sm:p-6
                w-full
                ${className}
            `}
        >
            {children}
        </div>
    );
}
