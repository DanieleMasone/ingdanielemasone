import {useTranslation} from "react-i18next";
import TradingPerformanceChart from "../components/ui/TradingPerformanceChart";

export default function Trading() {
    const {t} = useTranslation();

    return (
        <section
            className="max-w-6xl mx-auto p-8 flex flex-col min-h-[800px]"
        >
            {/* Text above */}
            <div className="flex flex-col justify-start mb-8">
                <h2 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight">
                    {t("trading_title")}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {t(
                        "trading_intro",
                        "Parallelamente al mio lavoro tech, mi dedico con metodo e disciplina al trading finanziario."
                    )}
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {t(
                        "trading_description",
                        "Dal 2020 opero sulla piattaforma eToro, con un approccio orientato al lungo termine, analisi fondamentale e gestione del rischio."
                    )}
                </p>

                <a
                    href="https://www.etoro.com/people/danielemasone"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg px-6 py-3 text-center text-base transition-colors"
                >
                    {t("trading_cta")}
                </a>
            </div>

            {/* Graph below that takes up all the remaining space */}
            <div className="flex-grow w-full">
                <TradingPerformanceChart/>
            </div>

        </section>
    );
}
