import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import {Card} from "@/components/ui/card/Card";
import {CardContent} from "@/components/ui/cardContent/CardContent";
import {PageSection} from "@/components/ui/pageSection/PageSection";
import {ExpandableText} from "@/components/ui/expandableText/ExpandableText";
import {SeoHead} from "@/components/seoHead/SeoHead";
import {SelectableButton} from "@/components/ui/selectableButton/SelectableButton";
import {PageGrid} from "@/components/ui/pageGrid/PageGrid";
import TechDisclosure from "@/components/ui/techDisclosure/TechDisclosure";
import {getExperiences} from "@/services/portfolio.service";
import {ErrorState, Loading} from "@/App";

/**
 * Determines the experience label and type based on the selected year within a period string.
 *
 * Parses the given period string to extract start and end years, then compares with the selected year.
 * Returns an object with a localized label and a type indicating whether the year is at the start, end,
 * or the only year of the experience period.
 *
 * @param {string} period - The period string containing one or two years (e.g. "2019-2021" or "2020").
 * @param {string|number} year - The selected year to compare against the period.
 * @param {function} t - Translation function (e.g. from i18next) to get localized labels.
 * @returns {{label: string, type: "single" | "start" | "end"} | null}
 *          An object with the label and type if the selected year matches start/end/single year,
 *          or null if no match or invalid period.
 */
export const getExperienceLabel = (period, year, t) => {
    const years = period.match(/\b(20\d{2}|19\d{2})\b/g);
    const selected = parseInt(year, 10);

    if (!years) return null;

    const start = parseInt(years[0], 10);
    const end = years[1] ? parseInt(years[1], 10) : null;

    if (start === selected && end === selected) {
        return {label: t("exp_label_single"), type: "single"};
    }

    if (start === selected) {
        return {label: t("exp_label_start"), type: "start"};
    }

    if (end === selected) {
        return {label: t("exp_label_end"), type: "end"};
    }

    return null;
};

/**
 * Experience component renders a list of professional experiences filtered by selected year.
 *
 * It displays year buttons to filter experiences by year extracted from experience periods.
 * Each experience shows role, company, period, description, and a collapsible panel with technologies used.
 *
 * Uses i18next for translations.
 *
 * @component
 * @module pages/experience/Experience
 * @returns {JSX.Element} The rendered experience section with filtering and animated transitions.
 */
export default function Experience() {
    const {t} = useTranslation();
    const [experiences, setExperiences] = useState([]);
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

    const getUniqueYears = (experiences) => {
        const yearRegex = /\b(20\d{2}|19\d{2})\b/g;
        const years = new Set();
        for (const exp of experiences) {
            const match = exp.period.match(yearRegex);
            if (match) match.forEach(y => years.add(y));
        }
        return Array.from(years).sort((a, b) => b - a);
    };

    const yearList = getUniqueYears(experiences);
    const [selectedYear, setSelectedYear] = useState(yearList[0] || null);
    const filteredExperiences = selectedYear
        ? experiences.filter(exp => exp.period.includes(selectedYear))
        : [];

    if (loading) return <Loading/>;
    if (error) return <ErrorState message="Failed to load certifications" onRetry={loadExperiences}/>;

    return (
        <>
            <SeoHead pageKey="experience" path="/experience"/>

            <PageSection title={t("experience_title")}>
                {/* Years */}
                <div className="mb-8">
                    <div
                        className="flex flex-row sm:flex-wrap sm:justify-center gap-2 sm:gap-3 overflow-x-auto sm:overflow-visible px-2 sm:px-0 pb-3 scrollbar-hide">
                        {yearList.map(year => (
                            <SelectableButton
                                key={year}
                                label={year}
                                isSelected={selectedYear === year}
                                onClick={() => setSelectedYear(year)}
                                className={`flex-shrink-0 transition-all duration-200 ${
                                    selectedYear === year
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white"
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {filteredExperiences.length > 0 && (
                    <PageGrid page={selectedYear} columns={2}>
                        {filteredExperiences.map((exp, i) => (
                            <Card
                                key={i}
                                className="relative w-full p-5 sm:p-6 border border-gray-200/60
                                           dark:border-gray-700/60 bg-white/60 dark:bg-gray-800/40 backdrop-blur-md
                                           rounded-xl hover:shadow-lg transition-all duration-300
                                           flex flex-col md:flex-row items-start gap-4"
                            >
                                <CardContent className="p-0">
                                    {/* Title and main info */}
                                    <div
                                        className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
                                            {t(exp.role)}
                                        </h3>

                                        <div className="flex items-center gap-2 flex-wrap">
                                            <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                                            {(() => {
                                                const status = getExperienceLabel(exp.period, selectedYear, t);
                                                if (!status) return null;

                                                const colorMap = {
                                                    start: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
                                                    end: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
                                                    single: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
                                                };

                                                return (
                                                    <span
                                                        className={`inline-block mt-1 px-2 py-0.5 text-xs font-semibold rounded-full ${colorMap[status.type]}`}
                                                    >
                                                {status.label}
                                            </span>
                                                );
                                            })()}
                                        </div>
                                    </div>

                                    {/* Period */}
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{exp.period}</p>

                                    {/* Description */}
                                    {exp.description && (
                                        <ExpandableText
                                            value={t(exp.description)}
                                            maxLines={4}
                                            className="text-sm mb-2 px-4 py-3 bg-white/50 dark:bg-gray-900/50 rounded-xl shadow-inner italic text-gray-800 dark:text-gray-200"
                                        />
                                    )}

                                    {/* Tech */}
                                    <TechDisclosure techList={exp.tech} label={t("show_technologies")}/>

                                </CardContent>
                            </Card>
                        ))}
                    </PageGrid>
                )}
            </PageSection>
        </>
    );
}
