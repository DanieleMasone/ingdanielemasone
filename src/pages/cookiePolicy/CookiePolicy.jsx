import React from "react";
import {useTranslation} from "react-i18next";
import {SeoHead} from "@/components/seoHead/SeoHead";
import clsx from "clsx";
import {interactiveClasses} from "@/styles/commonClasses";
import {LegalDocument, LegalSection} from "@/components/ui/legalDocument/LegalDocument";

/**
 * Cookie and local-storage notice for the portfolio.
 *
 * Documents the exact browser storage used for language and theme preferences,
 * the absence of app-set tracking cookies, and how visitors can clear their
 * locally stored choices.
 *
 * @component
 * @module pages/cookiePolicy/CookiePolicy
 * @returns {JSX.Element} The localized storage notice.
 */
export default function CookiePolicy() {
    const {t} = useTranslation();
    const linkClass = clsx(interactiveClasses.textLink, interactiveClasses.focusRing, "rounded");

    return (
        <>
            <SeoHead pageKey="cookie" path="/cookie-policy"/>

            <LegalDocument
                title={t("cookie.title")}
                lastUpdated={`${t("cookie.last_updated")}: ${t("privacy.last_date_updated")}`}
            >
                <LegalSection title={t("cookie.scope_title")}>
                    <p>{t("cookie.scope_text")}</p>
                </LegalSection>

                <LegalSection title={t("cookie.storage_title")}>
                    <ul className="list-disc space-y-2 pl-6">
                        <li>
                            <strong><code>i18nextLng</code>:</strong> {t("cookie.language_storage_text")}
                        </li>
                        <li>
                            <strong><code>theme</code>:</strong> {t("cookie.theme_storage_text")}
                        </li>
                    </ul>
                </LegalSection>

                <LegalSection title={t("cookie.tracking_title")}>
                    <p>{t("cookie.tracking_text")}</p>
                </LegalSection>

                <LegalSection title={t("cookie.manage_title")}>
                    <p>{t("cookie.manage_text")}</p>
                </LegalSection>

                <LegalSection title={t("cookie.external_title")}>
                    <p>{t("cookie.external_text")}</p>
                    <p className="mt-2">
                        {t("cookie.contact_text")}{" "}
                        <a href="mailto:masone.daniele@gmail.com" className={linkClass}>
                            masone.daniele@gmail.com
                        </a>
                    </p>
                </LegalSection>
            </LegalDocument>
        </>
    );
}
