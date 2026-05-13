import React, {useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {BookOpen, ExternalLink, ShieldCheck} from "lucide-react";
import clsx from "clsx";
import {SeoHead} from "@/components/seoHead/SeoHead";
import {PageSection} from "@/components/ui/pageSection/PageSection";
import {PageGrid} from "@/components/ui/pageGrid/PageGrid";
import {Card} from "@/components/ui/card/Card";
import {CardContent} from "@/components/ui/cardContent/CardContent";
import {SelectableButton} from "@/components/ui/selectableButton/SelectableButton";
import {Pagination} from "@/components/ui/pagination/Pagination";
import TechDisclosure from "@/components/ui/techDisclosure/TechDisclosure";
import {Loading} from "@/components/loading/Loading";
import {ErrorState} from "@/components/errorState/ErrorState";
import {getGithubProjects} from "@/services/portfolioService";
import {interactiveClasses, layoutClasses, surfaceClasses} from "@/styles/commonClasses";
import * as icons from "simple-icons";

const CATEGORY_ORDER = ["all", "frontend", "backend"];
const ITEMS_PER_PAGE = 3;

const RESOURCE_ICONS = {
    repository: icons.siGithub,
    live: ExternalLink,
    documentation: BookOpen,
    coverage: ShieldCheck
};

/**
 * Builds the available repository filters while keeping known categories in a
 * stable visual order and appending any future categories from the dataset.
 *
 * @param {Array<{category: string}>} projects - Loaded GitHub project entries.
 * @returns {string[]} Ordered category filters including the `all` option.
 */
const getCategoryFilters = (projects) => {
    const categories = new Set(projects.map((project) => project.category));
    const knownCategories = CATEGORY_ORDER.filter((category) => category !== "all" && categories.has(category));
    const customCategories = [...categories]
        .filter((category) => !CATEGORY_ORDER.includes(category))
        .sort((a, b) => a.localeCompare(b));

    return ["all", ...knownCategories, ...customCategories];
};

/**
 * Resolves a localized category label with a readable fallback for future data.
 *
 * @param {function(string): string} t - i18next translation function.
 * @param {string} category - Dataset category value.
 * @returns {string} Localized or humanized category label.
 */
const getCategoryLabel = (t, category) => {
    const key = `github_projects_page.categories.${category}`;
    const label = t(key);

    return label === key
        ? category.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
        : label;
};

/**
 * Calculates the visible one-based item range for a paginated result set.
 *
 * @param {number} page - Current one-based page number.
 * @param {number} totalItems - Number of filtered items.
 * @param {number} itemsPerPage - Maximum number of items shown on each page.
 * @returns {{start: number, end: number}} Visible result range for summaries.
 */
const getVisibleRange = (page, totalItems, itemsPerPage) => {
    if (totalItems === 0) return {start: 0, end: 0};

    return {
        start: (page - 1) * itemsPerPage + 1,
        end: Math.min(page * itemsPerPage, totalItems)
    };
};

/**
 * External resource link rendered inside a GitHub project card.
 *
 * @param {object} props - Component props.
 * @param {{type: string, href: string}} props.link - Link metadata.
 * @param {string} props.label - Visible and accessible resource label.
 * @param {string} props.projectName - Project name used to make the link label specific.
 * @returns {JSX.Element} Accessible external link with a compact icon.
 */
function ProjectResourceLink({link, label, projectName}) {
    const Icon = RESOURCE_ICONS[link.type] || ExternalLink;

    return (
        <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(interactiveClasses.resourceLink, interactiveClasses.focusRing)}
            aria-label={`${label}: ${projectName}`}
        >
            <Icon aria-hidden="true" className="h-4 w-4 shrink-0"/>
            <span>{label}</span>
        </a>
    );
}

/**
 * GitHubProjects presents inspectable portfolio repositories separately from
 * professional delivery projects.
 *
 * The page loads static data through the same fake service layer used by the
 * rest of the portfolio, supports category filtering, exposes external
 * resources with specific accessible names, paginates dense result sets, and
 * uses localized SEO metadata.
 *
 * @component
 * @module pages/githubProjects/GithubProjects
 * @returns {JSX.Element} Rendered GitHub projects page.
 */
