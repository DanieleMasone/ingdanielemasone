import {useTranslation} from 'react-i18next';
import {Card} from "../components/ui/Card";
import {CardContent} from "../components/ui/CardContent";
import {Disclosure} from '@headlessui/react';
import {ChevronDown} from 'lucide-react';

export default function Projects() {
    const {t} = useTranslation();

    const projects = [
        {
            name: "Fastweb OLO Gateway",
            tech: "AngularJS, Spring, CouchDB",
            type: "Enterprise Portal"
        },
        {
            name: "io.T Tecno",
            tech: "AngularJS, NodeJS, MySQL",
            type: "IoT Workplace Booking"
        },
        {
            name: "Newsmemory",
            tech: "PHP, Java, MySQL",
            type: "Newspaper CMS"
        },
        {
            name: "2In1App",
            tech: "React Native, ObjC, Java",
            type: "Hybrid Mobile App"
        },
        {
            name: "AfterLife",
            tech: "Angular 8, Docker, Oracle",
            type: "Insurance Web Portal"
        },
        {
            name: "AXA Mobility",
            tech: "Angular 8, Oracle",
            type: "Mobility Portal"
        },
        {
            name: "Group Policy Library",
            tech: "Angular 8, PostgreSQL",
            type: "UI Library"
        },
        {
            name: "HalfLife",
            tech: "Angular 12, Docker, MongoDB",
            type: "Enterprise Application"
        },
    ];

    return (
        <section className="p-8 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                {t("projects_title", "Progetti")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((proj, idx) => (
                    <Card
                        key={idx}
                        className="bg-white border border-gray-200 text-gray-900 dark:bg-gray-900 dark:border-gray-700 dark:text-white transition-colors duration-300"
                    >
                        <CardContent>
                            <h3 className="text-lg font-semibold">{proj.name}</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {t(`project_types.${proj.type}`, proj.type)}
                            </p>

                            <Disclosure>
                                {({open}) => (
                                    <>
                                        <Disclosure.Button
                                            className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none mt-2"
                                        >
                                            <span>{t("show_technologies", "Mostra tecnologie")}</span>
                                            <ChevronDown
                                                className={`ml-1 w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                                            {proj.tech}
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
