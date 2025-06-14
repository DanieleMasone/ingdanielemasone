import {useTranslation} from "react-i18next";
import {Card} from "../components/ui/Card";
import {CardContent} from "../components/ui/CardContent";
import {Disclosure} from '@headlessui/react';
import {ChevronDown} from 'lucide-react';
import {Textarea} from "../components/ui/Textarea";
import {useState} from "react";

export default function Experience() {
    const {t} = useTranslation();
    const [page, setPage] = useState(1);
    const itemsPerPage = 3;

    const experiences = [
        {
            role: t("exp_rgi_role"),
            company: "RGI Group",
            period: t("exp_rgi_period"),
            description: t("exp_rgi_description"),
            tech: "MySQL · JavaScript · Docker · JSON · REST APIs · HTML5 · Node.js · XML · CSS · HTML · OOP · Openapi · AngularJS · Git · Mapstruct"
        },
        {
            role: t("exp_iol_role"),
            company: "Italiaonline",
            period: t("exp_iol_period"),
            description: t("exp_iol_description"),
            tech: "Spring · JavaScript · Docker · Hibernate · JSON · Java · JBoss Application Server · MySQL · REST APIs · Eclipse · HTML5 · JEE · Node.js · XML · Machine learning · CSS · Tomcat · HTML · OOP · AngularJS · Maven · Git",
        },
        {
            role: t("exp_tecnavia_role"),
            company: "Tecnavia Apps",
            period: t("exp_tecnavia_period"),
            description: t("exp_tecnavia_description"),
            tech: " jQuery · React Native · JavaScript · JSON · Java · SQL · REST APIs · Eclipse · HTML5 · XML · CSS · Android · HTML · OOP · SQLite · MySQL · PHP · Git",
        },
        {
            role: t("exp_teoresi_role"),
            company: "Teoresi",
            period: t("exp_teoresi_period"),
            description: t("exp_teoresi_description"),
            tech: " jQuery · JavaScript · Hibernate · JSON · JBoss Application Server · SQL · REST APIs · HTML5 · JEE · Node.js · XML · CSS · Tomcat · HTML · OOP · AngularJS · Maven · MySQL · Git"
        },
        {
            role: t("exp_hpe_role"),
            company: "Hewlett Packard Enterprise",
            period: t("exp_hpe_period"),
            description: t("exp_hpe_description"),
            tech: "jQuery · JavaScript · PostgreSQL · Hibernate · JSON · JBoss Application Server · SQL · REST APIs · Eclipse · HTML5 · JEE · Node.js · XML · CSS · Tomcat · HTML · OOP · AngularJS · Maven · MySQL · Git"
        },
        {
            role: t("exp_digiCamere_role"),
            company: "DigiCamere",
            period: t("exp_digiCamere_period"),
            description: t("exp_digiCamere_description"),
            tech: "Server Windows · Bash · XML · Linux · Tomcat · Active Directory"
        },
        {
            role: t("exp_piksel_role"),
            company: "Piksel",
            period: t("exp_piksel_period"),
            description: t("exp_piksel_description"),
            tech: "Server Windows · Bash · XML · Linux · Tomcat · Active Directory"
        }
    ];

    const totalPages = Math.ceil(experiences.length / itemsPerPage);

    const displayedExperiences = experiences.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return (
        <section className="p-8 max-w-7xl mx-auto relative">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                {t("experience_title")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedExperiences.map((exp, i) => (
                    <Card key={i} className="h-full">
                        <CardContent>
                            <h3 className="text-lg font-semibold">{exp.role}</h3>
                            <p className="text-gray-700 dark:text-gray-400">{exp.company}</p>
                            <p className="text-sm mb-2 text-gray-600 dark:text-gray-500">{exp.period}</p>

                            {exp.description && (
                                <Textarea
                                    value={exp.description}
                                    className="mb-2 text-sm"
                                    readOnly
                                />
                            )}

                            <Disclosure>
                                {({open}) => (
                                    <div>
                                        <Disclosure.Button
                                            className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
                                        >
                                            <span>{t("experience_show_stack")}</span>
                                            <ChevronDown
                                                className={`ml-1 w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                                            {exp.tech}
                                        </Disclosure.Panel>
                                    </div>
                                )}
                            </Disclosure>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center space-x-4 mt-8">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-3 py-1 rounded disabled:opacity-50 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                    {t("previous")}
                </button>
                <span className="px-3 py-1">
                    {page} / {totalPages}
                </span>
                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-3 py-1 rounded disabled:opacity-50 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                    {t("next")}
                </button>
            </div>
        </section>
    );
}
