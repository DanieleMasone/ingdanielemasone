import {Award, ExternalLink} from "lucide-react";
import {useTranslation} from "react-i18next";
import {Card} from "../../components/ui/card/Card";
import {CardContent} from "../../components/ui/cardContent/CardContent";
import PageSection from "../../components/ui/pageSection/PageSection";
import {AnimatePresence, motion} from "framer-motion";
import SeoHead from "../../components/seoHead/SeoHead";
import {useState} from "react";
import Pagination from "../../components/ui/pagination/Pagination";

const ITEMS_PER_PAGE = 3;

/**
 * Certifications component.
 *
 * Displays a paginated list of professional certifications, each with title, issuer, and date.
 *
 * Features:
 * - Uses i18next for translations.
 * - Shows 6 certifications per page with next/previous pagination buttons.
 * - Includes smooth animations via Framer Motion for entry transitions.
 *
 * @component
 * @module pages/certifications/Certifications
 * @returns {JSX.Element} The rendered Certifications page section.
 */
export default function Certifications() {
    const {t} = useTranslation();
    const [page, setPage] = useState(1);

    const certifications = [
        {
            nameKey: "English CEFR Level B2.2",
            issuer: "Speexx",
            date: "2024",
            link: "https://portal.speexx.com/certificate/ZTAxY2Y5ZTktNGRjMi00Yzc0LWFjYmQtZjAzOTIyZDNmZjdmOjo4Mg=="
        },
        {
            nameKey: "English CEFR Level B2.1",
            issuer: "Speexx",
            date: "2024",
            link: "https://portal.speexx.com/certificate/ZTAxY2Y5ZTktNGRjMi00Yzc0LWFjYmQtZjAzOTIyZDNmZjdmOjo4MQ=="
        },
        {
            nameKey: "English CEFR Level B1.2",
            issuer: "Speexx",
            date: "2024",
            link: "https://portal.speexx.com/certificate/ZTAxY2Y5ZTktNGRjMi00Yzc0LWFjYmQtZjAzOTIyZDNmZjdmOjo4MA=="
        },
        {
            nameKey: "English CEFR Level B1.1",
            issuer: "Speexx",
            date: "2023",
            link: "https://portal.speexx.com/certificate/ZTAxY2Y5ZTktNGRjMi00Yzc0LWFjYmQtZjAzOTIyZDNmZjdmOjo3OQ=="
        },
        {
            nameKey: "Codemotion Milan",
            issuer: "Codemotion",
            date: "2023",
            link: "https://credsverse.com/credentials/070cb7c9-c2c8-4bf5-b27b-df66298f9561",
        },
        {
            nameKey: "Codemotion Workshop Fest",
            issuer: "Codemotion",
            date: "2023",
            link: "https://credsverse.com/credentials/98c00e0e-8cb8-41d1-96b0-515b1b2842ef",
        }
    ];

    const totalPages = Math.ceil(certifications.length / ITEMS_PER_PAGE);

    const displayedCerts = certifications.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    return (
        <>
            <SeoHead pageKey="certifications" path="/certifications"/>

            <PageSection title={t("certifications_page.title")}>
                {/* Pagination mobile sticky */}
                <div
                    className="md:hidden sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md py-2 mb-4 border-b border-gray-200 dark:border-gray-700">
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={`page-${page}`}
                        initial={{opacity: 0, y: 40}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -40}}
                        transition={{duration: 0.4}}
                        layout
                        className="flex flex-col items-center gap-6"
                    >
                        {displayedCerts.map((cert, idx) => (
                            <Card
                                key={idx}
                                className="relative w-full max-w-2xl md:max-w-3xl p-5 sm:p-6 border border-gray-200/60
                                   dark:border-gray-700/60 bg-white/60 dark:bg-gray-800/40 backdrop-blur-md
                                   rounded-xl hover:shadow-lg transition-all duration-300"
                            >
                                {/* Decorative icon at the top right */}
                                <div className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full
                                      bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 shadow-sm">
                                    <Award className="w-5 h-5"/>
                                </div>

                                <CardContent className="p-0">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                        {t(cert.nameKey)}
                                    </h3>

                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-mono mb-3">
                                        {cert.issuer} — {cert.date}
                                    </p>

                                    <a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400
                                         hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                    >
                                        {t("view_certificate", "View Certificate")}
                                        <ExternalLink className="w-4 h-4 ml-1"/>
                                    </a>
                                </CardContent>

                                {/* Hover effect */}
                                <div className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity
                                        duration-500 bg-gradient-to-r from-blue-50/30 to-transparent dark:from-blue-900/10"/>
                            </Card>
                        ))}
                    </motion.div>
                </AnimatePresence>

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