export default function GithubProjects() {
    const {t} = useTranslation();
    const [projects, setProjects] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadProjects = () => {
        setLoading(true);
        setError(null);

        getGithubProjects()
            .then(setProjects)
            .catch(setError)
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const categories = useMemo(() => getCategoryFilters(projects), [projects]);
    const filteredProjects = useMemo(
        () => projects.filter((project) => selectedCategory === "all" || project.category === selectedCategory),
        [projects, selectedCategory]
    );
    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
    const currentPage = Math.min(page, totalPages || 1);
    const visibleRange = getVisibleRange(currentPage, filteredProjects.length, ITEMS_PER_PAGE);
    const paginatedProjects = filteredProjects.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    useEffect(() => {
        setPage(1);
    }, [selectedCategory]);

    if (loading) return <Loading/>;
    if (error) return <ErrorState message={t("error_generic")} onRetry={loadProjects}/>;

    return (
        <>
            <SeoHead pageKey="githubProjects" path="/github-projects"/>

            <PageSection title={t("github_projects_page.title")}>
                <div className="mx-auto flex max-w-6xl flex-col gap-4">
                    <p className="max-w-3xl text-base leading-7 text-gray-700 dark:text-gray-300">
                        {t("github_projects_page.intro")}
                    </p>

                    <div
                        role="group"
                        aria-label={t("github_projects_page.filter_label")}
                        className={layoutClasses.horizontalFilterBar}
                    >
                        {categories.map((category) => (
                            <SelectableButton
                                key={category}
                                label={getCategoryLabel(t, category)}
                                isSelected={selectedCategory === category}
                                onClick={() => setSelectedCategory(category)}
                            />
                        ))}
                    </div>

                    {filteredProjects.length > 0 && (
                        <>
                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                <p className={layoutClasses.resultSummary} aria-live="polite">
                                    {t("github_projects_page.results_summary", {
                                        start: visibleRange.start,
                                        end: visibleRange.end,
                                        total: filteredProjects.length
                                    })}
                                </p>
                            </div>

                            <div className={layoutClasses.mobilePagination}>
                                <Pagination
                                    page={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setPage}
                                />
                            </div>

                            <PageGrid page={`${selectedCategory}-${currentPage}`} columns={3}>
                                {paginatedProjects.map((project) => (
                                    <Card
                                        key={project.id}
                                        aria-labelledby={`${project.id}-title`}
                                        className="h-full gap-4"
                                    >
                                        <CardContent className="flex h-full flex-col gap-4 p-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className={surfaceClasses.metaBadge}>
                                                    {getCategoryLabel(t, project.category)}
                                                </span>
                                                <span className={surfaceClasses.mutedMetaBadge}>{project.year}</span>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <h2
                                                    id={`${project.id}-title`}
                                                    className="text-lg font-semibold leading-snug text-gray-900 dark:text-gray-100 md:text-xl"
                                                >
                                                    {project.name}
                                                </h2>
                                                <p className={surfaceClasses.insetText}>{t(project.summaryKey)}</p>
                                            </div>

                                            <ul
                                                className="flex flex-col gap-2 text-sm leading-6 text-gray-700 dark:text-gray-300"
                                                aria-label={t("github_projects_page.highlights_label", {project: project.name})}
                                            >
                                                {project.highlightsKeys.map((highlightKey) => (
                                                    <li key={highlightKey} className="flex gap-2">
                                                        <span aria-hidden="true"
                                                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"/>
                                                        <span>{t(highlightKey)}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="mt-auto flex flex-col gap-4">
                                                <TechDisclosure techList={project.tech} label={t("show_technologies")}/>

                                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                                    {project.links.map((link) => (
                                                        <ProjectResourceLink
                                                            key={`${project.id}-${link.type}`}
                                                            link={link}
                                                            label={t(`github_projects_page.links.${link.type}`)}
                                                            projectName={project.name}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </PageGrid>

                            <div className={layoutClasses.desktopPagination}>
                                <Pagination
                                    page={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setPage}
                                />
                            </div>
                        </>
                    )}
                </div>
            </PageSection>
        </>
    );
}
