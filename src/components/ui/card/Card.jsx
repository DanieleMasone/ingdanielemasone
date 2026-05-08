import React from "react";
import clsx from "clsx";
import {interactiveClasses, surfaceClasses} from "../../../styles/commonClasses";

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
            className={clsx(surfaceClasses.card, interactiveClasses.focusRing, "sm:p-6", className)}
        >
            {children}
        </section>
    );
}
