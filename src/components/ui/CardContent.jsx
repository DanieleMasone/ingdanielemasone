import React from "react";

export function CardContent({children, className = ""}) {
    return (
        <div
            className={`
                p-4 sm:p-6 md:p-8
                text-sm sm:text-base
                text-gray-900 dark:text-gray-300
                ${className}
            `}
        >
            {children}
        </div>
    );
}
