import React from "react";

/**
 * Generic Card component for containers with default styling.
 *
 * @component
 * @module components/ui/card/Card
 *
 * @param {object} props - Component properties.
 * @param {React.ReactNode} props.children - Inner content of the card.
 * @param {string} [props.className] - Additional CSS classes to add to the card container.
 * @param {object} [props.rest] - Other props to spread on the container div (e.g., event handlers, data attributes).
 * @returns {JSX.Element} Card with basic styles and wrapped content.
 */
export function Card({children, className = "", ...rest}) {
    return (
        <section
            {...rest}
            className={`
                flex flex-col
                rounded-3xl
                bg-white/60 dark:bg-gray-800/60
                backdrop-blur-md
                border border-gray-200 dark:border-gray-700
                shadow-md hover:shadow-xl transition-shadow duration-300
                p-4 sm:p-6
                w-full
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70
                ${className}
            `}
        >
            {children}
        </section>
    );
}
