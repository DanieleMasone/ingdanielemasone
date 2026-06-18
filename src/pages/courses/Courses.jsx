import {useTranslation} from 'react-i18next';
import {Clock, ExternalLink, ShoppingCart} from "lucide-react";
import {Card} from "@/components/ui/card/Card";
import {CardContent} from "@/components/ui/cardContent/CardContent";
import React, {useEffect, useState} from "react";
import {PageSection} from "@/components/ui/pageSection/PageSection";
import {ExpandableText} from "@/components/ui/expandableText/ExpandableText";
import {SeoHead} from "@/components/seoHead/SeoHead";
import {PageGrid} from "@/components/ui/pageGrid/PageGrid";
import TechDisclosure from "@/components/ui/techDisclosure/TechDisclosure";
import {CollectionToolbar} from "@/components/ui/collectionToolbar/CollectionToolbar";
import {getCollectionPaginationState} from "@/components/ui/collectionToolbar/collectionPagination";
import {getCourses} from "@/services/portfolioService";
import {Loading} from "@/components/loading/Loading";
import {ErrorState} from "@/components/errorState/ErrorState";
import clsx from "clsx";
import {interactiveClasses, layoutClasses, surfaceClasses} from "@/styles/commonClasses";

const ITEMS_PER_PAGE = 6;

/**
 * Courses component.
 *
 * Displays a paginated list of programming courses, each with title, description,
 * duration, technologies used, local cover art, and clear Udemy calls to action.
 * When a direct purchase referral link is available it is rendered as the
 * primary action while the public Udemy course page remains available as a
 * secondary reference link.
 *
 * @component
 * @module pages/courses/Courses
 * @returns {JSX.Element} The rendered Courses page section.
 */
export default function Courses() {
    const {t} = useTranslation();
    const [page, setPage] = useState(1);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadCourses = () => {
        setLoading(true);
        setError(null);

        getCourses()
            .then(setCourses)
            .catch(setError)
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadCourses();
    }, []);

    const pagination = getCollectionPaginationState({
        page,
        totalItems: courses.length,
        pageSize: ITEMS_PER_PAGE
    });

    const displayedCourses = courses.slice(
        pagination.startIndex,
        pagination.endIndex
    );

    if (loading) return <Loading/>;
    if (error) return <ErrorState message={t("error_generic")} onRetry={loadCourses}/>;

    return (
        <>
            <SeoHead pageKey="courses" path="/courses"/>

            <PageSection title={t("courses_page.title")}>
                <p className={layoutClasses.sectionIntro}>{t("courses_page.description")}</p>

                <CollectionToolbar
                    page={page}
                    totalItems={courses.length}
                    pageSize={ITEMS_PER_PAGE}
                    onPageChange={setPage}
                    itemLabel={t("courses_page.collection_label_one")}
                    itemLabelPlural={t("courses_page.collection_label_many")}
                />

                <PageGrid page={pagination.currentPage} columns={3}>
                    {displayedCourses.map((course) => {
                        const courseTitle = t(course.nameKey);
                        const titleId = `course-${course.nameKey.replace(/\W+/g, "-")}`;

                        return (
                            <Card
                                key={course.nameKey}
                                data-testid="course-card"
                                aria-labelledby={titleId}
                                className="h-full"
                            >
                                <CardContent className="flex h-full flex-col gap-4 p-0">
                                    <div className={surfaceClasses.mediaFrame}>
                                        <img
                                            src={course.image}
                                            alt=""
                                            className={surfaceClasses.mediaImage}
                                            loading="lazy"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-col gap-2">
                                            <h2
                                                id={titleId}
                                                className="text-lg font-semibold leading-snug text-gray-900 dark:text-gray-100"
                                            >
                                                {courseTitle}
                                            </h2>

                                            <span className={clsx(surfaceClasses.mutedMetaBadge, "w-fit gap-1.5")}>
                                                <Clock className="h-3.5 w-3.5" aria-hidden="true"/>
                                                <span>
                                                    {t("courses_page.duration")}: {t(course.durationKey)}
                                                </span>
                                            </span>
                                        </div>

                                        <ExpandableText
                                            value={t(course.descKey)}
                                            maxLines={4}
                                            className="text-left text-sm leading-relaxed text-gray-700 dark:text-gray-300"
                                        />
                                    </div>

                                    <div className="mt-auto flex flex-col gap-4">
                                        <TechDisclosure techList={course.tech} label={t("show_technologies")}/>

                                        <div className={course.payLink ? layoutClasses.courseActionGroup : "flex flex-col"}>
                                            {course.payLink && (
                                                <a
                                                    href={course.payLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={clsx(interactiveClasses.coursePrimaryLink, interactiveClasses.focusRing)}
                                                    aria-label={`${t("courses_page.buy_link")} - ${courseTitle}`}
                                                >
                                                    <ShoppingCart className="h-4 w-4" aria-hidden="true"/>
                                                    <span>{t("courses_page.buy_link")}</span>
                                                </a>
                                            )}

                                            <a
                                                href={course.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={clsx(interactiveClasses.resourceLink, "w-full", interactiveClasses.focusRing)}
                                                aria-label={`${t("courses_page.udemy_link")} - ${courseTitle}`}
                                            >
                                                <ExternalLink className="h-4 w-4" aria-hidden="true"/>
                                                <span>{t("courses_page.udemy_link")}</span>
                                            </a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </PageGrid>

            </PageSection>
        </>
    );
}
