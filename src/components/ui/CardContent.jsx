import React from "react";

/**
 * CardContent component for content section inside a card with padding and text styling.
 *
 * @param {object} props - Component properties.
 * @param {React.ReactNode} props.children - Inner content of the CardContent.
 * @param {string} [props.className] - Additional CSS classes to add to the content div.
 * @returns {JSX.Element} Content container with padding and text styles.
 */
export function CardContent({children, className = "", ...rest}) {
    return (
        <div
            {...rest}
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
