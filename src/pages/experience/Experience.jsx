import {useTranslation} from "react-i18next";
import {useState} from "react";
import {Card} from "@/components/ui/card/Card";
import {CardContent} from "@/components/ui/cardContent/CardContent";
import {Disclosure} from "@headlessui/react";
import {ChevronDown} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import {PageSection} from "@/components/ui/pageSection/PageSection";
import {ExpandableText} from "@/components/ui/expandableText/ExpandableText";
import {SeoHead} from "@/components/seoHead/SeoHead";
import {SelectableButton} from "@/components/ui/selectableButton/SelectableButton";

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

    const experiences = [
        {
            role: t("exp_intesa_role"),
            company: "Intesa Sanpaolo",
            period: t("exp_intesa_period"),
            description: t("exp_intesa_description"),
            tech: "Java, Angular, JavaScript, Framework Spring, Maven, HTML5, CSS, Server Windows, JSON, Node.js, Docker, XML, Git"
        },
        {
            role: t("exp_rgi_role"),
            company: "RGI Group",
            period: t("exp_rgi_period"),
            description: t("exp_rgi_description"),
            tech: "MySQL, JavaScript, Docker, JSON, REST APIs, HTML5, Node.js, XML, CSS, HTML, OOP, Openapi, AngularJS, Git, Mapstruct"
        },
        {
            role: t("exp_iol_role"),
            company: "Italiaonline",
            period: t("exp_iol_period"),
            description: t("exp_iol_description"),
            tech: "Spring, JavaScript, Docker, Hibernate, JSON, Java, JBoss Application Server, MySQL, REST APIs, Eclipse, HTML5, JEE, Node.js, XML, Machine learning, CSS, Tomcat, HTML, OOP, AngularJS, Maven, Git",
        },
        {
            role: t("exp_tecnavia_role"),
            company: "Tecnavia Apps",
            period: t("exp_tecnavia_period"),
            description: t("exp_tecnavia_description"),
            tech: "jQuery, React Native, JavaScript, JSON, Java, SQL, REST APIs, Eclipse, HTML5, XML, CSS, Android, HTML, OOP, SQLite, MySQL, PHP, Git",
        },
        {
            role: t("exp_teoresi_role"),
            company: "Teoresi",
            period: t("exp_teoresi_period"),
            description: t("exp_teoresi_description"),
            tech: "jQuery, JavaScript, Hibernate, JSON, JBoss Application Server, SQL, REST APIs, HTML5, JEE, Node.js, XML, CSS, Tomcat, HTML, OOP, AngularJS, Maven, MySQL, Git"
        },
        {
            role: t("exp_hpe_role"),
            company: "Hewlett Packard Enterprise",
            period: t("exp_hpe_period"),
            description: t("exp_hpe_description"),
            tech: "jQuery, JavaScript, PostgreSQL, Hibernate, JSON, JBoss Application Server, SQL, REST APIs, Eclipse, HTML5, JEE, Node.js, XML, CSS, Tomcat, HTML, OOP, AngularJS, Maven, MySQL, Git"
        },
        {
            role: t("exp_digiCamere_role"),
            company: "DigiCamere",
            period: t("exp_digiCamere_period"),
            description: t("exp_digiCamere_description"),
            tech: "Server Windows, Bash, XML, Linux, Tomcat, Active Directory"
        },
        {
            role: t("exp_piksel_role"),
            company: "Piksel",
            period: t("exp_piksel_period"),
            description: t("exp_piksel_description"),
            tech: "Server Windows, Bash, XML, Linux, Tomcat, Active Directory"
        },
        {
            role: t("exp_coach_role"),
            company: "-",
            period: t("exp_coach_period"),
            description: t("exp_coach_description"),
            tech: "Framework Spring, jQuery, C#, VBA, x86 Assembly, Bash, Matlab, .NET, HTML5, XML, C, PhpMyAdmin, CSS, HTML, Cisco Technologies, MySQL, PHP, Git, C++"
        },
        {
            role: t("exp_salesiani_role"),
            company: "Salesiani Sesto San Giovanni",
            period: t("exp_salesiani_period"),
            description: t("exp_salesiani_description"),
            tech: "C, C++, C#, Assembly x86, PHP, MySQL, HTML, CSS, Matlab"
        },
        {
            role: t("exp_polimi_role"),
            company: "Politecnico di Milano",
            period: t("exp_polimi_period"),
            description: t("exp_polimi_description"),
            tech: "Java, C, C++, Android, STM32, USB communication, Embedded systems, Linux"
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
        <>
            <SeoHead pageKey="experience" path="/experience"/>

            <PageSection title={t("experience_title")}>
                <div className="mb-10">
                    {/* Mobile: horizontal scroll - Desktop: grid wrap */}
                    <div
                        className="flex flex-row sm:flex-wrap sm:justify-center gap-2 sm:gap-3 overflow-x-auto sm:overflow-visible px-1 sm:px-0 scrollbar-hide"
                    >
                        {yearList.map((year) => (
                            <SelectableButton
                                key={year}
                                label={year}
                                isSelected={selectedYear === year}
                                onClick={() => setSelectedYear(year)}
                            />
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedYear || "none"}
                        initial={{opacity: 0, y: 40}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -40}}
                        transition={{duration: 0.4}}
                        layout
                        className="flex flex-col items-center gap-6"
                    >
                        {filteredExperiences.map((exp, i) => (
                            <Card
                                key={i}
                                className="relative w-full max-w-2xl md:max-w-3xl p-5 sm:p-6 border border-gray-200/60
                                         dark:border-gray-700/60 bg-white/60 dark:bg-gray-800/40 backdrop-blur-md
                                           rounded-xl hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row items-start gap-4"
                            >
                                <CardContent>
                                    <h3 className="text-lg font-semibold">{exp.role}</h3>
                                    <div className="flex items-center gap-2 mb-2">
                                        <p className="text-gray-700 dark:text-gray-400">{exp.company}</p>
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
                                    <p className="text-sm mb-2 text-gray-600 dark:text-gray-500">{exp.period}</p>

                                    {exp.description && (
                                        <ExpandableText
                                            value={exp.description}
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
                                                    <span>{t("experience_show_stack")}</span>
                                                    <ChevronDown
                                                        className={`ml-1 w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
                                                    />
                                                </Disclosure.Button>
                                                <Disclosure.Panel
                                                    className="mt-2 flex flex-wrap gap-2">
                                                    {exp.tech.split(",").map((t, i) => (
                                                        <span key={i}
                                                              className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300">
                                                                      {t.trim()}
                                                                    </span>
                                                    ))}
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
        </>
    );
}
