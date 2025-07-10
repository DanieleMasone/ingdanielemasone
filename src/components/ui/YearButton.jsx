import React from "react";

/**
 * YearButton component displays a selectable button for a specific year.
 *
 * @component
 * @module components/ui/YearButton
 *
 * @param {Object} props - Component props
 * @param {string|number} props.year - The year to display on the button
 * @param {string|number} props.selectedYear - The currently selected year
 * @param {Function} props.setSelectedYear - Callback to update the selected year
 * @returns {JSX.Element} A styled button representing a year
 */
export function YearButton({year, selectedYear, setSelectedYear}) {
    return (
        <button
            data-testid={`year-button-${year}`}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 rounded-2xl shadow-sm border transition whitespace-nowrap
      ${
                selectedYear === year
                    ? "ring-2 ring-blue-500 border-blue-500 bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-white"
                    : "border-gray-300 dark:border-gray-600 bg-white/30 dark:bg-gray-800/30 text-gray-900 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
        >
            {year}
        </button>
    );
}
