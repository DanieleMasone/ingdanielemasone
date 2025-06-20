import {fireEvent, render, screen, within} from '@testing-library/react';
import TradingPerformanceChart from './TradingPerformanceChart';
import React from 'react';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => {
            const map = {
                performance_view_selector_aria: 'View selector',
                performance_title: 'Performance',
                performance_view_monthly: 'Monthly',
                performance_view_annual: 'Annual',
                performance_dataset_label: 'Performance',
                performance_return_label: 'Return',
            };
            return map[key] || key;
        },
        i18n: {changeLanguage: () => Promise.resolve()},
    }),
}));

jest.mock('react-chartjs-2', () => ({
    Line: () => <div data-testid="mock-line-chart"/>
}));

describe('TradingPerformanceChart', () => {
    beforeEach(() => {
        jest.spyOn(document.documentElement.classList, 'contains').mockImplementation(cls => cls === 'dark');
    });

    afterEach(() => {
        jest.restoreAllMocks();
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
        const genElements = screen.getAllByText(/Gen/i);
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
});
