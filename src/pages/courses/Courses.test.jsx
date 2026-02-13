import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import Courses from './Courses';
import {MemoryRouter} from 'react-router-dom';
import {vi} from 'vitest';
import * as service from "@/services/portfolioService";

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
                "next": "Next",
                "error_generic": "Generic error",
            };
            return map[key] || key;
        }
    }),
}));

vi.mock("@/components/loading/Loading", () => ({
    Loading: () => <div role="status">loading</div>,
}));

vi.mock("@/components/errorState/ErrorState", () => ({
    ErrorState: ({message, onRetry}) => (
        <div>
            <span>{message}</span>
            <button onClick={onRetry}>retry</button>
        </div>
    ),
}));

const mockCourses = Array.from({length: 10}).map((_, i) => ({
    nameKey: `course_${i}`,
    descKey: `desc_${i}`,
    durationKey: `dur_${i}`,
    tech: "x",
    link: "https://test.com",
    image: "img.png"
}));

const renderPage = () =>
    render(
        <MemoryRouter initialEntries={['/courses']}>
            <Courses/>
        </MemoryRouter>
    );

describe('Courses component', () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("renders page title", async () => {
        vi.spyOn(service, "getCourses").mockResolvedValue(mockCourses);

        renderPage();

        expect(
            await screen.findByRole("heading", {name: "Courses"})
        ).toBeInTheDocument();
    });

    test("renders page title", async () => {
        vi.spyOn(service, "getCourses").mockResolvedValue(mockCourses);

        renderPage();

        expect(
            await screen.findByRole("heading", {name: "Courses"})
        ).toBeInTheDocument();
    });

    test("renders first page courses", async () => {
        vi.spyOn(service, "getCourses").mockResolvedValue(mockCourses);

        renderPage();

        expect(await screen.findByText(/course_0/i)).toBeInTheDocument();
        expect(screen.getByText(/desc_0/i)).toBeInTheDocument();
    });

    test("renders duration label", async () => {
        vi.spyOn(service, "getCourses").mockResolvedValue(mockCourses);

        renderPage();

        await screen.findByText(/course_0/i);

        const durations = screen.getAllByText(/dur_/i);
        expect(durations.length).toBeGreaterThan(0);

        expect(screen.getByText(/dur_0/i)).toBeInTheDocument();
    });

    test("course images have links", async () => {
        vi.spyOn(service, "getCourses").mockResolvedValue(mockCourses);

        renderPage();

        await screen.findByText(/course_0/i);

        const links = screen.getAllByRole("link");
        links.forEach(link => {
            expect(link).toHaveAttribute("href");
            expect(link).toHaveAttribute("target", "_blank");
        });
    });

    test("next button advances page", async () => {
        vi.spyOn(service, "getCourses").mockResolvedValue(mockCourses);

        renderPage();

        const nextButtons = await screen.findAllByRole("button", {name: /next/i});

        fireEvent.click(nextButtons[0]);

        expect(
            screen.getAllByTestId("pagination-info")[0]
        ).toHaveTextContent("2 / 3");
    });

    test("shows loading initially", () => {
        vi.spyOn(service, "getCourses").mockImplementation(
            () => new Promise(() => {
            })
        );

        renderPage();

        expect(screen.getByRole("status")).toBeInTheDocument();
    });

    test("shows error state", async () => {
        vi.spyOn(service, "getCourses").mockRejectedValue(new Error());

        renderPage();

        expect(await screen.findByText("Generic error")).toBeInTheDocument();
    });
});
