import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {YearButton} from "./YearButton";

describe("YearButton component", () => {
    it("renders the correct year text", () => {
        render(<YearButton year={2024} selectedYear={2023} setSelectedYear={() => {
        }}/>);
        expect(screen.getByText("2024")).toBeInTheDocument();
    });

    it("calls setSelectedYear with correct value on click", () => {
        const mockSetSelectedYear = jest.fn();
        render(<YearButton year={2022} selectedYear={2021} setSelectedYear={mockSetSelectedYear}/>);
        fireEvent.click(screen.getByTestId("year-button-2022"));
        expect(mockSetSelectedYear).toHaveBeenCalledWith(2022);
    });

    it("applies selected styles if year is selected", () => {
        render(<YearButton year={2020} selectedYear={2020} setSelectedYear={() => {
        }}/>);
        const btn = screen.getByTestId("year-button-2020");
        expect(btn).toHaveClass("ring-2");
        expect(btn).toHaveClass("bg-blue-100");
    });

    it("applies default styles if year is not selected", () => {
        render(<YearButton year={2019} selectedYear={2020} setSelectedYear={() => {
        }}/>);
        const btn = screen.getByTestId("year-button-2019");
        expect(btn).toHaveClass("border-gray-300");
        expect(btn).not.toHaveClass("ring-2");
    });
});
