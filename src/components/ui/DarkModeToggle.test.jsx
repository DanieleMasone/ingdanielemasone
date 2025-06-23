import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DarkModeToggle from "./DarkModeToggle";

describe("DarkModeToggle component", () => {
    beforeEach(() => {
        localStorage.clear();
        document.documentElement.classList.remove("dark");
    });

    it("initializes darkMode state from localStorage", () => {
        localStorage.setItem("theme", "dark");
        render(<DarkModeToggle />);
        const button = screen.getByRole("button");
        expect(button).toHaveAccessibleName("Switch to light mode");
        expect(document.documentElement).toHaveClass("dark");
    });

    it("initializes light mode if localStorage is not 'dark'", () => {
        localStorage.setItem("theme", "light");
        render(<DarkModeToggle />);
        const button = screen.getByRole("button");
        expect(button).toHaveAccessibleName("Switch to dark mode");
        expect(document.documentElement).not.toHaveClass("dark");
    });

    it("toggles dark mode on button click", () => {
        render(<DarkModeToggle />);
        const button = screen.getByRole("button");

        // Initially light mode
        expect(document.documentElement).not.toHaveClass("dark");
        expect(button).toHaveAccessibleName("Switch to dark mode");

        // Click to switch to dark
        fireEvent.click(button);
        expect(document.documentElement).toHaveClass("dark");
        expect(button).toHaveAccessibleName("Switch to light mode");
        expect(localStorage.getItem("theme")).toBe("dark");

        // Click again to switch to light
        fireEvent.click(button);
        expect(document.documentElement).not.toHaveClass("dark");
        expect(button).toHaveAccessibleName("Switch to dark mode");
        expect(localStorage.getItem("theme")).toBe("light");
    });

    it("renders correct icon and label based on mode", () => {
        render(<DarkModeToggle />);
        const button = screen.getByRole("button");

        // Initially light mode
        expect(button).toHaveTextContent("🌙");

        // Toggle to dark mode
        fireEvent.click(button);
        expect(button).toHaveTextContent("☀️");
    });
});
