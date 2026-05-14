import {useTranslation} from "react-i18next";
import React, {useEffect, useMemo, useState} from "react";
import {Building2, CalendarDays} from "lucide-react";
import {Card} from "@/components/ui/card/Card";
import {CardContent} from "@/components/ui/cardContent/CardContent";
import {PageSection} from "@/components/ui/pageSection/PageSection";
import {ExpandableText} from "@/components/ui/expandableText/ExpandableText";
import {SeoHead} from "@/components/seoHead/SeoHead";
import {Pagination} from "@/components/ui/pagination/Pagination";
import {PageGrid} from "@/components/ui/pageGrid/PageGrid";
import {SelectableButton} from "@/components/ui/selectableButton/SelectableButton";
import TechDisclosure from "@/components/ui/techDisclosure/TechDisclosure";
import {getProjects} from "@/services/portfolioService";
import {Loading} from "@/components/loading/Loading";
import {ErrorState} from "@/components/errorState/ErrorState";
import clsx from "clsx";
import {layoutClasses, surfaceClasses} from "@/styles/commonClasses";

const ALL_COMPANIES = "all";
const ITEMS_PER_PAGE = 6;
const YEAR_PATTERN = /\b(20\d{2}|19\d{2})\b/g;
const PRESENT_PATTERN = /\bpresent\b/i;

/**
 * Parses a project period into sortable year boundaries.
 *
 * @param {string} period - Project period such as `03/2026 - Present`.
 * @param {number} currentYear - Current four-digit year used for ongoing projects.
 * @returns {{start: number, end: number, isOngoing: boolean} | null} Parsed project period.
 */
const parseProjectPeriod = (period, currentYear) => {
    const years = period.match(YEAR_PATTERN)?.map((value) => parseInt(value, 10)) ?? [];

    if (years.length === 0) return null;

    const isOngoing = PRESENT_PATTERN.test(period);
    const start = years[0];
    const end = isOngoing ? Math.max(currentYear, start) : years[1] ?? start;

    return {
        start: Math.min(start, end),
        end: Math.max(start, end),
        isOngoing
    };
};

/**
 * Orders professional projects by recency without mutating the source data.
 *
 * @param {Array<{period: string}>} projects - Professional project entries.
 * @param {number} [currentYear=new Date().getFullYear()] - Current year used for ongoing projects.
 * @returns {Array<object>} Projects sorted from most recent to oldest.
 */
export const sortProjectsByRecency = (projects, currentYear = new Date().getFullYear()) => (
    [...projects].sort((first, second) => {
        const firstPeriod = parseProjectPeriod(first.period, currentYear);
        const secondPeriod = parseProjectPeriod(second.period, currentYear);

        return (secondPeriod?.end ?? 0) - (firstPeriod?.end ?? 0)
            || (secondPeriod?.start ?? 0) - (firstPeriod?.start ?? 0);
    })
);

/**
 * Builds company filter options in the same order users see projects.
 *
 * @param {Array<{company: string}>} projects - Sorted project entries.
 * @returns {string[]} Filter values including the `all` option.
 */
export const getCompanyFilters = (projects) => [
    ALL_COMPANIES,
    ...new Set(projects.map((project) => project.company))
];

/**
 * Calculates the visible one-based item range for a paginated project list.
 *
 * @param {number} page - Current one-based page number.
 * @param {number} totalItems - Number of filtered projects.
 * @param {number} itemsPerPage - Maximum projects rendered on each page.
 * @returns {{start: number, end: number}} Visible project range.
 */
export const getVisibleRange = (page, totalItems, itemsPerPage) => {
    if (totalItems === 0) return {start: 0, end: 0};

    return {
        start: (page - 1) * itemsPerPage + 1,
        end: Math.min(page * itemsPerPage, totalItems)
    };
};

/**
 * Localizes human-readable period fragments while preserving sortable years.
 *
 * @param {string} period - Raw project period from the static dataset.
 * @param {function} t - Translation function used for localized period words.
 * @returns {string} Localized period label.
 */
export const formatProjectPeriod = (period, t) => (
    period.replace(PRESENT_PATTERN, t("projects_page.present"))
);

/**
 * Determines whether a project is currently active.
 *
 * @param {string} period - Raw project period from the static dataset.
 * @returns {boolean} Whether the project period is ongoing.
 */
export const isCurrentProject = (period) => PRESENT_PATTERN.test(period);

/**
 * Projects component renders professional delivery projects.
 *
 * The page starts with all projects so readers can scan the full professional
 * portfolio, then offers company filters and pagination to keep the page
 * compact. Each project card exposes company, period, localized impact text,
 * current-project state, and a collapsible technology list. Mobile filter and
 * card containers stay width-constrained so horizontal filter scrolling does
 * not expand the page viewport.
 *
 * @component
 * @module pages/projects/Projects
 * @returns {JSX.Element} Rendered professional projects page.
 */
