import React from "react";
import {useTranslation} from "react-i18next";
import {SeoHead} from "@/components/seoHead/SeoHead";

/**
 * CookiePolicy component renders the cookie policy page content.
 *
 * It uses the i18next translation hook to display localized text sections about:
 * - What cookies are
 * - Types of cookies used
 * - Consent information
 * - How to manage cookies in different browsers
 * - User rights related to cookies
 *
 * The component also includes external links for cookie management instructions and a contact email.
 *
 * @component
 * @module pages/cookiePolicy/CookiePolicy
 * @returns {JSX.Element} The rendered cookie policy page.
 */
export default function CookiePolicy() {
    const {t} = useTranslation();

    return (
        <>
            <SeoHead pageKey="cookie" path="/cookie-policy"/>

            <main
                className="max-w-4xl mx-auto p-8 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-300 min-h-screen">
                <h1 className="text-4xl font-bold mb-6">{t("cookie.title")}</h1>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">{t("cookie.what_title")}</h2>
                    <p>{t("cookie.what_text")}</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">{t("cookie.types_title")}</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <strong>{t("cookie.technical_title")}:</strong> {t("cookie.technical_text")}
                        </li>
                        <li>
                            <strong>{t("cookie.analytics_title")}:</strong> {t("cookie.analytics_text")}
                        </li>
                        <li>
                            <strong>{t("cookie.profiling_title")}:</strong> {t("cookie.profiling_text")}
                        </li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">{t("cookie.consent_title")}</h2>
                    <p>{t("cookie.consent_text")}</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">{t("cookie.manage_title")}</h2>
                    <p>{t("cookie.manage_text")}</p>
                    <ul className="list-disc pl-6 space-y-1 mt-2">
                        <li><a className="underline"
                               href="https://support.google.com/chrome/answer/95647"
                               rel="noopener noreferrer"
                               target="_blank">Chrome</a></li>
                        <li><a className="underline"
                               href="https://support.mozilla.org/kb/enable-and-disable-cookies-website-preferences"
                               rel="noopener noreferrer"
                               target="_blank">Firefox</a></li>
                        <li><a className="underline"
                               href="https://support.apple.com/en-us/HT201265"
                               rel="noopener noreferrer"
                               target="_blank">Safari</a></li>
                        <li><a className="underline"
                               href="https://support.microsoft.com/help/17442"
                               rel="noopener noreferrer"
                               target="_blank">Edge</a></li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">{t("cookie.rights_title")}</h2>
                    <p>{t("cookie.rights_text")}</p>
                    <p className="mt-2">
                        {t("cookie.contact_text")}{" "}
                        <a href="mailto:masone.daniele@gmail.com"
                           className="text-blue-600 dark:text-blue-400 underline">
                            masone.daniele@gmail.com
                        </a>
                    </p>
                </section>

                <footer
                    className="border-t border-gray-300 dark:border-gray-700 pt-4 text-sm text-gray-500 dark:text-gray-600 text-center">
                    {t("cookie.last_updated")}: {t("privacy.last_date_updated")}
                </footer>
            </main>
        </>
    );
}
