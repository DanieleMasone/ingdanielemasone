import React from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import Testimonials from "./Testimonials";
import {I18nextProvider, initReactI18next} from "react-i18next";
import i18n from "i18next";

// Mock minimal translations for the keys used in the component
const resources = {
    en: {
        translation: {
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
            "testimonials_page.prev": "Prev",
            "testimonials_page.next": "Next"
        }
    }
};

i18n.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    resources,
    interpolation: {escapeValue: false}
});

describe("Testimonials component", () => {
    beforeEach(() => {
        render(
            <I18nextProvider i18n={i18n}>
                <Testimonials/>
            </I18nextProvider>
        );
    });

    test("renders pagination buttons and current page info", () => {
        expect(screen.getByRole("button", {name: /Next/i})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /Prev/i})).toBeInTheDocument();
        expect(screen.getByText("1 / 8")).toBeInTheDocument();
    });

    test("pagination next button changes page", () => {
        expect(screen.getByText("1 / 8")).toBeInTheDocument();
        fireEvent.click(screen.getByRole("button", {name: /Next/i}));
        expect(screen.getByText("2 / 8")).toBeInTheDocument();
    });

    test("pagination prev button changes page", () => {
        // Go to page 2 first
        fireEvent.click(screen.getByRole("button", {name: /Next/i}));
        expect(screen.getByText("2 / 8")).toBeInTheDocument();

        // Go back to page 1
        fireEvent.click(screen.getByRole("button", {name: /Prev/i}));
        expect(screen.getByText("1 / 8")).toBeInTheDocument();
    });

    test("prev button disabled on first page", () => {
        const prevBtn = screen.getByRole("button", {name: /Prev/i});
        expect(prevBtn).toBeDisabled();
    });

    test("next button disabled on last page", () => {
        const nextBtn = screen.getByRole("button", {name: /Next/i});
        // Go to last page
        for (let i = 1; i < 8; i++) {
            fireEvent.click(nextBtn);
        }
        expect(screen.getByText("8 / 8")).toBeInTheDocument();
        expect(nextBtn).toBeDisabled();
    });

    test("toggles testimonial quote visibility on disclosure click", async () => {
        // Get all disclosure buttons (excluding pagination ones)
        const disclosureButtons = screen
            .getAllByRole("button")
            .filter(btn => !btn.textContent.includes("Next") && !btn.textContent.includes("Prev"));
        const firstDisclosureButton = disclosureButtons[0];
        expect(firstDisclosureButton).toBeInTheDocument();

        const quoteText = resources.en.translation["testimonials_people.mirko.quote"];

        // Odds not initially visible
        expect(screen.queryByText(quoteText)).not.toBeInTheDocument();

        // Open
        fireEvent.click(firstDisclosureButton);
        await waitFor(() => expect(screen.getByText(quoteText)).toBeVisible());

        // Close
        fireEvent.click(firstDisclosureButton);
        await waitFor(() => expect(screen.queryByText(quoteText)).not.toBeInTheDocument());
    });

});
