import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import TechDisclosure from "./TechDisclosure";
import {vi} from "vitest";

describe("TechDisclosure component", () => {
    const label = "Show Technologies";
    const techList = "React, TypeScript, Tailwind";

    it("renders the correct label", () => {
        render(<TechDisclosure label={label} techList={techList}/>);
        expect(screen.getByText(label)).toBeInTheDocument();
    });

    it("does not show tech badges initially", () => {
        render(<TechDisclosure label={label} techList={techList}/>);
        techList.split(",").forEach((tech) => {
            expect(screen.queryByText(tech.trim())).not.toBeInTheDocument();
        });
    });

    it("shows tech badges when clicked", () => {
        render(<TechDisclosure label={label} techList={techList}/>);
        const button = screen.getByText(label);

        const handleClick = vi.fn();
        fireEvent.click(button);
        handleClick();

        techList.split(",").forEach((tech) => {
            expect(screen.getByText(tech.trim())).toBeInTheDocument();
        });

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("toggles tech badges visibility on multiple clicks", () => {
        render(<TechDisclosure label={label} techList={techList}/>);
        const button = screen.getByText(label);

        // First click: show badges
        fireEvent.click(button);
        techList.split(",").forEach((tech) => {
            expect(screen.getByText(tech.trim())).toBeInTheDocument();
        });

        // Second click: Hide badges
        fireEvent.click(button);
        techList.split(",").forEach((tech) => {
            expect(screen.queryByText(tech.trim())).not.toBeInTheDocument();
        });
    });

    it("applies rotate-180 class to chevron when open", () => {
        render(<TechDisclosure label={label} techList={techList}/>);

        // Select the button (not just the span)
        const button = screen.getByRole("button", {name: label});

        // Now select the chevron svg inside the button
        const chevron = button.querySelector("svg");
        expect(chevron).not.toHaveClass("rotate-180");

        // Click to open
        fireEvent.click(button);
        expect(chevron).toHaveClass("rotate-180");
    });
});
