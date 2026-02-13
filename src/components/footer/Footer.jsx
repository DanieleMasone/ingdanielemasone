import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {BrandIcon} from "@/components/ui/brandIcon/BrandIcon";
import {getLinks} from "@/services/portfolio.service";
import {Loading} from "@/components/loading/Loading";
import {ErrorState} from "@/components/errorState/ErrorState";

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
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadLinks = () => {
        setLoading(true);
        setError(null);

        getLinks()
            .then(setLinks)
            .catch(setError)
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadLinks();
    }, []);

    if (loading) return <Loading/>;
    if (error) return <ErrorState message={t("error_generic")} onRetry={loadLinks}/>;

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
