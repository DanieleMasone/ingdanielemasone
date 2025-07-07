import {useTranslation} from 'react-i18next';
import {Card} from "../components/ui/Card";
import {CardContent} from "../components/ui/CardContent";
import {Disclosure} from '@headlessui/react';
import {ChevronDown} from 'lucide-react';
import {useState} from "react";
import PageSection from "../components/ui/PageSection";
import {ExpandableText} from "../components/ui/ExpandableText";
import {AnimatePresence, motion} from "framer-motion";
import gitPhoto from '../assets/courses/GIT.png';
import cPhoto from '../assets/courses/C.png';
import angularjsPhoto from '../assets/courses/ANGULARJS.png';
import assemblyPhoto from '../assets/courses/ASSEMBLY.png';
import cplusplusPhoto from '../assets/courses/CPLUSPLUS.png';
import html5Photo from '../assets/courses/HTML5.png';
import javaPhoto from '../assets/courses/JAVA.png';
import javascriptPhoto from '../assets/courses/JAVASCRIPT.png';
import jqueryPhoto from '../assets/courses/JQUERY.png';
import phpPhoto from '../assets/courses/PHP.png';
import sqlPhoto from '../assets/courses/SQL.png';
import typescriptPhoto from '../assets/courses/TYPESCRIPT.png';
import SeoHead from "../components/ui/SeoHead";

/**
 * Courses component.
 *
 * Displays a paginated list of programming courses, each with title, description,
 * duration, and technologies used.
 *
 * Features:
 * - Uses i18next for translations of titles, descriptions, and UI texts.
 * - Shows 6 courses per page with next/previous pagination buttons.
 * - Each course is displayed inside a Card with expandable technologies section.
 *
 * @component
 * @module pages/Courses
 * @returns {JSX.Element} The rendered Courses page section.
 */
