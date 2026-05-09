import {useTranslation} from 'react-i18next';
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
import {interactiveClasses, layoutClasses} from "@/styles/commonClasses";

const ITEMS_PER_PAGE = 4;

/**
 * Courses component.
 *
 * Displays a paginated list of programming courses, each with title, description,
 * duration, and technologies used.
 *
 * Features:
 * - Uses i18next for translations of titles, descriptions, and UI texts.
 * - Shows 4 courses per page with next/previous pagination buttons.
 * - Each course is displayed inside a Card with expandable technologies section.
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

    const displayedCourses = courses.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    if (loading) return <Loading/>;
    if (error) return <ErrorState message={t("error_generic")} onRetry={loadCourses}/>;

    return (
        <>
            <SeoHead pageKey="courses" path="/courses"/>

            <PageSection title={t("courses_page.title")}>
                {/* Pagination mobile sticky */}
                <div
                    className={layoutClasses.mobilePagination}
                >
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>

                <PageGrid page={page}>
                    {displayedCourses.map((course, idx) => (
                        <Card
                            key={idx}
                            className="relative items-start gap-4 md:flex-row"
                        >
                            <CardContent className="p-0">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-semibold">{t(course.nameKey)}</h3>

                                    <a
                                        href={course.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={clsx("block md:hidden shrink-0 ml-4 rounded-full", interactiveClasses.focusRing)}
                                    >
                                        <img
                                            src={course.image}
                                            alt={t(course.nameKey)}
                                            className="rounded-full w-16 h-16 object-cover shadow-md hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                    </a>
                                </div>

                                <ExpandableText
                                    value={t(course.descKey)}
                                    maxLines={3}
                                    className="my-2 cursor-default text-gray-700 dark:text-gray-300"
                                />

                                <p className="text-sm text-gray-500 dark:text-gray-400 font-mono mb-2">
                                    {t("courses_page.duration")}: {t(course.durationKey)}
                                </p>

                                {/* Tech */}
                                <TechDisclosure techList={course.tech} label={t("show_technologies")}/>

                            </CardContent>

                            <a
                                href={course.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={clsx("hidden md:block shrink-0 rounded-full", interactiveClasses.focusRing)}
                            >
                                <img
                                    src={course.image}
                                    alt={t(course.nameKey)}
                                    className="rounded-full w-48 h-48 object-cover shadow-md hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                />
                            </a>
                        </Card>
                    ))}
                </PageGrid>

                {/* Pagination desktop normal */}
                <div className={layoutClasses.desktopPagination}>
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
