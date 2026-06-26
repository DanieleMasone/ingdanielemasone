import React from "react";
import clsx from "clsx";
import {ExpandableText} from "@/components/ui/expandableText/ExpandableText";

/**
 * One labelled list inside a localized structured description.
 *
 * @typedef {Object} LocalizedDescriptionSection
 * @property {string} [label] - Optional visible heading for the list.
 * @property {string[]} items - Clean list-item text without visual markers.
 */

/**
 * Localized prose with one or more semantic list sections.
 *
 * @typedef {Object} LocalizedStructuredDescription
 * @property {string[]} paragraphs - Narrative paragraphs in reading order.
 * @property {LocalizedDescriptionSection[]} sections - Related semantic lists.
 */

const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;
const isCleanListItem = (value) => isNonEmptyString(value) && !/^\s*[-*•–]\s+/.test(value);

/**
 * Checks whether a translated value follows the portfolio's structured-description contract.
 *
 * @param {unknown} description - Localized value returned by i18next.
 * @returns {boolean} Whether the value contains valid paragraphs and list sections.
 */
export const isStructuredDescription = (description) => (
    Boolean(description)
    && typeof description === "object"
    && Array.isArray(description.paragraphs)
    && description.paragraphs.length > 0
    && description.paragraphs.every(isNonEmptyString)
    && Array.isArray(description.sections)
    && description.sections.length > 0
    && description.sections.every((section) => (
        section
        && typeof section === "object"
        && (section.label === undefined || isNonEmptyString(section.label))
        && Array.isArray(section.items)
        && section.items.length > 0
        && section.items.every(isCleanListItem)
    ))
);

/**
 * Renders localized plain prose or the shared paragraph/section/list model.
 *
 * The component owns semantic list markup, headings, visual markers and
 * expandable behavior. Translation data owns only localized text and order.
 * Invalid object values are ignored instead of leaking `[object Object]` into
 * the public portfolio.
 *
 * @component
 * @module components/ui/structuredDescription/StructuredDescription
 * @param {Object} props - Component props.
 * @param {string | LocalizedStructuredDescription} props.description - Localized content.
 * @param {string} props.titleId - Card heading id used to derive section ids.
 * @param {number} props.maxLines - Maximum collapsed lines.
 * @param {string} [props.className] - Additional text styling.
 * @returns {React.JSX.Element | null} Expandable semantic content or null for invalid data.
 */
export function StructuredDescription({description, titleId, maxLines, className = ""}) {
    if (typeof description === "string") {
        return (
            <ExpandableText
                value={description}
                maxLines={maxLines}
                className={className}
            />
        );
    }

    if (!isStructuredDescription(description)) return null;

    return (
        <ExpandableText maxLines={maxLines} className={clsx(className, "space-y-3")}>
            {description.paragraphs.map((paragraph, index) => (
                <p key={`paragraph-${index}`}>{paragraph}</p>
            ))}

            {description.sections.map((section, sectionIndex) => {
                const sectionId = `${titleId}-section-${sectionIndex + 1}`;
                const list = (
                    <ul
                        className="list-disc space-y-1 pl-5 marker:text-blue-600 dark:marker:text-blue-400"
                        aria-labelledby={section.label ? sectionId : undefined}
                    >
                        {section.items.map((item, itemIndex) => (
                            <li key={`item-${itemIndex}`}>{item}</li>
                        ))}
                    </ul>
                );

                if (!section.label) {
                    return <div key={`section-${sectionIndex}`}>{list}</div>;
                }

                return (
                    <section
                        key={`section-${sectionIndex}`}
                        className="space-y-2"
                        aria-labelledby={sectionId}
                    >
                        <h3
                            id={sectionId}
                            className="text-sm font-semibold text-gray-900 dark:text-gray-100"
                        >
                            {section.label}
                        </h3>
                        {list}
                    </section>
                );
            })}
        </ExpandableText>
    );
}
