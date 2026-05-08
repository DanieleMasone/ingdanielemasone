import clsx from "clsx";
import {interactiveClasses} from "../../../styles/commonClasses";

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
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                interactiveClasses.buttonBase,
                interactiveClasses.focusRing,
                "whitespace-nowrap",
                isSelected ? interactiveClasses.selectedButton : interactiveClasses.unselectedButton,
                className
            )}
            aria-pressed={isSelected}
        >
            {label}
        </button>
    );
}
