import {useEffect, useRef, useState} from "react";

/**
 * Read-only textarea component that auto-adjusts its height and allows toggling
 * between collapsed (3 lines approx.) and expanded view.
 *
 * @param {Object} props - React component props.
 * @param {string} [props.className] - Additional CSS class names to apply.
 * @param {string} [props.value] - The text content displayed in the textarea.
 * @returns {JSX.Element} The rendered textarea with optional expand/collapse button.
 */
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
            textarea.style.height = "6.5rem"; // about 3 lines
        }

        setOverflowing(textarea.scrollHeight > 104); // 6.5rem in px
    }, [value, expanded]);

    return (
        <div className="relative">
            <textarea
                ref={textareaRef}
                value={value}
                readOnly
                className={`w-full bg-white border border-gray-300 text-gray-900 rounded-md px-3 py-2
                    text-sm sm:text-base
                    focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none transition-all duration-300
                    dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-400
                    ${className}`}
                style={{overflow: "hidden"}}
                {...props}
            />
            {overflowing && (
                <button
                    onClick={() => setExpanded((prev) => !prev)}
                    className="absolute bottom-1.5 right-2 text-gray-500 dark:text-gray-400 text-xs sm:text-sm cursor-pointer select-none bg-white dark:bg-gray-800 px-1 py-0.5 rounded"
                    aria-label={expanded ? "Show less" : "Show more"}
                    type="button"
                >
                    {expanded ? "▲" : "⋯"}
                </button>
            )}
        </div>
    );
}
