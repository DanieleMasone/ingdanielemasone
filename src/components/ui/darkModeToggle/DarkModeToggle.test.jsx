import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {vi} from "vitest";
import {DarkModeToggle} from "./DarkModeToggle";

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => ({
            "theme_toggle.switch_to_dark": "Switch to dark mode",
            "theme_toggle.switch_to_light": "Switch to light mode",
        }[key] || key),
    }),
}));

describe("DarkModeToggle component", () => {
    const setPreferredColorScheme = (matches) => {
        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: vi.fn().mockImplementation((query) => ({
                matches,
                media: query,
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
            })),
        });
    };

    beforeEach(() => {
        localStorage.clear();
        document.documentElement.classList.remove("dark");
        setPreferredColorScheme(false);
    });

    it("initializes darkMode state from localStorage", () => {
        localStorage.setItem("theme", "dark");
        render(<DarkModeToggle/>);
        const button = screen.getByRole("button");
        expect(button).toHaveAccessibleName("Switch to light mode");
        expect(button).toHaveAttribute("aria-pressed", "true");
        expect(button).toHaveAttribute("title", "Switch to light mode");
        expect(document.documentElement).toHaveClass("dark");
    });

    it("initializes light mode if localStorage is not 'dark'", () => {
        localStorage.setItem("theme", "light");
        render(<DarkModeToggle/>);
        const button = screen.getByRole("button");
        expect(button).toHaveAccessibleName("Switch to dark mode");
        expect(button).toHaveAttribute("aria-pressed", "false");
        expect(button).toHaveAttribute("title", "Switch to dark mode");
        expect(document.documentElement).not.toHaveClass("dark");
    });

    it("uses system dark preference when no stored theme exists", () => {
        setPreferredColorScheme(true);

        render(<DarkModeToggle/>);

        const button = screen.getByRole("button");
        expect(button).toHaveAccessibleName("Switch to light mode");
        expect(button).toHaveAttribute("aria-pressed", "true");
        expect(document.documentElement).toHaveClass("dark");
        expect(localStorage.getItem("theme")).toBe("dark");
    });

    it("keeps the stored preference ahead of the system preference", () => {
        setPreferredColorScheme(true);
        localStorage.setItem("theme", "light");

        render(<DarkModeToggle/>);

        const button = screen.getByRole("button");
        expect(button).toHaveAccessibleName("Switch to dark mode");
        expect(button).toHaveAttribute("aria-pressed", "false");
        expect(document.documentElement).not.toHaveClass("dark");
    });

    it("toggles dark mode on button click", () => {
        render(<DarkModeToggle/>);
        const button = screen.getByRole("button");

        expect(document.documentElement).not.toHaveClass("dark");
        expect(button).toHaveAccessibleName("Switch to dark mode");

        fireEvent.click(button);
        expect(document.documentElement).toHaveClass("dark");
        expect(button).toHaveAccessibleName("Switch to light mode");
        expect(button).toHaveAttribute("aria-pressed", "true");
        expect(localStorage.getItem("theme")).toBe("dark");

        fireEvent.click(button);
        expect(document.documentElement).not.toHaveClass("dark");
        expect(button).toHaveAccessibleName("Switch to dark mode");
        expect(button).toHaveAttribute("aria-pressed", "false");
        expect(localStorage.getItem("theme")).toBe("light");
    });

    it("toggles aria-label and icon correctly", () => {
        render(<DarkModeToggle/>);
        const button = screen.getByRole("button");

        expect(button).toHaveAttribute("aria-label", "Switch to dark mode");

        fireEvent.click(button);
        expect(button).toHaveAttribute("aria-label", "Switch to light mode");

        fireEvent.click(button);
        expect(button).toHaveAttribute("aria-label", "Switch to dark mode");
    });
});
