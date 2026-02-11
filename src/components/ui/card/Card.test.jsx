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
        expect(cardDiv).toHaveClass("flex flex-col rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70");
    });

    it("accepts additional className and applies it", () => {
        render(<Card data-testid="card-container" className="custom-class">Test</Card>);
        const cardDiv = screen.getByTestId("card-container");
        expect(cardDiv).toHaveClass("custom-class");
    });
});
