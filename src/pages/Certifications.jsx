import {Award, ExternalLink} from "lucide-react";
import {useTranslation} from "react-i18next";
import {Card} from "../components/ui/Card";
import {CardContent} from "../components/ui/CardContent";
import PageSection from "../components/ui/PageSection";
import {AnimatePresence, motion} from "framer-motion";
import SeoHead from "../components/ui/SeoHead";
import {useState} from "react";
import Pagination from "../components/ui/Pagination";

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
 * @module pages/Certifications
 * @returns {JSX.Element} The rendered Certifications page section.
 */
export default function Certifications() {
    const {t} = useTranslation();
    const [page, setPage] = useState(1);

    const certifications = [
        {
            nameKey: "Speexx English CEFR Level B2.2",
            issuer: "Speexx",
            date: "2024",
            link: "https://portal.speexx.com/certificate/MDBmOTRlZTctYzc5Zi00OGUzLTk0OWQtMDU0MDc2NDg2NmQ5Ojo4Mg==",
        },
        {
            nameKey: "Speexx English CEFR Level B2.1",
            issuer: "Speexx",
            date: "2024",
            link: "https://portal.speexx.com/certificate/NzY3NzczMTo6ODE=",
        },
        {
            nameKey: "Speexx English CEFR Level B1.2",
            issuer: "Speexx",
            date: "2024",
            link: "https://portal.speexx.com/certificate/NzY3NzczMTo6ODA=",
        },
        {
            nameKey: "Speexx English CEFR Level B1.1",
            issuer: "Speexx",
            date: "2023",
            link: "https://portal.speexx.com/certificate/NzY3NzczMTo6Nzk=",
        },
        {
            nameKey: "Codemotion Milan 2023",
            issuer: "Codemotion",
            date: "2023",
            link: "https://credsverse.com/credentials/070cb7c9-c2c8-4bf5-b27b-df66298f9561",
        },
        {
            nameKey: "Codemotion Workshop Fest 2023",
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

                <AnimatePresence mode="wait">
                    <motion.div
                        key={`page-${page}`}
                        initial={{opacity: 0, y: 40}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -40}}
                        transition={{duration: 0.4}}
                        className="flex flex-wrap gap-6"
                    >
                        {displayedCerts.map((cert, idx) => (
                            <Card
                                key={idx}
                                className="flex flex-col md:flex-row items-start gap-4 p-4 sm:p-6"
                            >
                                <CardContent className="p-0 flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Award className="w-6 h-6 text-blue-500 dark:text-blue-400"/>
                                            <h3 className="text-lg font-semibold">
                                                {t(cert.nameKey)}
                                            </h3>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-mono mb-2">
                                        {cert.issuer} — {cert.date}
                                    </p>

                                    <a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2"
                                    >
                                        {t("view_certificate", "View Certificate")}
                                        <ExternalLink className="w-4 h-4 ml-1"/>
                                    </a>
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
