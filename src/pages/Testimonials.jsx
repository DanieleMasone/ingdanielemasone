import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Disclosure} from "@headlessui/react";
import {ChevronDown} from "lucide-react";
import {Card} from "../components/ui/Card";
import {CardContent} from "../components/ui/CardContent";
import PageSection from "../components/ui/PageSection";
import {AnimatePresence, motion} from "framer-motion";
import SeoHead from "../components/ui/SeoHead";
import {BrandIcon, linkedinIcon} from "../components/ui/Footer";
import Pagination from "../components/ui/Pagination";

const ITEMS_PER_PAGE = 3;

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
    const [page, setPage] = useState(1);

    const testimonials = [
        {
            nameKey: "testimonials_people.mirko.name",
            roleKey: "testimonials_people.mirko.role",
            quoteKey: "testimonials_people.mirko.quote",
            linkedinUrl: "https://www.linkedin.com/in/mirko-buccoliero-5a552615a"
        },
        {
            nameKey: "testimonials_people.alessia.name",
            roleKey: "testimonials_people.alessia.role",
            quoteKey: "testimonials_people.alessia.quote",
            linkedinUrl: "https://www.linkedin.com/in/alessiapecorarohr"
        },
        {
            nameKey: "testimonials_people.federico.name",
            roleKey: "testimonials_people.federico.role",
            quoteKey: "testimonials_people.federico.quote",
            linkedinUrl: "https://www.linkedin.com/in/federico-s-62a333110"
        },
        {
            nameKey: "testimonials_people.daniela.name",
            roleKey: "testimonials_people.daniela.role",
            quoteKey: "testimonials_people.daniela.quote",
            linkedinUrl: "https://www.linkedin.com/in/danielatagliaviadaragona"
        },
        {
            nameKey: "testimonials_people.fabio.name",
            roleKey: "testimonials_people.fabio.role",
            quoteKey: "testimonials_people.fabio.quote",
            linkedinUrl: "https://www.linkedin.com/in/fabio-lo-guasto"
        },
        {
            nameKey: "testimonials_people.antonio.name",
            roleKey: "testimonials_people.antonio.role",
            quoteKey: "testimonials_people.antonio.quote",
            linkedinUrl: "https://www.linkedin.com/in/antoniosignorello"
        },
        {
            nameKey: "testimonials_people.andreaM.name",
            roleKey: "testimonials_people.andreaM.role",
            quoteKey: "testimonials_people.andreaM.quote",
            linkedinUrl: "https://www.linkedin.com/in/montoli"
        },
        {
            nameKey: "testimonials_people.francescaM.name",
            roleKey: "testimonials_people.francescaM.role",
            quoteKey: "testimonials_people.francescaM.quote",
            linkedinUrl: "https://www.linkedin.com/in/francesca-marasco1994-"
        },
        {
            nameKey: "testimonials_people.luca.name",
            roleKey: "testimonials_people.luca.role",
            quoteKey: "testimonials_people.luca.quote",
            linkedinUrl: "https://www.linkedin.com/in/lucasartorio"
        },
        {
            nameKey: "testimonials_people.antonino.name",
            roleKey: "testimonials_people.antonino.role",
            quoteKey: "testimonials_people.antonino.quote",
            linkedinUrl: "https://www.linkedin.com/in/antonino-de-maio-60531a69"
        },
        {
            nameKey: "testimonials_people.romolo.name",
            roleKey: "testimonials_people.romolo.role",
            quoteKey: "testimonials_people.romolo.quote",
            linkedinUrl: "https://www.linkedin.com/in/romolovelati"
        },
        {
            nameKey: "testimonials_people.riccardo.name",
            roleKey: "testimonials_people.riccardo.role",
            quoteKey: "testimonials_people.riccardo.quote",
            linkedinUrl: "https://www.linkedin.com/in/riccardo-di-chello-932896140"
        },
        {
            nameKey: "testimonials_people.lucaC.name",
            roleKey: "testimonials_people.lucaC.role",
            quoteKey: "testimonials_people.lucaC.quote",
            linkedinUrl: "https://www.linkedin.com/in/luca-c-a4b43955"
        },
        {
            nameKey: "testimonials_people.ivan.name",
            roleKey: "testimonials_people.ivan.role",
            quoteKey: "testimonials_people.ivan.quote",
            linkedinUrl: "https://www.linkedin.com/in/ivan-giurato-63350921"
        },
        {
            nameKey: "testimonials_people.daniele.name",
            roleKey: "testimonials_people.daniele.role",
            quoteKey: "testimonials_people.daniele.quote",
            linkedinUrl: "https://www.linkedin.com/in/daniele-montesano-60a38098"
        },
        {
            nameKey: "testimonials_people.marco.name",
            roleKey: "testimonials_people.marco.role",
            quoteKey: "testimonials_people.marco.quote",
            linkedinUrl: "https://www.linkedin.com/in/marco-gonella-191b9b133"
        },
        {
            nameKey: "testimonials_people.raffaele.name",
            roleKey: "testimonials_people.raffaele.role",
            quoteKey: "testimonials_people.raffaele.quote",
            linkedinUrl: "https://www.linkedin.com/in/raffaele-calandrella-94384558"
        },
        {
            nameKey: "testimonials_people.francescaR.name",
            roleKey: "testimonials_people.francescaR.role",
            quoteKey: "testimonials_people.francescaR.quote",
            linkedinUrl: "https://www.linkedin.com/in/romagnolifrancesca"
        },
        {
            nameKey: "testimonials_people.mattia.name",
            roleKey: "testimonials_people.mattia.role",
            quoteKey: "testimonials_people.mattia.quote",
            linkedinUrl: "https://www.linkedin.com/in/mattiacapitanio"
        },
        {
            nameKey: "testimonials_people.davide.name",
            roleKey: "testimonials_people.davide.role",
            quoteKey: "testimonials_people.davide.quote",
            linkedinUrl: "https://www.linkedin.com/in/davide-perini-4a939a24"
        },
        {
            nameKey: "testimonials_people.jacopo.name",
            roleKey: "testimonials_people.jacopo.role",
            quoteKey: "testimonials_people.jacopo.quote",
            linkedinUrl: "https://www.linkedin.com/in/jacopolatorre"
        },
        {
            nameKey: "testimonials_people.yuri.name",
            roleKey: "testimonials_people.yuri.role",
            quoteKey: "testimonials_people.yuri.quote",
            linkedinUrl: "https://www.linkedin.com/in/yuriblanc"
        },
        {
            nameKey: "testimonials_people.andrea.name",
            roleKey: "testimonials_people.andrea.role",
            quoteKey: "testimonials_people.andrea.quote",
            linkedinUrl: "https://www.linkedin.com/in/andrea-motta-6527b289"
        }
    ];

    const totalPages = Math.ceil(testimonials.length / ITEMS_PER_PAGE);

    const displayedTestimonials = testimonials.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    return (
        <>
            <SeoHead pageKey="testimonials" path="/testimonials"/>

            <PageSection title={t("testimonials_page.title")}>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={`page-${page}`}
                        initial={{opacity: 0, y: 40}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -40}}
                        transition={{duration: 0.4}}
                        className="flex flex-wrap gap-6"
                    >
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
                                                            <div className="flex items-center space-x-2 font-semibold">
                                                                <span>{t(testi.nameKey)}</span>
                                                                {testi.linkedinUrl && (
                                                                    <a
                                                                        href={testi.linkedinUrl}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        aria-label={`LinkedIn profile of ${t(testi.nameKey)}`}
                                                                        className="hover:opacity-80 transition"
                                                                    >
                                                                        <BrandIcon icon={linkedinIcon} color="#0A66C2"
                                                                                   size={20}/>
                                                                    </a>
                                                                )}
                                                            </div>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                {t(testi.roleKey)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <ChevronDown
                                                        className={`h-5 w-5 transform ${open ? "rotate-180" : ""}`}/>
                                                </Disclosure.Button>
                                                <Disclosure.Panel
                                                    className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                                                    {t(testi.quoteKey)}
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                </CardContent>
                            </Card>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Pagination Controls */}
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            </PageSection>
        </>
    );
}
