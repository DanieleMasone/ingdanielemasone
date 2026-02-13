import React from "react";

/**
 * ButtonLink renders a styled anchor element that looks like a button.
 * Supports predefined color themes and opens the link in a new tab
 * with secure rel attributes.
 *
 * @component
 * @module components/ui/buttonLink/ButtonLink
 *
 * @param {object} props - Component props.
 * @param {string} props.href - Target URL for the link.
 * @param {React.ReactNode} props.children - Content inside the button.
 * @param {"green" | "blue"} props.color - Visual theme color variant.
 *
 * @returns {JSX.Element} Styled anchor element rendered as a button-like link.
 */
export function ButtonLink({href, children, color}) {
    const baseClasses =
        "flex-1 min-w-[140px] flex items-center justify-center text-center font-semibold rounded-lg px-6 py-3 text-base transition-colors focus:outline-none shadow-md";
    const colorClasses = {
        green: "bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white focus:ring-2 focus:ring-green-400 dark:focus:ring-green-300",
        blue: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-300",
    };

    return (
        <a href={href} target="_blank" rel="noopener noreferrer"
           className={`${baseClasses} ${colorClasses[color]}`}>
            {children}
        </a>
    );
}
