import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import Projects, {
    formatProjectPeriod,
    getCompanyFilters,
    isCurrentProject,
    sortProjectsByRecency
} from "./Projects";
import React from "react";
import {MemoryRouter} from "react-router-dom";
import {vi} from "vitest";
import * as service from "@/services/portfolioService";

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key, options = {}) => {
            const translations = {
                projects_title: "Projects",
                show_technologies: "Show technologies",
                previous: "Prev",
                next: "Next",
                error_generic: "Generic error",
                "projects_page.intro": "Professional delivery projects",
                "projects_page.filter_label": "Filter professional projects by company",
                "projects_page.all_companies": "All",
                "collection.range_summary": `${options.start}–${options.end} of ${options.total} ${options.label}`,
                "collection.range_announcement": `Showing items ${options.start} to ${options.end} of ${options.total} ${options.label}.`,
                "projects_page.collection_label_one": "project",
                "projects_page.collection_label_many": "projects",
                "projects_page.current": "Current",
                "projects_page.present": "Present",
                "projects_page.empty": "No professional projects available.",
                "project_types.intesa.exp_as400_frontend": "Frontend modernization for enterprise reporting.",
                "project_types.intesa.exp_ai_as400": "AI-assisted refactoring initiative in a regulated financial environment.",
                "project_types.intesa.exp_rpg_local_systems": "Maintenance and extension of core AS/400 applications.",
                "project_types.rgi.FEArchitecture": "Redesign of the core front-end environment.",
                "project_types.rgi.HalfLife": "Custom front-end libraries for life insurance workflows.",
                "project_types.italiaonline.areaClienti": "Customer portal development.",
                "project_types.fastweb.oloGatewayMobile": "Mobile portability web portal."
            };

            return translations[key] || key;
        },
    }),
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

const mockProjects = [
    {
        name: "Technical Lead – AI-Assisted Refactoring for RPG on IBM i (AS/400)",
        tech: "RPG, AS400",
        type: "intesa.exp_ai_as400",
        company: "Intesa Sanpaolo",
        period: "03/2026 - Present",
    },
    {
        name: "P2 Modernization",
        tech: "Angular",
        type: "intesa.exp_as400_frontend",
        company: "Intesa Sanpaolo",
        period: "12/2025 - Present",
    },
    {
        name: "P3 Core Systems",
        tech: "MySQL",
        type: "intesa.exp_rpg_local_systems",
        company: "Intesa Sanpaolo",
        period: "12/2025 - Present",
    },
    {
        name: "RGI Architecture",
        tech: "AngularJS",
        type: "rgi.FEArchitecture",
        company: "RGI",
        period: "03/2023 - 12/2025",
    },
    {
        name: "RGI HalfLife",
        tech: "Java",
        type: "rgi.HalfLife",
        company: "RGI",
        period: "01/2023 - 03/2023",
    },
    {
        name: "IOL Portal",
        tech: "Java",
        type: "italiaonline.areaClienti",
        company: "Italiaonline",
        period: "05/2019 - 09/2021",
    },
    {
        name: "Fastweb Mobile",
        tech: "jQuery",
        type: "fastweb.oloGatewayMobile",
        company: "Fastweb",
        period: "09/2016 - 10/2017",
    },
];

function renderProjects() {
    return render(
        <MemoryRouter initialEntries={["/projects"]}>
            <Projects/>
        </MemoryRouter>
    );
}

