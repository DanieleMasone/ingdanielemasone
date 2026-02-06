import {useTranslation} from 'react-i18next';
import {SeoHead} from "@/components/seoHead/SeoHead"
import {motion} from "framer-motion";
import {AvatarCard} from "@/components/ui/avatarCard/AvatarCard";

/**
 * Home component displays an about section with a title, introductory text,
 * experience description, and a photo with name and role.
 *
 * It fades in the content on mount by toggling opacity using a local state.
 *
 * Uses `react-i18next` for translations.
 *
 * @component
 * @module pages/home/Home
 * @returns {JSX.Element} The rendered Home section
 */
export default function Home() {
    const {t} = useTranslation();

    return (
        <>
            <SeoHead pageKey="home" path="/"/>

            <section className="px-4 py-8 sm:px-6 md:px-12 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg"
                >
                    {/* Avatar mobile */}
                    <div className="md:hidden flex justify-center mb-6">
                        <AvatarCard/>
                    </div>

                    {/* Left column: text */}
                    <div className="flex flex-col justify-center text-center md:text-left space-y-4">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
                            {t("about_title")}
                        </h2>

                        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            {t("about_intro")}
                        </p>
                        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                            {t("about_experience")}
                        </p>
                    </div>

                    {/* Right column: avatar desktop */}
                    <div className="hidden md:flex items-center justify-center">
                        <AvatarCard/>
                    </div>
                </motion.div>
            </section>
        </>
    );
}
