import React from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import Testimonials from "./Testimonials";
import {I18nextProvider, initReactI18next} from "react-i18next";
import i18n from "i18next";

// Mock minimal translations
const resources = {
    en: {
        translation: {
            "testimonials_people.mirko.name": "Mirko",
            "testimonials_people.mirko.role": "Developer",
            "testimonials_people.mirko.quote": "Great work!",
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
        const nextButton = screen.getByRole("button", {
            name: (content) => content.includes("Next")
        });
        const prevButton = screen.getByRole("button", {
            name: (content) => content.includes("Prev")
        });

        expect(nextButton).toBeInTheDocument();
        expect(prevButton).toBeInTheDocument();

        expect(screen.getByText("1 / 8")).toBeInTheDocument();
    });

    test("pagination next button changes page", () => {
        const nextButton = screen.getByRole("button", {
            name: (content) => content.includes("Next")
        });

        // Check initial page
        expect(screen.getByText("1 / 8")).toBeInTheDocument();

        fireEvent.click(nextButton);

        // Now page should be 2
        expect(screen.getByText("2 / 8")).toBeInTheDocument();
    });

    test("toggles testimonial quote visibility on disclosure click", async () => {
        // Find a disclosure button (avoiding navigation ones)
        const disclosureButtons = screen.getAllByRole("button").filter(
            btn => !btn.textContent.includes("Next") && !btn.textContent.includes("Prev")
        );
        const firstDisclosureButton = disclosureButtons[0];

        expect(firstDisclosureButton).toBeInTheDocument();

        const quoteText = resources.en.translation["testimonials_people.mirko.quote"];

        // Make sure the quote is not visible initially
        expect(screen.queryByText(quoteText)).not.toBeInTheDocument();

        // Show odds
        fireEvent.click(firstDisclosureButton);

        await waitFor(() => {
            expect(screen.getByText(quoteText)).toBeVisible();
        });

        // Hides odds
        fireEvent.click(firstDisclosureButton);

        await waitFor(() => {
            expect(screen.queryByText(quoteText)).not.toBeInTheDocument();
        });
    });
});
