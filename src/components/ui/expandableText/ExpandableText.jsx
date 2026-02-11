import {useLayoutEffect, useRef, useState} from "react";
import clsx from "clsx";
import {ChevronDown, ChevronUp} from "lucide-react";
import {useTranslation} from "react-i18next";

/**
 * ExpandableText component
 *
 * Displays a text block limited to a maximum number of lines, with the ability to expand or collapse.
 *
 * @component
 * @module components/ui/expandableText/ExpandableText
 * @param {Object} props - Component props
 * @param {string} props.value - The text content to display.
 * @param {number} [props.maxLines=3] - Maximum number of visible lines when collapsed.
 * @param {string} [props.className] - Additional CSS classes for styling.
 * @returns {JSX.Element} An expandable text block with a toggle button.
 */
export function ExpandableText({value = "", maxLines = 3, className = ""}) {
    const [expanded, setExpanded] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);
    const paragraphRef = useRef(null);
    const {t} = useTranslation();

    useLayoutEffect(() => {
        const el = paragraphRef.current;
        if (!el) return;

        const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
        const maxHeightCollapsed = maxLines * lineHeight;

        setContentHeight(el.scrollHeight);
        setShowButton(el.scrollHeight > maxHeightCollapsed);
    }, [value, maxLines]);

    return (
        <div className="relative">
            <div
                ref={paragraphRef}
                className={clsx(
                    "text-sm sm:text-base whitespace-pre-wrap overflow-hidden transition-all duration-500 ease-in-out relative",
                    className
                )}
                style={{
                    maxHeight: expanded ? `${contentHeight}px` : `${maxLines * 1.5}em`,
                }}
                aria-expanded={expanded}
            >
                {value}

                {!expanded && showButton && (
                    <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white dark:from-slate-900 pointer-events-none"/>
                )}
            </div>

            {showButton && (
                <div className="mt-1 flex justify-end">
                    <button
                        type="button"
                        onClick={() => setExpanded(!expanded)}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                        {expanded ? (
                            <>
                                {t("showLess")} <ChevronUp className="w-4 h-4"/>
                            </>
                        ) : (
                            <>
                                {t("showMore")} <ChevronDown className="w-4 h-4"/>
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}
