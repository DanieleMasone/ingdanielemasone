import React, {useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {Award, Building2, CalendarDays, ExternalLink} from "lucide-react";
import clsx from "clsx";
import {Card} from "@/components/ui/card/Card";
import {CardContent} from "@/components/ui/cardContent/CardContent";
import {PageSection} from "@/components/ui/pageSection/PageSection";
import {SeoHead} from "@/components/seoHead/SeoHead";
import {PageGrid} from "@/components/ui/pageGrid/PageGrid";
import {CollectionToolbar} from "@/components/ui/collectionToolbar/CollectionToolbar";
import {getCollectionPaginationState} from "@/components/ui/collectionToolbar/collectionPagination";
import {getCertifications} from "@/services/portfolioService";
import {Loading} from "@/components/loading/Loading";
import {ErrorState} from "@/components/errorState/ErrorState";
import {interactiveClasses, layoutClasses, surfaceClasses} from "@/styles/commonClasses";
import {usePortfolioData} from "@/hooks/usePortfolioData";

const ITEMS_PER_PAGE = 6;
const YEAR_PATTERN = /\b(20\d{2}|19\d{2})\b/;

/**
 * Orders certifications by issue year without mutating the source data.
 *
 * Certifications with the same year preserve their dataset order so related
 * credentials, such as language levels from the same provider, stay grouped.
 *
 * @param {Array<{date: string}>} certifications - Certification entries.
 * @returns {Array<object>} Certifications sorted from newest to oldest.
 */
export const sortCertificationsByDate = (certifications) => (
    [...certifications].sort((first, second) => {
        const firstYear = parseInt(first.date.match(YEAR_PATTERN)?.[0] ?? "0", 10);
        const secondYear = parseInt(second.date.match(YEAR_PATTERN)?.[0] ?? "0", 10);

        return secondYear - firstYear;
    })
);

/**
 * Certifications component renders professional credentials.
 *
 * The page presents certifications as compact, scannable cards with issuer,
 * issue year, optional localized context, and a specific official-certificate
 * link. Pagination is kept at six cards per page so the route stays short on
 * mobile while preserving a dense two-row desktop layout.
 *
 * @component
 * @module pages/certifications/Certifications
 * @returns {JSX.Element} Rendered Certifications page section.
 */
export default function Certifications() {
    const {t} = useTranslation();
    const [page, setPage] = useState(1);
    const {data: certifications, loading, error, retry} = usePortfolioData(getCertifications, []);

    const sortedCertifications = useMemo(
        () => sortCertificationsByDate(certifications),
        [certifications]
    );
    const pagination = getCollectionPaginationState({
        page,
        totalItems: sortedCertifications.length,
        pageSize: ITEMS_PER_PAGE
    });
    const displayedCerts = sortedCertifications.slice(
        pagination.startIndex,
        pagination.endIndex
    );

    if (loading) return <Loading/>;
    if (error) return <ErrorState message={t("error_generic")} onRetry={retry}/>;

    return (
        <>
            <SeoHead pageKey="certifications" path="/certifications"/>

            <PageSection title={t("certifications_page.title")}>
                <p className={layoutClasses.sectionIntro}>{t("certifications_page.description")}</p>

                {sortedCertifications.length === 0 ? (
                    <p className={surfaceClasses.insetText}>{t("certifications_page.empty")}</p>
                ) : (
                    <>
                        <CollectionToolbar
                            page={page}
                            totalItems={sortedCertifications.length}
                            pageSize={ITEMS_PER_PAGE}
                            onPageChange={setPage}
                            itemLabel={t("certifications_page.collection_label_one")}
                            itemLabelPlural={t("certifications_page.collection_label_many")}
                        />

                        <PageGrid page={pagination.currentPage} columns={3}>
                            {displayedCerts.map((cert) => {
                                const certTitle = t(cert.nameKey);
                                const titleId = `certification-${cert.nameKey.replace(/\W+/g, "-")}`;

                                return (
                                    <Card
                                        key={`${cert.issuer}-${cert.nameKey}`}
                                        data-testid="certification-card"
                                        aria-labelledby={titleId}
                                        className="h-full min-w-0"
                                    >
                                        <CardContent className="min-w-0">
                                            <header className="flex min-w-0 gap-3">
                                                <span className={surfaceClasses.credentialIcon}>
                                                    <Award className="h-5 w-5" aria-hidden="true"/>
                                                </span>

                                                <div className="min-w-0 flex-1 space-y-3">
                                                    <h2
                                                        id={titleId}
                                                        className="break-words text-lg font-semibold leading-snug text-gray-900 dark:text-gray-100"
                                                    >
                                                        {certTitle}
                                                    </h2>

                                                    <div className="flex min-w-0 flex-wrap gap-2">
                                                        <span
                                                            className={clsx(surfaceClasses.metaBadge, "min-w-0 max-w-full gap-1.5")}>
                                                            <Building2 className="h-3.5 w-3.5" aria-hidden="true"/>
                                                            <span className="min-w-0 break-words">
                                                                {t("certifications_page.issuer")}: {cert.issuer}
                                                            </span>
                                                        </span>

                                                        <span
                                                            className={clsx(surfaceClasses.mutedMetaBadge, "min-w-0 max-w-full gap-1.5")}>
                                                            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true"/>
                                                            <span className="min-w-0 break-words">
                                                                {t("certifications_page.date")}: {cert.date}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </header>

                                            {cert.descriptionKey && (
                                                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                                                    {t(cert.descriptionKey)}
                                                </p>
                                            )}

                                            <a
                                                href={cert.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={clsx(interactiveClasses.resourceLink, interactiveClasses.focusRing, "mt-auto w-full sm:w-fit")}
                                                aria-label={`${t("certifications_page.view_certificate")}: ${certTitle}`}
                                            >
                                                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true"/>
                                                <span>{t("certifications_page.view_certificate")}</span>
                                            </a>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </PageGrid>

                    </>
                )}
            </PageSection>
        </>
    );
}
