import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import Header from './Header';

// Mock i18n translation hook
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => {
            const translations = {
                home: 'Home',
                portfolio: 'Portfolio',
                experience: 'Experience',
                projects: 'Projects',
                courses: 'Courses',
                testimonials: 'Testimonials',
                trading: 'Trading',
            };
            return translations[key] || key;
        },
    }),
}));

// Mock LanguageSwitcher and DarkModeToggle to avoid rendering complexity
jest.mock('./LanguageSwitcher', () => () => <div data-testid="language-switcher"/>);
jest.mock('./DarkModeToggle', () => () => <div data-testid="dark-mode-toggle"/>);

describe('Header component', () => {
    function renderHeader(initialPath = '/') {
        return render(
            <MemoryRouter initialEntries={[initialPath]}>
                <Header/>
            </MemoryRouter>
        );
    }

    test('renders main navigation links and highlights active link', () => {
        renderHeader('/');
        const homeLink = screen.getByText('Home');
        expect(homeLink).toBeInTheDocument();
        expect(homeLink).toHaveClass('text-blue-600');

        // Portfolio button is visible
        const portfolioButton = screen.getByRole('button', {name: /portfolio/i});
        expect(portfolioButton).toBeInTheDocument();
    });

    test('toggles portfolio dropdown on desktop nav', () => {
        renderHeader('/');
        const portfolioButton = screen.getByRole('button', {name: /portfolio/i});

        // Initially dropdown is not visible
        expect(screen.queryByText('Experience')).not.toBeInTheDocument();

        // Click to open
        fireEvent.click(portfolioButton);
        expect(screen.getByText('Experience')).toBeInTheDocument();

        // Click again to close
        fireEvent.click(portfolioButton);
        expect(screen.queryByText('Experience')).not.toBeInTheDocument();
    });

    test('renders LanguageSwitcher and DarkModeToggle on desktop', () => {
        renderHeader('/');
        expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
        expect(screen.getByTestId('dark-mode-toggle')).toBeInTheDocument();
    });

});
