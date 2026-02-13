import {Award, ExternalLink} from "lucide-react";
import {useTranslation} from "react-i18next";
import {Card} from "@/components/ui/card/Card";
import {CardContent} from "@/components/ui/cardContent/CardContent";
import {PageSection} from "@/components/ui/pageSection/PageSection";
import {SeoHead} from "@/components/seoHead/SeoHead";
import React, {useEffect, useState} from "react";
import {Pagination} from "@/components/ui/pagination/Pagination";
import {PageGrid} from "@/components/ui/pageGrid/PageGrid";
import {getCertifications} from "@/services/portfolio.service";
import {Loading} from "@/components/loading/Loading";
import {ErrorState} from "@/components/errorState/ErrorState";

const ITEMS_PER_PAGE = 4;

/**
 * Certifications component.
 *
 * Displays a paginated list of professional certifications, each with title, issuer, and date.
 *
 * Features:
 * - Uses i18next for translations.
 * - Shows 4 certifications per page with next/previous pagination buttons.
 * - Includes smooth animations via Framer Motion for entry transitions.
 *
 * @component
 * @module pages/certifications/Certifications
 * @returns {JSX.Element} The rendered Certifications page section.
 */
export default function Certifications() {
    const {t} = useTranslation();
    const [page, setPage] = useState(1);
    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadCertifications = () => {
        setLoading(true);
        setError(null);

        getCertifications()
            .then(setCertifications)
            .catch(setError)
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadCertifications();
    }, []);

    const totalPages = Math.ceil(certifications.length / ITEMS_PER_PAGE);

    const displayedCerts = certifications.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    if (loading) return <Loading/>;
    if (error) return <ErrorState message={t("error_generic")} onRetry={loadCertifications}/>;

    return (
        <>
            <SeoHead pageKey="certifications" path="/certifications"/>

            <PageSection title={t("certifications_page.title")}>
                {/* Pagination mobile sticky */}
                <div
                    className="md:hidden sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md py-2 mb-4 border-b border-gray-200 dark:border-gray-700"
                >
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>

                <PageGrid page={page}>
                    {displayedCerts.map((cert, idx) => (
                        <Card
                            key={idx}
                            className="relative w-full p-5 sm:p-6 border border-gray-200/60
                                       dark:border-gray-700/60 bg-white/60 dark:bg-gray-800/40 backdrop-blur-md
                                       rounded-xl hover:shadow-lg transition-all duration-300
                                       flex flex-col md:flex-row items-start gap-4"
                        >
                            {/* Icon */}
                            <div className="absolute -top-3 right-4 w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-blue-200
                                          dark:from-blue-900/40 dark:to-blue-800/40 flex items-center justify-center shadow-lg z-20 ring-4 ring-background">
                                <Award className="w-6 h-6 text-blue-600 dark:text-blue-400"/>
                            </div>

                            <CardContent className="p-0 flex flex-col gap-3">
                                {/* Header */}
                                <div className="space-y-1.5 mb-4">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                                        {t(cert.nameKey)}
                                    </h3>
                                    <p className="text-sm font-mono text-gray-600 dark:text-gray-400 leading-tight">
                                        {cert.issuer}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-500 font-mono">
                                        {cert.date}
                                    </p>
                                </div>

                                {/* CTA */}
                                <a
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400
                                               hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300
                                               hover:underline underline-offset-4 hover:shadow-md hover:shadow-blue-100 dark:hover:shadow-blue-900/50
                                               px-3 py-2 rounded-lg border border-blue-200/50 dark:border-blue-800/50 hover:border-blue-300"
                                >
                                    {t("certifications_page.view_certificate")}
                                    <ExternalLink
                                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"/>
                                </a>
                            </CardContent>

                            {/* Hover overlay */}
                            <div
                                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100
                                           transition-all duration-500 bg-gradient-to-br from-blue-50/80 via-transparent to-transparent
                                         dark:from-blue-900/30 rounded-xl backdrop-blur-sm"
                            />
                        </Card>
                    ))}
                </PageGrid>

                {/* Pagination desktop normal */}
                <div className="hidden md:block mt-4">
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>
            </PageSection>
        </>
    );
}
