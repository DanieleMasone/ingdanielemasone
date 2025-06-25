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

    test("filters projects by selected company when sidebar button clicked", async () => {
        // "AfterLife" is from RGI, visible by default
        expect(screen.getByText("AfterLife")).toBeInTheDocument();

        // Click on Fastweb
        const fastwebBtn = screen.getByRole("button", {name: "Fastweb"});
        fireEvent.click(fastwebBtn);

        // Wait for the old project to disappear and the new one to appear
        await waitFor(() => {
            expect(screen.getByText("OLO Gateway")).toBeInTheDocument();
            expect(screen.queryByText("AfterLife")).not.toBeInTheDocument();
        });
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
});
