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
        expect(cardDiv).toHaveClass("rounded-2xl");
        expect(cardDiv).toHaveClass("bg-gray-100");
        expect(cardDiv).toHaveClass("border");
        expect(cardDiv).toHaveClass("shadow-md");
    });

    it("accepts additional className and applies it", () => {
        render(<Card data-testid="card-container" className="custom-class">Test</Card>);
        const cardDiv = screen.getByTestId("card-container");
        expect(cardDiv).toHaveClass("custom-class");
    });
});
