import {useTranslation} from "react-i18next";
import TradingPerformanceChart from "../components/ui/TradingPerformanceChart";
import PageSection from "../components/ui/PageSection";
import SeoHead from "../components/ui/SeoHead";

/**
 * Trading component renders a section with trading introduction text,
 * description, disclaimer, a call-to-action link, and a trading performance chart.
 *
 * Uses translations for all textual content via react-i18next.
 *
 * @component
 * @module pages/Trading
 * @returns {JSX.Element} The Trading page section with content and chart.
 */
export default function Trading() {
    const {t} = useTranslation();

    return (
        <>
            <SeoHead pageKey="trading" path="/trading"/>

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

                    {/* Buttons */}
                    <div className="mt-6 flex flex-row gap-4">
                        <a
                            href="https://www.etoro.com/people/danielemasone"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-w-[140px] flex items-center justify-center text-center bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-semibold rounded-lg px-6 py-3 text-base transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-300 shadow-md"
                        >
                            {t("trading_cta")}
                        </a>

                        <a
                            href="https://etoro.tw/44k4LJg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-w-[140px] flex items-center justify-center text-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg px-6 py-3 text-base transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-300 shadow-md"
                        >
                            {t("trading_signup")}
                        </a>
                    </div>
                </div>

                {/* Graph below that takes up all the remaining space */}
                <div className="flex-grow w-full">
                    <TradingPerformanceChart/>
                </div>
            </PageSection>
        </>
    );
}
