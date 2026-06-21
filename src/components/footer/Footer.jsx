import React from 'react';
import {useTranslation} from "react-i18next";
import {BrandIcon} from "@/components/ui/brandIcon/BrandIcon";
import {getLinks} from "@/services/portfolioService";
import {Loading} from "@/components/loading/Loading";
import {ErrorState} from "@/components/errorState/ErrorState";
import clsx from "clsx";
import {interactiveClasses} from "@/styles/commonClasses";
import {usePortfolioData} from "@/hooks/usePortfolioData";
import {Link} from "react-router-dom";

/**
 * Portfolio footer with social links, resource links, and localized labels.
 *
 * Loads public profile links from the static portfolio service and shows
 * loading or error states while that data is being resolved.
 *
 * @component
 * @module components/footer/Footer
 * @returns {JSX.Element} Footer with social, legal, and developer-resource navigation.
 */
export function Footer() {
    const {t} = useTranslation();
    const {data: links, loading, error, retry} = usePortfolioData(getLinks, []);
    const currentYear = new Date().getFullYear();

    if (loading) return <Loading/>;
    if (error) return <ErrorState message={t("error_generic")} onRetry={retry}/>;

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
                <nav aria-label={t("footer_social_navigation")} className="flex flex-col items-center gap-2">
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                        {links.map(({key, href, icon, color, label, className}) => (
                            <a
                                key={key}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className={clsx(`
                                    group relative flex flex-col items-center justify-center
                                    w-10 h-10 sm:w-11 sm:h-11
                                    rounded-lg
                                    transition-transform
                                    hover:scale-110 active:scale-95
                                    hover:bg-black/5 dark:hover:bg-white/10
                                `, interactiveClasses.focusRing)}
                            >
                                <BrandIcon icon={icon} color={color} className={className} size={24} title={label}/>

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
                </nav>

                {/* COPYRIGHT */}
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-400 text-center select-none mt-2">
                    {t("footer_copyright", {year: currentYear})}
                </p>

                <nav
                    aria-label={t("footer_legal_navigation")}
                    className="mt-2 text-center text-xs text-gray-700 dark:text-gray-400"
                >
                    <Link
                        to="/privacy/"
                        className={clsx(interactiveClasses.textLink, interactiveClasses.focusRing, "mx-1 rounded")}
                    >
                        {t("privacy.title")}
                    </Link>
                    <span aria-hidden="true" className="mx-1">|</span>
                    <Link
                        to="/cookie-policy/"
                        className={clsx(interactiveClasses.textLink, interactiveClasses.focusRing, "mx-1 rounded")}
                    >
                        {t("cookie.title")}
                    </Link>
                </nav>

                {/* DEV LINKS */}
                <nav
                    aria-label={t("footer_developer_resources")}
                    className="mt-2 text-[11px] sm:text-xs text-gray-600 dark:text-gray-500 text-center"
                >
                    <a
                        href="https://danielemasone.github.io/ingdanielemasone/docs/"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className={clsx(interactiveClasses.textLink, interactiveClasses.focusRing, "mx-1 rounded")}
                    >
                        Docs
                    </a>
                    <span aria-hidden="true" className="mx-1">|</span>
                    <a
                        href="https://danielemasone.github.io/ingdanielemasone/test-coverage/"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className={clsx(interactiveClasses.textLink, interactiveClasses.focusRing, "mx-1 rounded")}
                    >
                        Coverage
                    </a>
                </nav>

            </div>
        </footer>
    );
}
