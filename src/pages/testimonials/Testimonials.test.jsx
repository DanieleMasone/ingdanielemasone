import React from "react";
import {fireEvent, render, screen, waitFor, within} from "@testing-library/react";
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
                <Testimonials />
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

        pageDisplays.forEach(el => expect(el).toHaveTextContent("1 / 8"));
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

        pageDisplays.forEach(el => expect(el).toHaveTextContent("8 / 8"));
        nextButtons.forEach(btn => expect(btn).toBeDisabled());
    });

    test("next and prev buttons work independently for each paginator", () => {
        const {nextButtons, prevButtons, pageDisplays} = getPaginationButtons();

        // Advance mobile paginator
        fireEvent.click(nextButtons[0]);
        expect(pageDisplays[0]).toHaveTextContent("2 / 8");
        expect(pageDisplays[1]).toHaveTextContent("2 / 8");

        // Advance desktop paginator
        fireEvent.click(nextButtons[1]);
        expect(pageDisplays[0]).toHaveTextContent("3 / 8");
        expect(pageDisplays[1]).toHaveTextContent("3 / 8");

        // Return to page 1
        fireEvent.click(prevButtons[0]);
        fireEvent.click(prevButtons[1]);
        pageDisplays.forEach(el => expect(el).toHaveTextContent("1 / 8"));
    });

    test("toggles testimonial quote visibility on disclosure click", async () => {
        const cards = screen.getAllByTestId("testimonial-card");
        const firstCard = cards[0];
        const {getByRole, queryByText} = within(firstCard);

        const name = "Mirko";
        const quote = "Great work!";

        const disclosureButton = getByRole("button", {name: new RegExp(name, "i")});
        expect(queryByText(quote)).not.toBeInTheDocument();

        fireEvent.click(disclosureButton);
        await waitFor(() => expect(queryByText(quote)).toBeVisible());

        fireEvent.click(disclosureButton);
        await waitFor(() => expect(queryByText(quote)).not.toBeInTheDocument());
    });

    test("matches snapshot", () => {
        const {asFragment} = render(
            <MemoryRouter initialEntries={['/testimonials']}>
                <Testimonials />
            </MemoryRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
