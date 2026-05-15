import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import Experience, {
    formatExperiencePeriod,
    getExperienceStatus,
    getExperienceYears,
    getVisibleRange,
    sortExperiencesByRecency
} from "./Experience";
import {MemoryRouter} from "react-router-dom";
import {vi} from "vitest";
import * as service from "@/services/portfolioService";

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key, options = {}) => {
            const translations = {
                exp_current_role: "Current Engineer",
                exp_current_description: "Current enterprise work",
                exp_rgi_role: "Developer",
                exp_rgi_description: "Worked on backend development",
                exp_iol_role: "Engineer",
                exp_iol_description: "Frontend work",
                exp_tecnavia_role: "Mobile Engineer",
                exp_tecnavia_description: "Mobile work",
                exp_teoresi_role: "Java Engineer",
                exp_teoresi_description: "Java work",
                exp_hpe_role: "Older Engineer",
                exp_hpe_description: "Older work",
                experience_title: "Professional Experience",
                experience_intro: "Career timeline",
                experience_results_summary: `Showing ${options.start}-${options.end} of ${options.total} timeline entries`,
                experience_timeline_label: "Professional timeline",
                experience_empty: "No experience entries available.",
                experience_present: "Present",
                show_technologies: "Show technologies",
                previous: "Previous",
                next: "Next",
                exp_label_ongoing: "Current role",
                error_generic: "Generic error"
            };

            return translations[key] || key;
        },
        i18n: {
            changeLanguage: vi.fn(() => Promise.resolve())
        }
    }),
    initReactI18next: {
        type: "3rdParty",
        init: vi.fn()
    }
}));

vi.mock("@/components/loading/Loading", () => ({
    Loading: () => <div role="status">loading</div>,
}));

vi.mock("@/components/errorState/ErrorState", () => ({
    ErrorState: ({message, onRetry}) => (
        <div>
            <span>{message}</span>
            <button onClick={onRetry}>retry</button>
        </div>
    ),
}));

const mockExperiences = [
    {
        role: "exp_current_role",
        company: "Bank",
        period: "2025 - Present",
        description: "exp_current_description",
        tech: "Java",
    },
    {
        role: "exp_rgi_role",
        company: "RGI",
        period: "2020 - 2022",
        description: "exp_rgi_description",
        tech: "Angular",
    },
    {
        role: "exp_iol_role",
        company: "IOL",
        period: "2018 - 2020",
        description: "exp_iol_description",
        tech: "React",
    },
    {
        role: "exp_tecnavia_role",
        company: "Tecnavia",
        period: "2017 - 2018",
        description: "exp_tecnavia_description",
        tech: "React Native",
    },
    {
        role: "exp_teoresi_role",
        company: "Teoresi",
        period: "2016 - 2017",
        description: "exp_teoresi_description",
        tech: "Java",
    },
    {
        role: "exp_hpe_role",
        company: "HPE",
        period: "2014 - 2016",
        description: "exp_hpe_description",
        tech: "Java",
    },
];

