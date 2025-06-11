import React from "react";

export function Card({children, className = ""}) {
    return (
        <div
            className={`rounded-2xl bg-gray-100 shadow-lg border border-gray-300
        transition-shadow hover:shadow-xl
        dark:bg-gray-800 dark:border-gray-700
        ${className}`}
        >
            {children}
        </div>
    );
}
