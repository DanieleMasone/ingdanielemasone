/**
 * BrandIcon renders an SVG icon from the simple-icons set or custom SVG data.
 *
 * @component
 * @module components/ui/brandIcon/BrandIcon
 *
 * @param {object} props - Component props.
 * @param {object} props.icon - Icon object containing `svg` string.
 * @param {string} props.color - Fill color for the SVG.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {number} [props.size=24] - Width and height of the icon.
 * @param {string} [props.title] - Accessible title for screen readers.
 * @returns {JSX.Element|null} SVG element or null if no valid icon.
 */
export function BrandIcon({icon, color, className, size = 24, title}) {
    if (!icon || !icon.svg) return null;

    return (
        <svg
            data-testid="brand-icon"
            role="img"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill={color}
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden={title ? undefined : "true"}
            aria-label={title || undefined}
            dangerouslySetInnerHTML={{__html: icon.svg}}
        />
    );
}
