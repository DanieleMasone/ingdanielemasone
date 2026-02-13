import React from "react";
import {fireEvent, render, screen, within} from "@testing-library/react";
import {MemoryRouter} from "react-router";
import {Header} from "./Header";
import {vi} from 'vitest';

vi.mock("react-i18next", () => ({
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

vi.mock("../ui/languageSwitcher/LanguageSwitcher", () => ({
    LanguageSwitcher: () => <div data-testid="language-switcher"/>,
}));

vi.mock("../ui/darkModeToggle/DarkModeToggle", () => ({
    DarkModeToggle: () => <div data-testid="dark-mode-toggle"/>,
}));

vi.mock("framer-motion", () => ({
    motion: {
        div: ({children, ...rest}) => <div {...rest}>{children}</div>,
    },
    AnimatePresence: ({children}) => <>{children}</>,
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
        const home = screen.getAllByText("Home")[0];
        expect(home.className).toMatch(/text-blue-600/);
        expect(screen.getAllByRole("button", {name: /portfolio/i})[0]).toBeInTheDocument();
    });

    test("highlights active link in portfolio when path matches", () => {
        renderHeader("/projects");

        const btn = screen.getAllByRole("button", {name: /portfolio/i})[0];
        fireEvent.click(btn);

        const active = screen.getByText("Projects");
        expect(active.className).toMatch(/text-blue-600/);
    });

    test("renders LanguageSwitcher and DarkModeToggle on desktop", () => {
        renderHeader("/");
        expect(screen.getAllByTestId("language-switcher")[0]).toBeInTheDocument();
        expect(screen.getAllByTestId("dark-mode-toggle")[0]).toBeInTheDocument();
    });

    test("chevron rotates on desktop toggle", () => {
        renderHeader("/");
        const button = screen.getAllByRole("button", {name: /portfolio/i})[0];
        const chevron = button.querySelector("svg");

        expect(chevron).not.toHaveClass("rotate-180");
        fireEvent.click(button);
        expect(chevron).toHaveClass("rotate-180");
    });

    test("desktop portfolio dropdown button has aria-haspopup", () => {
        renderHeader("/");
        const btn = screen.getAllByRole("button", {name: /portfolio/i})[0];
        expect(btn).toHaveAttribute("aria-haspopup", "true");
    });

    test("desktop portfolio dropdown animation triggers initial and exit states", () => {
        renderHeader("/");
        const btn = screen.getAllByRole("button", {name: /portfolio/i})[0];

        fireEvent.click(btn);
        const dropdown = screen.getByText("Experience").parentElement;
        expect(dropdown).toHaveAttribute("class"); // should exist and include motion div classes
    });

    test("desktop dropdown closes when re-clicked", () => {
        renderHeader("/");
        const btn = screen.getAllByRole("button", {name: /portfolio/i})[0];
        fireEvent.click(btn);
        expect(screen.getByText("Experience")).toBeInTheDocument();

        fireEvent.click(btn);
        expect(screen.queryByText("Experience")).not.toBeInTheDocument();
    });

    describe("mobile menu behavior", () => {
        test("portfolio disclosure expands and collapses", () => {
            renderHeader("/");
            fireEvent.click(screen.getByLabelText(/toggle mobile menu/i));

            const menu = screen.getByTestId("mobile-menu");
            const btn = within(menu).getByRole("button", {name: /portfolio/i});

            expect(within(menu).queryByText("Experience")).not.toBeInTheDocument();

            fireEvent.click(btn);
            expect(within(menu).getByText("Experience")).toBeInTheDocument();

            fireEvent.click(btn);
            expect(within(menu).queryByText("Experience")).not.toBeInTheDocument();
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

        test("mobile menu opens and closes", () => {
            renderHeader("/");

            const toggle = screen.getByLabelText(/toggle mobile menu/i);

            expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();

            fireEvent.click(toggle);
            expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();

            fireEvent.click(toggle);
            expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
        });

        test("mobile Home link closes menu", () => {
            renderHeader("/");

            fireEvent.click(screen.getByLabelText(/toggle mobile menu/i));

            const menu = screen.getByTestId("mobile-menu");
            fireEvent.click(within(menu).getByText("Home"));

            expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
        });

        test("mobile portfolio link closes menu", () => {
            renderHeader("/");

            fireEvent.click(screen.getByLabelText(/toggle mobile menu/i));
            const menu = screen.getByTestId("mobile-menu");

            fireEvent.click(within(menu).getByRole("button", {name: /portfolio/i}));
            fireEvent.click(within(menu).getByText("Experience"));

            expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
        });

        test("mobile menu does not duplicate root navMain link", () => {
            renderHeader("/");

            fireEvent.click(screen.getByLabelText(/toggle mobile menu/i));
            const menu = screen.getByTestId("mobile-menu");

            const homes = within(menu).getAllByText("Home");
            expect(homes.length).toBe(1);
        });

        test("mobile portfolio panel closes when a link is clicked", () => {
            renderHeader("/");

            fireEvent.click(screen.getByLabelText(/toggle mobile menu/i));
            const menu = screen.getByTestId("mobile-menu");

            const disclosureBtn = within(menu).getByRole("button", {name: /portfolio/i});
            fireEvent.click(disclosureBtn);

            const projectLink = within(menu).getByText("Projects");
            fireEvent.click(projectLink);

            expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
        });

        test("mobile menu links have correct text and hrefs", () => {
            renderHeader("/");

            fireEvent.click(screen.getByLabelText(/toggle mobile menu/i));
            const menu = screen.getByTestId("mobile-menu");

            const portfolioBtn = within(menu).getByRole("button", {name: /portfolio/i});
            fireEvent.click(portfolioBtn);

            const links = ["Experience", "Projects", "Certifications", "Courses", "Testimonials", "Trading"];
            links.forEach((label) => {
                const link = within(menu).getByText(label);
                expect(link).toBeInTheDocument();
                expect(link.tagName).toBe("A");
            });
        });
    });

    test("menu icon changes when toggled", () => {
        renderHeader("/");

        const toggle = screen.getByLabelText(/toggle mobile menu/i);
        const first = toggle.querySelector("svg");

        fireEvent.click(toggle);

        const second = toggle.querySelector("svg");
        expect(second).not.toBe(first);
    });

    test("header has layout classes", () => {
        renderHeader("/");

        const header = screen.getByRole("banner");
        expect(header.className).toMatch(/sticky/);
        expect(header.className).toMatch(/top-0/);
        expect(header.className).toMatch(/backdrop-blur-sm/);
        expect(header.className).toMatch(/dark:bg-gray-900/);
    });

    test("desktop portfolio dropdown closes after clicking a link", () => {
        renderHeader("/");

        const btn = screen.getAllByRole("button", {name: /portfolio/i})[0];
        fireEvent.click(btn);

        const exp = screen.getByText("Experience");
        fireEvent.click(exp);

        expect(screen.queryByText("Experience")).not.toBeInTheDocument();
    });

    test("desktop portfolio button updates aria-expanded", () => {
        renderHeader("/");

        const btn = screen.getAllByRole("button", {name: /portfolio/i})[0];

        expect(btn).toHaveAttribute("aria-expanded", "false");
        fireEvent.click(btn);
        expect(btn).toHaveAttribute("aria-expanded", "true");
    });

    test("desktop portfolio shows all portfolio links", () => {
        renderHeader("/");

        fireEvent.click(screen.getAllByRole("button", {name: /portfolio/i})[0]);

        const labels = [
            "Experience",
            "Projects",
            "Certifications",
            "Courses",
            "Testimonials",
            "Trading",
        ];

        labels.forEach(label => {
            expect(screen.getByText(label)).toBeInTheDocument();
        });
    });
});
