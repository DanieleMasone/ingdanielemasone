import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import Courses from './Courses';
import {HelmetProvider} from "react-helmet-async";

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
        render(
            <HelmetProvider>
                <Courses/>
            </HelmetProvider>
        );
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

    test('renders course image wrapped in link', () => {
        const links = screen.getAllByRole('link', {name: /git course/i});
        expect(links).toHaveLength(2);

        links.forEach(link => {
            expect(link).toHaveAttribute('href', 'https://www.udemy.com/course/corso-git/');
        });
    });

    test('pagination buttons enabled/disabled correctly', () => {
        const prevButton = screen.getByRole('button', {name: /previous/i});
        const nextButton = screen.getByRole('button', {name: /next/i});

        expect(prevButton).toBeDisabled();
        expect(nextButton).toBeEnabled();

        fireEvent.click(nextButton);

        expect(prevButton).toBeEnabled();
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

    test('each course image has correct alt text', () => {
        const images = screen.getAllByRole('img');

        images.forEach(img => {
            expect(img).toHaveAttribute('alt');
            expect(img.getAttribute('alt')).not.toBe('');
        });
    });

    test('each course image links to correct udemy course', () => {
        const links = screen.getAllByRole('link');

        links.forEach(link => {
            expect(link).toHaveAttribute('href');
            expect(link).toHaveAttribute('target', '_blank');
        });
    });

    test('includes SEO head metadata', async () => {
        await waitFor(() => {
            const titleTag = document.head.querySelector('title');
            expect(titleTag).not.toBeNull();
            expect(titleTag?.textContent?.toLowerCase()).toContain('courses');
        });
    });

    test('disables "Next" on last page', () => {
        const nextButton = screen.getByRole('button', {name: /next/i});
        fireEvent.click(nextButton);
        fireEvent.click(nextButton);
        fireEvent.click(nextButton); // now on page 4

        expect(screen.getByTestId("pagination-info").textContent).toBe("4 / 4");
        expect(nextButton).toBeDisabled();
    });

    test("matches snapshot", () => {
        const {asFragment} = render(
            <HelmetProvider>
                <Courses/>
            </HelmetProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
