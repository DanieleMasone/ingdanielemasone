import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Line} from 'react-chartjs-2';
import {
    CategoryScale,
    Chart as ChartJS,
    ChartOptions,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

export default function TradingPerformanceChart() {
    const {t} = useTranslation();
    const [isDark, setIsDark] = useState(() =>
        document.documentElement.classList.contains('dark')
    );
    const [view, setView] = useState('monthly');

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });
        return () => observer.disconnect();
    }, []);

    const monthlyReturns = [
        -3.58, -1.38, 5.29, -6.27, 0.27, -8.29, 8.74, -3.13, -7.78, 3.44, 7.52, -4.44,
        6.54, -1.86, 2.85, -0.81, 1.96, 3.78, 2.68, -3.01, -3.98, -2.98, 8.07, 4.73,
        -1.26, 2.19, 2.16, -2.68, 4.98, -0.01, 3.18, 2.5, 1.89, -2.89, 1.48, -2.68,
        1.87, -0.41, -1.84, 0.93, 5.78, 2.21, null, null, null, null, null, null,
    ];

    const months = [
        'Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu',
        'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic',
    ];

    const monthlyLabels = [2022, 2023, 2024, 2025].reduce((acc, year) => {
        months.forEach(month => acc.push(`${month} ${year}`));
        return acc;
    }, []);

    // Dati annuali che hai fornito
    const annualLabels = ['2022', '2023', '2024', '2025 (parz.)'];
    const annualReturns = [-10.92, 18.51, 8.83, 8.69];

    // Dataset e labels in base alla view
    const chartData = {
        labels: view === 'monthly' ? monthlyLabels : annualLabels,
        datasets: [
            {
                label: String(t('performance_dataset_label', 'Performance')),
                data: view === 'monthly' ? monthlyReturns : annualReturns,
                fill: true,
                tension: 0.3,
                pointRadius: 3,
                pointHoverRadius: 5,
                spanGaps: true,
                borderColor: isDark ? '#7ee787' : '#4ade80',
                backgroundColor: isDark ? 'rgba(126, 231, 135, 0.3)' : 'rgba(74, 222, 128, 0.2)',
                pointBackgroundColor: isDark ? '#a6f4a6' : '#4ade80',
                pointBorderColor: isDark ? '#4ade80' : '#3a923a',
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: {
                    color: isDark ? '#ddd' : '#333',
                    callback: (value) => `${value}%`,
                },
                grid: {
                    color: isDark ? '#444' : '#ddd',
                },
            },
            x: {
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
                callbacks: {
                    label: (context) => `${context.parsed.y}%`,
                },
            },
        },
    };

    function generateSummary(view: 'monthly' | 'annual') {
        if (view === 'monthly') {
            const monthlyDataByYear = {
                2022: monthlyReturns.slice(0, 12),
                2023: monthlyReturns.slice(12, 24),
                2024: monthlyReturns.slice(24, 36),
                2025: monthlyReturns.slice(36, 48),
            };

            return (
                <div className="space-y-6 text-sm">
                    {Object.entries(monthlyDataByYear).map(([year, monthsData]) => (
                        <div
                            key={year}
                            className="grid grid-cols-[auto_repeat(12,minmax(0,1fr))] gap-2 items-center bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md p-4"
                        >
                            {/* Column 1: Year */}
                            <div className="font-semibold text-lg text-gray-900 dark:text-gray-100 flex items-center justify-center">
                                {year}
                            </div>

                            {/* Columns 2–13: Months */}
                            {monthsData.map((val, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col items-center justify-between bg-white dark:bg-gray-900 rounded-md p-2 shadow-sm"
                                >
                                    {/* Yield */}
                                    <span
                                        className={`text-sm font-semibold ${
                                            val === null
                                                ? 'text-gray-400 dark:text-gray-500'
                                                : val < 0
                                                    ? 'text-red-600 dark:text-red-400'
                                                    : 'text-green-600 dark:text-green-400'
                                        }`}
                                    >
                                        {val !== null ? `${val.toFixed(2).replace('.', ',')}%` : 'na'}
                                    </span>

                                    {/* Name of the month */}
                                    <span className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                                        {months[i]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            );
        } else {
            return (
                <div className="flex flex-wrap justify-center gap-8 text-center text-sm">
                    {annualLabels.map((year, i) => (
                        <div key={year} className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md w-40">
                            <h4 className="mb-2 font-semibold text-lg border-b border-gray-300 dark:border-gray-700 pb-1">{year}</h4>
                            <p className={annualReturns[i] < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-700 dark:text-green-400'}>
                                {t('performance_return_label', 'Rendimento')}: {annualReturns[i] > 0 ? '+' : ''}
                                {annualReturns[i].toFixed(2).replace('.', ',')}%
                            </p>
                        </div>
                    ))}
                </div>
            );
        }
    }


    return (
        <section className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg flex flex-col gap-6">
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

            <div className="w-full h-[700px]">
                <Line data={chartData} options={options}/>
            </div>

            <div className="text-gray-800 dark:text-gray-300 text-sm space-y-6 text-center">
                {generateSummary(view)}
            </div>
        </section>
    );
}
