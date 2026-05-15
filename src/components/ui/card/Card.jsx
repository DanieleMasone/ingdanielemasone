import React from "react";
import clsx from "clsx";
import {interactiveClasses, surfaceClasses} from "@/styles/commonClasses";

/**
 * Reusable card surface for portfolio content blocks.
 *
 * Applies the shared card surface and keyboard focus styles from commonClasses.
 * The shared surface keeps portfolio list pages compact and consistent across
 * desktop and mobile. Additional props are forwarded to the underlying section
 * element.
 *
 * @component
 * @module components/ui/card/Card
 *
 * @param {object} props - Component properties.
 * @param {React.ReactNode} props.children - Inner content of the card.
 * @param {string} [props.className] - Additional CSS classes for the card container.
 * @returns {JSX.Element} Styled portfolio card with wrapped content.
 */
export function Card({children, className = "", ...rest}) {
    return (
        <section
            {...rest}
            className={clsx(surfaceClasses.card, interactiveClasses.focusRing, className)}
        >
            {children}
        </section>
    );
}
