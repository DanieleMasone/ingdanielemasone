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

/**
 * Footer component with social brand icons and copyright text.
 * Uses i18next for translations.
 *
 * @component
 * @module components/ui/Footer
 * @returns {JSX.Element} The Footer element with icon links and copyright.
 */
export default function Footer() {
    const {t} = useTranslation();

    return (
        <footer
            className="sticky bottom-0 z-50 backdrop-blur-sm backdrop-saturate-150
               bg-gray-200/60 dark:bg-gray-900/80 text-gray-900 dark:text-gray-400 shadow-inner">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
                {/* Responsive Icon Grid */}
                <div
                    className="flex flex-wrap justify-center gap-x-4 gap-y-3 sm:space-x-6 sm:flex-nowrap sm:gap-y-0 mb-3 sm:mb-4">
                    {[
                        {
                            key: "linkedin",
                            href: "https://www.linkedin.com/in/daniele-masone",
                            icon: {
                                svg: `<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.85-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554V9h3.414v1.561h.049c.477-.9 1.637-1.85 3.367-1.85 3.598 0 4.265 2.368 4.265 5.452v6.289zM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126zM6.814 20.452H3.861V9h2.953v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.723v20.549C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.272V1.723C24 .774 23.2 0 22.225 0z"/>`,
                            },
                            color: "#0A66C2",
                            label: "linkedin",
                            className: "hover:opacity-80 transition"
                        },
                        {
                            key: "instagram",
                            href: "https://www.instagram.com/ing_daniele_masone/",
                            icon: icons.siInstagram,
                            color: "#E4405F",
                            label: "Instagram"
                        },
                        {
                            key: "facebook",
                            href: "https://www.facebook.com/danieleMasone",
                            icon: icons.siFacebook,
                            color: "#1877F2",
                            label: "Facebook"
                        },
                        {
                            key: "github",
                            href: "https://github.com/DanieleMasone",
                            icon: icons.siGithub,
                            color: "currentColor",
                            label: "GitHub",
                            className: "text-[#181717] dark:text-gray-200"
                        },
                        {
                            key: "udemy",
                            href: "https://www.udemy.com/user/daniele-masone/",
                            icon: icons.siUdemy,
                            color: "#EC5252",
                            label: "Udemy"
                        }
                    ].map(({key, href, icon, color, label, className}) => (
                        <a
                            key={key}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="p-2 hover:opacity-80 transition rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        >
                            <BrandIcon
                                icon={icon}
                                color={color}
                                className={className}
                                size={28}
                            />
                        </a>
                    ))}
                </div>

                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-400 text-center">
                    {t("footer_copyright")}
                </p>
            </div>
        </footer>
    );
}
