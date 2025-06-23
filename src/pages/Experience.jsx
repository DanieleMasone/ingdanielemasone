import {useTranslation} from "react-i18next";
import {useState} from "react";
import {Card} from "../components/ui/Card";
import {CardContent} from "../components/ui/CardContent";
import {Disclosure} from "@headlessui/react";
import {ChevronDown} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import PageSection from "../components/ui/PageSection";
import {ExpandableText} from "../components/ui/ExpandableText";

/**
 * Experience component renders a list of professional experiences filtered by selected year.
 *
 * It displays year buttons to filter experiences by year extracted from experience periods.
 * Each experience shows role, company, period, description, and a collapsible panel with technologies used.
 *
 * Uses i18next for translations.
 *
 * @component
 * @module pages/Experience
 * @returns {JSX.Element} The rendered experience section with filtering and animated transitions.
 */
export default function Experience() {
    const {t} = useTranslation();

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
        },
        {
            role: t("exp_coach_role"),
            company: "-",
            period: t("exp_coach_period"),
            description: t("exp_coach_description"),
            tech: "Framework Spring · jQuery · C# · VBA · x86 Assembly · Bash · Matlab · .NET · HTML5 · XML · C · PhpMyAdmin · CSS · HTML · Cisco Technologies · MySQL · PHP · Git · C++"
        }
    ];

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

    return (
        <PageSection title={t("experience_title")}>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
                {yearList.map((year) => (
                    <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`px-4 py-2 rounded-2xl shadow-sm border transition backdrop-blur-sm
                            ${
                            selectedYear === year
                                ? "ring-2 ring-blue-500 border-blue-500 bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-white"
                                : "border-gray-300 dark:border-gray-600 bg-white/30 dark:bg-gray-800/30 text-gray-900 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }
                            ${
                            selectedYear === year
                                ? "bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-white"
                                : "bg-white/30 dark:bg-gray-800/30 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                    >
                        {year}
                    </button>
                ))}
            </div>


            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedYear || "none"}
                    initial={{opacity: 0, y: 40}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -40}}
                    transition={{duration: 0.4}}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredExperiences.map((exp, i) => (
                        <Card
                            key={i}
                            className="h-full bg-white/60 dark:bg-gray-900/40 shadow-xl rounded-2xl backdrop-blur-sm"
                        >
                            <CardContent>
                                <h3 className="text-xl font-semibold mb-1">{exp.role}</h3>
                                <p className="text-gray-700 dark:text-gray-400 font-medium">{exp.company}</p>
                                <p className="text-sm mb-2 text-gray-600 dark:text-gray-500">{exp.period}</p>

                                {exp.description && (
                                    <ExpandableText
                                        value={exp.description}
                                        maxLines={3}
                                        className="mb-2 text-sm text-gray-800 dark:text-gray-200 bg-transparent"
                                    />
                                )}

                                <Disclosure>
                                    {({open}) => (
                                        <div>
                                            <Disclosure.Button
                                                className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline">
                                                <span>{t("experience_show_stack")}</span>
                                                <ChevronDown
                                                    className={`ml-1 w-4 h-4 transition-transform ${
                                                        open ? "rotate-180" : ""
                                                    }`}
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
                </motion.div>
            </AnimatePresence>
        </PageSection>
    );
}
