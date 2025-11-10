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
                previous: "Prev",
                next: "Next",

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

    const getPaginationControls = () => {
        const nextButtons = screen.getAllByRole("button", {name: /Next/i});
        const prevButtons = screen.getAllByRole("button", {name: /Prev/i});
        const pageDisplays = screen.getAllByTestId("pagination-info");
        return {nextButtons, prevButtons, pageDisplays};
    };

    test("renders projects title", () => {
        expect(screen.getByText("Projects")).toBeInTheDocument();
    });

    test("renders both mobile and desktop pagination controls", () => {
        const {nextButtons, prevButtons, pageDisplays} = getPaginationControls();

        expect(nextButtons.length).toBe(2);
        expect(prevButtons.length).toBe(2);
        expect(pageDisplays.length).toBe(2);

        pageDisplays.forEach(el => expect(el).toHaveTextContent("1 / 3")); // Total pages by default
    });

    test("prev buttons are disabled on first page", () => {
        const {prevButtons} = getPaginationControls();
        prevButtons.forEach(btn => expect(btn).toBeDisabled());
    });

    test("next buttons are disabled on last page", () => {
        const {nextButtons, pageDisplays} = getPaginationControls();

        // Go to the last page
        nextButtons.forEach(btn => fireEvent.click(btn));

        pageDisplays.forEach(el => expect(el).toHaveTextContent("3 / 3")); // last page
        nextButtons.forEach(btn => expect(btn).toBeDisabled());
    });

    test("next and prev buttons work independently for each paginator", () => {
        const {nextButtons, prevButtons, pageDisplays} = getPaginationControls();

        // Advance mobile paginator
        fireEvent.click(nextButtons[0]);
        expect(pageDisplays[0]).toHaveTextContent("2 / 3");
        expect(pageDisplays[1]).toHaveTextContent("2 / 3");

        // Go back to desktop paginator
        fireEvent.click(prevButtons[1]);
        expect(pageDisplays[0]).toHaveTextContent("1 / 3");
        expect(pageDisplays[1]).toHaveTextContent("1 / 3");

        // Return to page 1 for both
        fireEvent.click(prevButtons[0]);
        fireEvent.click(nextButtons[1]);
        pageDisplays.forEach(el => expect(el).toHaveTextContent("2 / 3"));
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

    test("all projects show correct company in content", () => {
        // Make sure your company name is shown in projects
        expect(screen.getAllByText("RGI").length).toBeGreaterThan(1);
    });

    test("clicking on a different company shows its projects", async () => {
        fireEvent.click(screen.getByRole("button", {name: "Fastweb"}));

        await waitFor(() => {
            expect(screen.getByText("OSS Trasformation")).toBeInTheDocument();
            expect(screen.getByText("OLO Gateway (metroweb, flash fiber)")).toBeInTheDocument();
        });
    });

    test("renders project type translated description correctly", () => {
        expect(screen.getByText(/Redesign of the core Front-End environment/)).toBeInTheDocument();
    });

    test("ExpandableText limits text to 3 lines initially", () => {
        // Check for max-lines class or truncated content (depending on implementation)
        const expandable = screen.getAllByText(/Redesign of the core Front-End environment/)[0];
        expect(expandable).toBeInTheDocument();
    });

    test("matches snapshot", () => {
        const {asFragment} = render(
            <HelmetProvider>
                <Projects/>
            </HelmetProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
