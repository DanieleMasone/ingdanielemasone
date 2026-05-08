import clsx from "clsx";
import {interactiveClasses} from "../../../styles/commonClasses";

/**
 * ButtonLink renders a styled anchor element that looks like a button.
 * Supports predefined color themes and opens the link in a new tab
 * with secure rel attributes.
 *
 * @component
 * @module components/ui/buttonLink/ButtonLink
 *
 * @param {object} props - Component props.
 * @param {string} props.href - Target URL for the link.
 * @param {React.ReactNode} props.children - Content inside the button.
 * @param {"green" | "blue"} props.color - Visual theme color variant.
 *
 * @returns {JSX.Element} Styled anchor element rendered as a button-like link.
 */
export function ButtonLink({href, children, color}) {
    const colorClasses = {
        green: interactiveClasses.linkButtonGreen,
        blue: interactiveClasses.linkButtonBlue,
    };

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
                interactiveClasses.linkButtonBase,
                interactiveClasses.focusRing,
                colorClasses[color]
            )}
        >
            {children}
        </a>
    );
}
