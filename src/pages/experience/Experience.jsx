import {useTranslation} from "react-i18next";
import React, {useMemo} from "react";
import {Card} from "@/components/ui/card/Card";
import {CardContent} from "@/components/ui/cardContent/CardContent";
import {PageSection} from "@/components/ui/pageSection/PageSection";
import {StructuredDescription} from "@/components/ui/structuredDescription/StructuredDescription";
import {SeoHead} from "@/components/seoHead/SeoHead";
import TechDisclosure from "@/components/ui/techDisclosure/TechDisclosure";
import {getExperiences} from "@/services/portfolioService";
import {Loading} from "@/components/loading/Loading";
import {ErrorState} from "@/components/errorState/ErrorState";
import clsx from "clsx";
import {layoutClasses, surfaceClasses} from "@/styles/commonClasses";
import {Building2, CalendarDays} from "lucide-react";
import {usePortfolioData} from "@/hooks/usePortfolioData";

/**
 * Experience route for professional history and formal education.
 *
 * @module pages/experience/Experience
 */

const YEAR_PATTERN = /\b(20\d{2}|19\d{2})\b/g;
const PRESENT_PATTERN = /\bpresent\b/i;

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
 * Renders one career-history record with shared card semantics.
 *
 * Role headings are level three because every card belongs to a named level-two
 * Experience section. Structured-description headings continue the hierarchy
 * at level four.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.experience - Career or education entry to render.
 * @param {function} props.t - Translation function for visible content.
 * @param {number} props.currentYear - Current year used to identify ongoing roles.
 * @returns {React.JSX.Element} One ordered-list item containing an experience card.
 */
function ExperienceCard({experience: exp, t, currentYear}) {
    const role = t(exp.role);
    const titleId = `experience-${exp.role.replace(/\W+/g, "-")}`;
    const status = getExperienceStatus(exp.period, t, currentYear);
    const isOngoing = status?.type === "ongoing";
    const description = exp.description
        ? t(exp.description, {returnObjects: true})
        : null;

    return (
        <li className={clsx("min-w-0 self-start", isOngoing && "md:col-span-2")}>
            <Card
                data-testid="experience-card"
                aria-labelledby={titleId}
                className={clsx(
                    "min-w-0 self-start",
                    isOngoing && surfaceClasses.activeTimelineCard
                )}
            >
                <CardContent className="min-w-0">
                    <header className="flex flex-col gap-3 border-b border-gray-200/60 pb-3 dark:border-gray-700/60">
                        <div className="flex min-w-0 flex-wrap items-center gap-2">
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

                            {exp.company && exp.company !== "-" && (
                                <span
                                    className={clsx(
                                        surfaceClasses.metaBadge,
                                        "min-w-0 max-w-full gap-1.5"
                                    )}
                                >
                                    <Building2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true"/>
                                    <span className="min-w-0 break-words">{exp.company}</span>
                                </span>
                            )}

                            <span
                                className={clsx(
                                    surfaceClasses.mutedMetaBadge,
                                    "min-w-0 max-w-full gap-1.5"
                                )}
                            >
                                <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden="true"/>
                                <span className="min-w-0 break-words">
                                    {formatExperiencePeriod(exp.period, t)}
                                </span>
                            </span>
                        </div>

                        <h3
                            id={titleId}
                            className="break-words text-lg font-semibold leading-snug text-gray-900 dark:text-gray-100 md:text-xl"
                        >
                            {role}
                        </h3>
                    </header>

                    {exp.description && (
                        <StructuredDescription
                            description={description}
                            titleId={titleId}
                            maxLines={4}
                            sectionHeadingLevel={4}
                            className="max-w-4xl text-left text-sm leading-relaxed text-gray-700 dark:text-gray-300"
                        />
                    )}

                    <div className="mt-auto">
                        <TechDisclosure techList={exp.tech} label={t("show_technologies")}/>
                    </div>
                </CardContent>
            </Card>
        </li>
    );
}

/**
 * Renders one named semantic section of the Experience page.
 *
 * @param {Object} props - Component props.
 * @param {string} props.headingId - Stable id connecting the section and heading.
 * @param {string} props.title - Localized section title.
 * @param {Array<Object>} props.experiences - Ordered records in this section.
 * @param {function} props.t - Translation function for card content.
 * @param {number} props.currentYear - Current year used to identify ongoing roles.
 * @returns {React.JSX.Element | null} Named section or null when it has no records.
 */
function ExperienceCollection({headingId, title, experiences, t, currentYear}) {
    if (experiences.length === 0) return null;

    return (
        <section className="flex min-w-0 flex-col gap-4" aria-labelledby={headingId}>
            <h2
                id={headingId}
                className="text-xl font-bold leading-tight text-gray-900 dark:text-white sm:text-2xl"
            >
                {title}
            </h2>

            <ol className={clsx(layoutClasses.pageGrid, "grid-cols-1 md:grid-cols-2")}>
                {experiences.map((experience) => (
                    <ExperienceCard
                        key={experience.role}
                        experience={experience}
                        t={t}
                        currentYear={currentYear}
                    />
                ))}
            </ol>
        </section>
    );
}

/**
 * Experience component separates professional history from formal education.
 *
 * Both semantic sections remain visible on the same route. Professional work
 * stays dominant and reverse chronological, the current role spans the desktop
 * width, and education follows as a concise supporting history. All cards reuse
 * the same rendering and disclosure behavior.
 *
 * Uses i18next for translations.
 *
 * @component
 * @returns {JSX.Element} The rendered chronological experience collection.
 */
export default function Experience() {
    const {t} = useTranslation();
    const currentYear = useMemo(() => new Date().getFullYear(), []);
    const {data: experiences, loading, error, retry} = usePortfolioData(getExperiences, []);

    const orderedExperiences = useMemo(
        () => sortExperiencesByRecency(experiences, currentYear),
        [currentYear, experiences]
    );
    const professionalExperiences = useMemo(
        () => orderedExperiences.filter(({category}) => category === "professional"),
        [orderedExperiences]
    );
    const educationExperiences = useMemo(
        () => orderedExperiences.filter(({category}) => category === "education"),
        [orderedExperiences]
    );

    if (loading) return <Loading/>;
    if (error) return <ErrorState message={t("error_generic")} onRetry={retry}/>;

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
                    <div className="flex flex-col gap-8 pt-2">
                        <ExperienceCollection
                            headingId="professional-experience-heading"
                            title={t("experience_professional_title")}
                            experiences={professionalExperiences}
                            t={t}
                            currentYear={currentYear}
                        />

                        <ExperienceCollection
                            headingId="education-heading"
                            title={t("experience_education_title")}
                            experiences={educationExperiences}
                            t={t}
                            currentYear={currentYear}
                        />
                    </div>
                )}
            </PageSection>
        </>
    );
}
