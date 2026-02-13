import {useTranslation} from "react-i18next";
import {PageSection} from "@/components/ui/pageSection/PageSection";
import {SeoHead} from "@/components/seoHead/SeoHead";
import React, {lazy, Suspense, useEffect, useState} from "react";
import {Loading} from "@/components/loading/Loading";
import {getTradingPerformance} from "@/services/portfolioService";
import {ErrorState} from "@/components/errorState/ErrorState";
import {ButtonLink} from "@/components/ui/buttonLink/ButtonLink";

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
    const [tradingPerformance, setTradingPerformance] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadTradingPerformance = () => {
        setLoading(true);
        setError(null);

        getTradingPerformance()
            .then(setTradingPerformance)
            .catch(setError)
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadTradingPerformance();
    }, []);

    const paragraphs = [
        t("trading_intro"),
        t("trading_description"),
        t("disclaimer_text"),
    ];

    if (loading) return <Loading/>;
    if (error) return <ErrorState message={t("error_generic")} onRetry={loadTradingPerformance}/>;

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
                        <TradingPerformanceChart
                            startYear={tradingPerformance.startYear}
                            monthlyReturns={tradingPerformance.monthlyReturns}
                        />
                    </Suspense>
                </div>
            </PageSection>
        </>
    );
}
