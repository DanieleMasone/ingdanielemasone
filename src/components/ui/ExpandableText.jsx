import {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import {ChevronDown, ChevronUp} from 'lucide-react';


/**
 * ExpandableText component displays a text paragraph that can be truncated
 * to a maximum number of lines with an option to expand and collapse.
 *
 * Shows a "Show More" / "Show Less" toggle button when the text exceeds the
 * specified number of lines.
 *
 * @component
 * @module components/ui/ExpandableText
 *
 * @param {object} props - Component props.
 * @param {string} [props.value=""] - The text content to display.
 * @param {number} [props.maxLines=3] - Maximum number of visible lines before truncation.
 * @param {string} [props.className=""] - Additional CSS classes to apply to the paragraph.
 * @returns {JSX.Element} A paragraph with expandable/collapsible text.
 */
export function ExpandableText({value = "", maxLines = 3, className = ""}) {
    const [expanded, setExpanded] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const {t} = useTranslation();
    const paragraphRef = useRef(null);

    const lineClampClass = {
        1: "line-clamp-1",
        2: "line-clamp-2",
        3: "line-clamp-3",
        4: "line-clamp-4",
        5: "line-clamp-5",
    }[maxLines] || "line-clamp-3";

    useEffect(() => {
        if (!paragraphRef.current) return;

        const scrollHeight = paragraphRef.current.scrollHeight;
        const clientHeight = paragraphRef.current.clientHeight;


        // Show the button if it is expanded (to allow closing)
        // or if the text is truncated (needs expansion)
        setShowButton(expanded || scrollHeight > clientHeight);
    }, [value, maxLines, expanded]);

    return (
        <div className="relative">
            <p
                ref={paragraphRef}
                className={clsx(
                    "text-sm sm:text-base whitespace-pre-line transition-all",
                    !expanded && lineClampClass,
                    className
                )}
            >
                {value}
            </p>

            {showButton && (
                <div className="mt-1 flex justify-end">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                        type="button"
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
