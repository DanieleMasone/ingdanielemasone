import {useTranslation} from "react-i18next";
import {PageSection} from "@/components/ui/pageSection/PageSection";
import {SeoHead} from "@/components/seoHead/SeoHead";
import React, {lazy, Suspense} from "react";
import {Loading} from "@/components/loading/Loading";
import {getTradingPerformance} from "@/services/portfolioService";
import {ErrorState} from "@/components/errorState/ErrorState";
import {ButtonLink} from "@/components/ui/buttonLink/ButtonLink";
import clsx from "clsx";
import {layoutClasses, surfaceClasses} from "@/styles/commonClasses";
import {usePortfolioData} from "@/hooks/usePortfolioData";

const TradingPerformanceChart = lazy(() =>
    import("@/components/ui/tradingPerformanceChart/TradingPerformanceChart").then(mod => ({default: mod.TradingPerformanceChart}))
);

/**
 * Trading component renders a section with trading introduction text,
 * description, disclaimer, call-to-action links, and a trading performance chart.
 * The copy and actions use a responsive layout so CTAs stack on mobile and sit
 * beside the text on wider screens.
 *
 * Uses translations for all textual content via react-i18next.
 *
 * @component
 * @module pages/trading/Trading
 * @returns {JSX.Element} The Trading page section with content and chart.
 */
export default function Trading() {
    const {t} = useTranslation();
    const {
        data: tradingPerformance,
        loading,
        error,
        retry
    } = usePortfolioData(getTradingPerformance, {});

    if (loading) return <Loading/>;
    if (error) return <ErrorState message={t("error_generic")} onRetry={retry}/>;

    return (
        <>
            <SeoHead pageKey="trading" path="/trading"/>

            <PageSection title={t("trading_title")}>
                <div className={layoutClasses.tradingIntroLayout} data-testid="trading-intro-layout">
                    <div className={layoutClasses.tradingIntroCopy}>
                        <p className="text-base leading-7 text-gray-700 dark:text-gray-300 sm:text-lg">
                            {t("trading_intro")}
                        </p>
                        <p className="text-base leading-7 text-gray-700 dark:text-gray-300 sm:text-lg">
                            {t("trading_description")}
                        </p>
                        <p className={clsx(surfaceClasses.insetText, "text-xs leading-6 text-gray-600 dark:text-gray-400")}>
                            {t("disclaimer_text")}
                        </p>
                    </div>

                    <div className={layoutClasses.tradingActionGroup}>
                        <ButtonLink href="https://www.etoro.com/people/danielemasone" color="green">
                            {t("trading_cta")}
                        </ButtonLink>
                        <ButtonLink href="https://etoro.tw/44k4LJg" color="blue">
                            {t("trading_signup")}
                        </ButtonLink>
                    </div>
                </div>

                <div className="w-full">
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
