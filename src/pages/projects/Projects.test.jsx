import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import Projects from "./Projects";
import React from "react";
import {MemoryRouter} from 'react-router-dom';
import {vi} from 'vitest';
import * as service from "@/services/portfolioService";

// Mock react-i18next
vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key, fallback) => {
            const translations = {
                projects_title: "Projects",
                show_technologies: "Show Technologies",
                previous: "Prev",
                next: "Next",
                error_generic: "Generic error",

                // INTESA SANPAOLO
                "project_types.intesa.exp_as400_frontend": "Design and implementation of scalable frontend architectures integrated with legacy RPG systems for foreign network reporting; optimized UI/UX.",
                "project_types.intesa.exp_hybrid_fullstack": "Contribution to BE/FE pipelines for financial reporting, integrating modern APIs with legacy systems; applied best practices for architectural solidity in global teams.",
                "project_types.intesa.exp_rpg_local_systems": "Maintenance and extension of core AS/400 applications for proprietary trading; enhanced system reliability through code refactoring, ensuring full compliance and zero production downtime.",

                // FASTWEB
                "project_types.fastweb.oloGatewayMobile": "Development of a web portal for managing number portability requests for Fastweb's mobile customers.",
                "project_types.fastweb.oloGatewayFisso": "Implementation of web portals for partner operators (e.g., Metroweb, Flash Fiber) related to fixed network provisioning.",
                "project_types.fastweb.OSSTrasformation": "Reengineering of Fastweb's core web portal used for managing key business-critical operations.",

                // TEORESI
                "project_types.teoresi.tecno": "Development of web platform for booking meeting rooms and workstations with customizable features (AC, lights, projector, etc.). IoT device data enables full environmental monitoring.",
                "project_types.teoresi.dart": "Development of web portal for managing FCA's vehicle fleet, integrated with a MATLAB client.",

                // TECNAVIA
                "project_types.tecnavia.newsmemory": "Development of a CMS for digital newspaper management and publishing.",
                "project_types.tecnavia.mobileApp": "Hybrid mobile app built with React Native and native modules in Objective-C (iOS) and Java (Android).",

                // ITALIAONLINE
                "project_types.italiaonline.areaClienti": "Development of Italiaonline's main customer portal.",
                "project_types.italiaonline.restServices": "Design and implementation of REST services for read/write operations on Oracle DB.",

                // RGI
                "project_types.rgi.FEArchitecture": "Redesign of the core Front-End environment (portal client), defining the new architectural standards and overseeing technical responsibilities as a Technical Architect.",
                "project_types.rgi.HalfLife": "Development of custom front-end libraries for life insurance workflows, with responsibilities as Front-End Team Leader and technical coordinator.",
                "project_types.rgi.AXAmobility": "Development of a web portal for AXA operators, handling multiple insurance processes, release management, and definition of architectural guidelines.",
                "project_types.rgi.GroupPolicyLibrary": "Implementation of a custom library for group policy insurance workflows, including the definition of technical guidelines to ensure maintainability and scalability.",
                "project_types.rgi.AfterLife": "Development of reusable components for life insurance flows, with a focus on defining front-end architecture and best development practices.",
            };
            return translations[key] || fallback || key;
        },
    }),
}));

const mockProjects = [
    {
        name: "P1",
        tech: "RPG, AS400",
        type: "intesa.exp_as400_frontend",
        company: "Intesa Sanpaolo",
        period: "2025",
    },
    {
        name: "P2",
        tech: "Angular",
        type: "intesa.exp_hybrid_fullstack",
        company: "Intesa Sanpaolo",
        period: "2025",
    },
    {
        name: "P3",
        tech: "MySQL",
        type: "intesa.exp_rpg_local_systems",
        company: "Intesa Sanpaolo",
        period: "2025",
    },
];

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

function renderProjects() {
    return render(
        <MemoryRouter initialEntries={['/projects']}>
            <Projects/>
        </MemoryRouter>
    );
}

