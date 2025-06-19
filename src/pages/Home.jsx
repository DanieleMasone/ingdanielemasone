import {useTranslation} from 'react-i18next';
import danielePhoto from '../assets/daniele.jpg';
import {useEffect, useState} from "react";

export default function Home() {
    const {t} = useTranslation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="px-4 py-8 sm:px-6 md:px-8 max-w-7xl mx-auto">
            <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-10 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg transition-opacity duration-700 ${
                    isVisible ? "opacity-100" : "opacity-0"
                }`}
            >
                {/* Text content */}
                <div className="flex flex-col justify-center text-center md:text-left">
                    <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-6 text-gray-900 dark:text-white tracking-tight leading-tight">
                        {t("about_title")}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                        {t("about_intro")}
                    </p>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                        {t("about_experience")}
                    </p>
                </div>

                {/* Image + info */}
                <div className="flex items-center justify-center">
                    <div
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6 w-full max-w-xs sm:max-w-sm">
                        <img
                            src={danielePhoto}
                            alt="Daniele Masone"
                            className="rounded-full w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-4 sm:mb-6 object-cover shadow-md hover:scale-105 transition-transform duration-300"
                        />
                        <h3 className="text-lg sm:text-xl font-semibold text-center text-gray-900 dark:text-white mb-1 sm:mb-2">
                            Daniele Masone
                        </h3>
                        <p className="text-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                            Senior Software Engineer / Technical Architect FE
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
