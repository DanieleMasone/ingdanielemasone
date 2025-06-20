import React from "react";
import {render, screen} from "@testing-library/react";
import Footer from "./Footer";

// Mock useTranslation hook
jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => {
            if (key === "footer_copyright") return "© 2025 Daniele Masone";
            return key;
        }
    }),
}));

describe("Footer component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders footer container", () => {
        render(<Footer/>);
        const footer = screen.getByRole('contentinfo');
        expect(footer).toBeInTheDocument();
    });

    it("renders all social icon links with correct href and aria-label", () => {
        render(<Footer/>);
        const socialLinks = [
            {key: "linkedin", href: "https://www.linkedin.com/in/daniele-masone", label: "linkedin"},
            {key: "instagram", href: "https://www.instagram.com/ing_daniele_masone/", label: "Instagram"},
            {key: "facebook", href: "https://www.facebook.com/danieleMasone", label: "Facebook"},
            {key: "github", href: "https://github.com/DanieleMasone", label: "GitHub"},
            {key: "udemy", href: "https://www.udemy.com/user/daniele-masone/", label: "Udemy"},
        ];

        socialLinks.forEach(({key, href, label}) => {
            const link = screen.getByRole("link", { name: label });
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute("href", href);
            expect(link).toHaveAttribute("aria-label", label);
            expect(link).toHaveAttribute("target", "_blank");
            expect(link).toHaveAttribute("rel", "noopener noreferrer");
        });
    });

    it("renders the translated footer text", () => {
        render(<Footer/>);
        const footerText = screen.getByText("© 2025 Daniele Masone");
        expect(footerText).toHaveTextContent("© 2025 Daniele Masone");
    });

    it("renders BrandIcon with SVG element", () => {
        render(<Footer/>);
        const svgElements = screen.getAllByRole("img");
        expect(svgElements.length).toBeGreaterThanOrEqual(5);

        // Check if SVG has appropriate attributes
        svgElements.forEach(svg => {
            expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
            expect(svg).toHaveAttribute("xmlns", "http://www.w3.org/2000/svg");
        });
    });
});
