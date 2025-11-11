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
 * @returns {JSX.Element}
 */
export function SelectableButton({label, isSelected, onClick}) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-lg border text-sm whitespace-nowrap
                ${
                isSelected
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            }`}
        >
            {label}
        </button>
    );
}
