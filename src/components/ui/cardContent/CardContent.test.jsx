import React from "react";
import {render, screen} from "@testing-library/react";
import {CardContent} from "./CardContent";

describe("CardContent component", () => {
    it("renders the children content", () => {
        render(<CardContent data-testid="content-container">Sample Content</CardContent>);
        expect(screen.getByText("Sample Content")).toBeInTheDocument();
    });

    it("applies default CSS classes", () => {
        render(<CardContent data-testid="content-container">Test</CardContent>);
        const contentDiv = screen.getByTestId("content-container");

        expect(contentDiv).toHaveClass("flex");
        expect(contentDiv).toHaveClass("h-full");
        expect(contentDiv).toHaveClass("flex-col");
        expect(contentDiv).toHaveClass("gap-4");
        expect(contentDiv).toHaveClass("p-0");
        expect(contentDiv).toHaveClass("text-sm");
        expect(contentDiv).toHaveClass("sm:text-base");
        expect(contentDiv).toHaveClass("text-gray-900");
        expect(contentDiv).toHaveClass("dark:text-gray-300");
    });

    it("accepts additional className and applies it", () => {
        render(<CardContent data-testid="content-container" className="extra-class">Test</CardContent>);
        const contentDiv = screen.getByTestId("content-container");
        expect(contentDiv).toHaveClass("extra-class");
    });
});
