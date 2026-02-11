import React from "react";
import {render, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Footer} from "./Footer";
import {vi} from 'vitest';

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) =>
            key === "footer_copyright"
                ? "© 2025 Daniele Masone"
                : key,
    }),
}));

vi.mock("../brandIcon/BrandIcon", () => ({
    BrandIcon: ({title}) => (
        <svg
            role="img"
            viewBox="0 0 24 24"
            width="26"
            height="26"
            data-testid="brand-icon"
            aria-label={title}
        />
    ),
}));

const links = [
    {key: "li", href: "https://x/li", icon: {}, color: "#0a66c2", label: "LinkedIn"},
    {key: "ig", href: "https://x/ig", icon: {}, color: "#e1306c", label: "Instagram"},
    {key: "gh", href: "https://x/gh", icon: {}, color: "#000", label: "GitHub"},
];

describe("Footer – modern UI", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("renders all social links", () => {
        render(<Footer/>);

        const nav = screen.getByRole("navigation", {name: /social links/i});
        const anchors = within(nav).getAllByRole("link");

        expect(anchors).toHaveLength(5);
    });

    test("each link has security attributes", () => {
        render(<Footer/>);

        const nav = screen.getByRole("navigation", {name: /social links/i});
        const anchors = within(nav).getAllByRole("link");

        anchors.forEach(a => {
            expect(a).toHaveAttribute("target", "_blank");
            expect(a).toHaveAttribute("rel", "noopener noreferrer");
            expect(a.getAttribute("href")).toMatch(/^https:/);
        });
    });

    test("each social link contains a properly sized svg icon", () => {
        render(<Footer/>);

        const nav = screen.getByRole("navigation", {name: /social links/i});
        const anchors = within(nav).getAllByRole("link");

        anchors.forEach(link => {
            const svg = link.querySelector("svg");
            expect(svg).toBeInTheDocument();

            expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
            expect(svg.getAttribute("width")).toBe("24");
            expect(svg.getAttribute("height")).toBe("24");
            expect(svg).toHaveAttribute("fill");
        });
    });

    test("has navigation landmark with aria-label", () => {
        render(<Footer links={links}/>);

        const nav = screen.getByRole("navigation", {name: /social links/i});
        expect(nav).toBeInTheDocument();
    });

    test("mobile labels are visible in DOM", () => {
        render(<Footer links={links}/>);

        links.forEach(l => {
            expect(screen.getAllByText(l.label)[0]).toBeInTheDocument();
        });
    });

    test("keyboard tab focuses each social link", async () => {
        const user = userEvent.setup();
        render(<Footer links={links}/>);

        const anchors = screen.getAllByRole("link");

        await user.tab();
        expect(anchors[0]).toHaveFocus();

        for (let i = 1; i < anchors.length; i++) {
            await user.tab();
            expect(anchors[i]).toHaveFocus();
        }
    });

    test("footer renders translated copyright", () => {
        render(<Footer links={links}/>);

        expect(
            screen.getByText("© 2025 Daniele Masone")
        ).toBeInTheDocument();
    });

    test("footer has blur + border UI classes", () => {
        render(<Footer links={links}/>);

        const footer = screen.getByRole("contentinfo");

        expect(footer.className).toMatch(/backdrop-blur/);
        expect(footer.className).toMatch(/border-t/);
        expect(footer.className).not.toMatch(/sticky/);
    });
});
