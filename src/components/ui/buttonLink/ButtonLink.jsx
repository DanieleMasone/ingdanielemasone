import clsx from "clsx";
import {interactiveClasses} from "../../../styles/commonClasses";

/**
 * Styled external link rendered as a call-to-action button.
 *
 * Uses shared interaction classes, supports predefined color themes, and opens
 * the link in a new tab with secure rel attributes.
 *
 * @component
 * @module components/ui/buttonLink/ButtonLink
 *
 * @param {object} props - Component props.
 * @param {string} props.href - Target URL for the link.
 * @param {React.ReactNode} props.children - Content inside the button.
 * @param {"green" | "blue"} props.color - Visual theme color variant.
 *
 * @returns {JSX.Element} External anchor styled as a CTA button.
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
