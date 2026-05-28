import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import clsx from "clsx";
import {interactiveClasses} from "@/styles/commonClasses";
import {useTranslation} from "react-i18next";


/**
 * Localized cookie consent notice for the portfolio.
 *
 * Behavior:
 * - Checks localStorage for a `cookieConsent` timestamp.
 * - Shows the banner only when consent is missing.
 * - Stores the acceptance timestamp and hides the banner after confirmation.
 * - Exposes localized region, link, and action labels for assistive technology.
 *
 * @component
 * @module components/ui/cookieBanner/CookieBanner
 * @returns {JSX.Element|null} The cookie consent notice or null if consent is already given.
 */
export function CookieBanner() {
    const {t} = useTranslation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Client-side only check
        if (typeof window === 'undefined') return;

        const consent = localStorage.getItem('cookieConsent');
        if (!consent) setVisible(true);
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookieConsent', new Date().toISOString());  // Timestamp
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <section
            role="region"
            aria-live="polite"
            aria-label={t("cookie_banner.label")}
            className="fixed bottom-0 left-0 right-0 bg-gray-200 text-gray-900 p-4 flex flex-col md:flex-row justify-between items-center shadow-lg z-50
               dark:bg-gray-900 dark:text-white"
        >
            <p className="mb-2 md:mb-0 max-w-xl">
                {t("cookie_banner.message_prefix")}{" "}
                <Link
                    to="/privacy/"
                    className={clsx(interactiveClasses.textLink, interactiveClasses.focusRing, "rounded")}
                >
                    {t("cookie_banner.privacy_link")}
                </Link>.
            </p>
            <button
                type="button"
                onClick={acceptCookies}
                className={clsx(
                    "rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
                    interactiveClasses.focusRing
                )}
            >
                {t("cookie_banner.accept")}
            </button>
        </section>
    );

}
