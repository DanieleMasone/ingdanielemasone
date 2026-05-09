import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Chart} from 'react-chartjs-2';
import {
    BarController,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Tooltip,
} from 'chart.js';
import {SelectableButton} from "../selectableButton/SelectableButton";
import clsx from "clsx";
import {layoutClasses} from "../../../styles/commonClasses";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    LineController,
    Tooltip,
    Legend,
    BarElement,
    BarController
);

const CHART_SUMMARY_ID = "trading-performance-chart-summary";

const isValidReturn = (value) => Number.isFinite(value);

/**
 * Formats a return value with sign and percentage symbol.
 *
 * @param {number|null|undefined} value - Return value in percent.
 * @param {string} noDataLabel - Localized fallback for missing values.
 * @returns {string} Localized display value.
 */
const formatReturn = (value, noDataLabel) => {
    if (!isValidReturn(value)) return noDataLabel;

    return `${value > 0 ? "+" : ""}${value.toFixed(2).replace(".", ",")}%`;
};

/**
 * Calculates the compounded annual return from monthly returns.
 *
 * @param {Array<number|null>} months - Monthly returns for one year.
 * @returns {number|null} Compounded annual return, or null when no data exists.
 */
const calcAnnualReturn = (months) => {
    const valid = months.filter(isValidReturn);

    if (!valid.length) return null;

    const capital = valid.reduce((value, monthlyReturn) => value * (1 + monthlyReturn / 100), 1);

    return +((capital - 1) * 100).toFixed(2);
};

/**
 * Builds cumulative compounded returns from a return series.
 *
 * @param {Array<number|null>} returns - Return values in percent.
 * @returns {Array<number|null>} Cumulative return values in percent.
 */
const getCumulativeReturns = (returns) => {
    let capital = 100;

    return returns.map((value) => {
        if (!isValidReturn(value)) return null;

        capital *= 1 + value / 100;

        return +(capital - 100).toFixed(2);
    });
};

/**
 * TradingPerformanceChart renders the trading performance section.
 *
 * It combines a cumulative line chart with monthly or annual return bars, adapts
 * chart colors to the current light/dark theme, exposes the chart canvas with an
 * accessible image label, provides a visually hidden data table for assistive
 * technologies, and renders a localized summary of returns below the chart.
 *
 * Translations are provided by `react-i18next`.
 *
 * @component
 * @module components/ui/tradingPerformanceChart/TradingPerformanceChart
 *
 * @param {Object} props - Component props.
 * @param {number} [props.startYear=2022] - The first year of the dataset.
 * @param {Array<number | null>} [props.monthlyReturns=Array(12).fill(0)] - Array of monthly returns.
 *    Each entry represents the return for a month in percent. Use `null` for missing data.
 *
 * @returns {JSX.Element} The trading performance chart and return summary.
 */
