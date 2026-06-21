import React from "react";
import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {vi} from "vitest";
import CookiePolicy from "./CookiePolicy";

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => ({
            "cookie.title": "Cookie and Local Storage Policy",
            "cookie.scope_title": "Scope",
            "cookie.scope_text": "This portfolio does not set HTTP cookies.",
            "cookie.storage_title": "Storage used by this site",
            "cookie.language_storage_text": "Stores the selected language.",
            "cookie.theme_storage_text": "Stores the selected theme.",
            "cookie.tracking_title": "Analytics and profiling",
            "cookie.tracking_text": "No analytics, advertising, profiling or fingerprinting is loaded.",
            "cookie.manage_title": "Managing preferences",
            "cookie.manage_text": "Clear site data to remove both preferences.",
            "cookie.external_title": "External links",
            "cookie.external_text": "Third parties are contacted only after following a link.",
            "cookie.contact_text": "For questions, write to",
            "cookie.last_updated": "Last updated",
            "privacy.last_date_updated": "21 June 2026",
        }[key] || key),
    }),
}));

describe("CookiePolicy", () => {
    beforeEach(() => {
        render(
            <MemoryRouter initialEntries={["/cookie-policy/"]}>
                <CookiePolicy/>
            </MemoryRouter>
        );
    });

    test("renders the exact local-storage inventory without consent boilerplate", () => {
        expect(screen.getByRole("heading", {level: 1, name: /Cookie and Local Storage Policy/i})).toBeInTheDocument();
        expect(screen.getByText("i18nextLng")).toBeInTheDocument();
        expect(screen.getByText("theme")).toBeInTheDocument();
        expect(screen.getByText(/does not set HTTP cookies/i)).toBeInTheDocument();
        expect(screen.queryByText(/accept or refuse/i)).not.toBeInTheDocument();
    });

    test("renders the update date and contact mechanism", () => {
        expect(screen.getByText(/21 June 2026/i)).toBeInTheDocument();
        expect(screen.getByRole("link", {name: /masone.daniele@gmail.com/i})).toHaveAttribute(
            "href",
            "mailto:masone.daniele@gmail.com"
        );
    });
});
