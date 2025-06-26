import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Courses from './Courses';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => {
            const map = {
                "courses_page.title": "Courses",
                "courses_page.git.title": "Git Course",
                "courses_page.git.description": "Learn Git basics and advanced usage.",
                "courses_page.git.duration": "3h 20m",
                "courses_page.typescript.title": "TypeScript Course",
                "courses_page.typescript.description": "TypeScript fundamentals and advanced topics.",
                "courses_page.typescript.duration": "4h 10m",
                "courses_page.jQuery.title": "jQuery Course",
                "courses_page.jQuery.description": "Master jQuery selectors and events.",
                "courses_page.jQuery.duration": "2h 45m",
                "courses_page.duration": "Duration",
                "show_technologies": "Show technologies",
                "previous": "Previous",
                "next": "Next"
            };
            return map[key] || key;
        }
    }),
}));

describe('Courses component', () => {
    beforeEach(() => {
        render(<Courses/>);
    });

    test('renders page title', () => {
        expect(screen.getByRole('heading', {name: 'Courses', level: 2})).toBeInTheDocument();
    });

    test('renders first page courses titles and descriptions', () => {
        expect(screen.getByText(/git course/i)).toBeInTheDocument();
        expect(screen.getByText(/learn git basics/i)).toBeInTheDocument();

        expect(screen.getByText(/typescript course/i)).toBeInTheDocument();
        expect(screen.getByText(/typescript fundamentals/i)).toBeInTheDocument();
    });

    test('renders course duration with label', () => {
        expect(screen.getAllByText(/duration:/i)[0]).toBeInTheDocument();
        expect(screen.getByText(/3h 20m/i)).toBeInTheDocument();
    });

    test('pagination buttons enabled/disabled correctly', () => {
        // On first page, Previous disabled, Next enabled
        const prevButton = screen.getByRole('button', {name: /previous/i});
        const nextButton = screen.getByRole('button', {name: /next/i});

        expect(prevButton).toBeDisabled();
        expect(nextButton).toBeEnabled();

        // Click next page
        fireEvent.click(nextButton);

        // Now Previous enabled
        expect(prevButton).toBeEnabled();

        // If last page reached, Next disabled (depends on total courses/pages)
    });

    test('pagination shows current page and total pages', () => {
        expect(screen.getByTestId("pagination-info").textContent).toBe("1 / 4");

        const nextButton = screen.getByRole('button', {name: /next/i});
        fireEvent.click(nextButton);

        expect(screen.getByTestId("pagination-info").textContent).toBe("2 / 4");

        fireEvent.click(nextButton);

        expect(screen.getByTestId("pagination-info").textContent).toBe("3 / 4");

        fireEvent.click(nextButton);

        expect(screen.getByTestId("pagination-info").textContent).toBe("4 / 4");
    });
});
