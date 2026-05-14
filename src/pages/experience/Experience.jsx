import {useTranslation} from "react-i18next";
import React, {useEffect, useMemo, useState} from "react";
import {Card} from "@/components/ui/card/Card";
import {CardContent} from "@/components/ui/cardContent/CardContent";
import {PageSection} from "@/components/ui/pageSection/PageSection";
import {ExpandableText} from "@/components/ui/expandableText/ExpandableText";
import {SeoHead} from "@/components/seoHead/SeoHead";
import TechDisclosure from "@/components/ui/techDisclosure/TechDisclosure";
import {Pagination} from "@/components/ui/pagination/Pagination";
import {getExperiences} from "@/services/portfolioService";
import {Loading} from "@/components/loading/Loading";
import {ErrorState} from "@/components/errorState/ErrorState";
import clsx from "clsx";
import {layoutClasses, surfaceClasses} from "@/styles/commonClasses";
import {Building2, CalendarDays} from "lucide-react";

/**
 * Experience route for the portfolio timeline.
 *
 * @module pages/experience/Experience
 */

const YEAR_PATTERN = /\b(20\d{2}|19\d{2})\b/g;
const PRESENT_PATTERN = /\bpresent\b/i;
const ITEMS_PER_PAGE = 5;

/**
 * Parses the year boundaries from an experience period string.
 *
 * Ongoing roles use the provided current year as their end boundary so the
 * timeline remains accurate while the portfolio is live.
 *
 * @param {string} period - Experience period such as `09/2021 - 12/2025`.
 * @param {number} currentYear - Current four-digit year used for ongoing roles.
 * @returns {{start: number, end: number, isOngoing: boolean} | null} Parsed period boundaries.
 */
