import {fireEvent, render, screen, within} from '@testing-library/react';
import {TradingPerformanceChart} from './TradingPerformanceChart';
import React from 'react';
import {vi} from 'vitest';

const monthlyReturns = [
    -3.58, -1.38, 5.29, -6.27, 0.27, -8.29, 8.74, -3.13, -7.78, 3.44, 7.52, -4.44,
    6.54, -1.86, 2.85, -0.81, 1.96, 3.78, 2.68, -3.01, -3.98, -2.98, 8.07, 4.73,
    -1.26, 2.19, 2.16, -2.68, 4.98, -0.01, 3.18, 2.5, 1.89, -2.89, 1.48, -2.68,
    1.87, -0.41, -1.84, 0.93, 5.78, 4.38, 1.51, 1.48, 3.43, 2.75, -0.03, 1.20,
    2.24, null, null, null, null, null, null, null, null, null, null, null
];

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => {
            const map = {
                partial: 'partial',
                performance_view_selector_aria: 'View selector',
                performance_title: 'Performance',
                performance_view_monthly: 'Monthly',
                performance_view_annual: 'Annual',
                performance_dataset_label: 'Performance',
                performance_period_label: 'Period',
                performance_return_label: 'Return',
                performance_cumulative: 'Cumulative',
                performance_positive: 'Positive',
                performance_negative: 'Negative',
                performance_no_data: 'N/A',
                performance_no_data_accessible: 'No data',
                months: {
                    jan: 'Jan',
                    feb: 'Feb',
                    mar: 'Mar',
                    apr: 'Apr',
                    may: 'May',
                    jun: 'Jun',
                    jul: 'Jul',
                    aug: 'Aug',
                    sep: 'Sep',
                    oct: 'Oct',
                    nov: 'Nov',
                    dec: 'Dec',
                }
            };

            if (key.includes('.')) {
                const keys = key.split('.');
                let val = map;
                for (const k of keys) {
                    if (val && typeof val === 'object' && k in val) val = val[k];
                    else return key;
                }
                return val;
            }

            return map[key] || key;
        },
        i18n: {changeLanguage: () => Promise.resolve()},
    }),
}));

vi.mock('react-chartjs-2', () => ({
    Chart: ({type, data, options, role, 'aria-label': ariaLabel, 'aria-describedby': ariaDescribedBy}) => (
        <div
            data-testid="mock-chart"
            data-type={type}
            data-dataset-types={data.datasets.map((dataset) => dataset.type).join(',')}
            data-cumulative-background={data.datasets[0].backgroundColor}
            data-cumulative-point-background={data.datasets[0].pointBackgroundColor}
            data-label-count={data.labels.length}
            data-first-label={data.labels[0]}
            data-last-label={data.labels.at(-1)}
            data-legend-position={options.plugins.legend.position}
            data-legend-label-padding={options.plugins.legend.labels.padding}
            role={role}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy}
        />
    )
}));

describe('TradingPerformanceChart', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'innerWidth', {writable: true, configurable: true, value: 1024});
        vi.spyOn(document.documentElement.classList, 'contains').mockImplementation(cls => cls === 'dark');
        render(<TradingPerformanceChart startYear={2022} monthlyReturns={monthlyReturns}/>);
    });

    afterEach(() => {
        Object.defineProperty(window, 'innerWidth', {writable: true, configurable: true, value: 1024});
        vi.restoreAllMocks();
    });

    test('renders chart title and accessible view selector buttons', () => {
        expect(screen.getByRole('heading', {level: 2, name: /performance/i})).toBeInTheDocument();

        const viewSelector = screen.getByRole('group', {name: /view selector/i});
        const monthlyButton = within(viewSelector).getByRole('button', {name: /monthly/i});
        const annualButton = within(viewSelector).getByRole('button', {name: /annual/i});

        expect(monthlyButton).toHaveAttribute('aria-pressed', 'true');
        expect(annualButton).toHaveAttribute('aria-pressed', 'false');
    });

    test('toggles view between monthly and annual', () => {
        const viewSelector = screen.getByRole('group', {name: /view selector/i});
        const annualButton = within(viewSelector).getByRole('button', {name: /annual/i});

        fireEvent.click(annualButton);

        expect(annualButton).toHaveAttribute('aria-pressed', 'true');
        expect(screen.getByTestId('mock-chart')).toHaveAttribute('aria-label', 'Performance - Annual');
    });

    test('renders a mixed Chart.js chart with aligned monthly data', () => {
        const chart = screen.getByTestId('mock-chart');

        expect(chart).toHaveAttribute('data-type', 'bar');
        expect(chart).toHaveAttribute('data-dataset-types', 'line,bar,bar');
        expect(chart).toHaveAttribute('data-cumulative-background', '#7ee787');
        expect(chart).toHaveAttribute('data-cumulative-point-background', '#7ee787');
        expect(chart).toHaveAttribute('data-label-count', '49');
        expect(chart).toHaveAttribute('data-first-label', 'Jan 2022');
        expect(chart).toHaveAttribute('data-last-label', 'Jan 2026');
    });

    test('keeps mobile legend away from the top y-axis tick', () => {
        Object.defineProperty(window, 'innerWidth', {writable: true, configurable: true, value: 390});

        fireEvent(window, new Event('resize'));

        expect(screen.getByTestId('mock-chart')).toHaveAttribute('data-legend-position', 'bottom');
        expect(screen.getByTestId('mock-chart')).toHaveAttribute('data-legend-label-padding', '18');
    });

    test('provides a screen-reader table as the non-canvas chart alternative', () => {
        const summary = document.getElementById('trading-performance-chart-summary');

        expect(summary).toHaveClass('sr-only');
        expect(screen.getByTestId('mock-chart')).toHaveAttribute('aria-describedby', 'trading-performance-chart-summary');
        expect(within(summary).getByRole('table')).toBeInTheDocument();
        expect(within(summary).getByRole('columnheader', {name: /period/i})).toBeInTheDocument();
    });

    test('renders monthly summary values and compact accessible missing-data labels', () => {
        expect(screen.getAllByText('+2,24%').length).toBeGreaterThan(0);
        expect(screen.getAllByText('N/A').length).toBeGreaterThan(0);
        expect(screen.getAllByLabelText('No data').length).toBeGreaterThan(0);
    });

    test('renders annual summary when annual view is selected', () => {
        const annualButton = screen.getByRole('button', {name: /annual/i});
        fireEvent.click(annualButton);

        expect(screen.getAllByText(/2026 \(partial\)/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/Return/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/\+?\d+,\d+%/).length).toBeGreaterThan(0);
        expect(screen.getByTestId('mock-chart')).toHaveAttribute('data-label-count', '5');
    });

    test('detects dark mode from document classList', () => {
        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
});
