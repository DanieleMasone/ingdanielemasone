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
        <section className="p-8 max-w-7xl mx-auto">
            <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-10 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-10 shadow-lg transition-opacity duration-700 ${
                    isVisible ? "opacity-100" : "opacity-0"
                }`}
            >
                <div className="flex flex-col justify-center">
                    <h2 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight">
                        {t("about_title")}
                    </h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                        {t("about_intro")}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {t("about_experience")}
                    </p>
                </div>

                <div className="flex items-center justify-center">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 max-w-sm w-full glassmorphism">
                        <img
                            src={danielePhoto}
                            alt="Daniele Masone"
                            className="rounded-full w-48 h-48 mx-auto mb-6 object-cover shadow-md hover:scale-105 transition-transform duration-300"
                        />
                        <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-2">
                            Daniele Masone
                        </h3>
                        <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                            Senior Software Engineer / Technical Architect FE
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
