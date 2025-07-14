import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import Projects from "./Projects";
import React from "react";
import {HelmetProvider} from "react-helmet-async";

// Mock react-i18next
jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key, fallback) => {
            const translations = {
                projects_title: "Projects",
                show_technologies: "Show Technologies",

                // FASTWEB
                "project_types.fastweb.oloGatewayMobile": "Development of a web portal for managing number portability requests for Fastweb’s mobile customers.",
                "project_types.fastweb.oloGatewayFisso": "Implementation of web portals for partner operators (e.g., Metroweb, Flash Fiber) related to fixed network provisioning.",
                "project_types.fastweb.OSSTrasformation": "Reengineering of Fastweb’s core web portal used for managing key business-critical operations.",

                // TEORESI
                "project_types.teoresi.tecno": "Development of web platform for booking meeting rooms and workstations with customizable features (AC, lights, projector, etc.). IoT device data enables full environmental monitoring.",
                "project_types.teoresi.dart": "Development of web portal for managing FCA’s vehicle fleet, integrated with a MATLAB client.",

                // TECNAVIA
                "project_types.tecnavia.newsmemory": "Development of a CMS for digital newspaper management and publishing.",
                "project_types.tecnavia.mobileApp": "Hybrid mobile app built with React Native and native modules in Objective-C (iOS) and Java (Android).",

                // ITALIAONLINE
                "project_types.italiaonline.areaClienti": "Development of Italiaonline’s main customer portal.",
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
            <HelmetProvider>
                <Projects/>
            </HelmetProvider>
        );
    });

    test("renders projects title", () => {
        expect(screen.getByText("Projects")).toBeInTheDocument();
    });

    test("renders sidebar with unique company buttons", () => {
        const buttons = screen.getAllByRole("button");
        const companyButtons = buttons.filter(
            (btn) => !btn.textContent?.includes("Show Technologies")
        );
        expect(companyButtons.length).toBeGreaterThan(0);

        expect(companyButtons.some((btn) => btn.textContent === "RGI")).toBe(true);
        expect(companyButtons.some((btn) => btn.textContent === "Fastweb")).toBe(true);
    });

    test("toggles technology panel when disclosure button clicked", async () => {
        // Find the first button to show the technologies
        const techButtons = screen.getAllByText("Show Technologies");
        expect(techButtons.length).toBeGreaterThan(0);

        const firstTechBtn = techButtons[0];

        // Before the click the content is not present
        expect(screen.queryByText(/MySQL/)).not.toBeInTheDocument();

        // Click to open
        fireEvent.click(firstTechBtn);
        await waitFor(() => {
            expect(screen.getByText(/MySQL/)).toBeInTheDocument();
        });

        // Click to close
        fireEvent.click(firstTechBtn);
        await waitFor(() => {
            expect(screen.queryByText(/MySQL/)).not.toBeInTheDocument();
        });
    });

    test("renders all unique companies in the sidebar", () => {
        const expectedCompanies = ["RGI", "Italiaonline", "TECNAVIA APPS s.r.l.", "Teoresi", "Fastweb"];
        expectedCompanies.forEach(company => {
            expect(screen.getByRole("button", {name: company})).toBeInTheDocument();
        });
    });

    test("pagination works correctly when clicking next and previous", async () => {
        // Default is RGI, which has more than 2 projects → should have pagination
        expect(screen.getByTestId("pagination-info")).toHaveTextContent("1 / 3");

        fireEvent.click(screen.getByRole("button", {name: /next/i}));

        await waitFor(() => {
            expect(screen.getByTestId("pagination-info")).toHaveTextContent("2 / 3");
        });

        fireEvent.click(screen.getByRole("button", {name: /previous/i}));

        await waitFor(() => {
            expect(screen.getByTestId("pagination-info")).toHaveTextContent("1 / 3");
        });
    });

    test("all projects show correct company in content", () => {
        // Make sure your company name is shown in projects
        expect(screen.getAllByText("RGI").length).toBeGreaterThan(1);
    });

});
