import React from "react";
import clsx from "clsx";
import {layoutClasses} from "../../../styles/commonClasses";

/**
 * PageSection component renders a section element with a title and children content.
 *
 * It applies consistent padding and max-width styles and displays the title prominently.
 *
 * @component
 * @module components/ui/pageSection/PageSection
 *
 * @param {Object} props
 * @param {string} props.title - The title text displayed as a section heading.
 * @param {React.ReactNode} props.children - The content inside the section.
 * @returns {JSX.Element} The rendered section element.
 */
export function PageSection({title, children, className = ""}) {
    return (
        <section className={clsx(layoutClasses.pageSection, className)}>
            {title && <h2 className={layoutClasses.sectionTitle}>{title}</h2>}
            {children}
        </section>
    );
}
