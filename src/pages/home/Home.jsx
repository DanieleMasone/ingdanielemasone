import {useTranslation} from 'react-i18next';
import {SeoHead} from "@/components/seoHead/SeoHead"
import {AvatarCard} from "@/components/ui/avatarCard/AvatarCard";
import {PageGrid} from "@/components/ui/pageGrid/PageGrid";

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
                <PageGrid
                    page="home"
                    columns={2}
                    className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg"
                    data-testid="page-grid"
                >
                    {/* Avatar: First on mobile, second on desktop */}
                    <div
                        className="flex flex-col justify-center items-center md:items-end space-y-4 order-1 md:order-2">
                        <AvatarCard/>

                        {/* LinkedIn button */}
                        <a
                            href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=ingdanielemasone"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex justify-center items-center
                                        w-[200px] h-8 rounded-full
                                        bg-[#0A66C2] dark:bg-[#0A66C2]/90
                                        text-white
                                        text-base font-sans no-underline
                                        transition-colors duration-300
                                        hover:bg-[#004182] dark:hover:bg-[#004182]/90
                                    "
                        >
                            {t("follow_linkedin")}
                        </a>
                    </div>

                    {/* Text: Second in order on mobile, first on desktop */}
                    <div className="flex flex-col justify-center text-center md:text-left space-y-4 order-2 md:order-1">
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
                </PageGrid>
            </section>
        </>
    );
}
