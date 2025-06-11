import React from "react";

export function CardContent({children, className = ""}) {
    return (
        <div className={`p-6 sm:p-8 text-gray-900 dark:text-gray-300 ${className}`}>
            {children}
        </div>
    );
}
