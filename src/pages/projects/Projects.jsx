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
import {getProjects} from "@/services/portfolio.service";
import {ErrorState, Loading} from "@/App";

const ITEMS_PER_PAGE = 2;

/**
 * Projects component displays a list of projects grouped by company.
 *
 * Features:
 * - Sidebar with buttons to filter projects by company.
 * - Shows project details including name, company, period, type, and technologies used.
 * - Each project has a collapsible panel to toggle visibility of technology stack.
 * - Uses i18n translation for UI texts and project types.
 *
 * @component
 * @module pages/projects/Projects
 * @returns {JSX.Element} Rendered Projects section with filtering and collapsible tech details.
 */
export default function Projects() {
    const {t} = useTranslation();
    const [selectedCompany, setSelectedCompany] = useState("Intesa Sanpaolo");
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

    const companies = [...new Set(projects.map(p => p.company))];

    const groupedProjects = projects.reduce((acc, proj) => {
        acc[proj.company] = acc[proj.company] || [];
        acc[proj.company].push(proj);
        return acc;
    }, {});

    if (loading) return <Loading/>;
    if (error) return <ErrorState message="Failed to load projects" onRetry={loadProjects}/>;

    return (
        <>
            <SeoHead pageKey="projects" path="/projects"/>

            <PageSection title={t("projects_title")}>
                {(() => {
                    const currentProjects = groupedProjects[selectedCompany] || [];
                    const totalPages = Math.ceil(currentProjects.length / ITEMS_PER_PAGE);
                    const paginated = currentProjects.slice(
                        (page - 1) * ITEMS_PER_PAGE,
                        page * ITEMS_PER_PAGE
                    );

                    return (
                        <div className="flex flex-col md:flex-row gap-8">

                            {/*  SIDEBAR */}
                            <aside className="md:w-64 md:shrink-0 md:sticky md:top-24 h-fit">
                                <div
                                    className="flex flex-row md:flex-col gap-2 md:gap-3 overflow-x-auto md:overflow-visible snap-x md:snap-none px-1 md:px-0 pb-3 scrollbar-hide"
                                >
                                    {companies.map((company) => {
                                        const count = groupedProjects[company]?.length ?? 0;

                                        return (
                                            <button
                                                key={company}
                                                onClick={() => {
                                                    setSelectedCompany(company);
                                                    setPage(1);
                                                    window.scrollTo({top: 0, behavior: "smooth"});
                                                }}
                                                className={`snap-start text-left rounded-lg px-3 py-2 border transition-all duration-200 flex items-center justify-between gap-3
                                                    ${selectedCompany === company
                                                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                                                    : "bg-white/70 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700 hover:-translate-y-0.5 hover:shadow"
                                                }
                                            `}
                                            >
                                                <span className="truncate">{company}</span>
                                                <span className={`text-xs px-2 py-0.5 rounded-full
                                                    ${selectedCompany === company
                                                    ? "bg-white/20 text-white"
                                                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                                }
                                                `}>
                                                  {count}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </aside>

                            {/* MAIN */}
                            <main className="flex-1 min-w-0">
                                <div className="max-w-6xl mx-auto flex flex-col gap-6">

                                    {/* pagination mobile sticky */}
                                    <div
                                        className="md:hidden sticky top-0 z-20 bg-white/85 dark:bg-gray-900/85 backdrop-blur border-b border-gray-200 dark:border-gray-700 py-2 mb-4">
                                        <Pagination
                                            page={page}
                                            totalPages={totalPages}
                                            onPageChange={setPage}
                                        />
                                    </div>

                                    {/* GRID */}
                                    {paginated.length > 0 && (
                                        <PageGrid
                                            page={`${selectedCompany}-${page}`}
                                            columns={2}
                                            className="pt-2"
                                        >
                                            {paginated.map((proj, idx) => (
                                                <Card
                                                    key={idx}
                                                    className="relative w-full p-5 sm:p-6 border border-gray-200/60
                                                               dark:border-gray-700/60 bg-white/60 dark:bg-gray-800/40 backdrop-blur-md
                                                               rounded-xl hover:shadow-lg transition-all duration-300
                                                               flex flex-col md:flex-row items-start gap-4"
                                                >
                                                    <CardContent className="p-0">
                                                        <div className="flex flex-col gap-3">
                                                            <div className="flex flex-col gap-2">
                                                                <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 leading-snug line-clamp-2">
                                                                    {proj.name}
                                                                </h3>

                                                                {/* Meta info container */}
                                                                <div className="flex flex-wrap gap-2 items-center">
                                                                    <span
                                                                        className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                                                      {proj.period}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            {proj.type && (
                                                                <ExpandableText
                                                                    value={t(`project_types.${proj.type}`)}
                                                                    maxLines={4}
                                                                    className="text-sm mb-2 px-4 py-3 bg-white/50 dark:bg-gray-900/50 rounded-xl shadow-inner italic text-gray-800 dark:text-gray-200"
                                                                />
                                                            )}

                                                        </div>

                                                        {/* LOW BLOCK - Tech */}
                                                        <TechDisclosure techList={proj.tech}
                                                                        label={t("show_technologies")}/>

                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </PageGrid>
                                    )}

                                    {/* pagination desktop bottom */}
                                    <div className="hidden md:flex justify-center mt-8">
                                        <Pagination
                                            page={page}
                                            totalPages={totalPages}
                                            onPageChange={setPage}
                                        />
                                    </div>
                                </div>
                            </main>

                        </div>
                    );
                })()}
            </PageSection>
        </>
    );
}