describe("Projects Component", () => {

    beforeAll(() => {
        Object.defineProperty(window, "scrollTo", {
            value: vi.fn(),
            writable: true,
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("renders title after loading projects", async () => {
        vi.spyOn(service, "getProjects").mockResolvedValueOnce(mockProjects);

        renderProjects();

        expect(await screen.findByText("Projects")).toBeInTheDocument();
    });

    test("shows loading then projects", async () => {
        vi.spyOn(service, "getProjects")
            .mockReturnValueOnce(new Promise(() => {
            }));

        renderProjects();

        expect(screen.getByRole("status")).toBeInTheDocument();
    });

    test("shows error state on failure", async () => {
        vi.spyOn(service, "getProjects")
            .mockRejectedValueOnce(new Error("boom"));

        renderProjects();

        expect(await screen.findByText("Generic error")).toBeInTheDocument();
    });

    test("pagination moves to second page", async () => {
        vi.spyOn(service, "getProjects").mockResolvedValueOnce(mockProjects);

        renderProjects();

        await screen.findByText("P1");

        const next = screen.getAllByRole("button", {name: /next/i})[0];
        fireEvent.click(next);

        await waitFor(() => {
            expect(screen.getByText("P3")).toBeInTheDocument();
        });
    });

    test("toggles technologies panel", async () => {
        vi.spyOn(service, "getProjects").mockResolvedValueOnce(mockProjects);

        renderProjects();

        await screen.findByText("P1");

        expect(screen.queryByText("RPG")).not.toBeInTheDocument();

        const btn = screen.getAllByText("Show Technologies")[0];
        fireEvent.click(btn);

        expect(await screen.findByText("RPG")).toBeInTheDocument();
    });

    test("renders company sidebar buttons with counts", async () => {
        vi.spyOn(service, "getProjects").mockResolvedValueOnce(mockProjects);

        renderProjects();

        await screen.findByText("P1");

        expect(screen.getByRole("button", {name: /Intesa Sanpaolo/i}))
            .toBeInTheDocument();

        // badge count
        expect(screen.getByText("3")).toBeInTheDocument();
    });

    test("filters projects when selecting another company", async () => {
        const data = [
            ...mockProjects,
            {
                name: "OtherCoProj",
                tech: "React",
                type: "x",
                company: "OtherCo",
                period: "2024",
            }
        ];

        vi.spyOn(service, "getProjects").mockResolvedValueOnce(data);

        renderProjects();

        await screen.findByText("P1");

        fireEvent.click(screen.getByRole("button", {name: /OtherCo/i}));

        await waitFor(() => {
            expect(screen.getByText("OtherCoProj")).toBeInTheDocument();
            expect(screen.queryByText("P1")).not.toBeInTheDocument();
        });
    });

    test("resets page to 1 when company changes", async () => {
        vi.spyOn(service, "getProjects").mockResolvedValueOnce(mockProjects);

        renderProjects();
        await screen.findByText("P1");

        const next = screen.getAllByRole("button", {name: /next/i})[0];
        fireEvent.click(next);

        await screen.findByText("P3");

        // riclicco stessa company → reset page
        fireEvent.click(screen.getByRole("button", {name: /Intesa Sanpaolo/i}));

        await waitFor(() => {
            expect(screen.getByText("P1")).toBeInTheDocument();
        });
    });

    test("calls window.scrollTo when changing company", async () => {
        vi.spyOn(service, "getProjects").mockResolvedValueOnce(mockProjects);
        const scrollSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {
        });

        renderProjects();
        await screen.findByText("P1");

        fireEvent.click(screen.getByRole("button", {name: /Intesa Sanpaolo/i}));

        expect(scrollSpy).toHaveBeenCalled();

        scrollSpy.mockRestore();
    });

    test("retry button calls getProjects again after error", async () => {
        const spy = vi.spyOn(service, "getProjects")
            .mockRejectedValueOnce(new Error("boom"))
            .mockResolvedValueOnce(mockProjects);

        renderProjects();

        await screen.findByText("Generic error");

        fireEvent.click(screen.getByText("retry"));

        await screen.findByText("P1");

        expect(spy).toHaveBeenCalledTimes(2);
    });

    test("does not render grid when no projects for selected company", async () => {
        vi.spyOn(service, "getProjects").mockResolvedValueOnce([]);

        renderProjects();

        await screen.findByText("Projects");

        expect(screen.queryByText("P1")).not.toBeInTheDocument();
    });

    test("does not render ExpandableText when project has no type", async () => {
        const data = [{
            name: "NoType",
            tech: "JS",
            company: "Intesa Sanpaolo",
            period: "2025",
        }];

        vi.spyOn(service, "getProjects").mockResolvedValueOnce(data);

        renderProjects();

        await screen.findByText("NoType");

        expect(screen.queryByText(/Design and implementation/i))
            .not.toBeInTheDocument();
    });

});
