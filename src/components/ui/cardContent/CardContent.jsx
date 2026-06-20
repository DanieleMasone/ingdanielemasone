import React from "react";
import clsx from "clsx";

/**
 * Content wrapper used inside portfolio cards.
 *
 * Owns the full-height vertical card-body layout while the parent Card owns
 * outer padding. Additional props are forwarded to the underlying div.
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
            className={clsx(
                "flex h-full flex-col gap-4 p-0 text-sm text-gray-900 dark:text-gray-300 sm:text-base",
                className
            )}
        >
            {children}
        </div>
    );
}
