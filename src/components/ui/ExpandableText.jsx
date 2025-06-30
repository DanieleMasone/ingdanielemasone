import {useLayoutEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import {ChevronDown, ChevronUp} from "lucide-react";

export function ExpandableText({value = "", maxLines = 3, className = ""}) {
    const [expanded, setExpanded] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);
    const paragraphRef = useRef(null);
    const {t} = useTranslation();

    const lineHeightEm = 1.5; // 1.5em is the normal average
    const collapsedHeightEm = maxLines * lineHeightEm;

    useLayoutEffect(() => {
        const el = paragraphRef.current;
        if (!el) return;

        const scrollHeight = el.scrollHeight;
        setContentHeight(scrollHeight);

        const fontSize = parseFloat(getComputedStyle(el).fontSize);
        const collapsedHeightEm = maxLines * 1.5;
        const collapsedHeightPx = collapsedHeightEm * fontSize;

        setShowButton(scrollHeight > collapsedHeightPx);
    }, [value, maxLines]);

    return (
        <div className="relative">
            <div
                ref={paragraphRef}
                className={clsx(
                    "text-sm sm:text-base whitespace-pre-line overflow-hidden transition-[max-height] duration-500 ease-in-out relative",
                    className
                )}
                style={{
                    maxHeight: expanded ? `${contentHeight}px` : `${collapsedHeightEm}em`,
                }}
                aria-expanded={expanded}
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
