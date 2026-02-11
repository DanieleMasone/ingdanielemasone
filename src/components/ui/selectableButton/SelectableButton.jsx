import clsx from "clsx";

/**
 * SelectableButton is a reusable button that highlights itself when selected.
 *
 * @component
 * @module components/ui/selectableButton/SelectableButton
 *
 * @param {Object} props
 * @param {string | number} props.label - Text to display inside the button
 * @param {boolean} props.isSelected - Whether the button is currently selected
 * @param {Function} props.onClick - Callback when the button is clicked
 * @param {string} [props.className=""] - Additional CSS classes
 * @param {boolean} [props.disabled=false] - Disable button interaction
 * @returns {JSX.Element}
 */
export function SelectableButton({
                                     label,
                                     isSelected,
                                     onClick,
                                     className = "",
                                     disabled = false
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                "px-4 py-2 rounded-lg border text-sm whitespace-nowrap transition-all",
                isSelected
                    ? "bg-blue-600 text-white shadow-md hover:shadow-lg dark:bg-blue-500"
                    : "bg-gray-200 hover:bg-gray-300 shadow-sm dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200",
                className
            )}
            aria-pressed={isSelected}
        >
            {label}
        </button>
    );
}
