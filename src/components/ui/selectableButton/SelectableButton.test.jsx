import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {SelectableButton} from "./SelectableButton";
import {vi} from 'vitest';

describe("SelectableButton component", () => {
    it("renders the correct label", () => {
        render(<SelectableButton label="2024" isSelected={false} onClick={() => {
        }}/>);
        expect(screen.getByText("2024")).toBeInTheDocument();
    });

    it("calls onClick when clicked", () => {
        const handleClick = vi.fn();
        render(<SelectableButton label="2022" isSelected={false} onClick={handleClick}/>);
        fireEvent.click(screen.getByText("2022"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("applies selected styles when isSelected is true", () => {
        render(<SelectableButton label="2020" isSelected={true} onClick={() => {
        }}/>);
        const btn = screen.getByText("2020");
        expect(btn).toHaveClass("bg-blue-600");
        expect(btn).toHaveClass("text-white");
    });

    it("applies default styles when isSelected is false", () => {
        render(<SelectableButton label="2019" isSelected={false} onClick={() => {
        }}/>);
        const btn = screen.getByText("2019");
        expect(btn).toHaveClass("bg-gray-200");
        expect(btn).toHaveClass("text-gray-800");
        expect(btn).not.toHaveClass("bg-blue-600");
    });
});
