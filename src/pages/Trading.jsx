import {useTranslation} from "react-i18next";
import TradingPerformanceChart from "../components/ui/TradingPerformanceChart";
import PageSection from "../components/ui/PageSection";

/**
 * Trading component renders a section with trading introduction text,
 * description, disclaimer, a call-to-action link, and a trading performance chart.
 *
 * Uses translations for all textual content via react-i18next.
 *
 * @component
 * @returns {JSX.Element} The Trading page section with content and chart.
 */
export default function Trading() {
    const {t} = useTranslation();

    return (
        <PageSection title={t("trading_title")}>
            {/* Text above */}
            <div className="flex flex-col justify-start mb-8">
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {t("trading_intro")}
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {t("trading_description")}
                </p>

                {/* Disclaimer */}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-6 leading-relaxed">
                    {t("disclaimer_text")}
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
        </PageSection>
    );
}
