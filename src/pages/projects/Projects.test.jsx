import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import Projects from "./Projects";
import React from "react";
import {MemoryRouter} from 'react-router-dom';
import {vi} from 'vitest';

// Mock react-i18next
vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key, fallback) => {
            const translations = {
                projects_title: "Projects",
                show_technologies: "Show Technologies",
                previous: "Prev",
                next: "Next",

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

describe("Projects Component", () => {
    beforeEach(() => {
        render(
            <MemoryRouter initialEntries={['/projects']}>
                <Projects/>
            </MemoryRouter>
        );
    });

    const getPaginationControls = () => {
        const nextButtons = screen.getAllByRole("button", {name: /Next/i});
        const prevButtons = screen.getAllByRole("button", {name: /Prev/i});
        const pageDisplays = screen.getAllByTestId("pagination-info");
        return {nextButtons, prevButtons, pageDisplays};
    };

    test("renders projects title", () => {
        expect(screen.getByText("Projects")).toBeInTheDocument();
    });

    test("renders new Intesa project descriptions", async () => {
        // Wait for rendering and use queryBy to check presence
        await waitFor(() => {
            expect(screen.getByText(/Design and implementation of scalable frontend architectures/)).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText(/Contribution to BE\/FE pipelines/)).toBeInTheDocument();
        });

        // Third project could be on page 2 (ITEMS_PER_PAGE=2)
        const {nextButtons} = getPaginationControls();
        fireEvent.click(nextButtons[0]); // Go to page 2

        await waitFor(() => {
            expect(screen.getByText(/Maintenance and extension of core AS\/400 applications/)).toBeInTheDocument();
        });
    });

    test("renders Intesa Sanpaolo projects by default", () => {
        expect(screen.getByText("AS/400 Reporting Frontend Modernization")).toBeInTheDocument();
        expect(screen.getAllByText("Intesa Sanpaolo").length).toBeGreaterThan(0);
    });

    test("renders new Intesa project descriptions", async () => {
        await waitFor(() => {
            expect(screen.getByText(/Design and implementation of scalable frontend architectures/)).toBeInTheDocument();
            expect(screen.getByText(/Contribution to BE\/FE pipelines/)).toBeInTheDocument();
        });

        const {nextButtons} = getPaginationControls();
        fireEvent.click(nextButtons[0]);

        await waitFor(() => {
            expect(screen.getByText(/Maintenance and extension of core AS\/400 applications/)).toBeInTheDocument();
        });
    });

    test("RPG project shows correct limited tech stack", async () => {
        // Navigate to Intesa page 2 where there is ONLY the RPG project
        const {nextButtons} = getPaginationControls();
        fireEvent.click(nextButtons[0]);

        // Open THE ONLY disclosure present (RPG project)
        const rpgTechButton = await screen.findByText("Show Technologies");
        fireEvent.click(rpgTechButton);

        // Check EXACTLY the 3 techs of the RPG project
        const techTags = screen.getAllByText(/RPG|AS400|MySQL/);
        expect(techTags).toHaveLength(4);

        // It does NOT have the tech of previous projects
        expect(screen.queryByText("Angular")).not.toBeInTheDocument();
        expect(screen.queryByText("jQuery")).not.toBeInTheDocument();
    });

    test("renders both mobile and desktop pagination controls", () => {
        const {nextButtons, prevButtons, pageDisplays} = getPaginationControls();

        expect(nextButtons.length).toBe(2);
        expect(prevButtons.length).toBe(2);
        expect(pageDisplays.length).toBe(2);

        // Intesa has 3 projects = 2 pages (ITEMS_PER_PAGE = 2)
        pageDisplays.forEach(el => expect(el).toHaveTextContent("1 / 2"));
    });

    test("prev buttons are disabled on first page", () => {
        const {prevButtons} = getPaginationControls();
        prevButtons.forEach(btn => expect(btn).toBeDisabled());
    });

    test("next buttons work and show second page for Intesa (3 projects)", async () => {
        const {nextButtons} = getPaginationControls();

        // Click next on the pagers
        nextButtons.forEach(btn => fireEvent.click(btn));

        await waitFor(() => {
            const pageDisplays = screen.getAllByTestId("pagination-info");
            pageDisplays.forEach(el => expect(el).toHaveTextContent("2 / 2"));
        });
    });

    test("toggles technology panel for Intesa project", async () => {
        const techButtons = screen.getAllByText("Show Technologies");
        const firstTechBtn = techButtons[0];

        expect(screen.queryByText("RPG")).not.toBeInTheDocument();

        fireEvent.click(firstTechBtn);
        await waitFor(() => {
            expect(screen.getByText("RPG")).toBeInTheDocument();
            expect(screen.getByText("AS400")).toBeInTheDocument();
        });

        fireEvent.click(firstTechBtn);
        await waitFor(() => {
            expect(screen.queryByText("RPG")).not.toBeInTheDocument();
        });
    });

    test("prev buttons are disabled on first page", () => {
        const {prevButtons} = getPaginationControls();
        prevButtons.forEach(btn => expect(btn).toBeDisabled());
    });

    test("next buttons navigate correctly", async () => {
        const {nextButtons} = getPaginationControls();
        nextButtons.forEach(btn => fireEvent.click(btn));

        await waitFor(() => {
            const pageDisplays = screen.getAllByTestId("pagination-info");
            pageDisplays.forEach(el => expect(el).toHaveTextContent("2 / 2"));
        });
    });

    test("toggles technology panel correctly", async () => {
        const techButtons = screen.getAllByText("Show Technologies");
        const firstTechBtn = techButtons[0];

        expect(screen.queryByText("RPG")).not.toBeInTheDocument();

        fireEvent.click(firstTechBtn);
        await waitFor(() => {
            expect(screen.getByText("RPG")).toBeInTheDocument();
            expect(screen.getByText("AS400")).toBeInTheDocument();
        });

        fireEvent.click(firstTechBtn);
        await waitFor(() => {
            expect(screen.queryByText("RPG")).not.toBeInTheDocument();
        });
    });
});
