import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Line} from 'react-chartjs-2';
import {
    BarController,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from 'chart.js';
import {SelectableButton} from "../selectableButton/SelectableButton";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler,
    BarElement,
    BarController
);


/**
 * TradingPerformanceChart component renders a combined line and bar chart showing
 * trading returns performance, either on a monthly or annual basis, with support for
 * light and dark themes.
 *
 * The component reacts to changes in the `dark` CSS class on the document element
 * to dynamically update chart colors. Users can switch between monthly and annual
 * views via a select dropdown. Below the chart, a summary section displays detailed
 * returns with positive values in green and negative values in red.
 *
 * Translations are supported via `react-i18nex
 *
 * @component
 * @module components/ui/tradingPerformanceChart/TradingPerformanceChart
 *
 * @param {Object} props - Component props.
 * @param {number} [props.startYear=2022] - The first year of the dataset.
 * @param {Array<number | null>} [props.monthlyReturns=Array(12).fill(0)] - Array of monthly returns.
 *    Each entry represents the return for a month in percent. Use `null` for missing data.
 *
 * @returns {JSX.Element} The trading performance chart section.
 */
export function TradingPerformanceChart({
                                            startYear = 2022,
                                            monthlyReturns = Array(12).fill(0) // 12 months of default at 0%
                                        }) {
    const {t} = useTranslation();

// --- States ---
    const [selectedYear, setSelectedYear] = useState("2026");
    const [isDark, setIsDark] = useState(() =>
        document.documentElement.classList.contains('dark')
    );
    const [view, setView] = useState('monthly');
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1024
    );

// --- Effects ---
// Dark mode observer
    useEffect(() => {
        const observer = new MutationObserver(() =>
            setIsDark(document.documentElement.classList.contains('dark'))
        );
        observer.observe(document.documentElement, {attributes: true, attributeFilter: ['class']});
        return () => observer.disconnect();
    }, []);

// Window resize listener
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

// --- Helper functions ---
    const calcAnnualReturn = (months) => {
        const valid = months.filter((r) => r != null);
        let capital = 1;
        valid.forEach((r) => (capital *= 1 + r / 100));
        return +((capital - 1) * 100).toFixed(2);
    };

    const getCumulativeSum = (returns) => {
        let capital = 100;
        return returns.map((r) => {
            if (r == null) return null;
            capital *= 1 + r / 100;
            return +(capital - 100).toFixed(2);
        });
    };

