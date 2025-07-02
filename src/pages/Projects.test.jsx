import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import Projects from "./Projects";
import React from "react";

// Mock react-i18next
jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key, fallback) => {
            const translations = {
                projects_title: "Projects",
                show_technologies: "Show Technologies",
                "project_types.Enterprise Portal": "Enterprise Portal",
                "project_types.IoT Workplace Booking": "IoT Workplace Booking",
                "project_types.areaClienti": "Area Clienti",
                "project_types.restServices": "Rest Services",
                "project_types.dart": "DART",
            };
            return translations[key] || fallback || key;
        },
    }),
}));

describe("Projects Component", () => {
    beforeEach(() => {
        render(<Projects/>);
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

    test("ExpandableText renders truncated content", () => {
        // Use a type that definitely has a long or multi-line translation
        expect(screen.getAllByText(/Enterprise Application|Mobility Portal|AfterLife/)[0]).toBeInTheDocument();
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

    test("projects with no type do not render type section", async () => {
        // Fake a project without "type"
        const customProjects = [...Array(1)].map(() => ({
            name: "Test Without Type",
            tech: "Docker",
            type: undefined,
            company: "RGI",
            period: "01/2020"
        }));

        const {rerender} = render(<Projects/>);
        rerender(<Projects projects={customProjects}/>); // supponendo che Projects accetti prop (puoi modularizzare per i test)

        expect(screen.queryByText(/project_types/)).not.toBeInTheDocument();
    });

    test("all projects show correct company in content", () => {
        // Make sure your company name is shown in projects
        expect(screen.getAllByText("RGI").length).toBeGreaterThan(1);
    });

});
