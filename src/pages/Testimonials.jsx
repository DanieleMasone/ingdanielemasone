import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Disclosure} from "@headlessui/react";
import {ChevronDown} from "lucide-react";
import {Card} from "../components/ui/Card";
import {CardContent} from "../components/ui/CardContent";
import PageSection from "../components/ui/PageSection";

const ITEMS_PER_PAGE = 6;

/**
 * Testimonials component renders a paginated list of testimonial cards.
 * Each card displays the name, role, and a collapsible quote of a person.
 * Pagination allows browsing through all testimonials, showing a fixed number per page.
 *
 * Uses translations for all textual content via react-i18next.
 *
 * @component
 * @module pages/Testimonials
 * @returns {JSX.Element} The Testimonials section with pagination and collapsible testimonial cards.
 */
export default function Testimonials() {
    const {t} = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);

    const testimonials = [
        {
            nameKey: "testimonials_people.mirko.name",
            roleKey: "testimonials_people.mirko.role",
            quoteKey: "testimonials_people.mirko.quote"
        },
        {
            nameKey: "testimonials_people.alessia.name",
            roleKey: "testimonials_people.alessia.role",
            quoteKey: "testimonials_people.alessia.quote"
        },
        {
            nameKey: "testimonials_people.federico.name",
            roleKey: "testimonials_people.federico.role",
            quoteKey: "testimonials_people.federico.quote"
        },
        {
            nameKey: "testimonials_people.daniela.name",
            roleKey: "testimonials_people.daniela.role",
            quoteKey: "testimonials_people.daniela.quote"
        },
        {
            nameKey: "testimonials_people.fabio.name",
            roleKey: "testimonials_people.fabio.role",
            quoteKey: "testimonials_people.fabio.quote"
        },
        {
            nameKey: "testimonials_people.antonio.name",
            roleKey: "testimonials_people.antonio.role",
            quoteKey: "testimonials_people.antonio.quote"
        },
        {
            nameKey: "testimonials_people.andreaM.name",
            roleKey: "testimonials_people.andreaM.role",
            quoteKey: "testimonials_people.andreaM.quote"
        },
        {
            nameKey: "testimonials_people.francescaM.name",
            roleKey: "testimonials_people.francescaM.role",
            quoteKey: "testimonials_people.francescaM.quote"
        },
        {
            nameKey: "testimonials_people.luca.name",
            roleKey: "testimonials_people.luca.role",
            quoteKey: "testimonials_people.luca.quote"
        },
        {
            nameKey: "testimonials_people.antonino.name",
            roleKey: "testimonials_people.antonino.role",
            quoteKey: "testimonials_people.antonino.quote"
        },
        {
            nameKey: "testimonials_people.romolo.name",
            roleKey: "testimonials_people.romolo.role",
            quoteKey: "testimonials_people.romolo.quote"
        },
        {
            nameKey: "testimonials_people.riccardo.name",
            roleKey: "testimonials_people.riccardo.role",
            quoteKey: "testimonials_people.riccardo.quote"
        },
        {
            nameKey: "testimonials_people.lucaC.name",
            roleKey: "testimonials_people.lucaC.role",
            quoteKey: "testimonials_people.lucaC.quote"
        },
        {
            nameKey: "testimonials_people.ivan.name",
            roleKey: "testimonials_people.ivan.role",
            quoteKey: "testimonials_people.ivan.quote"
        },
        {
            nameKey: "testimonials_people.daniele.name",
            roleKey: "testimonials_people.daniele.role",
            quoteKey: "testimonials_people.daniele.quote"
        },
        {
            nameKey: "testimonials_people.marco.name",
            roleKey: "testimonials_people.marco.role",
            quoteKey: "testimonials_people.marco.quote"
        },
        {
            nameKey: "testimonials_people.raffaele.name",
            roleKey: "testimonials_people.raffaele.role",
            quoteKey: "testimonials_people.raffaele.quote"
        },
        {
            nameKey: "testimonials_people.francescaR.name",
            roleKey: "testimonials_people.francescaR.role",
            quoteKey: "testimonials_people.francescaR.quote"
        },
        {
            nameKey: "testimonials_people.mattia.name",
            roleKey: "testimonials_people.mattia.role",
            quoteKey: "testimonials_people.mattia.quote"
        },
        {
            nameKey: "testimonials_people.davide.name",
            roleKey: "testimonials_people.davide.role",
            quoteKey: "testimonials_people.davide.quote"
        },
        {
            nameKey: "testimonials_people.jacopo.name",
            roleKey: "testimonials_people.jacopo.role",
            quoteKey: "testimonials_people.jacopo.quote"
        },
        {
            nameKey: "testimonials_people.yuri.name",
            roleKey: "testimonials_people.yuri.role",
            quoteKey: "testimonials_people.yuri.quote"
        }
    ];

    const totalPages = Math.ceil(testimonials.length / ITEMS_PER_PAGE);

    const displayedTestimonials = testimonials.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <PageSection title={t("testimonials_page.title")}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedTestimonials.map((testi, idx) => (
                    <Card key={idx}
                          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <CardContent>
                            <Disclosure>
                                {({open}) => (
                                    <>
                                        <Disclosure.Button
                                            className="flex justify-between w-full items-center text-left">
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={`https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(t(testi.nameKey))}`}
                                                    alt={`${t(testi.nameKey)} avatar`}
                                                    className="w-10 h-10 rounded-full ring-1 ring-gray-300 dark:ring-gray-700 bg-white"
                                                />
                                                <div>
                                                    <p className="font-semibold">{t(testi.nameKey)}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">{t(testi.roleKey)}</p>
                                                </div>
                                            </div>
                                            <ChevronDown className={`h-5 w-5 transform ${open ? "rotate-180" : ""}`}/>
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                                            {t(testi.quoteKey)}
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-4">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium
                           text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900
                           hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition"
                    >
                        ← {t("testimonials_page.prev")}
                    </button>

                    <span className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
                        {currentPage} / {totalPages}
                    </span>

                    <button
                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium
                           text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900
                           hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition"
                    >
                        {t("testimonials_page.next")} →
                    </button>
                </div>
            )}
        </PageSection>
    );
}
