import React from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import Experience, {getExperienceLabel} from "./Experience";
import {MemoryRouter} from 'react-router-dom';
import {vi} from 'vitest';
import * as service from "@/services/portfolio.service";

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
                "exp_label_single": "Only this year",
                "error_generic": "Generic error"
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

vi.mock("@/App", () => ({
    Loading: () => <div role="status">loading</div>,
    ErrorState: ({message, onRetry}) => (
        <div>
            <span>{message}</span>
            <button onClick={onRetry}>retry</button>
        </div>
    ),
}));

const mockExperiences = [
    {
        role: "exp_rgi_role",
        company: "RGI",
        period: "2020 - 2022",
        description: "exp_rgi_description",
        tech: "Java",
    },
    {
        role: "exp_iol_role",
        company: "IOL",
        period: "2018 - 2020",
        description: "exp_iol_description",
        tech: "React",
    },
];

function renderPage() {
    return render(
        <MemoryRouter initialEntries={['/experience']}>
            <Experience/>
        </MemoryRouter>
    );
}

describe("Experience component", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("shows loading initially", () => {
        vi.spyOn(service, "getExperiences")
            .mockReturnValueOnce(new Promise(() => {
            }));

        renderPage();

        expect(screen.getByRole("status")).toBeInTheDocument();
    });

    test("renders title after load", async () => {
        vi.spyOn(service, "getExperiences")
            .mockResolvedValueOnce(mockExperiences);

        renderPage();

        expect(
            await screen.findByRole("heading", {name: /experience/i})
        ).toBeInTheDocument();
    });

    test("renders year filter buttons", async () => {
        vi.spyOn(service, "getExperiences")
            .mockResolvedValueOnce(mockExperiences);

        renderPage();

        await screen.findByText(/experience/i);

        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBeGreaterThan(0);
    });

    test("renders filtered experiences after clicking a year", async () => {
        vi.spyOn(service, "getExperiences")
            .mockResolvedValueOnce(mockExperiences);

        renderPage();

        const buttons = await screen.findAllByRole("button");
        fireEvent.click(buttons[0]);

        const roles = await screen.findAllByRole("heading", {level: 3});
        expect(roles.length).toBeGreaterThan(0);
    });

    test("shows status badges", async () => {
        vi.spyOn(service, "getExperiences")
            .mockResolvedValueOnce(mockExperiences);

        renderPage();

        // Wait for the year buttons to exist
        const yearButtons = await screen.findAllByRole("button");

        // Find a year that produces cards
        let found = false;

        for (const btn of yearButtons) {
            fireEvent.click(btn);

            const cards = screen.queryAllByRole("heading", {level: 3});
            if (cards.length > 0) {
                found = true;
                break;
            }
        }

        expect(found).toBe(true);

        const start = screen.queryAllByText("Start");
        const end = screen.queryAllByText("End");
        const single = screen.queryAllByText("Only this year");

        expect(start.length + end.length + single.length)
            .toBeGreaterThan(0);
    });

    test("includes SEO title", async () => {
        vi.spyOn(service, "getExperiences")
            .mockResolvedValueOnce(mockExperiences);

        renderPage();

        await screen.findByText(/experience/i);

        expect(document.title.toLowerCase())
            .toContain("experience");
    });

    test("shows error state on failure", async () => {
        vi.spyOn(service, "getExperiences")
            .mockRejectedValueOnce(new Error("boom"));

        renderPage();

        expect(await screen.findByText("Generic error")).toBeInTheDocument();
    });

    test("retry reloads data", async () => {
        const spy = vi.spyOn(service, "getExperiences")
            .mockRejectedValueOnce(new Error("boom"))
            .mockResolvedValueOnce(mockExperiences);

        renderPage();

        const retry = await screen.findByRole("button", {name: /retry/i});
        fireEvent.click(retry);

        await screen.findAllByRole("heading", {level: 2});

        expect(spy).toHaveBeenCalledTimes(2);
    });

    test("handles empty experiences list", async () => {
        vi.spyOn(service, "getExperiences")
            .mockResolvedValueOnce([]);

        renderPage();

        await screen.findByRole("heading", {name: /experience/i});

        const cards = screen.queryAllByRole("heading", {level: 3});
        expect(cards.length).toBe(0);
    });

    test("calls getExperiences on mount", async () => {
        const spy = vi.spyOn(service, "getExperiences")
            .mockResolvedValueOnce(mockExperiences);

        renderPage();

        await screen.findByText(/experience/i);

        expect(spy).toHaveBeenCalledTimes(1);
    });

    // ---------------- pure function tests ----------------

    describe("getExperienceLabel", () => {

        const t = (k) => k;

        test("returns correct label types", () => {
            expect(getExperienceLabel("2020 - 2022", "2020", t))
                .toEqual({label: "exp_label_start", type: "start"});

            expect(getExperienceLabel("2020 - 2022", "2022", t))
                .toEqual({label: "exp_label_end", type: "end"});

            expect(getExperienceLabel("2020 - 2020", "2020", t))
                .toEqual({label: "exp_label_single", type: "single"});

            expect(getExperienceLabel("2020 - 2022", "2021", t))
                .toBeNull();
        });
    });

});
