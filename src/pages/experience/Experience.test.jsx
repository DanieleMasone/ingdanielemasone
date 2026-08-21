import React from "react";
import {fireEvent, render, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Experience, {
    formatExperiencePeriod,
    getExperienceStatus,
    sortExperiencesByRecency
} from "./Experience";
import {MemoryRouter} from "react-router-dom";
import {vi} from "vitest";
import * as service from "@/services/portfolioService";

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key, options = {}) => {
            const translations = {
                exp_intesa_role: "Expert Software Engineer – Group Technology & Services",
                exp_intesa_description: {
                    paragraphs: [
                        "I work in software engineering for enterprise, mission-critical financial systems subject to stringent regulatory requirements.",
                        "I coordinate an internal initiative aimed at introducing Artificial Intelligence into software engineering activities.",
                        "I am also the technical lead for an AI-assisted reverse engineering project focused on complex RPG systems."
                    ],
                    sections: [{
                        label: "Main focus areas",
                        items: [
                            "RPG / IBM AS/400",
                            "Backend / Frontend engineering",
                            "Enterprise architecture alignment",
                            "Legacy systems modernization",
                            "AI-assisted software engineering",
                            "Code quality & maintainability",
                            "Financial systems reliability",
                            "Large-scale regulated environments"
                        ]
                    }]
                },
                exp_rgi_role: "Developer",
                exp_rgi_description: {
                    paragraphs: ["Led front-end architecture work."],
                    sections: [{items: ["Code review", "Architecture standards"]}]
                },
                exp_iol_role: "Engineer",
                exp_iol_description: "Frontend work",
                exp_tecnavia_role: "Mobile Engineer",
                exp_tecnavia_description: "Mobile work",
                exp_teoresi_role: "Java Engineer",
                exp_teoresi_description: "Java work",
                exp_hpe_role: "Older Engineer",
                exp_hpe_description: "Older work",
                exp_digiCamere_role: "Systems Engineer",
                exp_digiCamere_description: "Systems work",
                exp_piksel_role: "Platform Engineer",
                exp_piksel_description: "Platform work",
                exp_coach_role: "Private Tutor",
                exp_coach_description: "Technical mentoring",
                exp_polimi_role: "Computer Engineering Degree",
                exp_polimi_description: "University education",
                exp_salesiani_role: "Computer Science Student",
                exp_salesiani_description: "Technical education",
                experience_title: "Professional Experience",
                experience_intro: "Career timeline",
                "collection.range_summary": `${options.start}–${options.end} of ${options.total} ${options.label}`,
                "collection.range_announcement": `Showing items ${options.start} to ${options.end} of ${options.total} ${options.label}.`,
                experience_collection_label_one: "experience",
                experience_collection_label_many: "experiences",
                experience_timeline_label: "Professional experience in chronological order",
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
        role: "exp_intesa_role",
        company: "Intesa Sanpaolo",
        period: "2025 - Present",
        description: "exp_intesa_description",
        tech: "Java",
    },
    {
        role: "exp_rgi_role",
        company: "RGI",
        period: "09/2021 - 12/2025",
        description: "exp_rgi_description",
        tech: "Angular",
    },
    {
        role: "exp_iol_role",
        company: "IOL",
        period: "05/2019 - 09/2021",
        description: "exp_iol_description",
        tech: "React",
    },
    {
        role: "exp_tecnavia_role",
        company: "Tecnavia",
        period: "07/2018 - 05/2019",
        description: "exp_tecnavia_description",
        tech: "React Native",
    },
    {
        role: "exp_teoresi_role",
        company: "Teoresi",
        period: "10/2017 - 07/2018",
        description: "exp_teoresi_description",
        tech: "Java",
    },
    {
        role: "exp_hpe_role",
        company: "HPE",
        period: "09/2016 - 10/2017",
        description: "exp_hpe_description",
        tech: "Java",
    },
    {
        role: "exp_digiCamere_role",
        company: "DigiCamere",
        period: "06/2016 - 09/2016",
        description: "exp_digiCamere_description",
        tech: "Linux",
    },
    {
        role: "exp_piksel_role",
        company: "Piksel",
        period: "10/2015 - 04/2016",
        description: "exp_piksel_description",
        tech: "Tomcat",
    },
    {
        role: "exp_coach_role",
        company: "-",
        period: "01/2009 - 10/2015",
        description: "exp_coach_description",
        tech: "C++",
    },
    {
        role: "exp_polimi_role",
        company: "Politecnico di Milano",
        period: "2010 - 2014",
        description: "exp_polimi_description",
        tech: "Java",
    },
    {
        role: "exp_salesiani_role",
        company: "Salesiani Sesto San Giovanni",
        period: "2005 - 2010",
        description: "exp_salesiani_description",
        tech: "C",
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

    test("renders compact summary and first chronological page", async () => {
        vi.spyOn(service, "getExperiences")
            .mockResolvedValueOnce(mockExperiences);

        renderPage();

        await screen.findByRole("heading", {name: /professional experience/i});

        expect(screen.getByText("Career timeline")).toBeInTheDocument();
        expect(screen.getByText("1–7 of 11 experiences")).toBeInTheDocument();
        expect(screen.getAllByTestId("pagination-info")).toHaveLength(1);
        expect(screen.getByTestId("pagination-info")).toHaveTextContent("1 / 2");
        expect(screen.getAllByTestId("experience-card")).toHaveLength(7);
        expect(screen.getByRole("list", {
            name: "Professional experience in chronological order"
        })).toBeInTheDocument();
    });

    test("uses a responsive chronological grid and features the current role", async () => {
        vi.spyOn(service, "getExperiences")
            .mockResolvedValueOnce(mockExperiences);

        renderPage();

        const list = await screen.findByRole("list", {
            name: "Professional experience in chronological order"
        });
        const cards = screen.getAllByTestId("experience-card");

        expect(list).toHaveClass("grid", "grid-cols-1", "md:grid-cols-2");
        expect(cards[0].closest("li")).toHaveClass("md:col-span-2");
        expect(cards[0]).toHaveClass("min-w-0", "self-start");
        expect(cards[1].closest("li")).not.toHaveClass("md:col-span-2");
        expect(cards[0]).not.toHaveClass("h-full");
    });

    test("sorts visible experience cards from newest to oldest", async () => {
        vi.spyOn(service, "getExperiences")
            .mockResolvedValueOnce([...mockExperiences].reverse());

        renderPage();

        await screen.findByRole("heading", {name: /professional experience/i});

        const headings = screen.getAllByRole("heading", {level: 2}).map((heading) => heading.textContent);
        expect(headings).toEqual([
            "Expert Software Engineer – Group Technology & Services",
            "Developer",
            "Engineer",
            "Mobile Engineer",
            "Java Engineer",
            "Older Engineer",
            "Systems Engineer"
        ]);
    });

    test("paginates older experience entries", async () => {
        vi.spyOn(service, "getExperiences")
            .mockResolvedValueOnce(mockExperiences);

        renderPage();

        const nextButtons = await screen.findAllByRole("button", {name: "Next"});
        fireEvent.click(nextButtons[0]);

        expect(screen.getByText("8–11 of 11 experiences")).toBeInTheDocument();
        expect(screen.getByTestId("pagination-info")).toHaveTextContent("2 / 2");
        expect(screen.getAllByTestId("experience-card")).toHaveLength(4);
        expect(screen.getAllByRole("heading", {level: 2}).map((heading) => heading.textContent))
            .toEqual([
                "Platform Engineer",
                "Private Tutor",
                "Computer Engineering Degree",
                "Computer Science Student"
            ]);
    });

    test("renders current-role badge and localized current period", async () => {
        vi.spyOn(service, "getExperiences")
            .mockResolvedValueOnce(mockExperiences);

        renderPage();

        await screen.findByText("Current role");

        expect(screen.getByText("2025 - Present")).toBeInTheDocument();
        expect(screen.getAllByRole("button", {name: "Show technologies"})).toHaveLength(7);
    });

    test("opens a technology disclosure from the keyboard", async () => {
        const user = userEvent.setup();
        vi.spyOn(service, "getExperiences")
            .mockResolvedValueOnce(mockExperiences);

        renderPage();

        const currentCard = (await screen.findAllByTestId("experience-card"))[0];
        const disclosure = within(currentCard).getByRole("button", {name: "Show technologies"});

        disclosure.focus();
        await user.keyboard("{Enter}");

        expect(disclosure).toHaveAttribute("aria-expanded", "true");
        expect(within(currentCard).getByText("Java")).toBeInTheDocument();
    });

    test("renders the current Intesa experience as semantic paragraphs and focus items", async () => {
        vi.spyOn(service, "getExperiences")
            .mockResolvedValueOnce(mockExperiences);

        renderPage();

        expect(await screen.findByRole("heading", {
            name: "Expert Software Engineer – Group Technology & Services"
        })).toBeInTheDocument();

        expect(screen.queryByText("exp_intesa_description")).not.toBeInTheDocument();
        expect(screen.getByText(/mission-critical financial systems/i).tagName).toBe("P");
        expect(screen.getByText(/introducing Artificial Intelligence/i).tagName).toBe("P");
        expect(screen.getByText(/AI-assisted reverse engineering/i).tagName).toBe("P");

        const focusHeading = screen.getByRole("heading", {level: 3, name: "Main focus areas"});
        const focusSection = focusHeading.closest("section");

        expect(focusSection).toBeInTheDocument();
        expect(within(focusSection).getAllByRole("listitem")).toHaveLength(8);
        expect(within(focusSection).getByText("RPG / IBM AS/400")).toBeInTheDocument();
        expect(screen.getByText("Led front-end architecture work.").tagName).toBe("P");
        expect(screen.getByText("Code review").closest("li")).toBeInTheDocument();
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

    test("sorts experiences by recency without mutating input", () => {
        const unsorted = [mockExperiences[2], mockExperiences[1], mockExperiences[0]];
        const sorted = sortExperiencesByRecency(unsorted, 2026);

        expect(sorted.map((experience) => experience.role))
            .toEqual(["exp_intesa_role", "exp_rgi_role", "exp_iol_role"]);
        expect(unsorted[0].role).toBe("exp_iol_role");
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
