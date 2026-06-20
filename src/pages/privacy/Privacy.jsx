import React from "react";
import {useTranslation} from "react-i18next";
import {SeoHead} from "@/components/seoHead/SeoHead";
import {Link} from "react-router-dom";
import clsx from "clsx";
import {interactiveClasses} from "@/styles/commonClasses";
import {LegalDocument, LegalSection} from "@/components/ui/legalDocument/LegalDocument";

/**
 * Privacy component displays the privacy policy article.
 *
 * It uses translations from `react-i18next` to render privacy information sections,
 * including owner details, data types collected, purposes, legal basis, recipients,
 * data transfer, retention, user rights, cookie policy, and change notifications.
 *
 * @component
 * @module pages/privacy/Privacy
 * @returns {JSX.Element} The rendered privacy policy page.
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
                        {t("privacy.intro_text1")}{" "}
                        <a
                            href="https://www.ingdanielemasone.com/"
                            className={linkClass}
                        >
                            https://www.ingdanielemasone.com/
                        </a>. {t("privacy.intro_text2")}
                    </p>
                </LegalSection>

                <LegalSection title={t("privacy.owner_title")}>
                    <address className="not-italic mb-2">
                        <strong>Daniele Masone</strong>
                        <br/>
                        {t("privacy.address")}
                        <br/>
                        Email:{" "}
                        <a
                            href="mailto:masone.daniele@gmail.com"
                            className={linkClass}
                        >
                            masone.daniele@gmail.com
                        </a>
                    </address>
                </LegalSection>

                <LegalSection title={t("privacy.data_types_title")}>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>
                            <strong>{t("privacy.browsing_data")}:</strong> {t("privacy.browsing_data_details")}
                        </li>
                        <li>
                            <strong>{t("privacy.voluntary_data")}:</strong> {t("privacy.voluntary_data_details")}
                        </li>
                    </ul>
                </LegalSection>

                <LegalSection title={t("privacy.purpose_title")}>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>{t("privacy.purpose_1")}</li>
                        <li>{t("privacy.purpose_2")}</li>
                        <li>{t("privacy.purpose_3")}</li>
                    </ul>
                </LegalSection>

                <LegalSection title={t("privacy.legal_basis_title")}>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>{t("privacy.legal_1")}</li>
                        <li>{t("privacy.legal_2")}</li>
                        <li>{t("privacy.legal_3")}</li>
                    </ul>
                </LegalSection>

                <LegalSection title={t("privacy.recipients_title")}>
                    <p>{t("privacy.recipients_text")}</p>
                </LegalSection>

                <LegalSection title={t("privacy.transfer_title")}>
                    <p>{t("privacy.transfer_text")}</p>
                </LegalSection>

                <LegalSection title={t("privacy.retention_title")}>
                    <p>{t("privacy.retention_text")}</p>
                </LegalSection>

                <LegalSection title={t("privacy.rights_title")}>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>{t("privacy.rights_1")}</li>
                        <li>{t("privacy.rights_2")}</li>
                        <li>{t("privacy.rights_3")}</li>
                    </ul>
                    <p>
                        {t("privacy.rights_exercise")}{" "}
                        <a
                            href="mailto:masone.daniele@gmail.com"
                            className={linkClass}
                        >
                            masone.daniele@gmail.com
                        </a>
                    </p>
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
                </LegalSection>
            </LegalDocument>
        </>
    );
}
