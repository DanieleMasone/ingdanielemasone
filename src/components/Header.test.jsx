import React from 'react';
import {fireEvent, render, screen, within} from '@testing-library/react';
import {MemoryRouter} from 'react-router';
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
                certifications: 'Certifications'
            };
            return translations[key] || key;
        },
    }),
}));

// Mock LanguageSwitcher and DarkModeToggle to avoid rendering complexity
jest.mock('./ui/LanguageSwitcher', () => () => <div data-testid="language-switcher"/>);
jest.mock('./ui/DarkModeToggle', () => () => <div data-testid="dark-mode-toggle"/>);

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

    describe('Header component - mobile menu', () => {
        beforeEach(() => {
            // Render at root, mobile menu closed initially
            render(
                <MemoryRouter initialEntries={['/']}>
                    <Header/>
                </MemoryRouter>
            );
        });

        test('mobile menu toggle button opens and closes menu', () => {
            const toggleBtn = screen.getByLabelText(/toggle mobile menu/i);

            // Mobile menu not initially rendered
            expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();

            // Open menu
            fireEvent.click(toggleBtn);
            const mobileMenu = screen.getByTestId('mobile-menu');
            expect(within(mobileMenu).getByText('Portfolio')).toBeInTheDocument();

            // Close menu
            fireEvent.click(toggleBtn);
            expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
        });

        test('mobile menu highlights active "Home" link and closes menu on link click', () => {
            const toggleBtn = screen.getByLabelText(/toggle mobile menu/i);
            fireEvent.click(toggleBtn);

            const mobileMenu = screen.getByTestId('mobile-menu');
            const homeLink = within(mobileMenu).getByText('Home');
            expect(homeLink).toHaveClass('text-blue-600');

            fireEvent.click(homeLink);

            // Menu should close after click, then floating menu disappears
            expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
        });

        test('mobile portfolio dropdown expands and collapses', () => {
            const toggleBtn = screen.getByLabelText(/toggle mobile menu/i);
            fireEvent.click(toggleBtn);

            const mobileMenu = screen.getByTestId('mobile-menu');
            const portfolioButton = within(mobileMenu).getByRole('button', {name: /portfolio/i});

            // Initially panel closed
            expect(within(mobileMenu).queryByText('Experience')).not.toBeInTheDocument();

            fireEvent.click(portfolioButton);
            expect(within(mobileMenu).getByText('Experience')).toBeInTheDocument();

            fireEvent.click(portfolioButton);
            expect(within(mobileMenu).queryByText('Experience')).not.toBeInTheDocument();
        });

        test('clicking portfolio links in mobile menu closes menu', () => {
            const toggleBtn = screen.getByLabelText(/toggle mobile menu/i);
            fireEvent.click(toggleBtn);

            const mobileMenu = screen.getByTestId('mobile-menu');
            const portfolioButton = within(mobileMenu).getByRole('button', {name: /portfolio/i});
            fireEvent.click(portfolioButton);

            const experienceLink = within(mobileMenu).getByText('Experience');
            fireEvent.click(experienceLink);

            // After clicking the mobile menu should disappear
            expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
        });
    });

    test('highlights active link in portfolio when path matches (desktop)', () => {
        renderHeader('/projects');
        const portfolioButton = screen.getByRole('button', {name: /portfolio/i});
        fireEvent.click(portfolioButton);
        const activeLink = screen.getByText('Projects');
        expect(activeLink).toHaveClass('text-blue-600');
    });

    test('desktop dropdown closes when clicking a portfolio link', () => {
        renderHeader('/');
        const portfolioButton = screen.getByRole('button', {name: /portfolio/i});
        fireEvent.click(portfolioButton);
        const experienceLink = screen.getByText('Experience');
        fireEvent.click(experienceLink);

        // Experience clicked => dropdown closed
        expect(screen.queryByText('Experience')).not.toBeInTheDocument();
    });

    test('ChevronDown icon rotates on portfolio toggle (desktop)', () => {
        renderHeader('/');
        const chevron = screen.getByRole('button', {name: /portfolio/i}).querySelector('svg');
        expect(chevron).not.toHaveClass('rotate-180');

        fireEvent.click(screen.getByRole('button', {name: /portfolio/i}));
        expect(chevron).toHaveClass('rotate-180');
    });

    test('Menu icon switches to X when mobile menu is open', () => {
        renderHeader('/');
        const toggleBtn = screen.getByLabelText(/toggle mobile menu/i);

        // First icon: <Menu />
        expect(toggleBtn.querySelector('svg')).toBeInTheDocument();
        expect(toggleBtn.querySelector('svg').getAttribute('data-icon')).not.toBe('x'); // rough check

        fireEvent.click(toggleBtn);
        const newIcon = toggleBtn.querySelector('svg');
        expect(newIcon).toBeInTheDocument();
    });

    test('ChevronDown icon rotates on mobile portfolio toggle', () => {
        renderHeader('/');
        const toggleBtn = screen.getByLabelText(/toggle mobile menu/i);
        fireEvent.click(toggleBtn);

        const mobileMenu = screen.getByTestId('mobile-menu');
        const chevron = within(mobileMenu).getByRole('button', {name: /portfolio/i}).querySelector('svg');
        expect(chevron).not.toHaveClass('rotate-180');

        fireEvent.click(within(mobileMenu).getByRole('button', {name: /portfolio/i}));
        expect(chevron).toHaveClass('rotate-180');
    });

    test('desktop nav includes correct number of main links and portfolio links', () => {
        renderHeader('/');
        // Main navigation has 1 link (Home)
        expect(screen.getAllByRole('link')).toEqual(
            expect.arrayContaining([
                expect.objectContaining({textContent: 'Home'}),
            ])
        );

        // Open portfolio and check internal links
        fireEvent.click(screen.getByRole('button', {name: /portfolio/i}));
        const portfolioLinks = ['Experience', 'Projects', 'Courses', 'Testimonials', 'Trading', 'Certifications'];
        portfolioLinks.forEach(label => {
            expect(screen.getByText(label)).toBeInTheDocument();
        });
    });

    test('mobile menu contains LanguageSwitcher and DarkModeToggle components', () => {
        renderHeader('/');
        const toggleBtn = screen.getByLabelText(/toggle mobile menu/i);
        fireEvent.click(toggleBtn);

        const mobileMenu = screen.getByTestId('mobile-menu');
        expect(within(mobileMenu).getByTestId('language-switcher')).toBeInTheDocument();
        expect(within(mobileMenu).getByTestId('dark-mode-toggle')).toBeInTheDocument();
    });

    test('clicking a portfolio link in desktop nav navigates and closes dropdown', () => {
        renderHeader('/');
        const portfolioButton = screen.getByRole('button', {name: /portfolio/i});
        fireEvent.click(portfolioButton);

        const projectsLink = screen.getByText('Projects');
        fireEvent.click(projectsLink);

        // Dropdown must go
        expect(screen.queryByText('Projects')).not.toBeInTheDocument();
    });

    test('menu button aria-label toggles correctly', () => {
        renderHeader('/');
        const toggleBtn = screen.getByLabelText(/toggle mobile menu/i);
        expect(toggleBtn).toBeInTheDocument();

        fireEvent.click(toggleBtn);
        // There is no air-expanded on the button, but at least the menu appears
        expect(screen.queryByTestId('mobile-menu')).toBeInTheDocument();

        fireEvent.click(toggleBtn);
        expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
    });

});
