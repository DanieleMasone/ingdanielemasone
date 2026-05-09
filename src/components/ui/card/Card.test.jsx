import React from "react";
import {render, screen} from "@testing-library/react";
import {Card} from "./Card";

describe("Card component", () => {
    it("renders the content passed as children", () => {
        render(<Card data-testid="card-container">Test Content</Card>);
        expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("applies the default CSS classes", () => {
        render(<Card data-testid="card-container">Test</Card>);
        const cardDiv = screen.getByTestId("card-container");

        expect(cardDiv).toHaveClass("flex", "flex-col", "w-full", "rounded-xl", "bg-white/70", "dark:bg-gray-800/50");
        expect(cardDiv).toHaveClass("border", "border-gray-200/60", "dark:border-gray-700/60");
        expect(cardDiv).toHaveClass("p-4", "sm:p-5");
        expect(cardDiv).toHaveClass("focus-visible:ring-2", "focus-visible:ring-blue-500/70", "focus-visible:ring-offset-2");
    });

    it("accepts additional className and applies it", () => {
        render(<Card data-testid="card-container" className="custom-class">Test</Card>);
        const cardDiv = screen.getByTestId("card-container");
        expect(cardDiv).toHaveClass("custom-class");
    });
});
