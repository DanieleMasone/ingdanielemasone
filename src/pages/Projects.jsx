import {useTranslation} from 'react-i18next';
import {Card} from "../components/ui/Card";
import {CardContent} from "../components/ui/CardContent";
import {Disclosure} from '@headlessui/react';
import {ChevronDown} from 'lucide-react';
import {useState} from "react";
import PageSection from "../components/ui/PageSection";
import {ExpandableText} from "../components/ui/ExpandableText";
import {AnimatePresence, motion} from "framer-motion";

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
 * @module pages/Projects
 * @returns {JSX.Element} Rendered Projects section with filtering and collapsible tech details.
 */
export default function Projects() {
    const {t} = useTranslation();
    const [selectedCompany, setSelectedCompany] = useState("RGI");
    const [page, setPage] = useState(1);
    const itemsPerPage = 2;

    const projects = [
        {
            name: "Passportal client",
            tech: "MySQL · REST APIs · SQL · JSON · JBoss Application Server · HTML · Docker · Node.js · HTML5 · JEE · AngularJS · Git · Java · Maven · OOP · JavaScript · CSS · XML",
            type: "Enterprise Application",
            company: "RGI",
            period: "03/2023"
        },
        {
            name: "HalfLife",
            tech: "MySQL · REST APIs · SQL · JSON · JBoss Application Server · HTML · Docker · Node.js · HTML5 · JEE · AngularJS · Git · Java · Maven · OOP · JavaScript · CSS · XML",
            type: "Enterprise Application",
            company: "RGI",
            period: "01/2023 - 03/2023"
        },
        {
            name: "AXA Mobility",
            tech: "MySQL · REST APIs · SQL · JSON · JBoss Application Server · HTML · Docker · Node.js · HTML5 · JEE · AngularJS · Git · Maven · OOP · JavaScript · CSS · XML",
            type: "Mobility Portal",
            company: "RGI",
            period: "03/2022 - 01/2023"
        },
        {
            name: "Group Policy Library",
            tech: "MySQL · REST APIs · SQL · JSON · JBoss Application Server · HTML · Docker · Node.js · HTML5 · JEE · AngularJS · Git · Maven · OOP · JavaScript · CSS · XML",
            type: "UI Library",
            company: "RGI",
            period: "02/2022 - 05/2022"
        },
        {
            name: "AfterLife",
            tech: "MySQL · REST APIs · SQL · JSON · JBoss Application Server · HTML · Docker · Node.js · HTML5 · JEE · AngularJS · Git · Maven · OOP · JavaScript · CSS · XML",
            type: "Insurance Web Portal",
            company: "RGI",
            period: "09/2021 - 02/2022"
        },
        {
            name: "Area Clienti ",
            tech: " MySQL · REST APIs · SQL · JSON · Hibernate · JBoss Application Server · HTML · Docker · Node.js · HTML5 · JEE · AngularJS · Git · Java · Maven · OOP · JavaScript · Tomcat · Machine learning · CSS · Framework Spring · XML",
            type: "areaClienti",
            company: "Italiaonline",
            period: "05/2019 - 09/2021"
        },
        {
            name: "IDB rest services",
            tech: "MySQL · REST APIs · SQL · JSON · Hibernate · JBoss Application Server · JEE · Git · Java · Maven · OOP · Tomcat · XML",
            type: "restServices",
            company: "Italiaonline",
            period: "07/2019 - 09/2021"
        },
        {
            name: "2In1App",
            tech: "MySQL · REST APIs · SQL · React Native · Git · Java · Android · OOP · XML",
            type: "Hybrid Mobile App",
            company: "TECNAVIA APPS s.r.l.",
            period: "07/2018 - 05/2019"
        },
        {
            name: "Newsmemory",
            tech: "MySQL · REST APIs · SQL · PHP · JSON · HTML · HTML5 · Eclipse · Git · SQLite · OOP · JavaScript · CSS · jQuery · XML",
            type: "Newspaper CMS",
            company: "TECNAVIA APPS s.r.l.",
            period: "07/2018 - 05/2019"
        },
        {
            name: "DART",
            tech: "MySQL · REST APIs · SQL · JSON · Hibernate · JBoss Application Server · HTML · Node.js · HTML5 · JEE · AngularJS · Git · Maven · OOP · JavaScript · Tomcat · CSS · jQuery · Spring · XML",
            type: "dart",
            company: "Teoresi",
            period: "10/2017 - 07/2018"
        },
        {
            name: "io.T Tecno",
            tech: "MySQL · REST APIs · SQL · JSON · Hibernate · JBoss Application Server · HTML · Node.js · HTML5 · JEE· AngularJS · Git · Maven · OOP · JavaScript · Tomcat · CSS · jQuery · Spring · XML",
            type: "IoT Workplace Booking",
            company: "Teoresi",
            period: "10/2017 - 07/2018"
        },
        {
            name: "OSS Trasformation",
            tech: "MySQL · REST APIs · JSON · JBoss Application Server · HTML · Node.js · HTML5 · JEE · AngularJS · Git· OOP · JavaScript · CSS · jQuery · XML",
            type: "Enterprise Portal",
            company: "Fastweb",
            period: "09/2016 - 10/2017"
        },
        {
            name: "OLO Gateway",
            tech: "MySQL · REST APIs · JSON · JBoss Application Server · HTML · Node.js · HTML5 · JEE · AngularJS · Git· OOP · JavaScript · CSS · jQuery · XML",
            type: "Enterprise Portal",
            company: "Fastweb",
            period: "09/2016 - 10/2017"
        }
    ];

    const companies = [...new Set(projects.map(p => p.company))];

    const groupedProjects = projects.reduce((acc, proj) => {
        acc[proj.company] = acc[proj.company] || [];
        acc[proj.company].push(proj);
        return acc;
    }, {});

    return (
        <PageSection title={t("projects_title")}>
            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar Tabs */}
                <div className="md:w-1/4 flex flex-row md:flex-col overflow-x-auto gap-2 md:gap-4">
                    {companies.map((company) => (
                        <button
                            key={company}
                            onClick={() => {
                                setSelectedCompany(company);
                                setPage(1);
                            }}
                            className={`px-4 py-2 rounded-lg border text-sm whitespace-nowrap
                            ${
                                selectedCompany === company
                                    ? "bg-blue-600 text-white dark:bg-blue-500"
                                    : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                            }`}
                        >
                            {company}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedCompany + page}
                            initial={{opacity: 0, y: 40}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -40}}
                            transition={{duration: 0.4}}
                            layout
                            className="flex flex-wrap gap-6 min-h-[500px] items-start"
                        >
                            {(() => {
                                const currentProjects = groupedProjects[selectedCompany] || [];
                                const totalPages = Math.ceil(currentProjects.length / itemsPerPage);
                                const paginated = currentProjects.slice(
                                    (page - 1) * itemsPerPage,
                                    page * itemsPerPage
                                );

                                return (
                                    <>
                                        {paginated.map((proj, idx) => (
                                            <Card
                                                key={idx}
                                                className="bg-white border border-gray-200 text-gray-900 dark:bg-gray-900 dark:border-gray-700 dark:text-white transition-colors duration-300"
                                            >
                                                <CardContent>
                                                    <h3 className="text-lg font-semibold">{proj.name}</h3>
                                                    <p className="text-gray-700 dark:text-gray-400">{proj.company}</p>
                                                    <p className="text-sm mb-2 text-gray-600 dark:text-gray-500">{proj.period}</p>
                                                    {proj.type && (
                                                        <ExpandableText
                                                            value={t(`project_types.${proj.type}`, proj.type)}
                                                            maxLines={3}
                                                            className="mb-2 text-sm"
                                                        />
                                                    )}
                                                    <Disclosure>
                                                        {({open}) => (
                                                            <div>
                                                                <Disclosure.Button
                                                                    className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none mt-2"
                                                                >
                                                                    <span>{t("show_technologies")}</span>
                                                                    <ChevronDown
                                                                        className={`ml-1 w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
                                                                    />
                                                                </Disclosure.Button>
                                                                <Disclosure.Panel
                                                                    className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                                                                    {proj.tech}
                                                                </Disclosure.Panel>
                                                            </div>
                                                        )}
                                                    </Disclosure>
                                                </CardContent>
                                            </Card>
                                        ))}

                                        {/* Pagination Controls */}
                                        {totalPages > 1 && (
                                            <div className="w-full flex justify-center mt-8 space-x-4">
                                                <button
                                                    onClick={() => setPage(p => Math.max(p - 1, 1))}
                                                    disabled={page === 1}
                                                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium
                                                               text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900
                                                               hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition"
                                                >
                                                    ← {t("previous")}
                                                </button>

                                                <span data-testid="pagination-info"
                                                      className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
                                                    {page} / {totalPages}
                                                </span>

                                                <button
                                                    onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                                                    disabled={page === totalPages}
                                                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium
                                                                text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900
                                                                hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition"
                                                >
                                                    {t("next")} →
                                                </button>
                                            </div>
                                        )}
                                    </>
                                );
                            })()}
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </PageSection>
    );
}
