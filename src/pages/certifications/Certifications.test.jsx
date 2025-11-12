import React from "react";
import {render, screen} from "@testing-library/react";
import {HelmetProvider} from "react-helmet-async";
import Certifications from "./Certifications";

// Mock i18next
jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => {
            const map = {
                "certifications_page.title": "Certifications",
                "certifications_page.view_certificate": "View Certificate",
            };
            return map[key] || key;
        },
    }),
}));

describe("Certifications component", () => {
    beforeEach(() => {
        render(
            <HelmetProvider>
                <Certifications/>
            </HelmetProvider>
        );
    });

    test("renders the page title", () => {
        const title = screen.getByRole("heading", {name: /certifications/i, level: 2});
        expect(title).toBeInTheDocument();
    });

    test("renders certification cards with name, issuer and date", () => {
        expect(screen.getByText(/English CEFR Level B2.2/i)).toBeInTheDocument();

        const speexxEntries = screen.getAllByText(/Speexx — 2024/i);
        expect(speexxEntries.length).toBeGreaterThan(0);
    });

    test("renders 'View Certificate' links correctly", () => {
        const links = screen.getAllByRole("link", {name: /view certificate/i});
        expect(links.length).toBeGreaterThanOrEqual(3);

        links.forEach((link) => {
            expect(link).toHaveAttribute("href");
            expect(link).toHaveAttribute("target", "_blank");
            expect(link).toHaveAttribute("rel", "noopener noreferrer");
        });
    });

    test("renders pagination controls", () => {
        const prevButtons = screen.getAllByText(/←/);
        expect(prevButtons.length).toBeGreaterThan(0);

        const nextButtons = screen.getAllByText(/→/);
        expect(nextButtons.length).toBeGreaterThan(0);
    });

    test("matches snapshot", () => {
        const {asFragment} = render(
            <HelmetProvider>
                <Certifications/>
            </HelmetProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
