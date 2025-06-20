import { render, screen, fireEvent } from "@testing-library/react";
import Projects from "./Projects";  // adjust path as needed
import React from "react";

// Mock react-i18next
jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key, fallback) => {
            // Simple mock for translation keys
            const translations = {
                projects_title: "Projects",
                show_technologies: "Show Technologies",
                "project_types.Enterprise Portal": "Enterprise Portal",
                "project_types.IoT Workplace Booking": "IoT Workplace Booking",
                // fallback to key if not found
            };
            return translations[key] || fallback || key;
        },
    }),
}));

describe("Projects Component", () => {
    beforeEach(() => {
        render(<Projects />);
    });

    test("renders projects title", () => {
        // Check if section title is rendered
        expect(screen.getByText("Projects")).toBeInTheDocument();
    });

    test("renders sidebar with unique company buttons", () => {
        // Should render buttons for each unique company
        const buttons = screen.getAllByRole("button");
        const companyButtons = buttons.filter(
            btn => !btn.textContent.match(/Show Technologies/i)
        );
        expect(companyButtons.length).toBeGreaterThan(0);

        // Example company names in buttons
        expect(companyButtons.some(btn => btn.textContent === "RGI")).toBe(true);
        expect(companyButtons.some(btn => btn.textContent === "Fastweb")).toBe(true);
    });

    test("filters projects by selected company when sidebar button clicked", () => {
        // Initially projects from default selectedCompany "RGI" should be visible
        expect(screen.getByText("AfterLife")).toBeInTheDocument();

        // Click on another company button, e.g., "Fastweb"
        const fastwebBtn = screen.getByRole("button", { name: "Fastweb" });
        fireEvent.click(fastwebBtn);

        // Projects belonging to Fastweb should appear
        expect(screen.getByText("OLO Gateway")).toBeInTheDocument();

        // Projects from previous company should not be visible
        expect(screen.queryByText("AfterLife")).not.toBeInTheDocument();
    });

    test("toggles technology panel when disclosure button clicked", () => {
        // Find first "Show Technologies" button (for default selected company)
        const techButtons = screen.getAllByText("Show Technologies");
        expect(techButtons.length).toBeGreaterThan(0);

        const firstTechBtn = techButtons[0];
        const firstProjectTechText = screen.queryByText(/MySQL/); // tech string snippet

        // Initially tech panel content should NOT be visible
        expect(firstProjectTechText).not.toBeInTheDocument();

        // Click button to open tech panel
        fireEvent.click(firstTechBtn);
        expect(screen.getByText(/MySQL/)).toBeVisible();

        // Click again to close panel
        fireEvent.click(firstTechBtn);
        expect(screen.queryByText(/MySQL/)).not.toBeInTheDocument();
    });
});
