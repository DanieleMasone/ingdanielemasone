import React from "react";

/**
 * Shared semantic shell for localized legal documents.
 *
 * Keeps policy pages readable at narrow and wide viewports while preserving a
 * single level-one document title and a consistent last-updated footer.
 *
 * @component
 * @module components/ui/legalDocument/LegalDocument
 * @param {object} props - Component props.
 * @param {string} props.title - Localized document title.
 * @param {React.ReactNode} props.children - Legal sections rendered in document order.
 * @param {React.ReactNode} props.lastUpdated - Localized last-updated content.
 * @returns {JSX.Element} Accessible legal article shell.
 */
export function LegalDocument({title, children, lastUpdated}) {
    return (
        <article className="mx-auto min-h-screen w-full max-w-4xl px-4 py-6 leading-relaxed text-gray-900 dark:text-gray-300 sm:px-6 sm:py-8 md:px-8">
            <h1 className="mb-6 text-3xl font-bold leading-tight sm:text-4xl">{title}</h1>
            {children}
            <p className="border-t border-gray-300 pt-4 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                {lastUpdated}
            </p>
        </article>
    );
}

/**
 * One titled section inside a legal document.
 *
 * Native section and heading elements preserve the document outline without
 * adding ARIA that would duplicate their built-in semantics.
 *
 * @component
 * @param {object} props - Component props.
 * @param {string} props.title - Localized level-two section heading.
 * @param {React.ReactNode} props.children - Section content.
 * @returns {JSX.Element} Titled legal document section.
 */
export function LegalSection({title, children}) {
    return (
        <section className="mb-8">
            <h2 className="mb-2 text-xl font-semibold leading-snug sm:text-2xl">{title}</h2>
            {children}
        </section>
    );
}