export default function Projects() {
    const {t} = useTranslation();
    const currentYear = useMemo(() => new Date().getFullYear(), []);
    const [selectedCompany, setSelectedCompany] = useState(ALL_COMPANIES);
    const [page, setPage] = useState(1);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadProjects = () => {
        setLoading(true);
        setError(null);

        getProjects()
            .then(setProjects)
            .catch(setError)
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const sortedProjects = useMemo(
        () => sortProjectsByRecency(projects, currentYear),
        [currentYear, projects]
    );
    const companyFilters = useMemo(() => getCompanyFilters(sortedProjects), [sortedProjects]);
    const filteredProjects = useMemo(
        () => sortedProjects.filter((project) => selectedCompany === ALL_COMPANIES || project.company === selectedCompany),
        [selectedCompany, sortedProjects]
    );
    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
    const currentPage = Math.min(page, totalPages || 1);
    const visibleRange = getVisibleRange(currentPage, filteredProjects.length, ITEMS_PER_PAGE);
    const displayedProjects = filteredProjects.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    useEffect(() => {
        setPage(1);
    }, [selectedCompany]);

    const getCompanyCount = (company) => (
        company === ALL_COMPANIES
            ? sortedProjects.length
            : sortedProjects.filter((project) => project.company === company).length
    );
    const getCompanyLabel = (company) => (
        company === ALL_COMPANIES ? t("projects_page.all_companies") : company
    );

    if (loading) return <Loading/>;
    if (error) return <ErrorState message={t("error_generic")} onRetry={loadProjects}/>;

    return (
        <>
            <SeoHead pageKey="projects" path="/projects"/>

            <PageSection title={t("projects_title")}>
                <p className={layoutClasses.sectionIntro}>{t("projects_page.intro")}</p>

                {sortedProjects.length === 0 ? (
                    <p className={surfaceClasses.insetText}>{t("projects_page.empty")}</p>
                ) : (
                    <div className={layoutClasses.filterableLayout}>
                        <aside className={layoutClasses.filterSidebar}>
                            <div
                                role="group"
                                aria-label={t("projects_page.filter_label")}
                                className={layoutClasses.sidebarFilterBar}
                            >
                                {companyFilters.map((company) => (
                                    <SelectableButton
                                        key={company}
                                        label={`${getCompanyLabel(company)} (${getCompanyCount(company)})`}
                                        isSelected={selectedCompany === company}
                                        onClick={() => setSelectedCompany(company)}
                                        className="snap-start"
                                    />
                                ))}
                            </div>
                        </aside>

                        <div className="flex min-w-0 max-w-full flex-col gap-4">
                            <p className={layoutClasses.resultSummary} aria-live="polite">
                                {t("projects_page.results_summary", {
                                    start: visibleRange.start,
                                    end: visibleRange.end,
                                    total: filteredProjects.length
                                })}
                            </p>

                            <div className={layoutClasses.mobilePagination}>
                                <Pagination
                                    page={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setPage}
                                />
                            </div>

                            {displayedProjects.length > 0 && (
                                <PageGrid page={`${selectedCompany}-${currentPage}`} columns={2}>
                                    {displayedProjects.map((project) => {
                                        const titleId = `project-${project.name.replace(/\W+/g, "-")}`;
                                        const currentProject = isCurrentProject(project.period);

                                        return (
                                            <Card
                                                key={`${project.company}-${project.name}`}
                                                data-testid="project-card"
                                                aria-labelledby={titleId}
                                                className={clsx("h-full min-w-0", currentProject && surfaceClasses.activeTimelineCard)}
                                            >
                                                <CardContent className="flex h-full min-w-0 flex-col gap-4 p-0">
                                                    <header className="flex flex-col gap-3 border-b border-gray-200/60 pb-3 dark:border-gray-700/60">
                                                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                                                            {currentProject && (
                                                                <span className={clsx(surfaceClasses.statusBadgeBase, surfaceClasses.statusBadgeOngoing)}>
                                                                    {t("projects_page.current")}
                                                                </span>
                                                            )}

                                                            <span className={clsx(surfaceClasses.metaBadge, "min-w-0 max-w-full gap-1.5")}>
                                                                <Building2 className="h-3.5 w-3.5" aria-hidden="true"/>
                                                                <span className="min-w-0 break-words">{project.company}</span>
                                                            </span>

                                                            <span className={clsx(surfaceClasses.mutedMetaBadge, "min-w-0 max-w-full gap-1.5")}>
                                                                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true"/>
                                                                <span className="min-w-0 break-words">{formatProjectPeriod(project.period, t)}</span>
                                                            </span>
                                                        </div>

                                                        <h2
                                                            id={titleId}
                                                            className="break-words text-lg font-semibold leading-snug text-gray-900 dark:text-gray-100 md:text-xl"
                                                        >
                                                            {project.name.trim()}
                                                        </h2>
                                                    </header>

                                                    {project.type && (
                                                        <ExpandableText
                                                            value={t(`project_types.${project.type}`)}
                                                            maxLines={4}
                                                            className="text-left text-sm leading-relaxed text-gray-700 dark:text-gray-300"
                                                        />
                                                    )}

                                                    <div className="mt-auto">
                                                        <TechDisclosure techList={project.tech} label={t("show_technologies")}/>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </PageGrid>
                            )}

                            <div className={layoutClasses.desktopPagination}>
                                <Pagination
                                    page={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setPage}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </PageSection>
        </>
    );
}
