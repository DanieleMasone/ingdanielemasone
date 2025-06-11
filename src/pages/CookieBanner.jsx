import React, {useEffect, useState} from 'react';

function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookieConsent', 'true');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div
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
        </div>
    );

}

export default CookieBanner;
