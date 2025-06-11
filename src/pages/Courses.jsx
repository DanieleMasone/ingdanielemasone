import {useTranslation} from 'react-i18next';
import {Card} from "../components/ui/Card";
import {CardContent} from "../components/ui/CardContent";
import {Disclosure} from '@headlessui/react';
import {ChevronDown} from 'lucide-react';

export default function Courses() {
    const {t} = useTranslation();

    const courses = [
        {
            nameKey: "courses_page.react.title",
            descKey: "courses_page.react.description",
            durationKey: "courses_page.react.duration",
            tech: "React, Vite, Redux Toolkit, Testing Library",
            link: "https://www.ingdanielemasone.com/courses/react-avanzato"
        },
        {
            nameKey: "courses_page.node.title",
            descKey: "courses_page.node.description",
            durationKey: "courses_page.node.duration",
            tech: "Node.js, Express, JWT, REST, MongoDB",
            link: "https://www.ingdanielemasone.com/courses/node-express"
        },
        {
            nameKey: "courses_page.k8s.title",
            descKey: "courses_page.k8s.description",
            durationKey: "courses_page.k8s.duration",
            tech: "Kubernetes, Helm, Docker, Ingress, Services",
            link: "https://www.ingdanielemasone.com/courses/kubernetes"
        },
        {
            nameKey: "courses_page.angular.title",
            descKey: "courses_page.angular.description",
            durationKey: "courses_page.angular.duration",
            tech: "Angular 16, RxJS, Signals, Router, Standalone components",
            link: "https://www.ingdanielemasone.com/courses/angular"
        },
    ];

    return (
        <section className="p-8 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                {t("courses_page.title")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, idx) => (
                    <Card
                        key={idx}
                        className="bg-white border border-gray-200 text-gray-900 dark:bg-gray-900 dark:border-gray-700 dark:text-white transition-colors duration-300"
                    >
                        <CardContent>
                            <h3 className="text-lg font-semibold">
                                <a
                                    href={course.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    {t(course.nameKey)}
                                </a>
                            </h3>

                            <p className="text-gray-600 dark:text-gray-400 mb-2">
                                {t(course.descKey)}
                            </p>

                            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono mb-2">
                                {t("courses_page.duration")}: {t(course.durationKey)}
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
                                            {course.tech}
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
