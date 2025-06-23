import React from "react";

/**
 * Generic Card component for containers with default styling.
 *
 * @component
 * @module components/ui/Card
 *
 * @param {object} props - Component properties.
 * @param {React.ReactNode} props.children - Inner content of the card.
 * @param {string} [props.className] - Additional CSS classes to add to the card container.
 * @param {object} [props.rest] - Other props to spread on the container div (e.g., event handlers, data attributes).
 * @returns {JSX.Element} Card with basic styles and wrapped content.
 */
export function Card({children, className = "", ...rest}) {
    return (
        <div
            {...rest}
            className={
                "rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow p-4 sm:p-6 w-full " +
                className
            }
        >
            {children}
        </div>
    );
}