export default function Courses() {
    const {t} = useTranslation();
    const coursesPerPage = 3;
    const [page, setPage] = useState(1);

    const courses = [
        {
            nameKey: "courses_page.git.title",
            descKey: "courses_page.git.description",
            durationKey: "courses_page.git.duration",
            tech: "Git",
            link: "https://www.udemy.com/course/corso-git/",
            image: gitPhoto
        },
        {
            nameKey: "courses_page.typescript.title",
            descKey: "courses_page.typescript.description",
            durationKey: "courses_page.typescript.duration",
            tech: "Typescript, data types, module, OOP ...",
            link: "https://www.udemy.com/course/typescript-da-zero/",
            image: typescriptPhoto
        },
        {
            nameKey: "courses_page.jQuery.title",
            descKey: "courses_page.jQuery.description",
            durationKey: "courses_page.jQuery.duration",
            tech: "jQuery, Selectors, Classes management, Traversing, Manipulating CSS, Bind, Events ...",
            link: "https://www.udemy.com/course/corso-jquery/",
            image: jqueryPhoto
        },
        {
            nameKey: "courses_page.php.title",
            descKey: "courses_page.php.description",
            durationKey: "courses_page.php.duration",
            tech: "Php, data types, Control flow statements, iterations, Regular expressions, Arrays, OOP, HTTP calls, File system ...",
            link: "https://www.udemy.com/course/corso-di-programmazione-php/",
            image: phpPhoto
        },
        {
            nameKey: "courses_page.cpp.title",
            descKey: "courses_page.cpp.description",
            durationKey: "courses_page.cpp.duration",
            tech: "C++, data types, control flow statements, iterations, I/O system, arrays and structs, OOP, lambda expressions ...",
            link: "https://www.udemy.com/course/corso-di-programmazione-c-plus-plus/",
            image: cplusplusPhoto
        },
        {
            nameKey: "courses_page.html5.title",
            descKey: "courses_page.html5.description",
            durationKey: "courses_page.html5.duration",
            tech: "HTML5, APIs (WebStorage, Web Workers, Drag & Drop ...), Canvas & Multimedia, Header, Footer, Aside ...",
            link: "https://www.udemy.com/course/corso-html5/",
            image: html5Photo
        },
        {
            nameKey: "courses_page.angularJS.title",
            descKey: "courses_page.angularJS.description",
            durationKey: "courses_page.angularJS.duration",
            tech: "AngularJS, scope (the hierarchy), services ($http), control flow statement, directives (bind, ng-class, ng-repeat...), filters, custom directives ...",
            link: "https://www.udemy.com/course/corso-angularjs/",
            image: angularjsPhoto
        },
        {
            nameKey: "courses_page.java.title",
            descKey: "courses_page.java.description",
            durationKey: "courses_page.java.duration",
            tech: "Java, Control flow statements, iterations, arrays, OOP, File management, Lambda expressions, MySQL, MongoDB  ...",
            link: "https://www.udemy.com/course/corso-di-programmazione-java/",
            image: javaPhoto
        },
        {
            nameKey: "courses_page.javascript.title",
            descKey: "courses_page.javascript.description",
            durationKey: "courses_page.javascript.duration",
            tech: "Javascript, control flow statements, iterations, arrays, DOM, Design patterns, Arrow function ...",
            link: "https://www.udemy.com/course/corso-di-programmazione-javascript/",
            image: javascriptPhoto
        },
        {
            nameKey: "courses_page.c.title",
            descKey: "courses_page.c.description",
            durationKey: "courses_page.c.duration",
            tech: "C, data types, control flow statements, iterations, arrays, structs ...",
            link: "https://www.udemy.com/course/corso-di-programmazione-c/",
            image: cPhoto
        },
        {
            nameKey: "courses_page.assembler.title",
            descKey: "courses_page.assembler.description",
            durationKey: "courses_page.assembler.duration",
            tech: "AssemblerX86, data types, control flow statement, iterations, arrays ...",
            link: "https://www.udemy.com/course/corso-di-programmazione-assembler-8086/",
            image: assemblyPhoto
        },
        {
            nameKey: "courses_page.sql.title",
            descKey: "courses_page.sql.description",
            durationKey: "courses_page.sql.duration",
            tech: "SQL, C, E/R, DB design ...",
            link: "https://www.udemy.com/course/corso-sulle-basi-di-dati-dallo-schema-er-allsql/",
            image: sqlPhoto
        }
    ];

    const totalPages = Math.ceil(courses.length / coursesPerPage);

    const displayedCourses = courses.slice(
        (page - 1) * coursesPerPage,
        page * coursesPerPage
    );

    return (
        <>
            <SeoHead pageKey="courses" path="/courses"/>

            <PageSection title={t("courses_page.title")}>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={`page-${page}`}
                        initial={{opacity: 0, y: 40}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -40}}
                        transition={{duration: 0.4}}
                        className="flex flex-wrap gap-6"
                    >
                        {displayedCourses.map((course, idx) => (
                            <Card key={idx} className="flex flex-col md:flex-row items-start gap-4 p-4 sm:p-6">
                                <CardContent className="p-0 flex-1">

                                    {/* Title + small image on mobile */}
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold">
                                            {t(course.nameKey)}
                                        </h3>

                                        {/* Mobile small image */}
                                        <a
                                            href={course.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block md:hidden shrink-0 ml-4"
                                        >
                                            <img
                                                src={course.image}
                                                alt={t(course.nameKey)}
                                                className="rounded-full w-16 h-16 object-cover shadow-md hover:scale-105 transition-transform duration-300"
                                                loading="lazy"
                                            />
                                        </a>
                                    </div>

                                    {/* Rest of the content takes full width */}
                                    <ExpandableText
                                        value={t(course.descKey)}
                                        maxLines={3}
                                        className="my-2 cursor-default"
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
                                                        className={`ml-1 w-4 h-4 transition-transform ${
                                                            open ? "rotate-180" : ""
                                                        }`}
                                                    />
                                                </Disclosure.Button>
                                                <Disclosure.Panel
                                                    className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                                                    {course.tech}
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                </CardContent>

                                {/* Desktop large image */}
                                <a
                                    href={course.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hidden md:block shrink-0"
                                >
                                    <img
                                        src={course.image}
                                        alt={t(course.nameKey)}
                                        className="rounded-full w-48 h-48 object-cover shadow-md hover:scale-105 transition-transform duration-300"
                                        loading="lazy"
                                    />
                                </a>
                            </Card>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-8 space-x-4">
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
            </PageSection>
        </>
    );
}
