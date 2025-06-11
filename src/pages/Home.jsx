import {useTranslation} from 'react-i18next';
import danielePhoto from '../assets/daniele.jpg'; // Assicurati che l'immagine esista

export default function Home() {
    const {t} = useTranslation();

    return (
        <section className="p-8 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Text on the left */}
                <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                        {t("home_title", "Ciao, sono Daniele Masone")}
                    </h1>
                    <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
                        {t(
                            "home_subtitle",
                            "Full Stack Software Engineer, Front-End Architect e Technical Team Leader."
                        )}
                    </p>
                    <p className="text-md text-gray-600 dark:text-gray-400">
                        {t(
                            "home_description",
                            "Realizzo applicazioni scalabili, mantenibili e sicure. Lavoro con tecnologie moderne lato front-end e back-end, seguendo i principi dell'architettura pulita e metodologie Agile."
                        )}
                    </p>
                </div>

                {/* Photo on the right */}
                <div
                    className="w-48 h-48 flex-shrink-0 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
                    <img
                        src={danielePhoto}
                        alt="Daniele Masone"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
