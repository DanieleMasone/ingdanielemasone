import clsx from "clsx";
import {interactiveClasses} from "@/styles/commonClasses";

/**
 * Reusable filter button that exposes its selected state to assistive tech.
 *
 * Uses shared interaction classes for consistent spacing, focus state, and
 * selected/unselected visual styles across portfolio filters.
 *
 * @component
 * @module components/ui/selectableButton/SelectableButton
 *
 * @param {Object} props - Component props.
 * @param {string | number} props.label - Visible button label.
 * @param {boolean} props.isSelected - Whether the button is currently selected.
 * @param {function(): void} props.onClick - Callback fired when the button is clicked.
 * @param {string} [props.className=""] - Additional CSS classes.
 * @param {boolean} [props.disabled=false] - Whether interaction is disabled.
 * @returns {React.JSX.Element} Accessible selectable button.
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
