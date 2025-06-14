import {useTranslation} from 'react-i18next';
import {Card} from "../components/ui/Card";
import {CardContent} from "../components/ui/CardContent";
import {Disclosure} from '@headlessui/react';
import {ChevronDown} from 'lucide-react';
import {Textarea} from "../components/ui/Textarea";
import {useState} from "react";

export default function Courses() {
    const {t} = useTranslation();
    const coursesPerPage = 6;
    const [page, setPage] = useState(1);

    const courses = [
        {
            nameKey: "courses_page.git.title",
            descKey: "courses_page.git.description",
            durationKey: "courses_page.git.duration",
            tech: "Git",
            link: "https://www.udemy.com/course/corso-git/"
        },
        {
            nameKey: "courses_page.typescript.title",
            descKey: "courses_page.typescript.description",
            durationKey: "courses_page.typescript.duration",
            tech: "Typescript, data types, module, OOP ...",
            link: "https://www.udemy.com/course/typescript-da-zero/"
        },
        {
            nameKey: "courses_page.jQuery.title",
            descKey: "courses_page.jQuery.description",
            durationKey: "courses_page.jQuery.duration",
            tech: "jQuery, Selectors, Classes management, Traversing, Manipulating CSS, Bind, Events ...",
            link: "https://www.udemy.com/course/corso-jquery/"
        },
        {
            nameKey: "courses_page.php.title",
            descKey: "courses_page.php.description",
            durationKey: "courses_page.php.duration",
            tech: "Php, data types, Control flow statements, iterations, Regular expressions, Arrays, OOP, HTTP calls, File system ...",
            link: "https://www.udemy.com/course/corso-di-programmazione-php/"
        },
        {
            nameKey: "courses_page.cpp.title",
            descKey: "courses_page.cpp.description",
            durationKey: "courses_page.cpp.duration",
            tech: "C++, data types, control flow statements, iterations, I/O system, arrays and structs, OOP, lambda expressions ...",
            link: "https://www.udemy.com/course/corso-di-programmazione-c-plus-plus/"
        },
        {
            nameKey: "courses_page.html5.title",
            descKey: "courses_page.html5.description",
            durationKey: "courses_page.html5.duration",
            tech: "HTML5, APIs (WebStorage, Web Workers, Drag & Drop ...), Canvas & Multimedia, Header, Footer, Aside ...",
            link: "https://www.udemy.com/course/corso-html5/"
        },
        {
            nameKey: "courses_page.angularJS.title",
            descKey: "courses_page.angularJS.description",
            durationKey: "courses_page.angularJS.duration",
            tech: "AngularJS, scope (the hierarchy), services ($http), control flow statement, directives (bind, ng-class, ng-repeat...), filters, custom directives ...",
            link: "https://www.udemy.com/course/corso-angularjs/"
        },
        {
            nameKey: "courses_page.java.title",
            descKey: "courses_page.java.description",
            durationKey: "courses_page.java.duration",
            tech: "Java, Control flow statements, iterations, arrays, OOP, File management, Lambda expressions, MySQL, MongoDB  ...",
            link: "https://www.udemy.com/course/corso-di-programmazione-java/"
        },
        {
            nameKey: "courses_page.javascript.title",
            descKey: "courses_page.javascript.description",
            durationKey: "courses_page.javascript.duration",
            tech: "Javascript, control flow statements, iterations, arrays, DOM, Design patterns, Arrow function ...",
            link: "https://www.udemy.com/course/corso-di-programmazione-javascript/"
        },
        {
            nameKey: "courses_page.c.title",
            descKey: "courses_page.c.description",
            durationKey: "courses_page.c.duration",
            tech: "C, data types, control flow statements, iterations, arrays, structs ...",
            link: "https://www.udemy.com/course/corso-di-programmazione-c/"
        },
        {
            nameKey: "courses_page.assembler.title",
            descKey: "courses_page.assembler.description",
            durationKey: "courses_page.assembler.duration",
            tech: "AssemblerX86, data types, control flow statement, iterations, arrays ...",
            link: "https://www.udemy.com/course/corso-di-programmazione-assembler-8086/"
        },
        {
            nameKey: "courses_page.sql.title",
            descKey: "courses_page.sql.description",
            durationKey: "courses_page.sql.duration",
            tech: "SQL, C, E/R, DB design ...",
            link: "https://www.udemy.com/course/corso-sulle-basi-di-dati-dallo-schema-er-allsql/"
        }
    ];

    const totalPages = Math.ceil(courses.length / coursesPerPage);

    const displayedCourses = courses.slice(
        (page - 1) * coursesPerPage,
        page * coursesPerPage
    );

    return (
        <section className="p-8 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                {t("courses_page.title")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedCourses.map((course, idx) => (
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

                            <Textarea
                                className="mb-2 mt-2 cursor-default"
                                value={t(course.descKey)}
                                readOnly
                            />

                            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono mb-2">
                                {t("courses_page.duration")}: {t(course.durationKey)}
                            </p>

                            <Disclosure>
                                {({open}) => (
                                    <>
                                        <Disclosure.Button
                                            className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none mt-2"
                                        >
                                            <span>{t("show_technologies")}</span>
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
