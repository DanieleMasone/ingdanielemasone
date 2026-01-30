import React from "react";
import {fireEvent, render, screen, within} from "@testing-library/react";
import {MemoryRouter} from "react-router";
import {Header} from "./Header";

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => ({
            home: "Home",
            portfolio: "Portfolio",
            experience: "Experience",
            projects: "Projects",
            courses: "Courses",
            testimonials: "Testimonials",
            trading: "Trading",
            certifications: "Certifications",
        }[key] || key)
    }),
}));

jest.mock("../ui/languageSwitcher/LanguageSwitcher", () => ({
    LanguageSwitcher: () => <div data-testid="language-switcher" />,
}));

jest.mock("../ui/darkModeToggle/DarkModeToggle", () => ({
    DarkModeToggle: () => <div data-testid="dark-mode-toggle" />,
}));

describe("Header", () => {
    const renderHeader = (initialPath = "/") =>
        render(
            <MemoryRouter initialEntries={[initialPath]}>
                <Header/>
            </MemoryRouter>
        );

    test("renders main nav and highlights active link", () => {
        renderHeader("/");
        const home = screen.getByText("Home");
        expect(home).toHaveClass("text-blue-600");
        expect(screen.getByRole("button", {name: /portfolio/i})).toBeInTheDocument();
    });

    test("toggles desktop portfolio dropdown open/close", () => {
        renderHeader("/");
        const button = screen.getByRole("button", {name: /portfolio/i});

        expect(screen.queryByText("Experience")).not.toBeInTheDocument();

        fireEvent.click(button);
        expect(screen.getByText("Experience")).toBeInTheDocument();

        fireEvent.click(button);
        expect(screen.queryByText("Experience")).not.toBeInTheDocument();
    });

    test("desktop dropdown closes after clicking a portfolio link", () => {
        renderHeader("/");
        const btn = screen.getByRole("button", {name: /portfolio/i});
        fireEvent.click(btn);
        fireEvent.click(screen.getByText("Experience"));
        expect(screen.queryByText("Experience")).not.toBeInTheDocument();
    });

    test("highlights active link in portfolio when path matches", () => {
        renderHeader("/projects");
        fireEvent.click(screen.getByRole("button", {name: /portfolio/i}));
        const active = screen.getByText("Projects");
        expect(active).toHaveClass("text-blue-600");
    });

    test("renders LanguageSwitcher and DarkModeToggle on desktop", () => {
        renderHeader("/");
        expect(screen.getByTestId("language-switcher")).toBeInTheDocument();
        expect(screen.getByTestId("dark-mode-toggle")).toBeInTheDocument();
    });

    test("chevron rotates on desktop toggle", () => {
        renderHeader("/");
        const button = screen.getByRole("button", {name: /portfolio/i});
        const chevron = button.querySelector("svg");
        expect(chevron).not.toHaveClass("rotate-180");
        fireEvent.click(button);
        expect(chevron).toHaveClass("rotate-180");
    });

    describe("mobile menu behavior", () => {
        test("opens and closes correctly", () => {
            renderHeader("/");
            const toggle = screen.getByLabelText(/toggle mobile menu/i);
            expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
            fireEvent.click(toggle);
            expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();
            fireEvent.click(toggle);
            expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
        });

        test("highlights active 'Home' link and closes on click", () => {
            renderHeader("/");
            const toggle = screen.getByLabelText(/toggle mobile menu/i);
            fireEvent.click(toggle);
            const menu = screen.getByTestId("mobile-menu");
            const home = within(menu).getByText("Home");
            expect(home).toHaveClass("text-blue-600");
            fireEvent.click(home);
            expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
        });

        test("portfolio disclosure expands and collapses", () => {
            renderHeader("/");
            const toggle = screen.getByLabelText(/toggle mobile menu/i);
            fireEvent.click(toggle);
            const menu = screen.getByTestId("mobile-menu");
            const btn = within(menu).getByRole("button", {name: /portfolio/i});
            expect(within(menu).queryByText("Experience")).not.toBeInTheDocument();
            fireEvent.click(btn);
            expect(within(menu).getByText("Experience")).toBeInTheDocument();
            fireEvent.click(btn);
            expect(within(menu).queryByText("Experience")).not.toBeInTheDocument();
        });

        test("clicking portfolio link closes mobile menu", () => {
            renderHeader("/");
            fireEvent.click(screen.getByLabelText(/toggle mobile menu/i));
            const menu = screen.getByTestId("mobile-menu");
            fireEvent.click(within(menu).getByRole("button", {name: /portfolio/i}));
            const exp = within(menu).getByText("Experience");
            fireEvent.click(exp);
            expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
        });

        test("contains LanguageSwitcher and DarkModeToggle", () => {
            renderHeader("/");
            fireEvent.click(screen.getByLabelText(/toggle mobile menu/i));
            const menu = screen.getByTestId("mobile-menu");
            expect(within(menu).getByTestId("language-switcher")).toBeInTheDocument();
            expect(within(menu).getByTestId("dark-mode-toggle")).toBeInTheDocument();
        });

        test("chevron rotates on mobile portfolio toggle", () => {
            renderHeader("/");
            fireEvent.click(screen.getByLabelText(/toggle mobile menu/i));
            const menu = screen.getByTestId("mobile-menu");
            const button = within(menu).getByRole("button", {name: /portfolio/i});
            const chevron = button.querySelector("svg");
            expect(chevron).not.toHaveClass("rotate-180");
            fireEvent.click(button);
            expect(chevron).toHaveClass("rotate-180");
        });
    });

    test("menu icon changes from Menu to X when toggled", () => {
        renderHeader("/");
        const toggle = screen.getByLabelText(/toggle mobile menu/i);
        const firstIcon = toggle.querySelector("svg");
        fireEvent.click(toggle);
        const secondIcon = toggle.querySelector("svg");
        expect(secondIcon).toBeInTheDocument();
        expect(secondIcon).not.toBe(firstIcon);
    });

    test("header has correct CSS classes for layout", () => {
        renderHeader("/");
        const header = screen.getByRole("banner");
        expect(header.className).toMatch(/sticky/);
        expect(header.className).toMatch(/top-0/);
        expect(header.className).toMatch(/backdrop-blur-sm/);
        expect(header.className).toMatch(/dark:bg-gray-900/);
    });
});
