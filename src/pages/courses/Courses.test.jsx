import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import Courses from './Courses';
import {MemoryRouter} from 'react-router-dom';
import {vi} from 'vitest';

vi.mock('react-i18next', () => ({
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
            <MemoryRouter initialEntries={['/courses']}>
                <Courses/>
            </MemoryRouter>
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

    test('disables "Previous" on first page', () => {
        const prevButtons = screen.getAllByRole('button', {name: /previous/i});
        // Mobile and desktop both have a "Previous" button on page 1
        prevButtons.forEach(btn => expect(btn).toBeDisabled());
    });

    test('next button advances page and updates pagination info', () => {
        const nextButtons = screen.getAllByRole('button', {name: /next/i});
        const pageInfos = screen.getAllByTestId("pagination-info");

        // Advance page using both pagers
        fireEvent.click(nextButtons[0]); // mobile
        fireEvent.click(nextButtons[1]); // desktop

        pageInfos.forEach(info => expect(info).toHaveTextContent("3 / 3"));
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

    test('Next and Previous buttons work independently for mobile and desktop', () => {
        const nextButtons = screen.getAllByRole('button', {name: /next/i});
        const prevButtons = screen.getAllByRole('button', {name: /previous/i});
        const pageInfos = screen.getAllByTestId("pagination-info");

        // Advance mobile
        fireEvent.click(nextButtons[0]);
        expect(pageInfos[0]).toHaveTextContent("2 / 3");
        expect(pageInfos[1]).toHaveTextContent("2 / 3");

        // Advance desktop
        fireEvent.click(nextButtons[1]);
        expect(pageInfos[1]).toHaveTextContent("3 / 3");

        // Go back to page 1 for both
        fireEvent.click(prevButtons[0]);
        fireEvent.click(prevButtons[1]);
        pageInfos.forEach(info => expect(info).toHaveTextContent("1 / 3"));
    });
});