// --- Derived values ---
    const totalMonths = monthlyReturns.length;
    const lastMonthIndex = totalMonths - 1;
    const currentYear = startYear + Math.floor(lastMonthIndex / 12);

    const months = useMemo(() => [
        t('months.jan'), t('months.feb'), t('months.mar'), t('months.apr'),
        t('months.may'), t('months.jun'), t('months.jul'), t('months.aug'),
        t('months.sep'), t('months.oct'), t('months.nov'), t('months.dec')
    ], [t]);

    const allYears = useMemo(
        () => Array.from({length: currentYear - startYear + 1}, (_, i) => startYear + i),
        [startYear, currentYear]
    );

    const annualLabels = useMemo(() =>
            allYears.map((y, idx) => {
                const validMonths = monthlyReturns.slice(idx * 12, (idx + 1) * 12).filter(v => v != null).length;
                return validMonths < 12 ? `${y} (${t('partial')})` : String(y);
            }),
        [allYears, monthlyReturns, t]
    );

    const annualReturns = useMemo(
        () => allYears.map((_, i) => calcAnnualReturn(monthlyReturns.slice(i * 12, i * 12 + 12))),
        [allYears, monthlyReturns]
    );

    const isMonthly = view === 'monthly';

    const dataSet = useMemo(() => (isMonthly ? monthlyReturns : annualReturns), [isMonthly, monthlyReturns, annualReturns]);

    const labels = useMemo(() => isMonthly
            ? allYears.flatMap((year, idx) => {
                const start = idx * 12;
                const remaining = monthlyReturns.slice(start, start + 12).filter(v => v != null);
                return remaining.map((_, i) => `${months[i]} ${year}`);
            })
            : annualLabels,
        [isMonthly, allYears, monthlyReturns, months, annualLabels]
    );

    const cumulative = useMemo(() => getCumulativeSum(dataSet), [dataSet]);

    const cumulativeColor = useMemo(() => {
        const last = cumulative.filter((v) => v != null).at(-1) ?? 0;
        return last >= 0
            ? isDark ? '#7ee787' : '#22c55e'
            : isDark ? '#ff6b81' : '#dc2626';
    }, [cumulative, isDark]);

    const positive = useMemo(() => dataSet.map(v => (v != null && v > 0 ? v : 0)), [dataSet]);
    const negative = useMemo(() => dataSet.map(v => (v != null && v < 0 ? v : 0)), [dataSet]);

    const chartData = {
        labels,
        datasets: [
            {
                type: 'line',
                label: String(t('performance_cumulative')),
                data: cumulative,
                borderColor: cumulativeColor,
                backgroundColor: 'transparent',
                borderWidth: 3,
                pointRadius: windowWidth < 640 ? 1 : 4,
                pointHoverRadius: windowWidth < 640 ? 3 : 6,
                spanGaps: true,
                tension: isMonthly ? 0.3 : 0,
            },
            {
                type: 'bar',
                label: String(t('performance_positive')),
                data: positive,
                backgroundColor: isDark ? 'rgba(126, 231, 135, 0.8)' : 'rgba(74, 222, 128, 0.8)',
                stack: 'stack1',
            },
            {
                type: 'bar',
                label: String(t('performance_negative')),
                data: negative,
                backgroundColor: isDark ? 'rgba(255, 99, 132, 0.8)' : 'rgba(239, 68, 68, 0.8)',
                stack: 'stack1',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                stacked: true,
                beginAtZero: true,
                ticks: {
                    color: isDark ? '#ddd' : '#333',
                    callback: (val) => `${val}%`,
                },
                grid: {
                    color: isDark ? '#444' : '#ddd',
                },
            },
            x: {
                stacked: true,
                ticks: {
                    color: isDark ? '#ddd' : '#333',
                    autoSkip: true,
                    maxTicksLimit: windowWidth < 640 ? 6 : 20 // mobile: 6 tick max
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
                },
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: (ctx) => {
                        const val = ctx.parsed.y;
                        return `${ctx.dataset.label}: ${val >= 0 ? '+' : ''}${val}%`;
                    },
                },
            },
        },
    };

    function renderSummary() {
        const years = Object.fromEntries(
            allYears.map((y, i) => [y, i * 12])
        );

        if (isMonthly) {
            return (
                <div className="space-y-4">
                    {/* Tabs by year */}
                    <div className="mb-4">
                        <div
                            className="relative flex flex-row sm:flex-wrap sm:justify-center gap-2 sm:gap-3 overflow-x-auto sm:overflow-visible no-scrollbar snap-x snap-mandatory sm:snap-none px-2 sm:px-0 pb-3 sm:pb-0"
                        >
                            {[...allYears].reverse().map((year) => (
                                <div key={year} className="snap-start shrink-0 sm:shrink">
                                    <SelectableButton
                                        key={year}
                                        label={year}
                                        isSelected={selectedYear === String(year)}
                                        onClick={() => setSelectedYear(String(year))}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cards for the selected year */}
                    <div className="p-4">
                        {/* Desktop: 12-card grid on one line */}
                        <div className="hidden sm:grid grid-cols-12 gap-3">
                            {monthlyReturns
                                .slice(years[selectedYear], years[selectedYear] + 12)
                                .map((val, i) => {
                                    const isNeutral = val == null || val === "-";
                                    const isPositive = !isNeutral && val >= 0;
                                    const monthIndex = i;
                                    const monthLabel = months[monthIndex] || `M${monthIndex + 1}`;

                                    return (
                                        <div
                                            key={i}
                                            className={`rounded-xl shadow-md p-2 transition transform hover:scale-105 hover:shadow-lg
                                        ${
                                                isNeutral
                                                    ? "bg-gray-100 dark:bg-gray-800"
                                                    : isPositive
                                                        ? "bg-green-50 dark:bg-green-900/20"
                                                        : "bg-red-50 dark:bg-red-900/20"
                                            }`}
                                        >
                                            <h4 className="mb-1 text-sm font-bold text-gray-900 dark:text-gray-100 text-center">
                                                {monthLabel}
                                            </h4>
                                            <p
                                                className={`text-xs font-semibold text-center ${
                                                    isNeutral
                                                        ? "text-gray-500 dark:text-gray-400"
                                                        : isPositive
                                                            ? "text-green-700 dark:text-green-400"
                                                            : "text-red-600 dark:text-red-400"
                                                }`}
                                            >
                                                {t("performance_return_label")}
                                            </p>
                                            <p
                                                className={`mt-1 text-sm font-bold text-center break-words ${
                                                    isNeutral
                                                        ? "text-gray-500 dark:text-gray-400"
                                                        : isPositive
                                                            ? "text-green-700 dark:text-green-400"
                                                            : "text-red-600 dark:text-red-400"
                                                }`}
                                            >
                                                {isNeutral
                                                    ? "—"
                                                    : (val > 0 ? "+" : "") +
                                                    val.toFixed(2).replace(".", ",") +
                                                    "%"}
                                            </p>
                                        </div>
                                    );
                                })}
                        </div>

                        {/* Mobile: horizontal scroll */}
                        <div
                            className="sm:hidden overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-200 dark:scrollbar-track-gray-800">
                            <div className="flex flex-nowrap gap-4 p-2">
                                {monthlyReturns
                                    .slice(years[selectedYear], years[selectedYear] + 12)
                                    .map((val, i) => {
                                        const isNeutral = val == null || val === "-";
                                        const isPositive = !isNeutral && val >= 0;
                                        const monthIndex = i;
                                        const monthLabel = months[monthIndex] || `M${monthIndex + 1}`;

                                        return (
                                            <div
                                                key={i}
                                                className={`flex-shrink-0 w-36 rounded-xl shadow-md p-3 transition transform hover:scale-105 hover:shadow-lg
                                            ${
                                                    isNeutral
                                                        ? "bg-gray-100 dark:bg-gray-800"
                                                        : isPositive
                                                            ? "bg-green-50 dark:bg-green-900/20"
                                                            : "bg-red-50 dark:bg-red-900/20"
                                                }`}
                                            >
                                                <h4 className="mb-1 text-sm font-bold text-gray-900 dark:text-gray-100 text-center">
                                                    {monthLabel}
                                                </h4>
                                                <p
                                                    className={`text-xs font-semibold text-center ${
                                                        isNeutral
                                                            ? "text-gray-500 dark:text-gray-400"
                                                            : isPositive
                                                                ? "text-green-700 dark:text-green-400"
                                                                : "text-red-600 dark:text-red-400"
                                                    }`}
                                                >
                                                    {t("performance_return_label")}
                                                </p>
                                                <p
                                                    className={`mt-1 text-sm font-bold text-center break-words ${
                                                        isNeutral
                                                            ? "text-gray-500 dark:text-gray-400"
                                                            : isPositive
                                                                ? "text-green-700 dark:text-green-400"
                                                                : "text-red-600 dark:text-red-400"
                                                    }`}
                                                >
                                                    {isNeutral
                                                        ? "—"
                                                        : (val > 0 ? "+" : "") +
                                                        val.toFixed(2).replace(".", ",") +
                                                        "%"}
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

        // --- ANNUAL VIEW ---
        return (
            <div className="overflow-x-auto sm:overflow-x-visible">
                <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
                    {annualLabels.map((year, i) => {
                        const isPositive = annualReturns[i] >= 0;

                        return (
                            <div
                                key={year}
                                className={`flex-shrink-0 w-36 sm:w-auto rounded-xl shadow-md p-4 transition transform hover:scale-105 hover:shadow-lg
                            ${
                                    isPositive
                                        ? "bg-green-50 dark:bg-green-900/20"
                                        : "bg-red-50 dark:bg-red-900/20"
                                }`}
                            >
                                <h4 className="mb-2 text-lg font-bold text-gray-900 dark:text-gray-100 text-center">
                                    {year}
                                </h4>
                                <p
                                    className={`text-sm font-semibold text-center ${
                                        isPositive
                                            ? "text-green-700 dark:text-green-400"
                                            : "text-red-600 dark:text-red-400"
                                    }`}
                                >
                                    {t("performance_return_label")}
                                </p>
                                <p
                                    className={`mt-1 text-xl font-bold text-center ${
                                        isPositive
                                            ? "text-green-700 dark:text-green-400"
                                            : "text-red-600 dark:text-red-400"
                                    }`}
                                >
                                    {annualReturns[i] != null
                                        ? (annualReturns[i] > 0 ? "+" : "") +
                                        annualReturns[i].toFixed(2).replace(".", ",") +
                                        "%"
                                        : "—"}
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
            className="max-w-6xl mx-auto px-4 sm:px-6 py-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg flex flex-col gap-6">
            <header className="text-center flex flex-col items-center gap-4">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {t('performance_title')}
                </h3>
                <select
                    className="rounded border border-gray-300 dark:border-gray-700 px-3 py-1 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 cursor-pointer"
                    value={view}
                    onChange={(e) => setView(e.target.value === 'annual' ? 'annual' : 'monthly')}
                    aria-label={t('performance_view_selector_aria')}
                >
                    <option value="monthly">{t('performance_view_monthly')}</option>
                    <option value="annual">{t('performance_view_annual')}</option>
                </select>
            </header>

            <div className="w-full h-[300px] sm:h-[500px] md:h-[700px]">
                <Line data={chartData} options={options}/>
            </div>

            <div className="text-gray-800 dark:text-gray-300 text-sm space-y-6 text-center">
                {renderSummary()}
            </div>
        </section>
    );
}
