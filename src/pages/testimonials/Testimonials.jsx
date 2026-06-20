import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Quote} from "lucide-react";
import {Card} from "@/components/ui/card/Card";
import {PageSection} from "@/components/ui/pageSection/PageSection";
import {SeoHead} from "@/components/seoHead/SeoHead";
import {linkedinIcon} from "@/consts/Consts";
import {PageGrid} from "@/components/ui/pageGrid/PageGrid";
import {ExpandableText} from "@/components/ui/expandableText/ExpandableText";
import {CardContent} from "@/components/ui/cardContent/CardContent";
import {CollectionToolbar} from "@/components/ui/collectionToolbar/CollectionToolbar";
import {getCollectionPaginationState} from "@/components/ui/collectionToolbar/collectionPagination";
import {getTestimonials} from "@/services/portfolioService";
import {Loading} from "@/components/loading/Loading";
import {ErrorState} from "@/components/errorState/ErrorState";
import {BrandIcon} from "@/components/ui/brandIcon/BrandIcon";
import clsx from "clsx";
import {interactiveClasses, layoutClasses, surfaceClasses} from "@/styles/commonClasses";
import {usePortfolioData} from "@/hooks/usePortfolioData";

const ITEMS_PER_PAGE = 6;

/**
 * Creates a compact local avatar label from a testimonial author name.
 *
 * @param {string} name - Localized testimonial author name.
 * @returns {string} One or two initials used in the visual avatar.
 */
const getInitials = (name) => {
    const initials = name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("");

    return initials || "?";
};

/**
 * Testimonials component renders a paginated list of testimonial cards.
 * The page starts with a concise introduction for consistency with the other
 * portfolio sections. Each card displays the name, role, LinkedIn profile, and
 * a readable collapsible quote inside semantic blockquote markup.
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
    const {data: testimonials, loading, error, retry} = usePortfolioData(getTestimonials, []);

    const pagination = getCollectionPaginationState({
        page,
        totalItems: testimonials.length,
        pageSize: ITEMS_PER_PAGE
    });

    const displayedTestimonials = testimonials.slice(
        pagination.startIndex,
        pagination.endIndex
    );

    if (loading) return <Loading/>;
    if (error) return <ErrorState message={t("error_generic")} onRetry={retry}/>;

    return (
        <>
            <SeoHead pageKey="testimonials" path="/testimonials"/>

            <PageSection title={t("testimonials_page.title")}>
                <p className={layoutClasses.sectionIntro}>{t("testimonials_page.description")}</p>

                {testimonials.length === 0 ? (
                    <p className={surfaceClasses.insetText}>{t("testimonials_page.empty")}</p>
                ) : (
                    <>
                        <CollectionToolbar
                            page={page}
                            totalItems={testimonials.length}
                            pageSize={ITEMS_PER_PAGE}
                            onPageChange={setPage}
                            itemLabel={t("testimonials_page.collection_label_one")}
                            itemLabelPlural={t("testimonials_page.collection_label_many")}
                        />

                        <PageGrid page={pagination.currentPage} columns={3}>
                    {displayedTestimonials.map((texts) => {
                        const testimonialName = t(texts.nameKey);
                        const titleId = `testimonial-${texts.nameKey.replace(/\W+/g, "-")}`;

                        return (
                            <Card
                                key={texts.nameKey}
                                data-testid="testimonial-card"
                                aria-labelledby={titleId}
                                className="h-full"
                            >
                                <CardContent>
                                    <header
                                        className="flex items-start gap-3 border-b border-gray-200/60 pb-3 dark:border-gray-700/60"
                                    >
                                        <span className={surfaceClasses.initialAvatar} aria-hidden="true">
                                            {getInitials(testimonialName)}
                                        </span>

                                        <div className="min-w-0 flex-1">
                                            <h2
                                                id={titleId}
                                                className="break-words text-base font-semibold leading-snug text-gray-900 dark:text-white"
                                            >
                                                {testimonialName}
                                            </h2>
                                            <p className="mt-1 text-sm font-medium leading-snug text-gray-600 dark:text-gray-400">
                                                {t(texts.roleKey)}
                                            </p>
                                        </div>

                                        {texts.linkedinUrl && (
                                            <a
                                                href={texts.linkedinUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`${t("testimonials_page.linkedin_label")} - ${testimonialName}`}
                                                className={clsx(interactiveClasses.iconLink, interactiveClasses.focusRing)}
                                            >
                                                <BrandIcon icon={linkedinIcon} color="#0A66C2" size={18}/>
                                            </a>
                                        )}
                                    </header>

                                    <blockquote
                                        className={clsx(surfaceClasses.testimonialQuote, "flex flex-1 flex-col gap-3")}>
                                        <Quote className="h-5 w-5 text-blue-500 dark:text-blue-300" aria-hidden="true"/>
                                        <ExpandableText
                                            value={t(texts.quoteKey)}
                                            maxLines={5}
                                            className="text-left text-sm leading-relaxed text-gray-800 dark:text-gray-200"
                                        />
                                    </blockquote>
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
