import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Card} from "@/components/ui/card/Card";
import {PageSection} from "@/components/ui/pageSection/PageSection";
import {SeoHead} from "@/components/seoHead/SeoHead";
import {BrandIcon, linkedinIcon} from "@/components/footer/Footer";
import {Pagination} from "@/components/ui/pagination/Pagination";
import {PageGrid} from "@/components/ui/pageGrid/PageGrid";
import {ExpandableText} from "@/components/ui/expandableText/ExpandableText";
import {CardContent} from "@/components/ui/cardContent/CardContent";
import {getTestimonials} from "@/services/portfolio.service";
import {ErrorState, Loading} from "@/App";

const ITEMS_PER_PAGE = 4;

/**
 * Testimonials component renders a paginated list of testimonial cards.
 * Each card displays the name, role, and a collapsible quote of a person.
 * Pagination allows browsing through all testimonials, showing a fixed number per page.
 *
 * Uses translations for all textual content via react-i18next.
 *
 * @component
 * @module pages/testimonials/Testimonials
 * @returns {JSX.Element} The Testimonials section with pagination and collapsible testimonial cards.
 */
export default function Testimonials() {
    const {t} = useTranslation();
    const [page, setPage] = useState(1);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadTestimonials = () => {
        setLoading(true);
        setError(null);

        getTestimonials()
            .then(setTestimonials)
            .catch(setError)
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadTestimonials();
    }, []);

    const totalPages = Math.ceil(testimonials.length / ITEMS_PER_PAGE);

    const displayedTestimonials = testimonials.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    if (loading) return <Loading/>;
    if (error) return <ErrorState message="Failed to load testimonials" onRetry={loadTestimonials}/>;

    return (
        <>
            <SeoHead pageKey="testimonials" path="/testimonials"/>

            <PageSection title={t("testimonials_page.title")}>
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
                    {displayedTestimonials.map((texts, idx) => (
                        <Card
                            key={idx}
                            data-testid="testimonial-card"
                            className="relative w-full p-5 sm:p-6 border border-gray-200/60
                                       dark:border-gray-700/60 bg-white/60 dark:bg-gray-800/40 backdrop-blur-md
                                       rounded-xl hover:shadow-lg transition-all duration-300
                                       flex flex-col md:flex-row items-start gap-4"
                        >
                            <CardContent className="p-2">
                                {/* Header */}
                                <div
                                    className="flex-shrink-0 mb-3 pb-1 border-b border-gray-200/50 dark:border-gray-700/50 px-3 pt-3">
                                    <div className="flex items-center gap-2.5">
                                        <img
                                            src={`https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(t(texts.nameKey))}`}
                                            alt={`${t(texts.nameKey)} avatar`}
                                            className="w-10 h-10 rounded-full ring-2 ring-gray-200 dark:ring-gray-600 bg-white shadow-md"
                                        />
                                        <div className="flex flex-col">
                                            <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-1.5 text-sm sm:text-base">
                                                {t(texts.nameKey)}
                                                {texts.linkedinUrl && (
                                                    <a href={texts.linkedinUrl} target="_blank"
                                                       rel="noopener noreferrer">
                                                        <BrandIcon icon={linkedinIcon} color="#0A66C2" size={18}/>
                                                    </a>
                                                )}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                                {t(texts.roleKey)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Quote */}
                                <div className="flex flex-1 justify-center items-center px-3 py-4">
                                    <ExpandableText
                                        value={t(texts.quoteKey)}
                                        maxLines={4}
                                        className="text-center italic text-sm md:text-base text-gray-800 dark:text-gray-200
                                                 leading-snug font-light tracking-tight px-3 py-3 bg-gradient-to-b
                                                 from-transparent via-white/70 to-transparent dark:via-gray-800/50
                                                 rounded-xl backdrop-blur-sm shadow-inner border border-gray-100/40 dark:border-gray-700/40"
                                    />
                                </div>
                            </CardContent>

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
