import React from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import clsx from "clsx";
import {BrandIcon} from "@/components/ui/brandIcon/BrandIcon";
import {links} from "@/mock/links";
import {interactiveClasses} from "@/styles/commonClasses";
import {siteIdentity} from "@/config/siteIdentity";

const FOOTER_LINKS = [
    {
        key: "privacy",
        labelKey: "footer_privacy_link",
        to: "/privacy/"
    },
    {
        key: "cookies",
        labelKey: "footer_cookie_link",
        to: "/cookie-policy/"
    },
    {
        key: "docs",
        labelKey: "footer_docs_link",
        href: `${import.meta.env.BASE_URL}docs/`
    },
    {
        key: "coverage",
        labelKey: "footer_coverage_link",
        href: `${import.meta.env.BASE_URL}test-coverage/`
    }
];

/**
 * Compact portfolio footer with copyright, supporting links, and social profiles.
 *
 * All destinations are bundled static data and render synchronously. Legal and
 * generated-resource links share one labelled navigation landmark, while the
 * icon-only social navigation gives each anchor one localized accessible name
 * and keeps nested brand icons decorative.
 *
 * @component
 * @module components/footer/Footer
 * @returns {JSX.Element} Footer with identity, social, legal, and resource navigation.
 */
export function Footer() {
    const {t} = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer
            role="contentinfo"
            className="
                w-full border-t border-gray-200/80 bg-white text-gray-800
                transition-colors duration-300 dark:border-gray-800/80
                dark:bg-gray-950 dark:text-gray-200
            "
        >
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:justify-between lg:px-12">
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 lg:text-left">
                    {t("footer_copyright", {year: currentYear, name: siteIdentity.name})}
                </p>

                <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-end">
                    <nav
                        aria-label={t("footer_navigation")}
                    >
                        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                            {FOOTER_LINKS.map(({key, labelKey, to, href}) => (
                                <li key={key}>
                                    {to ? (
                                        <Link
                                            to={to}
                                            className={clsx(interactiveClasses.footerLink, interactiveClasses.focusRing)}
                                        >
                                            {t(labelKey)}
                                        </Link>
                                    ) : (
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer nofollow"
                                            className={clsx(interactiveClasses.footerLink, interactiveClasses.focusRing)}
                                        >
                                            {t(labelKey)}
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <nav aria-label={t("footer_social_navigation")}>
                        <ul className="flex flex-wrap items-center justify-center gap-2">
                            {links.map(({key, href, icon, color, label, className}) => (
                                <li key={key}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={t("footer_external_profile_label", {
                                            label,
                                            name: siteIdentity.name
                                        })}
                                        className={clsx(
                                            interactiveClasses.iconLink,
                                            interactiveClasses.focusRing,
                                            "h-10 w-10"
                                        )}
                                    >
                                        <BrandIcon icon={icon} color={color} className={className} size={20}/>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
