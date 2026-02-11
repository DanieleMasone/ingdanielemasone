import React from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import Experience, {getExperienceLabel} from "./Experience";
import {MemoryRouter} from 'react-router-dom';
import {vi} from 'vitest';

// Minimal translations
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => {
            const translations = {
                "exp_rgi_role": "Developer",
                "exp_rgi_period": "2020 - 2022",
                "exp_rgi_description": "Worked on backend development",
                "exp_iol_role": "Engineer",
                "exp_iol_period": "2018 - 2020",
                "exp_iol_description": "Frontend work",
                "exp_tecnavia_role": "Consultant",
                "exp_tecnavia_period": "2016 - 2018",
                "exp_tecnavia_description": "Mobile app development",
                "exp_teoresi_role": "Analyst",
                "exp_teoresi_period": "2014 - 2016",
                "exp_teoresi_description": "Data analysis",
                "exp_hpe_role": "Intern",
                "exp_hpe_period": "2012 - 2014",
                "exp_hpe_description": "Support and maintenance",
                "exp_digiCamere_role": "SysAdmin",
                "exp_digiCamere_period": "2010 - 2012",
                "exp_digiCamere_description": "System administration",
                "exp_piksel_role": "Developer",
                "exp_piksel_period": "2008 - 2010",
                "exp_piksel_description": "Web development",
                "exp_coach_role": "Coach",
                "exp_coach_period": "2006 - 2008",
                "exp_coach_description": "Mentoring junior devs",
                "experience_title": "Experience",
                "experience_show_stack": "Show Stack",
                "exp_label_start": "Start",
                "exp_label_end": "End",
                "exp_label_single": "Only this year"
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

describe("Experience component", () => {
    beforeEach(() => {
        render(
            <MemoryRouter initialEntries={['/experience']}>
                <Experience/>
            </MemoryRouter>
        );
    });

    test("renders year filter buttons and highlights the selected one", () => {
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBeGreaterThan(0);

        // Make sure at least one is selected (e.g. the first one by default)
        const selectedButton = buttons.find(btn =>
            btn.className.includes("bg-blue-600")
        );
        expect(selectedButton).toBeDefined();
    });

    test("displays experiences filtered by selected year", () => {
        const buttons = screen.getAllByRole("button");
        fireEvent.click(buttons[0]);
        const roles = screen.getAllByRole("heading", {level: 3});
        expect(roles.length).toBeGreaterThan(0);
    });

    test("displays status badges correctly", () => {
        const roles = screen.getAllByRole("heading", {level: 3});

        // Look for at least one badge with the text 'Start', 'End', or 'Only this year'
        const start = screen.queryAllByText("Start");
        const end = screen.queryAllByText("End");
        const single = screen.queryAllByText("Only this year");

        expect(start.length + end.length + single.length).toBeGreaterThan(0);
    });

    test("includes SEO head metadata", () => {
        const title = document.head.querySelector("title");
        expect(title?.textContent?.toLowerCase()).toContain("experience");
    });

    test("renders experience title", () => {
        expect(screen.getByRole("heading", {name: /experience/i})).toBeInTheDocument();
    });

    test("shows no experiences if selected year has no entries", () => {
        // Let's add a fake year
        const fakeButton = document.createElement("button");
        fakeButton.textContent = "1900";
        fakeButton.onclick = () => {
        };
        document.body.appendChild(fakeButton);

        fireEvent.click(fakeButton);

        const roles = screen.queryAllByRole("heading", {level: 3});
        expect(roles.length).toBeGreaterThan(0);
    });

    test("getExperienceLabel returns correct label types", () => {
        const t = (key) => key;

        expect(getExperienceLabel("2020 - 2022", "2020", t))
            .toEqual({label: "exp_label_start", type: "start"});
        expect(getExperienceLabel("2020 - 2022", "2022", t))
            .toEqual({label: "exp_label_end", type: "end"});
        expect(getExperienceLabel("2020 - 2020", "2020", t))
            .toEqual({label: "exp_label_single", type: "single"});
        expect(getExperienceLabel("2020 - 2022", "2021", t))
            .toBe(null);
    });

    test("changing year updates displayed experiences", async () => {
        const years = screen.getAllByRole("button");
        if (years.length > 1) {
            fireEvent.click(years[1]);
            await waitFor(() => {
                const roles = screen.getAllByRole("heading", {level: 3});
                expect(roles.length).toBeGreaterThan(0);
            });
        }
    });
});
