import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import Testimonials from "./Testimonials";
import {I18nextProvider, initReactI18next} from "react-i18next";
import i18n from "i18next";

// Inline i18n mock setup for testing translations
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

    test("renders pagination buttons and page info", () => {
        // Check "Next" button presence and page info display
        expect(screen.getByText(/Next/)).toBeInTheDocument();
        expect(screen.getByText(/1 \/ \d+/)).toBeInTheDocument(); // page 1 of total
    });

    test("pagination next button changes page", () => {
        const nextButton = screen.getByText(/Next/);

        // Initial page is 1
        expect(screen.getByText("1 / 4")).toBeInTheDocument();

        // Click next to go to page 2
        fireEvent.click(nextButton);

        expect(screen.getByText("2 / 4")).toBeInTheDocument();
    });

    test("toggles testimonial quote visibility when disclosure button clicked", () => {
        // Find first disclosure button (exclude pagination buttons)
        const disclosureButtons = screen.getAllByRole("button").filter(
            btn => !btn.textContent.match(/Prev|Next|←|→/)
        );
        const firstDisclosureButton = disclosureButtons[0];

        expect(firstDisclosureButton).toBeInTheDocument();

        // The quote text should NOT be in the document initially
        const quoteText = resources.en.translation["testimonials_people.mirko.quote"];
        expect(screen.queryByText(quoteText)).not.toBeInTheDocument();

        // Click to open
        fireEvent.click(firstDisclosureButton);
        expect(screen.getByText(quoteText)).toBeVisible();

        // Click to close
        fireEvent.click(firstDisclosureButton);
        expect(screen.queryByText(quoteText)).not.toBeInTheDocument();
    });

});
