import React from 'react';
import * as icons from 'simple-icons';
import {useTranslation} from "react-i18next";

/**
 * BrandIcon renders an SVG icon from the simple-icons set or custom SVG data.
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

export const linkedinIcon = {
    svg: `<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.85-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554V9h3.414v1.561h.049c.477-.9 1.637-1.85 3.367-1.85 3.598 0 4.265 2.368 4.265 5.452v6.289zM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126zM6.814 20.452H3.861V9h2.953v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.723v20.549C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.272V1.723C24 .774 23.2 0 22.225 0z"/>`,
};

const links = [
    {
        key: "linkedin",
        href: "https://www.linkedin.com/in/ingdanielemasone/",
        icon: linkedinIcon,
        color: "#0A66C2",
        label: "LinkedIn",
    },
    {
        key: "instagram",
        href: "https://www.instagram.com/ing_daniele_masone/",
        icon: icons.siInstagram,
        color: "#E4405F",
        label: "Instagram",
    },
    {
        key: "facebook",
        href: "https://www.facebook.com/danieleMasone",
        icon: icons.siFacebook,
        color: "#1877F2",
        label: "Facebook",
    },
    {
        key: "github",
        href: "https://github.com/DanieleMasone",
        icon: icons.siGithub,
        color: "currentColor",
        label: "GitHub",
        className: "text-[#181717] dark:text-gray-200",
    },
    {
        key: "udemy",
        href: "https://www.udemy.com/user/daniele-masone/",
        icon: icons.siUdemy,
        color: "#EC5252",
        label: "Udemy",
    },
];

/**
 * Footer component with social brand icons and copyright text.
 * Uses i18next for translations.
 *
 * @component
 * @module components/footer/Footer
 * @returns {JSX.Element} The Footer element with icon links and copyright.
 */
export function Footer() {
    const {t} = useTranslation();

    return (
        <footer
            role="contentinfo"
            className="
                w-full
                bg-gray-200/50 dark:bg-gray-900/70
                backdrop-blur-lg backdrop-saturate-150
                border-t border-black/5 dark:border-white/10
                text-gray-900 dark:text-gray-300
                shadow-[0_-4px_12px_rgba(0,0,0,0.06)]
                transition-colors duration-300
            "
        >
            <div className="max-w-5xl mx-auto px-4 py-2 sm:py-3">
                <nav aria-label="Social links" className="flex flex-col items-center gap-2">
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                        {links.map(({key, href, icon, color, label, className}) => (
                            <a
                                key={key}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="
                                    group relative flex flex-col items-center justify-center
                                    w-10 h-10 sm:w-11 sm:h-11
                                    rounded-lg
                                    transition-transform
                                    hover:scale-110 active:scale-95
                                    hover:bg-black/5 dark:hover:bg-white/10
                                    focus:outline-none focus-visible:ring-2
                                    focus-visible:ring-blue-500/70
                                "
                            >
                                <BrandIcon icon={icon} color={color} className={className} size={24} title={label}/>

                                <span className="mt-1 text-[10px] sm:hidden text-gray-700 dark:text-gray-400">
                                    {label}
                                </span>

                                <span className="
                                    pointer-events-none
                                    absolute -top-8 left-1/2 -translate-x-1/2
                                    whitespace-nowrap
                                    rounded px-2 py-1 text-xs
                                    bg-gray-900 text-gray-100
                                    dark:bg-gray-100 dark:text-gray-900
                                    opacity-0 translate-y-1
                                    transition-all
                                    group-hover:opacity-100 group-hover:translate-y-0
                                    hidden sm:block
                                ">
                                    {label}
                                </span>
                            </a>
                        ))}
                    </div>

                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-400 text-center select-none mt-2">
                        {t("footer_copyright")}
                    </p>
                </nav>
            </div>
        </footer>
    );
}

