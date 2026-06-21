import React from "react";
import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {vi} from "vitest";
import Privacy from "./Privacy";

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => ({
            "privacy.title": "Privacy Policy",
            "privacy.intro_title": "Introduction",
            "privacy.intro_text": "This notice describes the actual data flows at",
            "privacy.owner_title": "Data Controller",
            "privacy.processing_title": "Data processed",
            "privacy.hosting_data_title": "Hosting request data",
            "privacy.hosting_data_text": "GitHub Pages receives technical request data.",
            "privacy.preference_data_title": "Local preferences",
            "privacy.preference_data_text": "Language and theme stay in the browser.",
            "privacy.correspondence_data_title": "Correspondence",
            "privacy.correspondence_data_text": "The site has no contact form.",
            "privacy.hosting_title": "Hosting and GitHub",
            "privacy.hosting_text": "GitHub documents its processing in the",
            "privacy.github_privacy_link": "GitHub General Privacy Statement",
            "privacy.purposes_title": "Purposes and legal basis",
            "privacy.purposes_text": "Preferences provide the selected experience.",
            "privacy.third_parties_title": "External services",
            "privacy.third_parties_text": "External services are contacted only after following a link.",
            "privacy.retention_title": "Retention",
            "privacy.retention_text": "Preferences remain until cleared.",
            "privacy.rights_title": "Your rights",
            "privacy.rights_1": "Request access where applicable.",
            "privacy.rights_2": "Ask about correspondence.",
            "privacy.rights_3": "Lodge a complaint.",
            "privacy.rights_exercise": "To exercise these rights, write to:",
            "privacy.garante_link": "Italian Data Protection Authority",
            "privacy.automated_title": "Automated decisions",
            "privacy.automated_text": "No profiling or automated decisions.",
            "privacy.cookie_title": "Cookies and local storage",
            "privacy.cookie_text": "See the",
            "privacy.cookie_link": "Cookie and Local Storage Policy",
            "privacy.changes_title": "Changes",
            "privacy.changes_text": "Updates are published here.",
            "privacy.translation_note": "Italian is the reference language.",
            "privacy.last_updated": "Last updated",
            "privacy.last_date_updated": "21 June 2026",
        }[key] || key),
    }),
}));

describe("Privacy", () => {
    beforeEach(() => {
        render(
            <MemoryRouter initialEntries={["/privacy/"]}>
                <Privacy/>
            </MemoryRouter>
        );
    });

    test("renders the factual processing sections and update date", () => {
        expect(screen.getByRole("heading", {level: 1, name: "Privacy Policy"})).toBeInTheDocument();
        expect(screen.getByRole("heading", {name: "Data processed"})).toBeInTheDocument();
        expect(screen.getByText(/no contact form/i)).toBeInTheDocument();
        expect(screen.getByText(/21 June 2026/i)).toBeInTheDocument();
    });

    test("provides controller, GitHub privacy, Garante, and storage-policy links", () => {
        const emailLinks = screen.getAllByRole("link", {name: /masone.daniele@gmail.com/i});
        expect(emailLinks).toHaveLength(2);
        emailLinks.forEach((link) => expect(link).toHaveAttribute("href", "mailto:masone.daniele@gmail.com"));
        expect(screen.getByRole("link", {name: /GitHub General Privacy Statement/i})).toHaveAttribute(
            "href",
            expect.stringContaining("github-general-privacy-statement")
        );
        expect(screen.getByRole("link", {name: /Italian Data Protection Authority/i})).toHaveAttribute(
            "href",
            "https://www.garanteprivacy.it/home/autorita"
        );
        expect(screen.getByRole("link", {name: /Cookie and Local Storage Policy/i})).toHaveAttribute(
            "href",
            "/cookie-policy/"
        );
    });
});