export function TradingPerformanceChart({
                                            startYear = 2022,
                                            monthlyReturns = Array(12).fill(0)
                                        }) {
    const {t} = useTranslation();
    const [isDark, setIsDark] = useState(() =>
        typeof document !== "undefined" && document.documentElement.classList.contains('dark')
    );
    const [view, setView] = useState('monthly');
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1024
    );

    const months = useMemo(() => [
        t('months.jan'), t('months.feb'), t('months.mar'), t('months.apr'),
        t('months.may'), t('months.jun'), t('months.jul'), t('months.aug'),
        t('months.sep'), t('months.oct'), t('months.nov'), t('months.dec')
    ], [t]);

    const yearCount = Math.max(1, Math.ceil(monthlyReturns.length / 12));
    const allYears = useMemo(
        () => Array.from({length: yearCount}, (_, i) => startYear + i),
        [startYear, yearCount]
    );
    const availableYears = useMemo(() => {
        const yearsWithData = allYears.filter((_, index) =>
            monthlyReturns.slice(index * 12, index * 12 + 12).some(isValidReturn)
        );

        return yearsWithData.length ? yearsWithData : [startYear];
    }, [allYears, monthlyReturns, startYear]);
    const latestAvailableYear = availableYears.at(-1) ?? startYear;
    const [selectedYear, setSelectedYear] = useState(() => String(latestAvailableYear));

    useEffect(() => {
        if (!availableYears.includes(Number(selectedYear))) {
            setSelectedYear(String(latestAvailableYear));
        }
    }, [availableYears, latestAvailableYear, selectedYear]);

    useEffect(() => {
        if (typeof document === "undefined" || typeof MutationObserver === "undefined") return;

        const observer = new MutationObserver(() =>
            setIsDark(document.documentElement.classList.contains('dark'))
        );
        observer.observe(document.documentElement, {attributes: true, attributeFilter: ['class']});

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const monthlyPoints = useMemo(() =>
            monthlyReturns
                .map((value, index) => ({
                    value,
                    monthIndex: index % 12,
                    year: startYear + Math.floor(index / 12)
                }))
                .filter(({value}) => isValidReturn(value)),
        [monthlyReturns, startYear]
    );

    const annualLabels = useMemo(() =>
            availableYears.map((year) => {
                const index = year - startYear;
                const validMonths = monthlyReturns
                    .slice(index * 12, index * 12 + 12)
                    .filter(isValidReturn).length;

                return validMonths < 12 ? `${year} (${t('partial')})` : String(year);
            }),
        [availableYears, monthlyReturns, startYear, t]
    );

    const annualReturns = useMemo(
        () => availableYears.map((year) => {
            const index = year - startYear;

            return calcAnnualReturn(monthlyReturns.slice(index * 12, index * 12 + 12));
        }),
        [availableYears, monthlyReturns, startYear]
    );

    const isMonthly = view === 'monthly';
    const noDataLabel = t("performance_no_data");
    const chartLabels = useMemo(() => isMonthly
            ? monthlyPoints.map(({monthIndex, year}) => `${months[monthIndex]} ${year}`)
            : annualLabels,
        [isMonthly, monthlyPoints, months, annualLabels]
    );
    const chartReturns = useMemo(() => isMonthly
            ? monthlyPoints.map(({value}) => value)
            : annualReturns,
        [isMonthly, monthlyPoints, annualReturns]
    );
    const cumulative = useMemo(() => getCumulativeReturns(chartReturns), [chartReturns]);
    const cumulativeColor = useMemo(() => {
        const last = cumulative.filter(isValidReturn).at(-1) ?? 0;

        return last >= 0
            ? isDark ? '#7ee787' : '#16a34a'
            : isDark ? '#ff6b81' : '#dc2626';
    }, [cumulative, isDark]);
    const positive = useMemo(() => chartReturns.map(value => value > 0 ? value : null), [chartReturns]);
    const negative = useMemo(() => chartReturns.map(value => value < 0 ? value : null), [chartReturns]);
    const chartAriaLabel = `${t('performance_title')} - ${t(isMonthly ? 'performance_view_monthly' : 'performance_view_annual')}`;
    const chartRows = useMemo(() => chartLabels.map((label, index) => ({
        label,
        returnValue: chartReturns[index],
        cumulativeValue: cumulative[index]
    })), [chartLabels, chartReturns, cumulative]);

    const chartData = useMemo(() => ({
        labels: chartLabels,
        datasets: [
            {
                id: 'cumulative-return',
                type: 'line',
                label: String(t('performance_cumulative')),
                data: cumulative,
                borderColor: cumulativeColor,
                backgroundColor: 'transparent',
                borderWidth: 3,
                fill: false,
                order: 1,
                pointRadius: windowWidth < 640 ? 1 : 4,
                pointHoverRadius: windowWidth < 640 ? 3 : 6,
                spanGaps: false,
                tension: isMonthly ? 0.3 : 0,
            },
            {
                id: 'positive-return',
                type: 'bar',
                label: String(t('performance_positive')),
                data: positive,
                backgroundColor: isDark ? 'rgba(126, 231, 135, 0.8)' : 'rgba(74, 222, 128, 0.8)',
                borderRadius: 6,
                borderSkipped: false,
                grouped: false,
                skipNull: true,
                order: 2,
            },
            {
                id: 'negative-return',
                type: 'bar',
                label: String(t('performance_negative')),
                data: negative,
                backgroundColor: isDark ? 'rgba(255, 99, 132, 0.8)' : 'rgba(239, 68, 68, 0.8)',
                borderRadius: 6,
                borderSkipped: false,
                grouped: false,
                skipNull: true,
                order: 2,
            },
        ],
    }), [chartLabels, cumulative, cumulativeColor, isDark, isMonthly, negative, positive, t, windowWidth]);

    const options = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: t('performance_dataset_label'),
                    color: isDark ? '#e5e7eb' : '#374151',
                },
                ticks: {
                    color: isDark ? '#ddd' : '#333',
                    callback: (value) => `${value}%`,
                },
                grid: {
                    color: isDark ? '#444' : '#ddd',
                },
            },
            x: {
                title: {
                    display: windowWidth >= 640,
                    text: t('performance_period_label'),
                    color: isDark ? '#e5e7eb' : '#374151',
                },
                ticks: {
                    color: isDark ? '#ddd' : '#333',
                    autoSkip: true,
                    maxTicksLimit: windowWidth < 640 ? 6 : 20
                },
                grid: {
                    color: isDark ? '#444' : '#ddd',
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: isDark ? '#eee' : '#333',
                    font: {size: 14, weight: 'bold'},
                    usePointStyle: true,
                },
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${formatReturn(context.raw, noDataLabel)}`,
                },
            },
        },
    }), [isDark, noDataLabel, t, windowWidth]);

    const yearStartIndexes = useMemo(() =>
            Object.fromEntries(availableYears.map((year) => [year, (year - startYear) * 12])),
        [availableYears, startYear]
    );
    const selectedYearReturns = monthlyReturns.slice(
        yearStartIndexes[selectedYear] ?? 0,
        (yearStartIndexes[selectedYear] ?? 0) + 12
    );

    const getReturnCardClass = (value) => clsx(
        "rounded-xl p-3 shadow-md transition hover:shadow-lg",
        isValidReturn(value)
            ? value >= 0
                ? "bg-green-50 dark:bg-green-900/20"
                : "bg-red-50 dark:bg-red-900/20"
            : "bg-gray-100 dark:bg-gray-800"
    );

    const getReturnTextClass = (value) => clsx(
        "text-center font-semibold",
        isValidReturn(value)
            ? value >= 0
                ? "text-green-700 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            : "text-gray-500 dark:text-gray-400"
    );

    function renderSummary() {
        if (isMonthly) {
            return (
                <div className="space-y-4">
                    <div className="mb-4">
                        <div
                            className="relative flex flex-row gap-2 overflow-x-auto px-2 pb-3 snap-x snap-mandatory sm:flex-wrap sm:justify-center sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0 sm:snap-none"
                        >
                            {[...availableYears].reverse().map((year) => (
                                <div key={year} className="shrink-0 snap-start sm:shrink">
                                    <SelectableButton
                                        label={year}
                                        isSelected={selectedYear === String(year)}
                                        onClick={() => setSelectedYear(String(year))}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-4">
                        <div className="hidden grid-cols-12 gap-3 sm:grid">
                            {selectedYearReturns.map((value, index) => {
                                const monthLabel = months[index] || `M${index + 1}`;

                                return (
                                    <div key={monthLabel} className={getReturnCardClass(value)}>
                                        <h4 className="mb-1 text-center text-sm font-bold text-gray-900 dark:text-gray-100">
                                            {monthLabel}
                                        </h4>
                                        <p className={clsx(getReturnTextClass(value), "text-xs")}>
                                            {t("performance_return_label")}
                                        </p>
                                        <p className={clsx(getReturnTextClass(value), "mt-1 break-words text-sm font-bold")}>
                                            {formatReturn(value, noDataLabel)}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="overflow-x-auto overflow-y-hidden sm:hidden">
                            <div className="flex flex-nowrap gap-4 p-2">
                                {selectedYearReturns.map((value, index) => {
                                    const monthLabel = months[index] || `M${index + 1}`;

                                    return (
                                        <div key={monthLabel} className={clsx(getReturnCardClass(value), "w-36 shrink-0")}>
                                            <h4 className="mb-1 text-center text-sm font-bold text-gray-900 dark:text-gray-100">
                                                {monthLabel}
                                            </h4>
                                            <p className={clsx(getReturnTextClass(value), "text-xs")}>
                                                {t("performance_return_label")}
                                            </p>
                                            <p className={clsx(getReturnTextClass(value), "mt-1 break-words text-sm font-bold")}>
                                                {formatReturn(value, noDataLabel)}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="overflow-x-auto sm:overflow-x-visible">
                <div className="flex gap-4 p-2 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {annualLabels.map((year, index) => {
                        const value = annualReturns[index];

                        return (
                            <div key={year} className={clsx(getReturnCardClass(value), "w-36 shrink-0 sm:w-auto")}>
                                <h4 className="mb-2 text-center text-lg font-bold text-gray-900 dark:text-gray-100">
                                    {year}
                                </h4>
                                <p className={clsx(getReturnTextClass(value), "text-sm")}>
                                    {t("performance_return_label")}
                                </p>
                                <p className={clsx(getReturnTextClass(value), "mt-1 text-xl font-bold")}>
                                    {formatReturn(value, noDataLabel)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <section
            className={layoutClasses.tradingChartSection}>
            <header className="flex flex-col items-center gap-4 text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {t('performance_title')}
                </h2>
                <div
                    className={layoutClasses.tradingViewToggleGroup}
                    role="group"
                    aria-label={t('performance_view_selector_aria')}
                >
                    <SelectableButton
                        label={t('performance_view_monthly')}
                        isSelected={isMonthly}
                        onClick={() => setView('monthly')}
                        className="min-w-[9rem]"
                    />
                    <SelectableButton
                        label={t('performance_view_annual')}
                        isSelected={!isMonthly}
                        onClick={() => setView('annual')}
                        className="min-w-[9rem]"
                    />
                </div>
            </header>

            <div className={layoutClasses.screenReaderOnly} id={CHART_SUMMARY_ID}>
                <p>{chartAriaLabel}</p>
                <table>
                    <caption>{chartAriaLabel}</caption>
                    <thead>
                    <tr>
                        <th scope="col">{t('performance_period_label')}</th>
                        <th scope="col">{t('performance_return_label')}</th>
                        <th scope="col">{t('performance_cumulative')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {chartRows.map((row) => (
                        <tr key={row.label}>
                            <th scope="row">{row.label}</th>
                            <td>{formatReturn(row.returnValue, noDataLabel)}</td>
                            <td>{formatReturn(row.cumulativeValue, noDataLabel)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className={layoutClasses.tradingChartCanvas}>
                <Chart
                    type="bar"
                    data={chartData}
                    options={options}
                    datasetIdKey="id"
                    role="img"
                    aria-label={chartAriaLabel}
                    aria-describedby={CHART_SUMMARY_ID}
                />
            </div>

            <div className="space-y-6 text-center text-sm text-gray-800 dark:text-gray-300" aria-live="polite">
                {renderSummary()}
            </div>
        </section>
    );
}
