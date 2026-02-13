import React from "react";
import {render, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Footer} from "./Footer";
import {vi} from 'vitest';
import * as service from "@/services/portfolio.service";

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => {
            const translations = {
                footer_copyright: "© 2025 Daniele Masone",
                error_generic: "Generic error",
            };
            return translations[key] || key;
        },
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

vi.mock("@/App", () => ({
    Loading: () => <div role="status">loading</div>,
    ErrorState: ({message, onRetry}) => (
        <div>
            <span>{message}</span>
            <button onClick={onRetry}>retry</button>
        </div>
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
    return render(<Footer/>);
}

describe("Footer – async UI", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("shows loading initially", () => {
        vi.spyOn(service, "getLinks")
            .mockReturnValueOnce(new Promise(() => {
            }));

        renderFooter();

        expect(screen.getByRole("status")).toBeInTheDocument();
    });

    test("renders all social links after load", async () => {
        vi.spyOn(service, "getLinks")
            .mockResolvedValueOnce(mockLinks);

        renderFooter();

        const nav = await screen.findByRole("navigation", {
            name: /social links/i,
        });

        const anchors = within(nav).getAllByRole("link");
        expect(anchors).toHaveLength(mockLinks.length);
    });

    test("each link has security attributes", async () => {
        vi.spyOn(service, "getLinks")
            .mockResolvedValueOnce(mockLinks);

        renderFooter();

        const nav = await screen.findByRole("navigation", {
            name: /social links/i,
        });

        const anchors = within(nav).getAllByRole("link");

        anchors.forEach(a => {
            expect(a).toHaveAttribute("target", "_blank");
            expect(a).toHaveAttribute("rel", "noopener noreferrer");
            expect(a.getAttribute("href")).toMatch(/^https:/);
        });
    });

    test("each social link contains svg icon", async () => {
        vi.spyOn(service, "getLinks")
            .mockResolvedValueOnce(mockLinks);

        renderFooter();

        const icons = await screen.findAllByTestId("brand-icon");
        expect(icons).toHaveLength(mockLinks.length);

        icons.forEach(svg => {
            expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
            expect(svg).toHaveAttribute("width", "24");
            expect(svg).toHaveAttribute("height", "24");
        });
    });

    test("mobile labels are rendered", async () => {
        vi.spyOn(service, "getLinks")
            .mockResolvedValueOnce(mockLinks);

        renderFooter();

        for (const l of mockLinks) {
            const labels = await screen.findAllByText(l.label);
            expect(labels.length).toBeGreaterThan(0);
        }
    });

    test("keyboard tab focuses each social link", async () => {
        vi.spyOn(service, "getLinks")
            .mockResolvedValueOnce(mockLinks);

        const user = userEvent.setup();
        renderFooter();

        const anchors = await screen.findAllByRole("link");

        for (const a of anchors) {
            await user.tab();
            expect(a).toHaveFocus();
        }
    });

    test("renders translated copyright", async () => {
        vi.spyOn(service, "getLinks")
            .mockResolvedValueOnce(mockLinks);

        renderFooter();

        expect(
            await screen.findByText("© 2025 Daniele Masone")
        ).toBeInTheDocument();
    });

    test("footer has blur + border UI classes", async () => {
        vi.spyOn(service, "getLinks")
            .mockResolvedValueOnce(mockLinks);

        renderFooter();

        const footer = await screen.findByRole("contentinfo");

        expect(footer.className).toMatch(/backdrop-blur/);
        expect(footer.className).toMatch(/border-t/);
        expect(footer.className).not.toMatch(/sticky/);
    });

    test("shows error state on failure", async () => {
        vi.spyOn(service, "getLinks")
            .mockRejectedValueOnce(new Error("boom"));

        renderFooter();

        expect(await screen.findByText("Generic error")).toBeInTheDocument();
    });

    test("retry button calls getLinks again", async () => {
        const spy = vi.spyOn(service, "getLinks")
            .mockRejectedValueOnce(new Error("boom"))
            .mockResolvedValueOnce(mockLinks);

        const user = userEvent.setup();
        renderFooter();

        const btn = await screen.findByRole("button", {name: /retry/i});
        await user.click(btn);

        expect(spy).toHaveBeenCalledTimes(2);
    });

});
