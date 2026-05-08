import React, {useId} from "react";
import clsx from "clsx";
import {layoutClasses} from "../../../styles/commonClasses";

/**
 * PageSection renders a titled content section for route-level portfolio pages.
 *
 * It applies the shared layout and heading classes from commonClasses so page
 * spacing and heading hierarchy stay consistent across the online CV.
 *
 * @component
 * @module components/ui/pageSection/PageSection
 *
 * @param {Object} props - Component props.
 * @param {string} props.title - Section heading text.
 * @param {React.ReactNode} props.children - The content inside the section.
 * @param {string} [props.className] - Optional classes added to the section wrapper.
 * @param {1 | 2 | 3} [props.headingLevel=1] - Semantic heading level for the section title.
 * @returns {JSX.Element} Titled portfolio section.
 */
export function PageSection({title, children, className = "", headingLevel = 1}) {
    const titleId = useId();
    const normalizedLevel = [1, 2, 3].includes(headingLevel) ? headingLevel : 1;
    const HeadingTag = `h${normalizedLevel}`;

    return (
        <section
            className={clsx(layoutClasses.pageSection, className)}
            aria-labelledby={title ? titleId : undefined}
        >
            {title && (
                <HeadingTag id={titleId} className={layoutClasses.sectionTitle}>
                    {title}
                </HeadingTag>
            )}
            {children}
        </section>
    );
}
