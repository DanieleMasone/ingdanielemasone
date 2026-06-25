import React from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import clsx from "clsx";
import {BrandIcon} from "@/components/ui/brandIcon/BrandIcon";
import {getLinks} from "@/services/portfolioService";
import {usePortfolioData} from "@/hooks/usePortfolioData";
import {interactiveClasses, layoutClasses} from "@/styles/commonClasses";

const RESOURCE_LINKS = [
    {
        key: "docs",
        labelKey: "footer_docs_link",
        href: "https://danielemasone.github.io/ingdanielemasone/docs/"
    },
    {
        key: "coverage",
        labelKey: "footer_coverage_link",
        href: "https://danielemasone.github.io/ingdanielemasone/test-coverage/"
    }
];

/**
 * Portfolio footer with resilient legal, social, and engineering-resource links.
 *
 * Legal and resource navigation renders immediately because those links are part
 * of the site structure. Social links remain optional profile data: while they
 * load or fail, the footer keeps its layout and exposes a quiet status message
 * to assistive technologies instead of replacing the whole footer.
 *
 * @component
 * @module components/footer/Footer
 * @returns {JSX.Element} Footer with identity, social, legal, and resource navigation.
 */
export function Footer() {
    const {t} = useTranslation();
    const {data: links, loading, error} = usePortfolioData(getLinks, []);
    const currentYear = new Date().getFullYear();
    const socialStatus = loading
        ? t("footer_social_loading")
        : error
            ? t("footer_social_unavailable")
            : null;

    return (
        <footer
            role="contentinfo"
            className="
                w-full border-t border-gray-200/80 bg-white/80 text-gray-800
                shadow-[0_-1px_10px_rgba(15,23,42,0.05)] backdrop-blur-md
                transition-colors duration-300 dark:border-gray-800/80
                dark:bg-gray-950/80 dark:text-gray-200
            "
        >
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 md:px-12">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="text-center md:text-left">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            Daniele Masone
                        </p>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {t("footer_copyright", {year: currentYear})}
                        </p>
                    </div>

                    <nav aria-label={t("footer_social_navigation")}>
                        {socialStatus && (
                            <p className={layoutClasses.screenReaderOnly} role="status">
                                {socialStatus}
                            </p>
                        )}

                        {links.length > 0 && (
                            <ul className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
                                {links.map(({key, href, icon, color, label, className}) => (
                                    <li key={key}>
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={t("footer_external_profile_label", {label})}
                                            className={clsx(
                                                interactiveClasses.iconLink,
                                                interactiveClasses.focusRing,
                                                "h-10 w-10"
                                            )}
                                        >
                                            <BrandIcon icon={icon} color={color} className={className} size={20} title={label}/>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </nav>
                </div>

                <div className="flex flex-col gap-3 border-t border-gray-200/70 pt-4 dark:border-gray-800/70 md:flex-row md:items-center md:justify-between">
                    <nav
                        aria-label={t("footer_legal_navigation")}
                        className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm md:justify-start"
                    >
                        <Link
                            to="/privacy/"
                            className={clsx(interactiveClasses.textLink, interactiveClasses.focusRing, "rounded")}
                        >
                            {t("privacy.title")}
                        </Link>
                        <Link
                            to="/cookie-policy/"
                            className={clsx(interactiveClasses.textLink, interactiveClasses.focusRing, "rounded")}
                        >
                            {t("cookie.title")}
                        </Link>
                    </nav>

                    <nav
                        aria-label={t("footer_developer_resources")}
                        className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm md:justify-end"
                    >
                        {RESOURCE_LINKS.map(({key, labelKey, href}) => (
                            <a
                                key={key}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                className={clsx(interactiveClasses.textLink, interactiveClasses.focusRing, "rounded")}
                            >
                                {t(labelKey)}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
}
