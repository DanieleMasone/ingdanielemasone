import {useTranslation} from 'react-i18next';

export default function About() {
    const {t} = useTranslation();

    return (
        <section className="p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                {t("about_title")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
                {t("about_intro")}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
                {t("about_experience")}
            </p>
        </section>
    );
}
