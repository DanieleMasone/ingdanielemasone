import React from "react";
import {render, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {MemoryRouter} from "react-router-dom";
import {Footer} from "./Footer";
import {links} from "@/mock/links";
import {vi} from "vitest";

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key, options = {}) => {
            const translations = {
                footer_copyright: `© ${options.year ?? 2025} ${options.name}. All rights reserved.`,
                footer_social_navigation: "Social links",
                footer_external_profile_label: `${options.name} ${options.label} profile`,
                footer_navigation: "Footer links",
                footer_privacy_link: "Privacy",
                footer_cookie_link: "Cookies and local storage",
                footer_docs_link: "Documentation",
                footer_coverage_link: "Test coverage",
            };
            return translations[key] || key;
        },
    }),
}));

vi.mock("@/components/ui/brandIcon/BrandIcon", () => ({
    BrandIcon: ({size = 24}) => (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            data-testid="brand-icon"
        />
    ),
}));

function renderFooter() {
    return render(
        <MemoryRouter>
            <Footer/>
        </MemoryRouter>
    );
}

describe("Footer", () => {
    test("renders one copyright identity without a standalone repeated name", () => {
        renderFooter();

        expect(screen.getByRole("contentinfo")).toBeInTheDocument();
        expect(screen.getByText(/© \d{4} Daniele Masone\. All rights reserved\./)).toBeInTheDocument();
        expect(screen.queryByText("Daniele Masone")).not.toBeInTheDocument();
    });

    test("renders concise legal and generated-resource links synchronously", () => {
        renderFooter();

        const navigation = screen.getByRole("navigation", {name: "Footer links"});
        expect(within(navigation).getByRole("link", {name: "Privacy"})).toHaveAttribute("href", "/privacy/");
        expect(within(navigation).getByRole("link", {name: "Cookies and local storage"}))
            .toHaveAttribute("href", "/cookie-policy/");
        expect(within(navigation).getByRole("link", {name: "Documentation"}))
            .toHaveAttribute("href", `${import.meta.env.BASE_URL}docs/`);
        expect(within(navigation).getByRole("link", {name: "Test coverage"}))
            .toHaveAttribute("href", `${import.meta.env.BASE_URL}test-coverage/`);
    });

    test("generated resources use secure new-tab attributes", () => {
        renderFooter();

        for (const name of ["Documentation", "Test coverage"]) {
            const link = screen.getByRole("link", {name});
            expect(link).toHaveAttribute("target", "_blank");
            expect(link.getAttribute("rel")).toContain("noopener");
            expect(link.getAttribute("rel")).toContain("noreferrer");
            expect(link.getAttribute("rel")).toContain("nofollow");
        }
    });

    test("renders every bundled social profile with one accessible name", () => {
        renderFooter();

        const navigation = screen.getByRole("navigation", {name: "Social links"});
        expect(within(navigation).getAllByRole("link")).toHaveLength(links.length);

        for (const link of links) {
            const anchor = within(navigation).getByRole("link", {
                name: `Daniele Masone ${link.label} profile`
            });
            expect(anchor).toHaveAttribute("href", link.href);
            expect(anchor).toHaveAttribute("target", "_blank");
            expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
        }
    });

    test("keeps nested social icons decorative", () => {
        renderFooter();

        const icons = screen.getAllByTestId("brand-icon");
        expect(icons).toHaveLength(links.length);
        icons.forEach((icon) => {
            expect(icon).toHaveAttribute("aria-hidden", "true");
            expect(icon).not.toHaveAttribute("aria-label");
            expect(icon).toHaveAttribute("width", "20");
            expect(icon).toHaveAttribute("height", "20");
        });
    });

    test("footer links are reachable by keyboard", async () => {
        const user = userEvent.setup();
        renderFooter();

        const docs = screen.getByRole("link", {name: "Documentation"});
        const social = screen.getByRole("link", {name: "Daniele Masone LinkedIn profile"});
        let foundDocs = false;
        let foundSocial = false;

        for (let index = 0; index < links.length + 6; index++) {
            await user.tab();
            if (docs === document.activeElement) foundDocs = true;
            if (social === document.activeElement) foundSocial = true;
        }

        expect(foundDocs).toBe(true);
        expect(foundSocial).toBe(true);
    });
});
