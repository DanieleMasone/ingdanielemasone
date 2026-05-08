import React from "react";

/**
 * Content wrapper used inside portfolio cards.
 *
 * Adds responsive padding and readable text colors while forwarding additional
 * props to the underlying div.
 *
 * @component
 * @module components/ui/cardContent/CardContent
 *
 * @param {object} props - Component properties.
 * @param {React.ReactNode} props.children - Content rendered inside the card body.
 * @param {string} [props.className] - Additional CSS classes for the content wrapper.
 * @returns {JSX.Element} Content container with responsive padding and text styles.
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
            `.trim()}
        >
            {children}
        </div>
    );
}
