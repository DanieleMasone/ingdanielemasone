import {useId, useLayoutEffect, useRef, useState} from "react";
import clsx from "clsx";
import {ChevronDown, ChevronUp} from "lucide-react";
import {useTranslation} from "react-i18next";
import {interactiveClasses} from "@/styles/commonClasses";

/**
 * Expandable text block for long portfolio descriptions.
 *
 * Limits the visible text to a configurable number of lines and reveals a
 * localized expand/collapse button only when the content overflows. The toggle
 * button is linked to the expandable region with `aria-controls`.
 *
 * @component
 * @module components/ui/expandableText/ExpandableText
 * @param {Object} props - Component props.
 * @param {string} props.value - The text content to display.
 * @param {number} [props.maxLines=3] - Maximum number of visible lines when collapsed.
 * @param {string} [props.className] - Additional CSS classes for styling.
 * @returns {React.JSX.Element} An expandable text block with a toggle button.
 */
export function ExpandableText({value = "", maxLines = 3, className = ""}) {
    const [expanded, setExpanded] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);
    const [collapsedHeight, setCollapsedHeight] = useState(0);
    const paragraphRef = useRef(null);
    const contentId = useId();
    const {t} = useTranslation();

    useLayoutEffect(() => {
        const el = paragraphRef.current;
        if (!el) return;

        const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
        const maxHeightCollapsed = maxLines * lineHeight;

        setContentHeight(el.scrollHeight);
        setCollapsedHeight(maxHeightCollapsed);
        setShowButton(el.scrollHeight > maxHeightCollapsed);
    }, [value, maxLines]);

    return (
        <div className="relative">
            <div
                data-testid="expandable-text"
                id={contentId}
                ref={paragraphRef}
                className={clsx(
                    "text-sm sm:text-base whitespace-pre-wrap overflow-hidden transition-all duration-500 ease-in-out relative",
                    className
                )}
                style={{
                    maxHeight: expanded ? `${contentHeight}px` : `${collapsedHeight}px`
                }}
            >
                {value}

                {!expanded && showButton && (
                    <div
                        className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white dark:from-slate-900 pointer-events-none"/>
                )}
            </div>

            {showButton && (
                <div className="mt-1 flex justify-end">
                    <button
                        type="button"
                        onClick={() => setExpanded(!expanded)}
                        aria-expanded={expanded}
                        aria-controls={contentId}
                        className={clsx(
                            "flex items-center gap-1 rounded text-xs text-blue-600 hover:underline dark:text-blue-400",
                            interactiveClasses.focusRing
                        )}
                    >
                        {expanded ? (
                            <>
                                {t("showLess")} <ChevronUp className="w-4 h-4" aria-hidden="true"/>
                            </>
                        ) : (
                            <>
                                {t("showMore")} <ChevronDown className="w-4 h-4" aria-hidden="true"/>
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}
