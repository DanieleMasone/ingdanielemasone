import {useTranslation} from 'react-i18next';
import {useEffect, useState} from 'react';

/**
 * NotFound component – displays a custom 404 page with support for light/dark mode.
 *
 * The content includes:
 * - A title with the error code
 * - A brief error description
 * - A link to return to the home page
 *  *
 * The section features a fade-in effect managed via `useState` and `useEffect`.
 * Strings are localized using `react-i18next`.
 *
 * @component
 * @module components/notFound/NotFound
 *
 * @returns {JSX.Element} The rendered 404 page
 */
export function NotFound() {
    const {t} = useTranslation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="px-4 py-8 sm:px-6 md:px-8 max-w-4xl mx-auto">
            <div
                data-testid="not-found"
                className={`bg-gradient-to-br from-red-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg text-center transition-opacity duration-700 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
                    404 - {t("notfound_title")}
                </h1>
                <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-6">
                    {t("notfound_description")}
                </p>
                <a
                    href="/ingdanielemasone/"
                    className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition-colors"
                >
                    {t("go_home")}
                </a>
            </div>
        </section>
    );
}
