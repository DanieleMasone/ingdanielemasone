import React from "react";
import {useTranslation} from "react-i18next";
import {SeoHead} from "@/components/seoHead/SeoHead";
import {Link} from "react-router-dom";
import clsx from "clsx";
import {interactiveClasses} from "@/styles/commonClasses";
import {LegalDocument, LegalSection} from "@/components/ui/legalDocument/LegalDocument";

/**
 * Privacy notice for the portfolio's factual data flows.
 *
 * Describes static GitHub Pages hosting, local browser preferences, external
 * links, and correspondence initiated by the visitor. It intentionally avoids
 * generic analytics, marketing, and transfer claims not supported by runtime
 * evidence.
 *
 * @component
 * @module pages/privacy/Privacy
 * @returns {JSX.Element} The localized privacy notice.
 */
export default function Privacy() {
    const {t} = useTranslation();
    const linkClass = clsx(interactiveClasses.textLink, interactiveClasses.focusRing, "rounded");

    return (
        <>
            <SeoHead pageKey="privacy" path="/privacy"/>

            <LegalDocument
                title={t("privacy.title")}
                lastUpdated={`${t("privacy.last_updated")}: ${t("privacy.last_date_updated")}`}
            >
                <LegalSection title={t("privacy.intro_title")}>
                    <p>
                        {t("privacy.intro_text")}{" "}
                        <a
                            href="https://danielemasone.github.io/ingdanielemasone/"
                            className={linkClass}
                        >
                            danielemasone.github.io/ingdanielemasone/
                        </a>
                    </p>
                </LegalSection>

                <LegalSection title={t("privacy.owner_title")}>
                    <address className="not-italic">
                        <strong>Daniele Masone</strong>
                        <br/>
                        Email:{" "}
                        <a href="mailto:masone.daniele@gmail.com" className={linkClass}>
                            masone.daniele@gmail.com
                        </a>
                    </address>
                </LegalSection>

                <LegalSection title={t("privacy.processing_title")}>
                    <ul className="list-disc space-y-2 pl-6">
                        <li>
                            <strong>{t("privacy.hosting_data_title")}:</strong> {t("privacy.hosting_data_text")}
                        </li>
                        <li>
                            <strong>{t("privacy.preference_data_title")}:</strong> {t("privacy.preference_data_text")}
                        </li>
                        <li>
                            <strong>{t("privacy.correspondence_data_title")}:</strong> {t("privacy.correspondence_data_text")}
                        </li>
                        <li>
                            <strong>{t("privacy.recommendations_data_title")}:</strong> {t("privacy.recommendations_data_text")}
                        </li>
                    </ul>
                </LegalSection>

                <LegalSection title={t("privacy.hosting_title")}>
                    <p>
                        {t("privacy.hosting_text")}{" "}
                        <a
                            href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkClass}
                        >
                            {t("privacy.github_privacy_link")}
                        </a>.
                    </p>
                </LegalSection>

                <LegalSection title={t("privacy.purposes_title")}>
                    <p>{t("privacy.purposes_text")}</p>
                </LegalSection>

                <LegalSection title={t("privacy.third_parties_title")}>
                    <p>{t("privacy.third_parties_text")}</p>
                </LegalSection>

                <LegalSection title={t("privacy.retention_title")}>
                    <p>{t("privacy.retention_text")}</p>
                </LegalSection>

                <LegalSection title={t("privacy.rights_title")}>
                    <ul className="list-disc space-y-1 pl-6">
                        <li>{t("privacy.rights_1")}</li>
                        <li>{t("privacy.rights_2")}</li>
                        <li>{t("privacy.rights_3")}</li>
                    </ul>
                    <p className="mt-2">
                        {t("privacy.rights_exercise")}{" "}
                        <a href="mailto:masone.daniele@gmail.com" className={linkClass}>
                            masone.daniele@gmail.com
                        </a>
                    </p>
                    <p className="mt-2">
                        <a
                            href="https://www.garanteprivacy.it/home/autorita"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkClass}
                        >
                            {t("privacy.garante_link")}
                        </a>
                    </p>
                </LegalSection>

                <LegalSection title={t("privacy.automated_title")}>
                    <p>{t("privacy.automated_text")}</p>
                </LegalSection>

                <LegalSection title={t("privacy.cookie_title")}>
                    <p>
                        {t("privacy.cookie_text")}{" "}
                        <Link to="/cookie-policy/" className={linkClass}>
                            {t("privacy.cookie_link")}
                        </Link>.
                    </p>
                </LegalSection>

                <LegalSection title={t("privacy.changes_title")}>
                    <p>{t("privacy.changes_text")}</p>
                    <p className="mt-2">{t("privacy.translation_note")}</p>
                </LegalSection>
            </LegalDocument>
        </>
    );
}
