import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Footer, {BrandIcon} from "./Footer";

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => (key === "footer_copyright" ? "© 2025 Daniele Masone" : key),
    }),
}));

describe("Footer component - additional tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("footer has correct CSS classes for styling", () => {
        render(<Footer/>);
        const footer = screen.getByRole("contentinfo");

        // Core controls
        expect(footer).toHaveClass("sticky");
        expect(footer).toHaveClass("bottom-0");

        // Updated backdrop classes
        expect(footer.className).toMatch(/backdrop-blur-md/);
        expect(footer.className).toMatch(/backdrop-saturate-150/);

        // Dark mode background update
        expect(footer.className).toMatch(/dark:bg-gray-900\/60/);
    });

    it("each social link has a BrandIcon with correct props", () => {
        render(<Footer/>);
        const links = screen.getAllByRole("link");
        links.forEach((link) => {
            const svg = link.querySelector("svg");
            expect(svg).toBeInTheDocument();
            expect(svg).toHaveAttribute("role", "img");
            expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
            expect(svg).toHaveAttribute("xmlns", "http://www.w3.org/2000/svg");
            expect(svg).toHaveAttribute("width", "26");
            expect(svg).toHaveAttribute("height", "26");
            // Check the fill: it must be present and not empty
            expect(svg).toHaveAttribute("fill");
            expect(svg.getAttribute("fill")).not.toBe("");
        });
    });

    it("BrandIcon renders null if icon or icon.svg is missing", () => {
        const {container} = render(<BrandIcon icon={null} color="#000"/>);
        expect(container.firstChild).toBeNull();

        const {container: container2} = render(<BrandIcon icon={{}} color="#000"/>);
        expect(container2.firstChild).toBeNull();
    });

    it("social links are keyboard accessible and focusable", async () => {
        render(<Footer />);
        const user = userEvent.setup();
        const links = screen.getAllByRole("link");

        // Going to the first link
        await user.tab();
        expect(links[0]).toHaveFocus();

        // Have it all over the others
        for (let i = 1; i < links.length; i++) {
            await user.tab();
            expect(links[i]).toHaveFocus();
        }
    });

    it("social links open in a new tab with rel noopener noreferrer for security", () => {
        render(<Footer/>);
        screen.getAllByRole("link").forEach(link => {
            expect(link).toHaveAttribute("target", "_blank");
            expect(link).toHaveAttribute("rel", "noopener noreferrer");
        });
    });
});