const parseExperiencePeriod = (period, currentYear) => {
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
 * Expands a period into every calendar year covered by the experience.
 *
 * @param {string} period - Experience period containing one or two years.
 * @param {number} [currentYear=new Date().getFullYear()] - Current year used for ongoing roles.
 * @returns {string[]} Covered years in ascending order.
 */
export const getExperienceYears = (period, currentYear = new Date().getFullYear()) => {
    const parsedPeriod = parseExperiencePeriod(period, currentYear);

    if (!parsedPeriod) return [];

    return Array.from(
        {length: parsedPeriod.end - parsedPeriod.start + 1},
        (_, index) => String(parsedPeriod.start + index)
    );
};

/**
 * Orders experience entries from the most recent role to the oldest one.
 *
 * Ongoing roles are treated as ending in the provided current year, so they
 * naturally stay at the top of the portfolio timeline.
 *
 * @param {Array<{period: string}>} experiences - Experience entries to sort.
 * @param {number} [currentYear=new Date().getFullYear()] - Current year used for ongoing roles.
 * @returns {Array<object>} New array sorted by end year and then start year, descending.
 */
export const sortExperiencesByRecency = (experiences, currentYear = new Date().getFullYear()) => (
    [...experiences].sort((first, second) => {
        const firstPeriod = parseExperiencePeriod(first.period, currentYear);
        const secondPeriod = parseExperiencePeriod(second.period, currentYear);

        return (secondPeriod?.end ?? 0) - (firstPeriod?.end ?? 0)
            || (secondPeriod?.start ?? 0) - (firstPeriod?.start ?? 0);
    })
);

/**
 * Calculates the visible one-based item range for a paginated timeline.
 *
 * @param {number} page - Current one-based page number.
 * @param {number} totalItems - Number of timeline items.
 * @param {number} itemsPerPage - Maximum items rendered on each page.
 * @returns {{start: number, end: number}} Visible timeline range.
 */
export const getVisibleRange = (page, totalItems, itemsPerPage) => {
    if (totalItems === 0) return {start: 0, end: 0};

    return {
        start: (page - 1) * itemsPerPage + 1,
        end: Math.min(page * itemsPerPage, totalItems)
    };
};

/**
 * Localizes human-readable period fragments while preserving year parsing data.
 *
 * @param {string} period - Raw experience period from the static dataset.
 * @param {function} t - Translation function used for localized period words.
 * @returns {string} Localized period label for visual rendering.
 */
export const formatExperiencePeriod = (period, t) => (
    period.replace(PRESENT_PATTERN, t("experience_present"))
);

/**
 * Returns the visible status badge for an experience entry.
 *
 * @param {string} period - Raw experience period from the static dataset.
 * @param {function} t - Translation function used for localized labels.
 * @param {number} [currentYear=new Date().getFullYear()] - Current year used for ongoing roles.
 * @returns {{label: string, type: "ongoing"} | null} Current-role status or null for previous roles.
 */
export const getExperienceStatus = (period, t, currentYear = new Date().getFullYear()) => {
    const parsedPeriod = parseExperiencePeriod(period, currentYear);

    if (parsedPeriod?.isOngoing) {
        return {label: t("exp_label_ongoing"), type: "ongoing"};
    }

    return null;
};

/**
 * Experience component renders a paginated professional timeline.
 *
 * The page favors portfolio scanning: it presents recent roles first, keeps
 * the page height controlled with pagination, and lets each entry expose role,
 * company, period, description, and a collapsible technology stack.
 *
 * Uses i18next for translations.
 *
 * @component
 * @returns {JSX.Element} The rendered experience section with filtering and animated transitions.
 */
export default function Experience() {
    const {t} = useTranslation();
    const currentYear = useMemo(() => new Date().getFullYear(), []);

    const [experiences, setExperiences] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadExperiences = () => {
        setLoading(true);
        setError(null);

        getExperiences()
            .then(setExperiences)
            .catch(setError)
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadExperiences();
    }, []);

    const timelineExperiences = useMemo(
        () => sortExperiencesByRecency(experiences, currentYear),
        [currentYear, experiences]
    );
    const totalPages = Math.ceil(timelineExperiences.length / ITEMS_PER_PAGE);
    const currentPage = Math.min(page, totalPages || 1);
    const visibleRange = getVisibleRange(currentPage, timelineExperiences.length, ITEMS_PER_PAGE);
    const displayedExperiences = useMemo(
        () => timelineExperiences.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
        ),
        [currentPage, timelineExperiences]
    );

    if (loading) return <Loading/>;
    if (error) return <ErrorState message={t("error_generic")} onRetry={loadExperiences}/>;

    return (
        <>
            <SeoHead pageKey="experience" path="/experience"/>

            <PageSection title={t("experience_title")}>
                <p className={layoutClasses.sectionIntro}>
                    {t("experience_intro")}
                </p>

                {experiences.length === 0 ? (
                    <p className={surfaceClasses.insetText}>{t("experience_empty")}</p>
                ) : (
                    <>
                        <p className={layoutClasses.resultSummary} aria-live="polite">
                            {t("experience_results_summary", {
                                start: visibleRange.start,
                                end: visibleRange.end,
                                total: timelineExperiences.length
                            })}
                        </p>

                        <div className={layoutClasses.mobilePagination}>
                            <Pagination
                                page={currentPage}
                                totalPages={totalPages}
                                onPageChange={setPage}
                            />
                        </div>

                        <ol className={layoutClasses.timelineList} aria-label={t("experience_timeline_label")}>
                            {displayedExperiences.map((exp) => {
                                const role = t(exp.role);
                                const titleId = `experience-${exp.role.replace(/\W+/g, "-")}`;
                                const status = getExperienceStatus(exp.period, t, currentYear);
                                const isOngoing = status?.type === "ongoing";

                                return (
                                    <li key={exp.role} className={layoutClasses.timelineItem}>
                                        <span
                                            aria-hidden="true"
                                            className={clsx(
                                                surfaceClasses.timelineMarker,
                                                isOngoing && surfaceClasses.timelineMarkerActive
                                            )}
                                        />

                                        <Card
                                            data-testid="experience-card"
                                            aria-labelledby={titleId}
                                            className={clsx("h-full", isOngoing && surfaceClasses.activeTimelineCard)}
                                        >
                                            <CardContent className="flex h-full flex-col gap-4 p-0">
                                                <header className="flex flex-col gap-3 border-b border-gray-200/60 pb-3 dark:border-gray-700/60">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        {status && (
                                                            <span
                                                                className={clsx(
                                                                    surfaceClasses.statusBadgeBase,
                                                                    surfaceClasses.statusBadgeOngoing
                                                                )}
                                                            >
                                                                {status.label}
                                                            </span>
                                                        )}

                                                        <span className={clsx(surfaceClasses.mutedMetaBadge, "gap-1.5")}>
                                                            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true"/>
                                                            <span>{formatExperiencePeriod(exp.period, t)}</span>
                                                        </span>
                                                    </div>

                                                    <div className="flex flex-col gap-2">
                                                        <h2
                                                            id={titleId}
                                                            className="text-lg font-semibold leading-snug text-gray-900 dark:text-gray-100 md:text-xl"
                                                        >
                                                            {role}
                                                        </h2>

                                                        {exp.company && exp.company !== "-" && (
                                                            <p className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                                                <Building2 className="h-4 w-4 shrink-0" aria-hidden="true"/>
                                                                <span>{exp.company}</span>
                                                            </p>
                                                        )}
                                                    </div>
                                                </header>

                                                {exp.description && (
                                                    <ExpandableText
                                                        value={t(exp.description)}
                                                        maxLines={isOngoing ? 6 : 4}
                                                        className="text-left text-sm leading-relaxed text-gray-700 dark:text-gray-300"
                                                    />
                                                )}

                                                <div className="mt-auto">
                                                    <TechDisclosure techList={exp.tech} label={t("show_technologies")}/>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </li>
                                );
                            })}
                        </ol>

                        <div className={layoutClasses.desktopPagination}>
                            <Pagination
                                page={currentPage}
                                totalPages={totalPages}
                                onPageChange={setPage}
                            />
                        </div>
                    </>
                )}
            </PageSection>
        </>
    );
}
