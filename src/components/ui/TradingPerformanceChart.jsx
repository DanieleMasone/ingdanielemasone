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
 * TradingPerformanceChart component renders a line chart showing trading returns performance,
 * either monthly or annual, with light/dark theme support.
 *
 * It listens for changes in the `dark` CSS class on the document element to update colors dynamically.
 * Users can switch between monthly and annual views via a select dropdown.
 * The chart is rendered with `react-chartjs-2` and `chart.js`.
 * Below the chart, a summary section shows detailed monthly returns by year or annual returns,
 * with color-coded positive/negative values.
 *
 * Translations are supported via react-i18next.
 *
 * @component
 * @module components/ui/TradingPerformanceChart
 * @returns {JSX.Element} The trading performance chart section.
 */
export default function TradingPerformanceChart() {
    const {t} = useTranslation();
    const months = [
        t('months.jan'),
        t('months.feb'),
        t('months.mar'),
        t('months.apr'),
        t('months.may'),
        t('months.jun'),
        t('months.jul'),
        t('months.aug'),
        t('months.sep'),
        t('months.oct'),
        t('months.nov'),
        t('months.dec')
    ];
    const annualLabels = [
        t('annual_labels.2022'),
        t('annual_labels.2023'),
        t('annual_labels.2024'),
        t('annual_labels.2025_partial')
    ];
    const annualReturns = [-10.92, 18.51, 8.83, 8.69];
    const monthlyReturns = [
        -3.58, -1.38, 5.29, -6.27, 0.27, -8.29, 8.74, -3.13, -7.78, 3.44, 7.52, -4.44,
        6.54, -1.86, 2.85, -0.81, 1.96, 3.78, 2.68, -3.01, -3.98, -2.98, 8.07, 4.73,
        -1.26, 2.19, 2.16, -2.68, 4.98, -0.01, 3.18, 2.5, 1.89, -2.89, 1.48, -2.68,
        1.87, -0.41, -1.84, 0.93, 5.78, 3.28, null, null, null, null, null, null,
    ];

    const getCumulativeSum = (returns) => {
        let sum = 0;
        return returns.map((r) => {
            if (r == null) return null;
            sum += r;
            return +sum.toFixed(2);
        });
    };

    const [isDark, setIsDark] = useState(() =>
        document.documentElement.classList.contains('dark')
    );
    const [view, setView] = useState('monthly');

    useEffect(() => {
        const observer = new MutationObserver(() =>
            setIsDark(document.documentElement.classList.contains('dark'))
        );
        observer.observe(document.documentElement, {attributes: true, attributeFilter: ['class']});
        return () => observer.disconnect();
    }, []);

    const isMonthly = view === 'monthly';

    const labels = isMonthly
        ? [2022, 2023, 2024, 2025].flatMap((year) =>
            months.map((m) => `${m} ${year}`)
        )
        : annualLabels;

    const dataSet = isMonthly ? monthlyReturns : annualReturns;


    const cumulative = useMemo(() => getCumulativeSum(dataSet), [dataSet]);

    const cumulativeColor = useMemo(() => {
        const last = cumulative.filter((v) => v != null).at(-1) ?? 0;
        return last >= 0
            ? isDark ? '#7ee787' : '#22c55e'
            : isDark ? '#ff6b81' : '#dc2626';
    }, [cumulative, isDark]);

    const positive = dataSet.map((v) => (v != null && v > 0 ? v : 0));
    const negative = dataSet.map((v) => (v != null && v < 0 ? v : 0));

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
                pointRadius: 4,
                pointHoverRadius: 6,
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
                    maxTicksLimit: 20,
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
        if (isMonthly) {
            const years = {2022: 0, 2023: 12, 2024: 24, 2025: 36};
            return (
                <div className="space-y-8">
                    {Object.entries(years).map(([year, idx]) => {
                        const data = monthlyReturns.slice(idx, idx + 12);
                        return (
                            <div key={year} className="space-y-2">
                                <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{year}</div>
                                <div className="sm:hidden overflow-x-auto">
                                    <div className="flex gap-2 min-w-[720px]">
                                        {data.map((val, i) => (
                                            <ValueBox key={i} value={val} label={months[i]}/>
                                        ))}
                                    </div>
                                </div>
                                <div className="hidden sm:grid grid-cols-12 gap-2">
                                    {data.map((val, i) => (
                                        <ValueBox key={i} value={val} label={months[i]}/>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        }

        return (
            <div className="flex flex-wrap justify-center gap-4 text-center text-sm">
                {annualLabels.map((year, i) => (
                    <div
                        key={year}
                        className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md w-full sm:w-40"
                    >
                        <h4 className="mb-2 font-semibold text-lg border-b border-gray-300 dark:border-gray-700 pb-1">
                            {year}
                        </h4>
                        <p
                            className={
                                annualReturns[i] < 0
                                    ? 'text-red-600 dark:text-red-400'
                                    : 'text-green-700 dark:text-green-400'
                            }
                        >
                            {t('performance_return_label', 'Rendimento')}: {annualReturns[i] > 0 ? '+' : ''}
                            {annualReturns[i].toFixed(2).replace('.', ',')}%
                        </p>
                    </div>
                ))}
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

function ValueBox({ value, label }) {
    const color =
        value == null
            ? 'text-gray-400 dark:text-gray-500'
            : value < 0
                ? 'text-red-600 dark:text-red-400'
                : 'text-green-600 dark:text-green-400';

    return (
        <div
            className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-md p-2 shadow-sm border border-gray-200 dark:border-gray-700 min-w-[60px]">
      <span className={`text-sm font-semibold ${color}`}>
        {value != null ? `${value.toFixed(2).replace('.', ',')}%` : 'na'}
      </span>
            <span className="mt-1 text-xs text-gray-600 dark:text-gray-400">{label}</span>
        </div>
    );
}
