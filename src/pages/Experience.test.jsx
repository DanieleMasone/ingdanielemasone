import React from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import Experience from "./Experience";
import i18n from "i18next";
import {I18nextProvider, initReactI18next} from "react-i18next";

i18n.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    resources: {
        en: {
            translation: {
                exp_rgi_role: "Developer",
                exp_rgi_period: "2020 - 2022",
                exp_rgi_description: "Worked on backend development",
                exp_iol_role: "Engineer",
                exp_iol_period: "2018 - 2020",
                exp_iol_description: "Frontend work",
                exp_tecnavia_role: "Consultant",
                exp_tecnavia_period: "2016 - 2018",
                exp_tecnavia_description: "Mobile app development",
                exp_teoresi_role: "Analyst",
                exp_teoresi_period: "2014 - 2016",
                exp_teoresi_description: "Data analysis",
                exp_hpe_role: "Intern",
                exp_hpe_period: "2012 - 2014",
                exp_hpe_description: "Support and maintenance",
                exp_digiCamere_role: "SysAdmin",
                exp_digiCamere_period: "2010 - 2012",
                exp_digiCamere_description: "System administration",
                exp_piksel_role: "Developer",
                exp_piksel_period: "2008 - 2010",
                exp_piksel_description: "Web development",
                exp_coach_role: "Coach",
                exp_coach_period: "2006 - 2008",
                exp_coach_description: "Mentoring junior devs",
                experience_title: "Experience",
                experience_show_stack: "Show Stack",
            },
        },
    },
    interpolation: {escapeValue: false},
});

describe("Experience component", () => {
    beforeEach(() => {
        render(
            <I18nextProvider i18n={i18n}>
                <Experience/>
            </I18nextProvider>
        );
    });

    test("renders year filter buttons", () => {
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBeGreaterThan(0);
        expect(buttons[0]).toHaveClass("ring-2");
    });

    test("displays experiences filtered by selected year", () => {
        const buttons = screen.getAllByRole("button");
        fireEvent.click(buttons[0]);
        const roles = screen.getAllByRole("heading", {level: 3});
        expect(roles.length).toBeGreaterThan(0);
    });

    test("toggles technology panel when button clicked", async () => {
        const toggleButtons = screen.getAllByText(/show stack/i);
        const toggleButton = toggleButtons[0];

        // Controlla che il pannello non sia nel DOM o sia nascosto all’inizio
        expect(screen.queryByText(/MySQL/i)).not.toBeInTheDocument();

        fireEvent.click(toggleButton);

        await waitFor(() => {
            expect(screen.getByText(/MySQL/i)).toBeVisible();
        });

        fireEvent.click(toggleButton);

        await waitFor(() => {
            expect(screen.queryByText(/MySQL/i)).not.toBeInTheDocument();
        });
    });
});
