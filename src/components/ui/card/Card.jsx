import React from "react";
import clsx from "clsx";
import {surfaceClasses} from "@/styles/commonClasses";

/**
 * Reusable card surface for portfolio content blocks.
 *
 * Applies the shared card surface from commonClasses. The shared surface keeps
 * portfolio list pages compact and consistent across desktop and mobile. The
 * section remains visually static so only its nested controls communicate an
 * interaction affordance and own keyboard focus indicators. Additional props
 * are forwarded to the underlying section element.
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
            className={clsx(surfaceClasses.card, className)}
        >
            {children}
        </section>
    );
}