function renderPage() {
    return render(
        <MemoryRouter initialEntries={["/experience"]}>
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

    test("renders the professional timeline title after load", async () => {
        vi.spyOn(service, "getExperiences")
            .mockResolvedValueOnce(mockExperiences);

        renderPage();

        expect(
            await screen.findByRole("heading", {name: /professional experience/i})
        ).toBeInTheDocument();
    });

    test("renders compact summary and first timeline page", async () => {
        vi.spyOn(service, "getExperiences")
            .mockResolvedValueOnce(mockExperiences);

        renderPage();

        await screen.findByRole("heading", {name: /professional experience/i});

        expect(screen.getByText("Career timeline")).toBeInTheDocument();
        expect(screen.getByText("Showing 1-5 of 6 timeline entries")).toBeInTheDocument();
        expect(screen.getAllByTestId("pagination-info")).toHaveLength(2);
        screen.getAllByTestId("pagination-info")
            .forEach((info) => expect(info).toHaveTextContent("1 / 2"));
        expect(screen.getAllByTestId("experience-card")).toHaveLength(5);
        expect(screen.getByRole("list", {name: "Professional timeline"})).toBeInTheDocument();
    });

    test("sorts visible timeline cards from newest to oldest", async () => {
        vi.spyOn(service, "getExperiences")
            .mockResolvedValueOnce([...mockExperiences].reverse());

        renderPage();

        await screen.findByRole("heading", {name: /professional experience/i});

        const headings = screen.getAllByRole("heading", {level: 2}).map((heading) => heading.textContent);
        expect(headings).toEqual([
            "Current Engineer",
            "Developer",
            "Engineer",
            "Mobile Engineer",
            "Java Engineer"
        ]);
    });

    test("paginates older timeline entries", async () => {
        vi.spyOn(service, "getExperiences")
            .mockResolvedValueOnce(mockExperiences);

        renderPage();

        const nextButtons = await screen.findAllByRole("button", {name: "Next"});
        fireEvent.click(nextButtons[0]);

        expect(screen.getByText("Showing 6-6 of 6 timeline entries")).toBeInTheDocument();
        screen.getAllByTestId("pagination-info")
            .forEach((info) => expect(info).toHaveTextContent("2 / 2"));
        expect(screen.getAllByTestId("experience-card")).toHaveLength(1);
        expect(screen.getByRole("heading", {name: "Older Engineer"})).toBeInTheDocument();
    });

    test("renders current-role badge and localized current period", async () => {
        vi.spyOn(service, "getExperiences")
            .mockResolvedValueOnce(mockExperiences);

        renderPage();

        await screen.findByText("Current role");

        expect(screen.getByText("2025 - Present")).toBeInTheDocument();
        expect(screen.getAllByRole("button", {name: "Show technologies"})).toHaveLength(5);
    });

    test("includes SEO title", async () => {
        vi.spyOn(service, "getExperiences")
            .mockResolvedValueOnce(mockExperiences);

        renderPage();

        await screen.findByText(/professional experience/i);

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

        await screen.findByRole("heading", {name: /professional experience/i});

        expect(spy).toHaveBeenCalledTimes(2);
    });

    test("handles empty experiences list", async () => {
        vi.spyOn(service, "getExperiences")
            .mockResolvedValueOnce([]);

        renderPage();

        await screen.findByRole("heading", {name: /professional experience/i});

        expect(screen.queryAllByTestId("experience-card")).toHaveLength(0);
        expect(screen.getByText("No experience entries available.")).toBeInTheDocument();
    });

    test("calls getExperiences on mount", async () => {
        const spy = vi.spyOn(service, "getExperiences")
            .mockResolvedValueOnce(mockExperiences);

        renderPage();

        await screen.findByText(/professional experience/i);

        expect(spy).toHaveBeenCalledTimes(1);
    });
});

describe("Experience helpers", () => {

    const t = (key) => key;

    test("expands full and ongoing year ranges", () => {
        expect(getExperienceYears("2020 - 2022", 2026))
            .toEqual(["2020", "2021", "2022"]);

        expect(getExperienceYears("12/2025 - Present", 2026))
            .toEqual(["2025", "2026"]);
    });

    test("sorts experiences by recency without mutating input", () => {
        const unsorted = [mockExperiences[2], mockExperiences[1], mockExperiences[0]];
        const sorted = sortExperiencesByRecency(unsorted, 2026);

        expect(sorted.map((experience) => experience.role))
            .toEqual(["exp_current_role", "exp_rgi_role", "exp_iol_role"]);
        expect(unsorted[0].role).toBe("exp_iol_role");
    });

    test("calculates visible ranges for paginated timeline entries", () => {
        expect(getVisibleRange(1, 11, 5)).toEqual({start: 1, end: 5});
        expect(getVisibleRange(3, 11, 5)).toEqual({start: 11, end: 11});
        expect(getVisibleRange(1, 0, 5)).toEqual({start: 0, end: 0});
    });

    test("returns current status only for ongoing roles", () => {
        expect(getExperienceStatus("2025 - Present", t, 2026))
            .toEqual({label: "exp_label_ongoing", type: "ongoing"});

        expect(getExperienceStatus("2020 - 2022", t, 2026))
            .toBeNull();
    });

    test("localizes present labels", () => {
        expect(formatExperiencePeriod("12/2025 - Present", () => "Now"))
            .toBe("12/2025 - Now");
    });
});
