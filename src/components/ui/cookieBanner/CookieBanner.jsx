import React, {useEffect, useState} from 'react';


/**
 * Cookie consent banner for the portfolio.
 *
 * Behavior:
 * - Checks localStorage for a `cookieConsent` timestamp.
 * - Shows the banner only when consent is missing.
 * - Stores the acceptance timestamp and hides the banner after confirmation.
 *
 * @component
 * @module components/ui/cookieBanner/CookieBanner
 * @returns {JSX.Element|null} The cookie consent banner or null if consent is already given.
 */
export function CookieBanner() {
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
            role="banner"
            aria-live="polite"
            aria-label="Cookie consent banner"
            className="fixed bottom-0 left-0 right-0 bg-gray-200 text-gray-900 p-4 flex flex-col md:flex-row justify-between items-center shadow-lg z-50
               dark:bg-gray-900 dark:text-white"
        >
            <p className="mb-2 md:mb-0 max-w-xl">
                Questo sito utilizza cookie per migliorare l’esperienza utente. Continuando, accetti la nostra&nbsp;
                <a href="/privacy" className="underline text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600">
                    Politica sulla Privacy
                </a>.
            </p>
            <button
                onClick={acceptCookies}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors
                 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
                Accetta
            </button>
        </section>
    );

}
