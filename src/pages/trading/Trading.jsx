import {useTranslation} from "react-i18next";
import {PageSection} from "@/components/ui/pageSection/PageSection";
import {SeoHead} from "@/components/seoHead/SeoHead";
import React, {lazy, Suspense} from "react";
import {Loading} from "@/App";

const TradingPerformanceChart = lazy(() =>
    import("@/components/ui/tradingPerformanceChart/TradingPerformanceChart").then(mod => ({default: mod.TradingPerformanceChart}))
);

/**
 * Trading component renders a section with trading introduction text,
 * description, disclaimer, a call-to-action link, and a trading performance chart.
 *
 * Uses translations for all textual content via react-i18next.
 *
 * @component
 * @module pages/trading/Trading
 * @returns {JSX.Element} The Trading page section with content and chart.
 */
export default function Trading() {
    const {t} = useTranslation();
    const paragraphs = [
        t("trading_intro"),
        t("trading_description"),
        t("disclaimer_text"),
    ];

    function ButtonLink({href, children, color}) {
        const baseClasses =
            "flex-1 min-w-[140px] flex items-center justify-center text-center font-semibold rounded-lg px-6 py-3 text-base transition-colors focus:outline-none shadow-md";
        const colorClasses = {
            green: "bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white focus:ring-2 focus:ring-green-400 dark:focus:ring-green-300",
            blue: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-300",
        };

        return (
            <a href={href} target="_blank" rel="noopener noreferrer"
               className={`${baseClasses} ${colorClasses[color]}`}>
                {children}
            </a>
        );
    }

    return (
        <>
            <SeoHead pageKey="trading" path="/trading"/>

            <PageSection title={t("trading_title")}>
                {/* Text above */}
                <div className="flex flex-col justify-start mb-8">
                    {paragraphs.map((text, i) => (
                        <p
                            key={i}
                            className={`${i === 2 ? "text-xs text-gray-500 dark:text-gray-400" : "text-lg text-gray-700 dark:text-gray-300"} mb-4 leading-relaxed`}
                        >
                            {text}
                        </p>
                    ))}

                    {/* Buttons */}
                    <div className="mt-6 flex flex-row gap-4">
                        <ButtonLink href="https://www.etoro.com/people/danielemasone" color="green">
                            {t("trading_cta")}
                        </ButtonLink>
                        <ButtonLink href="https://etoro.tw/44k4LJg" color="blue">
                            {t("trading_signup")}
                        </ButtonLink>
                    </div>
                </div>

                {/* Graph below that takes up all the remaining space */}
                <div className="flex-grow w-full">
                    <Suspense fallback={<Loading/>}>
                        <TradingPerformanceChart/>
                    </Suspense>
                </div>
            </PageSection>
        </>
    );
}
