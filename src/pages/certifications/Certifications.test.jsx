import React from "react";
import {render, screen} from "@testing-library/react";
import {MemoryRouter} from 'react-router-dom';
import {vi} from 'vitest';
import Certifications from "./Certifications";

// Mock i18next
vi.mock("react-i18next", () => ({
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
            <MemoryRouter initialEntries={['/certifications']}>
                <Certifications/>
            </MemoryRouter>
        );
    });

    test("renders the page title", () => {
        const title = screen.getByRole("heading", {name: /certifications/i, level: 2});
        expect(title).toBeInTheDocument();
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

    test("renders PageGrid container", () => {
        const pageGrid = screen.getByRole("grid");
        expect(pageGrid).toBeInTheDocument();
    });

    test("renders SEO metadata", () => {
        expect(document.title).toMatch(/certifications/i);
    });

});
