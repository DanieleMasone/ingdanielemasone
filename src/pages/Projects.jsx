import {useTranslation} from 'react-i18next';
import {Card} from "../components/ui/Card";
import {CardContent} from "../components/ui/CardContent";
import {Disclosure} from '@headlessui/react';
import {ChevronDown} from 'lucide-react';
import {Textarea} from "../components/ui/Textarea";
import {useState} from "react";
import PageSection from "../components/ui/PageSection";

export default function Projects() {
    const {t} = useTranslation();
    const [selectedCompany, setSelectedCompany] = useState("RGI");

    const projects = [
        {
            name: "OLO Gateway",
            tech: "MySQL · REST APIs · JSON · JBoss Application Server · HTML · Node.js · HTML5 · JEE · AngularJS · Git· OOP · JavaScript · CSS · jQuery · XML",
            type: "Enterprise Portal",
            company: "Fastweb",
            period: "09/2016 - 10/2017"
        },
        {
            name: "OSS Trasformation",
            tech: "MySQL · REST APIs · JSON · JBoss Application Server · HTML · Node.js · HTML5 · JEE · AngularJS · Git· OOP · JavaScript · CSS · jQuery · XML",
            type: "Enterprise Portal",
            company: "Fastweb",
            period: "09/2016 - 10/2017"
        },
        {
            name: "io.T Tecno",
            tech: "MySQL · REST APIs · SQL · JSON · Hibernate · JBoss Application Server · HTML · Node.js · HTML5 · JEE· AngularJS · Git · Maven · OOP · JavaScript · Tomcat · CSS · jQuery · Spring · XML",
            type: "IoT Workplace Booking",
            company: "Teoresi",
            period: "10/2017 - 07/2018"
        },
        {
            name: "DART",
            tech: "MySQL · REST APIs · SQL · JSON · Hibernate · JBoss Application Server · HTML · Node.js · HTML5 · JEE · AngularJS · Git · Maven · OOP · JavaScript · Tomcat · CSS · jQuery · Spring · XML",
            type: "dart",
            company: "Teoresi",
            period: "10/2017 - 07/2018"
        },
        {
            name: "Newsmemory",
            tech: "MySQL · REST APIs · SQL · PHP · JSON · HTML · HTML5 · Eclipse · Git · SQLite · OOP · JavaScript · CSS · jQuery · XML",
            type: "Newspaper CMS",
            company: "TECNAVIA APPS s.r.l.",
            period: "07/2018 - 05/2019"
        },
        {
            name: "2In1App",
            tech: "MySQL · REST APIs · SQL · React Native · Git · Java · Android · OOP · XML",
            type: "Hybrid Mobile App",
            company: "TECNAVIA APPS s.r.l.",
            period: "07/2018 - 05/2019"
        },
        {
            name: "IDB rest services",
            tech: "MySQL · REST APIs · SQL · JSON · Hibernate · JBoss Application Server · JEE · Git · Java · Maven · OOP · Tomcat · XML",
            type: "restServices",
            company: "Italiaonline",
            period: "07/2019 - 09/2021"
        },
        {
            name: "Area Clienti ",
            tech: " MySQL · REST APIs · SQL · JSON · Hibernate · JBoss Application Server · HTML · Docker · Node.js · HTML5 · JEE · AngularJS · Git · Java · Maven · OOP · JavaScript · Tomcat · Machine learning · CSS · Framework Spring · XML",
            type: "areaClienti",
            company: "Italiaonline",
            period: "05/2019 - 09/2021"
        },
        {
            name: "AfterLife",
            tech: "MySQL · REST APIs · SQL · JSON · JBoss Application Server · HTML · Docker · Node.js · HTML5 · JEE · AngularJS · Git · Maven · OOP · JavaScript · CSS · XML",
            type: "Insurance Web Portal",
            company: "RGI",
            period: "09/2021 - 02/2022"
        },
        {
            name: "Group Policy Library",
            tech: "MySQL · REST APIs · SQL · JSON · JBoss Application Server · HTML · Docker · Node.js · HTML5 · JEE · AngularJS · Git · Maven · OOP · JavaScript · CSS · XML",
            type: "UI Library",
            company: "RGI",
            period: "02/2022 - 05/2022"
        },
        {
            name: "AXA Mobility",
            tech: "MySQL · REST APIs · SQL · JSON · JBoss Application Server · HTML · Docker · Node.js · HTML5 · JEE · AngularJS · Git · Maven · OOP · JavaScript · CSS · XML",
            type: "Mobility Portal",
            company: "RGI",
            period: "03/2022 - 01/2023"
        },
        {
            name: "HalfLife",
            tech: "MySQL · REST APIs · SQL · JSON · JBoss Application Server · HTML · Docker · Node.js · HTML5 · JEE · AngularJS · Git · Java · Maven · OOP · JavaScript · CSS · XML",
            type: "Enterprise Application",
            company: "RGI",
            period: "01/2023 - 03/2023"
        },
        {
            name: "Passportal client",
            tech: "MySQL · REST APIs · SQL · JSON · JBoss Application Server · HTML · Docker · Node.js · HTML5 · JEE · AngularJS · Git · Java · Maven · OOP · JavaScript · CSS · XML",
            type: "Enterprise Application",
            company: "RGI",
            period: "03/2023"
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
                            onClick={() => setSelectedCompany(company)}
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
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {(groupedProjects[selectedCompany] || []).map((proj, idx) => (
                        <Card
                            key={idx}
                            className="bg-white border border-gray-200 text-gray-900 dark:bg-gray-900 dark:border-gray-700 dark:text-white transition-colors duration-300"
                        >
                            <CardContent>
                                <h3 className="text-lg font-semibold">{proj.name}</h3>
                                <p className="text-gray-700 dark:text-gray-400">{proj.company}</p>
                                <p className="text-sm mb-2 text-gray-600 dark:text-gray-500">{proj.period}</p>
                                {proj.type && (
                                    <Textarea
                                        value={t(`project_types.${proj.type}`, proj.type)}
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
                                            <Disclosure.Panel className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                                                {proj.tech}
                                            </Disclosure.Panel>
                                        </div>
                                    )}
                                </Disclosure>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </PageSection>
    );
}
