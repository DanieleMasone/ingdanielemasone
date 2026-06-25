import React from "react";
import {render, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Footer} from "./Footer";
import {vi} from "vitest";
import * as service from "@/services/portfolioService";
import {MemoryRouter} from "react-router-dom";

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key, options = {}) => {
            const translations = {
                footer_copyright: `© ${options.year ?? 2025} Daniele Masone. All rights reserved.`,
                footer_social_navigation: "Social links",
                footer_social_loading: "Loading social links",
                footer_social_unavailable: "Social links temporarily unavailable",
                footer_external_profile_label: `Daniele Masone ${options.label} profile`,
                footer_developer_resources: "Developer resources",
                footer_legal_navigation: "Legal information",
                footer_docs_link: "Documentation",
                footer_coverage_link: "Coverage",
                "privacy.title": "Privacy Policy",
                "cookie.title": "Cookie and Local Storage Policy",
            };
            return translations[key] || key;
        },
    }),
}));

vi.mock("@/components/ui/brandIcon/BrandIcon", () => ({
    BrandIcon: ({title, size = 24}) => (
        <svg
            role="img"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            data-testid="brand-icon"
            aria-label={title}
        />
    ),
}));

const fakeIcon = {
    svg: '<path d="M0 0h24v24H0z"/>'
};

const mockLinks = [
    {key: "li", href: "https://x/li", icon: fakeIcon, color: "#0a66c2", label: "LinkedIn"},
    {key: "ig", href: "https://x/ig", icon: fakeIcon, color: "#e1306c", label: "Instagram"},
    {key: "gh", href: "https://x/gh", icon: fakeIcon, color: "#000", label: "GitHub"},
];

function renderFooter() {
    return render(
        <MemoryRouter>
            <Footer/>
        </MemoryRouter>
    );
}

describe("Footer", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("renders legal and resource links immediately while social links load", () => {
        vi.spyOn(service, "getLinks").mockReturnValueOnce(new Promise(() => {}));

        renderFooter();

        expect(screen.getByRole("contentinfo")).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "Privacy Policy"})).toHaveAttribute("href", "/privacy/");
        expect(screen.getByRole("link", {name: "Cookie and Local Storage Policy"}))
            .toHaveAttribute("href", "/cookie-policy/");
        expect(screen.getByRole("link", {name: "Documentation"})).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "Coverage"})).toBeInTheDocument();
        expect(screen.getByRole("status")).toHaveTextContent("Loading social links");
    });

    test("renders all social links after load", async () => {
        vi.spyOn(service, "getLinks").mockResolvedValueOnce(mockLinks);

        renderFooter();

        const nav = await screen.findByRole("navigation", {name: /social links/i});
        const anchors = within(nav).getAllByRole("link");
        expect(anchors).toHaveLength(mockLinks.length);
    });

    test("social links have accessible names and security attributes", async () => {
        vi.spyOn(service, "getLinks").mockResolvedValueOnce(mockLinks);

        renderFooter();

        for (const link of mockLinks) {
            const anchor = await screen.findByRole("link", {name: `Daniele Masone ${link.label} profile`});
            expect(anchor).toHaveAttribute("href", link.href);
            expect(anchor).toHaveAttribute("target", "_blank");
            expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
        }
    });

    test("each social link contains an icon", async () => {
        vi.spyOn(service, "getLinks").mockResolvedValueOnce(mockLinks);

        renderFooter();

        const icons = await screen.findAllByTestId("brand-icon");
        expect(icons).toHaveLength(mockLinks.length);

        icons.forEach(svg => {
            expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
            expect(svg).toHaveAttribute("width", "20");
            expect(svg).toHaveAttribute("height", "20");
        });
    });

    test("social-data failure does not remove structural footer links", async () => {
        vi.spyOn(service, "getLinks").mockRejectedValueOnce(new Error("boom"));

        renderFooter();

        expect(await screen.findByRole("status")).toHaveTextContent("Social links temporarily unavailable");
        expect(screen.getByRole("link", {name: "Privacy Policy"})).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "Cookie and Local Storage Policy"})).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "Documentation"})).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "Coverage"})).toBeInTheDocument();
    });

    test("docs and coverage links have correct href and rel attributes", () => {
        vi.spyOn(service, "getLinks").mockReturnValueOnce(new Promise(() => {}));

        renderFooter();

        const docs = screen.getByRole("link", {name: "Documentation"});
        const coverage = screen.getByRole("link", {name: "Coverage"});

        expect(docs).toHaveAttribute("href", "https://danielemasone.github.io/ingdanielemasone/docs/");
        expect(coverage).toHaveAttribute("href", "https://danielemasone.github.io/ingdanielemasone/test-coverage/");

        for (const link of [docs, coverage]) {
            expect(link).toHaveAttribute("target", "_blank");
            expect(link.getAttribute("rel")).toContain("noopener");
            expect(link.getAttribute("rel")).toContain("noreferrer");
            expect(link.getAttribute("rel")).toContain("nofollow");
        }
    });

    test("navigation landmarks have meaningful labels", () => {
        vi.spyOn(service, "getLinks").mockReturnValueOnce(new Promise(() => {}));

        renderFooter();

        expect(screen.getByRole("navigation", {name: "Social links"})).toBeInTheDocument();
        expect(screen.getByRole("navigation", {name: "Legal information"})).toBeInTheDocument();
        expect(screen.getByRole("navigation", {name: "Developer resources"})).toBeInTheDocument();
    });

    test("footer links are reachable by keyboard", async () => {
        vi.spyOn(service, "getLinks").mockResolvedValueOnce(mockLinks);

        const user = userEvent.setup();
        renderFooter();

        const docs = await screen.findByRole("link", {name: "Documentation"});
        const coverage = screen.getByRole("link", {name: "Coverage"});

        let foundDocs = false;
        let foundCoverage = false;

        for (let i = 0; i < 20; i++) {
            await user.tab();

            if (docs === document.activeElement) foundDocs = true;
            if (coverage === document.activeElement) foundCoverage = true;
        }

        expect(foundDocs).toBe(true);
        expect(foundCoverage).toBe(true);
    });
});