describe("Projects Component", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("shows loading initially", () => {
        vi.spyOn(service, "getProjects")
            .mockReturnValueOnce(new Promise(() => {
            }));

        renderProjects();

        expect(screen.getByRole("status")).toBeInTheDocument();
    });

    test("renders title, intro, all filter and first page after loading projects", async () => {
        vi.spyOn(service, "getProjects").mockResolvedValueOnce(mockProjects);

        renderProjects();

        expect(await screen.findByRole("heading", {name: "Projects"})).toBeInTheDocument();
        expect(screen.getByText("Professional delivery projects")).toBeInTheDocument();
        expect(screen.getByRole("group", {name: "Filter professional projects by company"})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "All (7)"})).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByText("1–6 of 7 projects")).toBeInTheDocument();
        expect(screen.getAllByTestId("project-card")).toHaveLength(6);
    });

    test("keeps the mobile filter and cards constrained to the viewport", async () => {
        vi.spyOn(service, "getProjects").mockResolvedValueOnce(mockProjects);

        renderProjects();

        const filterGroup = await screen.findByRole("group", {name: "Filter professional projects by company"});
        const filterSidebar = filterGroup.parentElement;
        const filterLayout = filterSidebar.parentElement;
        const firstCard = screen.getAllByTestId("project-card")[0];

        expect(filterGroup).toHaveClass("max-w-full");
        expect(filterSidebar).toHaveClass("min-w-0");
        expect(filterLayout).toHaveClass("min-w-0");
        expect(firstCard).toHaveClass("min-w-0");
    });

    test("sorts visible projects from newest to oldest", async () => {
        vi.spyOn(service, "getProjects").mockResolvedValueOnce([...mockProjects].reverse());

        renderProjects();

        await screen.findByRole("heading", {name: "Projects"});

        const headings = screen.getAllByRole("heading", {level: 2}).map((heading) => heading.textContent);
        expect(headings).toEqual([
            "Technical Lead – AI-Assisted Refactoring for RPG on IBM i (AS/400)",
            "P3 Core Systems",
            "P2 Modernization",
            "RGI Architecture",
            "RGI HalfLife",
            "IOL Portal"
        ]);
    });

    test("paginates older projects", async () => {
        vi.spyOn(service, "getProjects").mockResolvedValueOnce(mockProjects);

        renderProjects();

        const nextButtons = await screen.findAllByRole("button", {name: "Next"});
        fireEvent.click(nextButtons[0]);

        await waitFor(() => {
            expect(screen.getByText("7–7 of 7 projects")).toBeInTheDocument();
            expect(screen.getAllByTestId("project-card")).toHaveLength(1);
        });
        expect(screen.getByTestId("pagination-info")).toHaveTextContent("2 / 2");
        expect(screen.getByRole("heading", {name: "Fastweb Mobile"})).toBeInTheDocument();
    });

    test("filters projects by company and resets pagination", async () => {
        vi.spyOn(service, "getProjects").mockResolvedValueOnce(mockProjects);

        renderProjects();

        const nextButtons = await screen.findAllByRole("button", {name: "Next"});
        fireEvent.click(nextButtons[0]);

        await screen.findByText("7–7 of 7 projects");
        fireEvent.click(screen.getByRole("button", {name: "RGI (2)"}));

        await waitFor(() => {
            expect(screen.getByText("1–2 of 2 projects")).toBeInTheDocument();
            expect(screen.getAllByTestId("project-card")).toHaveLength(2);
        });
        expect(screen.getByRole("heading", {name: "RGI Architecture"})).toBeInTheDocument();
        expect(screen.getByRole("heading", {name: "RGI HalfLife"})).toBeInTheDocument();
    });

    test("renders current badge and localized current period", async () => {
        vi.spyOn(service, "getProjects").mockResolvedValueOnce(mockProjects);

        renderProjects();

        expect((await screen.findAllByText("Current")).length).toBeGreaterThan(0);

        expect(screen.getByText("03/2026 - Present")).toBeInTheDocument();
    });

    test("toggles technologies panel", async () => {
        vi.spyOn(service, "getProjects").mockResolvedValueOnce(mockProjects);

        renderProjects();

        await screen.findByText("Technical Lead – AI-Assisted Refactoring for RPG on IBM i (AS/400)");

        expect(screen.queryByText("RPG")).not.toBeInTheDocument();

        const button = screen.getAllByRole("button", {name: "Show technologies"})[0];
        fireEvent.click(button);

        expect(await screen.findByText("RPG")).toBeInTheDocument();
    });

    test("includes SEO title", async () => {
        vi.spyOn(service, "getProjects").mockResolvedValueOnce(mockProjects);

        renderProjects();

        await screen.findByRole("heading", {name: "Projects"});

        expect(document.title.toLowerCase()).toContain("projects");
    });

    test("shows error state on failure", async () => {
        vi.spyOn(service, "getProjects")
            .mockRejectedValueOnce(new Error("boom"));

        renderProjects();

        expect(await screen.findByText("Generic error")).toBeInTheDocument();
    });

    test("retry button calls getProjects again after error", async () => {
        const spy = vi.spyOn(service, "getProjects")
            .mockRejectedValueOnce(new Error("boom"))
            .mockResolvedValueOnce(mockProjects);

        renderProjects();

        await screen.findByText("Generic error");

        fireEvent.click(screen.getByText("retry"));

        await screen.findByText("Technical Lead – AI-Assisted Refactoring for RPG on IBM i (AS/400)");

        expect(spy).toHaveBeenCalledTimes(2);
    });

    test("handles empty projects list", async () => {
        vi.spyOn(service, "getProjects").mockResolvedValueOnce([]);

        renderProjects();

        await screen.findByText("Projects");

        expect(screen.getByText("No professional projects available.")).toBeInTheDocument();
        expect(screen.queryAllByTestId("project-card")).toHaveLength(0);
    });

    test("does not render impact text when project has no type", async () => {
        const data = [{
            name: "NoType",
            tech: "JS",
            company: "Intesa Sanpaolo",
            period: "2025",
        }];

        vi.spyOn(service, "getProjects").mockResolvedValueOnce(data);

        renderProjects();

        await screen.findByText("NoType");

        expect(screen.queryByText(/Frontend modernization/i)).not.toBeInTheDocument();
    });
});

describe("Projects helpers", () => {

    test("sorts projects by recency without mutating input", () => {
        const unsorted = [mockProjects[6], mockProjects[3], mockProjects[0]];
        const sorted = sortProjectsByRecency(unsorted, 2026);

        expect(sorted.map((project) => project.name))
            .toEqual(["Technical Lead – AI-Assisted Refactoring for RPG on IBM i (AS/400)", "RGI Architecture", "Fastweb Mobile"]);
        expect(unsorted[0].name).toBe("Fastweb Mobile");
    });

    test("builds company filters with all first", () => {
        expect(getCompanyFilters(mockProjects))
            .toEqual(["all", "Intesa Sanpaolo", "RGI", "Italiaonline", "Fastweb"]);
    });

    test("localizes present labels", () => {
        expect(formatProjectPeriod("03/2026 - Present", () => "Now"))
            .toBe("03/2026 - Now");
    });

    test("detects current projects", () => {
        expect(isCurrentProject("03/2026 - Present")).toBe(true);
        expect(isCurrentProject("03/2023 - 12/2025")).toBe(false);
    });
});
