import {useTranslation} from 'react-i18next';
import {Clock, ExternalLink} from "lucide-react";
import {Card} from "@/components/ui/card/Card";
import {CardContent} from "@/components/ui/cardContent/CardContent";
import React, {useEffect, useState} from "react";
import {PageSection} from "@/components/ui/pageSection/PageSection";
import {ExpandableText} from "@/components/ui/expandableText/ExpandableText";
import {SeoHead} from "@/components/seoHead/SeoHead";
import {Pagination} from "@/components/ui/pagination/Pagination";
import {PageGrid} from "@/components/ui/pageGrid/PageGrid";
import TechDisclosure from "@/components/ui/techDisclosure/TechDisclosure";
import {getCourses} from "@/services/portfolioService";
import {Loading} from "@/components/loading/Loading";
import {ErrorState} from "@/components/errorState/ErrorState";
import clsx from "clsx";
import {interactiveClasses, layoutClasses, surfaceClasses} from "@/styles/commonClasses";

const ITEMS_PER_PAGE = 6;

/**
 * Calculates the visible course range for the current page.
 *
 * @param {number} page - Current one-based page number.
 * @param {number} totalItems - Total number of courses.
 * @param {number} itemsPerPage - Maximum courses shown on each page.
 * @returns {{start: number, end: number}} Visible item range.
 */
const getVisibleRange = (page, totalItems, itemsPerPage) => {
    if (totalItems === 0) return {start: 0, end: 0};

    return {
        start: (page - 1) * itemsPerPage + 1,
        end: Math.min(page * itemsPerPage, totalItems)
    };
};

/**
 * Courses component.
 *
 * Displays a paginated list of programming courses, each with title, description,
 * duration, technologies used, local cover art, and a clear Udemy call to action.
 * The page starts with a concise introduction and renders the 16:9 cover art
 * full-bleed so thumbnails stay readable across mobile and desktop cards.
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

    const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);
    const currentPage = Math.min(page, totalPages || 1);
    const visibleRange = getVisibleRange(currentPage, courses.length, ITEMS_PER_PAGE);

    const displayedCourses = courses.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    if (loading) return <Loading/>;
    if (error) return <ErrorState message={t("error_generic")} onRetry={loadCourses}/>;

    return (
        <>
            <SeoHead pageKey="courses" path="/courses"/>

            <PageSection title={t("courses_page.title")}>
                <p className={layoutClasses.sectionIntro}>{t("courses_page.description")}</p>

                {courses.length > 0 && (
                    <p className={layoutClasses.resultSummary} aria-live="polite">
                        {t("courses_page.results_summary", {
                            start: visibleRange.start,
                            end: visibleRange.end,
                            total: courses.length
                        })}
                    </p>
                )}

                {/* Pagination mobile sticky */}
                <div
                    className={layoutClasses.mobilePagination}
                >
                    <Pagination
                        page={currentPage}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>

                <PageGrid page={currentPage} columns={3}>
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

                                        <a
                                            href={course.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={clsx(interactiveClasses.resourceLink, interactiveClasses.focusRing)}
                                            aria-label={`${t("courses_page.udemy_link")} - ${courseTitle}`}
                                        >
                                            <ExternalLink className="h-4 w-4" aria-hidden="true"/>
                                            <span>{t("courses_page.udemy_link")}</span>
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </PageGrid>

                {/* Pagination desktop normal */}
                <div className={layoutClasses.desktopPagination}>
                    <Pagination
                        page={currentPage}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>
            </PageSection>
        </>
    );
}
