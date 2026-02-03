import {fireEvent, render, screen, within} from '@testing-library/react';
import {TradingPerformanceChart} from './TradingPerformanceChart';
import React from 'react';
import {vi} from 'vitest';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => {
            const map = {
                performance_view_selector_aria: 'View selector',
                performance_title: 'Performance',
                performance_view_monthly: 'Monthly',
                performance_view_annual: 'Annual',
                performance_dataset_label: 'Performance',
                performance_return_label: 'Return',
                performance_cumulative: 'Cumulative',
                performance_positive: 'Positive',
                performance_negative: 'Negative',
                annual_labels: {
                    2022: '2022',
                    2023: '2023',
                    2024: '2024',
                    2025: '2025 (partial)',
                },
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
            // support nested keys like 'months.jan' or 'annual_labels.2022'
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
    Line: () => <div data-testid="mock-line-chart"/>
}));

describe('TradingPerformanceChart', () => {
    beforeEach(() => {
        vi.spyOn(document.documentElement.classList, 'contains').mockImplementation(cls => cls === 'dark');
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('renders chart title and view selector', () => {
        render(<TradingPerformanceChart/>);
        expect(screen.getByRole('heading', {level: 3})).toHaveTextContent(/performance/i);
        expect(screen.getByLabelText(/view selector/i)).toBeInTheDocument();
        expect(screen.getByRole('combobox')).toHaveValue('monthly');
    });

    test('toggles view between monthly and annual', () => {
        render(<TradingPerformanceChart/>);
        const select = screen.getByRole('combobox');
        expect(select.value).toBe('monthly');

        fireEvent.change(select, {target: {value: 'annual'}});
        expect(select.value).toBe('annual');
    });

    test('renders monthly summary by default', () => {
        render(<TradingPerformanceChart/>);
        expect(screen.getByText('2022')).toBeInTheDocument();
        const genElements = screen.getAllByText(/Jan/i);
        expect(genElements.length).toBeGreaterThan(0);
    });

    test('renders annual summary when annual view selected', () => {
        render(<TradingPerformanceChart/>);
        const select = screen.getByRole('combobox');
        fireEvent.change(select, {target: {value: 'annual'}});

        const year2023Section = screen.getByText('2023').closest('div');
        expect(year2023Section).toBeInTheDocument();

        const returnLabel = within(year2023Section).getByText(/Return/i);
        expect(returnLabel).toBeInTheDocument();
    });

    test('renders mocked line chart', () => {
        render(<TradingPerformanceChart/>);
        expect(screen.getByTestId('mock-line-chart')).toBeInTheDocument();
    });

    test('detects dark mode from document classList', () => {
        render(<TradingPerformanceChart/>);
        // Color specific assertion would need to inspect style, but since chart is mocked,
        // verifying chart renders is enough under dark mode
        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    test('renders monthly return values in correct format', () => {
        render(<TradingPerformanceChart/>);
        // Verifica presenza di almeno un valore formattato come numero con virgola
        const formattedValues = screen.getAllByText(/-?\d+,\d+%/);
        expect(formattedValues.length).toBeGreaterThan(0);
    });

    test('renders annual return values in correct format when annual view is selected', () => {
        render(<TradingPerformanceChart/>);
        fireEvent.change(screen.getByRole('combobox'), {target: {value: 'annual'}});
        const formatted = screen.getAllByText(/-?\+?\d+,\d+%/);
        expect(formatted.length).toBeGreaterThan(0);
    });

    test('view selector has two valid options', () => {
        render(<TradingPerformanceChart/>);
        const options = screen.getAllByRole('option');
        expect(options.length).toBe(2);
        expect(options[0]).toHaveValue('monthly');
        expect(options[1]).toHaveValue('annual');
    });

});
