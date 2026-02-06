import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Disclosure} from "@headlessui/react";
import {ChevronDown} from "lucide-react";
import {Card} from "@/components/ui/card/Card";
import {CardContent} from "@/components/ui/cardContent/CardContent";
import {PageSection} from "@/components/ui/pageSection/PageSection";
import {SeoHead} from "@/components/seoHead/SeoHead";
import {BrandIcon, linkedinIcon} from "@/components/footer/Footer";
import {Pagination} from "@/components/ui/pagination/Pagination";
import {PageGrid} from "@/components/ui/pageGrid/PageGrid";

const ITEMS_PER_PAGE = 4;

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

/**
 * Testimonials component renders a paginated list of testimonial cards.
 * Each card displays the name, role, and a collapsible quote of a person.
 * Pagination allows browsing through all testimonials, showing a fixed number per page.
 *
 * Uses translations for all textual content via react-i18next.
 *
 * @component
 * @module pages/testimonials/Testimonials
 * @returns {JSX.Element} The Testimonials section with pagination and collapsible testimonial cards.
 */
export default function Testimonials() {
    const {t} = useTranslation();
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(testimonials.length / ITEMS_PER_PAGE);

    const displayedTestimonials = testimonials.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    return (
        <>
            <SeoHead pageKey="testimonials" path="/testimonials"/>

            <PageSection title={t("testimonials_page.title")}>
                {/* Pagination mobile sticky */}
                <div
                    className="md:hidden sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md py-2 mb-4 border-b border-gray-200 dark:border-gray-700">
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>

                <PageGrid page={page} className="[&>*]:h-72">
                    {displayedTestimonials.map((texts, idx) => (
                        <Card
                            key={idx}
                            data-testid="testimonial-card"
                            className="relative w-full p-5 sm:p-6 border border-gray-200/60
                                     dark:border-gray-700/60 bg-white/60 dark:bg-gray-800/40 backdrop-blur-md
                                       rounded-xl hover:shadow-lg transition-all duration-300 flex flex-col"
                        >
                            {/* Fixed header */}
                            <div className="flex-shrink-0 mb-4 pb-2 border-b border-gray-200/50 dark:border-gray-700/50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={`https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(t(texts.nameKey))}`}
                                            alt={`${t(texts.nameKey)} avatar`}
                                            className="w-12 h-12 rounded-full ring-2 ring-gray-200 dark:ring-gray-600 bg-white shadow-md"
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                                {t(texts.nameKey)}
                                                {texts.linkedinUrl && (
                                                    <a href={texts.linkedinUrl} target="_blank" rel="noopener noreferrer">
                                                        <BrandIcon icon={linkedinIcon} color="#0A66C2" size={20} />
                                                    </a>
                                                )}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t(texts.roleKey)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Body - takes ALL the remaining height */}
                            <div className="flex-1 flex p-4">
                                <Disclosure as="div" className="w-full h-full flex flex-col">
                                    {({ open }) => (
                                        <div className="h-full flex flex-col">
                                            <Disclosure.Button as="button" className="flex justify-between items-center text-left mb-4 self-start p-3 -m-3 rounded-xl hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all border border-gray-200/30 dark:border-gray-700/30 hover:border-blue-200/50 hover:shadow-sm">
                                              <span className="text-lg font-semibold text-blue-600 dark:text-blue-400 tracking-tight">
                                                  {t("testimonials_page.open")}
                                              </span>
                                                <ChevronDown className={`w-6 h-6 shrink-0 transition-transform duration-200 ease-in-out ${open ? "rotate-180" : ""}`} />
                                            </Disclosure.Button>

                                            <Disclosure.Panel as="div" className="flex-1 mt-3 border-l-4 border-blue-500/80 pl-5 pr-4 py-3 bg-blue-50/30 dark:bg-blue-900/20 rounded-2xl backdrop-blur-sm italic text-lg text-gray-800 dark:text-gray-200 leading-relaxed font-light tracking-wide overflow-auto">
                                                "{t(texts.quoteKey)}"
                                            </Disclosure.Panel>
                                        </div>
                                    )}
                                </Disclosure>
                            </div>
                        </Card>
                    ))}
                </PageGrid>

                {/* Pagination desktop normal */}
                <div className="hidden md:block mt-4">
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>
            </PageSection>
        </>
    );
}
