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
 * @returns {JSX.Element|null} SVG element or null if no valid icon.
 */
export function BrandIcon({icon, color, className, size = 24}) {
    if (!icon || !icon.svg) return null;

    return (
        <svg
            role="img"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill={color}
            className={className}
            dangerouslySetInnerHTML={{__html: icon.svg}}
            xmlns="http://www.w3.org/2000/svg"
        />
    );
}

export const linkedinIcon = {
    svg: `<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.85-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554V9h3.414v1.561h.049c.477-.9 1.637-1.85 3.367-1.85 3.598 0 4.265 2.368 4.265 5.452v6.289zM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126zM6.814 20.452H3.861V9h2.953v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.723v20.549C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.272V1.723C24 .774 23.2 0 22.225 0z"/>`,
};

/**
 * Footer component with social brand icons and copyright text.
 * Uses i18next for translations.
 *
 * @component
 * @module components/Footer
 * @returns {JSX.Element} The Footer element with icon links and copyright.
 */
export default function Footer() {
    const {t} = useTranslation();

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

    return (
        <footer
            className="sticky bottom-0 z-40 backdrop-blur-md backdrop-saturate-150
            bg-gray-200/40 dark:bg-gray-900/60 border-t border-white/20 dark:border-gray-700/40
            text-gray-900 dark:text-gray-400 shadow-inner transition-colors duration-300"
        >
            <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex flex-col items-center space-y-2">
                <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 sm:gap-x-6">
                    {links.map(({key, href, icon, color, label, className}) => (
                        <a
                            key={key}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="group relative p-2 transition transform hover:scale-110"
                        >
                            <span className="sr-only">{label}</span>
                            <BrandIcon
                                icon={icon}
                                color={color}
                                className={className}
                                size={26}
                            />
                            <span
                                className="absolute left-1/2 -translate-x-1/2 bottom-8 opacity-0 group-hover:opacity-100 text-xs text-gray-700 dark:text-gray-300 transition">
                                {label}
                            </span>
                        </a>
                    ))}
                </div>

                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-400 text-center select-none">
                    {t("footer_copyright")}
                </p>
            </div>
        </footer>
    );
}
