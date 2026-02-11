import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import Testimonials from "./Testimonials";
import {MemoryRouter} from 'react-router-dom';
import {vi} from 'vitest';

// Minimal translations
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => {
            const translations = {
                "testimonials_people.mirko.name": "Mirko",
                "testimonials_people.mirko.role": "Developer",
                "testimonials_people.mirko.quote": "Great work!",
                "testimonials_people.alessia.name": "Alessia",
                "testimonials_people.alessia.role": "Designer",
                "testimonials_people.alessia.quote": "Amazing service!",
                "testimonials_people.federico.name": "Federico",
                "testimonials_people.federico.role": "Manager",
                "testimonials_people.federico.quote": "Highly recommend!",
                "testimonials_people.daniela.name": "Daniela",
                "testimonials_people.daniela.role": "QA",
                "testimonials_people.daniela.quote": "Thorough testing.",
                "testimonials_page.title": "Testimonials",
                "previous": "Prev",
                "next": "Next"
            };
            return translations[key] || key;
        },
        i18n: {
            changeLanguage: vi.fn(() => Promise.resolve())
        }
    }),
    // Mock to avoid initReactI18next warnings
    initReactI18next: {
        type: '3rdParty',
        init: vi.fn()
    }
}));

describe("Testimonials component with mobile + desktop paginators", () => {
    beforeEach(() => {
        render(
            <MemoryRouter initialEntries={['/testimonials']}>
                <Testimonials/>
            </MemoryRouter>
        );
    });

    const getPaginationButtons = () => {
        const nextButtons = screen.getAllByRole("button", {name: /Next/i});
        const prevButtons = screen.getAllByRole("button", {name: /Prev/i});
        const pageDisplays = screen.getAllByTestId("pagination-info");
        return {nextButtons, prevButtons, pageDisplays};
    };

    test("renders both mobile and desktop pagination controls", () => {
        const {nextButtons, prevButtons, pageDisplays} = getPaginationButtons();
        expect(nextButtons.length).toBe(2);
        expect(prevButtons.length).toBe(2);
        expect(pageDisplays.length).toBe(2);

        pageDisplays.forEach(el => expect(el).toHaveTextContent("1 / 6"));
    });

    test("prev buttons are disabled on first page", () => {
        const {prevButtons} = getPaginationButtons();
        prevButtons.forEach(btn => expect(btn).toBeDisabled());
    });

    test("next buttons are disabled on last page", () => {
        const {nextButtons, pageDisplays} = getPaginationButtons();

        for (let i = 1; i < 8; i++) {
            nextButtons.forEach(btn => fireEvent.click(btn));
        }

        pageDisplays.forEach(el => expect(el).toHaveTextContent("6 / 6"));
        nextButtons.forEach(btn => expect(btn).toBeDisabled());
    });

    test("next and prev buttons work independently for each paginator", () => {
        const {nextButtons, prevButtons, pageDisplays} = getPaginationButtons();

        // Advance mobile paginator
        fireEvent.click(nextButtons[0]);
        expect(pageDisplays[0]).toHaveTextContent("2 / 6");
        expect(pageDisplays[1]).toHaveTextContent("2 / 6");

        // Advance desktop paginator
        fireEvent.click(nextButtons[1]);
        expect(pageDisplays[0]).toHaveTextContent("3 / 6");
        expect(pageDisplays[1]).toHaveTextContent("3 / 6");

        // Return to page 1
        fireEvent.click(prevButtons[0]);
        fireEvent.click(prevButtons[1]);
        pageDisplays.forEach(el => expect(el).toHaveTextContent("1 / 6"));
    });

    test("renders page title", () => {
        expect(screen.getByRole("heading", {name: /testimonials/i})).toBeInTheDocument();
    });

    test("renders correct number of testimonial cards (4 per page)", () => {
        const cards = screen.getAllByTestId("testimonial-card");
        expect(cards).toHaveLength(4);
    });

    test("renders testimonial avatars", () => {
        const avatars = screen.getAllByRole("img");
        expect(avatars).toHaveLength(4);
        avatars.forEach(avatar => {
            expect(avatar).toHaveAttribute("alt");
            expect(avatar).toHaveClass("rounded-full");
        });
    });

    test("renders Disclosure buttons", () => {
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBeGreaterThanOrEqual(4);
    });

    test("renders LinkedIn icons when available", () => {
        const links = screen.getAllByRole("link");
        const linkedinLinks = links.filter(link => link.getAttribute("href")?.includes("linkedin"));
        expect(linkedinLinks.length).toBeGreaterThan(0);
    });

    test("SEO metadata is present", () => {
        expect(document.title).toContain("testimonials");
    });
});
