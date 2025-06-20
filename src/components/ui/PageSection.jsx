import React from "react";

/**
 * PageSection component renders a section element with a title and children content.
 *
 * It applies consistent padding and max-width styles and displays the title prominently.
 *
 * @param {Object} props
 * @param {string} props.title - The title text displayed as a section heading.
 * @param {React.ReactNode} props.children - The content inside the section.
 * @returns {JSX.Element} The rendered section element.
 */
export default function PageSection({title, children}) {
    return (
        <section className="px-4 py-6 sm:px-6 md:px-8 max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
                {title}
            </h2>
            {children}
        </section>
    );
}
