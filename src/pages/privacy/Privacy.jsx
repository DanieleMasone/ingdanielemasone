import React from "react";
import {useTranslation} from "react-i18next";
import {SeoHead} from "@/components/seoHead/SeoHead";

/**
 * Privacy component displays the privacy policy page.
 *
 * It uses translations from `react-i18next` to render privacy information sections,
 * including owner details, data types collected, purposes, legal basis, recipients,
 * data transfer, retention, user rights, cookie policy, and change notifications.
 *
 * @component
 * @module pages/privacy/Privacy
 * @returns {JSX.Element} The rendered privacy policy page
 */
export default function Privacy() {
    const {t} = useTranslation();

    return (
        <>
            <SeoHead pageKey="privacy" path="/privacy"/>

            <main
                className="max-w-4xl mx-auto p-8 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-300 min-h-screen">
                <h1 className="text-4xl font-bold mb-6">{t("privacy.title")}</h1>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">{t("privacy.intro_title")}</h2>
                    <p>
                        {t("privacy.intro_text1")}{" "}
                        <a
                            href="https://www.ingdanielemasone.com/"
                            className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
                        >
                            https://www.ingdanielemasone.com/
                        </a>. {t("privacy.intro_text2")}
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">{t("privacy.owner_title")}</h2>
                    <address className="not-italic mb-2">
                        <strong>Daniele Masone</strong>
                        <br/>
                        {t("privacy.address")}
                        <br/>
                        Email:{" "}
                        <a
                            href="mailto:masone.daniele@gmail.com"
                            className="text-blue-600 dark:text-blue-400 underline"
                        >
                            masone.daniele@gmail.com
                        </a>
                    </address>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">{t("privacy.data_types_title")}</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>
                            <strong>{t("privacy.browsing_data")}:</strong> {t("privacy.browsing_data_details")}
                        </li>
                        <li>
                            <strong>{t("privacy.voluntary_data")}:</strong> {t("privacy.voluntary_data_details")}
                        </li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">{t("privacy.purpose_title")}</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>{t("privacy.purpose_1")}</li>
                        <li>{t("privacy.purpose_2")}</li>
                        <li>{t("privacy.purpose_3")}</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">{t("privacy.legal_basis_title")}</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>{t("privacy.legal_1")}</li>
                        <li>{t("privacy.legal_2")}</li>
                        <li>{t("privacy.legal_3")}</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">{t("privacy.recipients_title")}</h2>
                    <p>{t("privacy.recipients_text")}</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">{t("privacy.transfer_title")}</h2>
                    <p>{t("privacy.transfer_text")}</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">{t("privacy.retention_title")}</h2>
                    <p>{t("privacy.retention_text")}</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">{t("privacy.rights_title")}</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>{t("privacy.rights_1")}</li>
                        <li>{t("privacy.rights_2")}</li>
                        <li>{t("privacy.rights_3")}</li>
                    </ul>
                    <p>
                        {t("privacy.rights_exercise")}{" "}
                        <a
                            href="mailto:masone.daniele@gmail.com"
                            className="text-blue-600 dark:text-blue-400 underline"
                        >
                            masone.daniele@gmail.com
                        </a>
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">{t("privacy.cookie_title")}</h2>
                    <p>
                        {t("privacy.cookie_text")}{" "}
                        <a
                            href="/cookie-policy"
                            className="text-blue-600 dark:text-blue-400 underline"
                        >
                            {t("privacy.cookie_link")}
                        </a>.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">{t("privacy.changes_title")}</h2>
                    <p>{t("privacy.changes_text")}</p>
                </section>

                <footer
                    className="border-t border-gray-300 dark:border-gray-700 pt-4 text-sm text-gray-500 dark:text-gray-600 text-center">
                    {t("privacy.last_updated")}: {t("privacy.last_date_updated")}
                </footer>
            </main>
        </>
    );
}
