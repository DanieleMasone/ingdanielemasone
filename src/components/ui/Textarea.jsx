import {useEffect, useRef, useState} from "react";

export function Textarea({className = "", value = "", ...props}) {
    const [expanded, setExpanded] = useState(false);
    const [overflowing, setOverflowing] = useState(false);
    const textareaRef = useRef(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        if (expanded) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        } else {
            textarea.style.height = "6.5rem"; // circa 3 righe
        }

        setOverflowing(textarea.scrollHeight > 104); // 6.5rem in px
    }, [value, expanded]);

    return (
        <div className="relative">
            <textarea
                ref={textareaRef}
                value={value}
                readOnly
                className={`w-full bg-white border border-gray-300 text-gray-900 rounded-md px-4 py-2
                    focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none transition-all duration-300
                    dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-400
                    ${className}`}
                style={{overflow: "hidden"}}
                {...props}
            />
            {overflowing && (
                <div
                    onClick={() => setExpanded((prev) => !prev)}
                    className="absolute bottom-1 right-2 text-gray-500 dark:text-gray-400 text-sm cursor-pointer select-none bg-white dark:bg-gray-800 px-1"
                >
                    {expanded ? "Show less" : "..."}
                </div>
            )}
        </div>
    );
}
