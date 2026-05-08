import React from "react";
import clsx from "clsx";
import {layoutClasses} from "../../../styles/commonClasses";

/**
 * PageSection renders a titled content section for route-level portfolio pages.
 *
 * It applies the shared layout and heading classes from commonClasses so page
 * spacing stays consistent across the online CV.
 *
 * @component
 * @module components/ui/pageSection/PageSection
 *
 * @param {Object} props - Component props.
 * @param {string} props.title - Section heading text.
 * @param {React.ReactNode} props.children - The content inside the section.
 * @param {string} [props.className] - Optional classes added to the section wrapper.
 * @returns {JSX.Element} Titled portfolio section.
 */
export function PageSection({title, children, className = ""}) {
    return (
        <section className={clsx(layoutClasses.pageSection, className)}>
            {title && <h2 className={layoutClasses.sectionTitle}>{title}</h2>}
            {children}
        </section>
    );
}
