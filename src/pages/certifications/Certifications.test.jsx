import React from "react";
import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {vi} from "vitest";
import Certifications from "./Certifications";
import * as service from "@/services/portfolio.service";

// ---- mock i18n ----
vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => {
            const map = {
                "certifications_page.title": "Certifications",
                "certifications_page.view_certificate": "View Certificate",
                "error_generic": "Generic error",
            };
            return map[key] || key;
        },
    }),
}));

function renderPage() {
    return render(
        <MemoryRouter initialEntries={["/certifications"]}>
            <Certifications/>
        </MemoryRouter>
    );
}

// ---- mock Loading + ErrorState ----
vi.mock("@/App", () => ({
    Loading: () => <div role="status">loading</div>,
    ErrorState: ({message, onRetry}) => (
        <div>
            <span>{message}</span>
            <button onClick={onRetry}>retry</button>
        </div>
    ),
}));

// ---- mock data ----
const mockCerts = Array.from({length: 6}).map((_, i) => ({
    nameKey: `cert_${i}`,
    issuer: "Issuer",
    date: "2025",
    link: `https://example.com/${i}`,
}));

describe("Certifications component", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("renders the page title", async () => {
        vi.spyOn(service, "getCertifications")
            .mockResolvedValueOnce(mockCerts);

        renderPage();

        const title = await screen.findByRole("heading", {
            name: /certifications/i
        });

        expect(title).toBeInTheDocument();
    });

    test("renders 'View Certificate' links correctly", async () => {
        vi.spyOn(service, "getCertifications")
            .mockResolvedValueOnce(mockCerts);

        renderPage();

        const links = await screen.findAllByRole("link", {
            name: /view certificate/i
        });

        expect(links.length).toBeGreaterThanOrEqual(4);

        links.forEach((link) => {
            expect(link).toHaveAttribute("href");
            expect(link).toHaveAttribute("target", "_blank");
            expect(link).toHaveAttribute("rel", "noopener noreferrer");
        });
    });

    test("renders pagination controls", async () => {
        vi.spyOn(service, "getCertifications")
            .mockResolvedValueOnce(mockCerts);

        renderPage();

        await screen.findAllByRole("link", {
            name: /view certificate/i
        });

        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBeGreaterThan(0);
    });

    test("renders PageGrid container", async () => {
        vi.spyOn(service, "getCertifications")
            .mockResolvedValueOnce(mockCerts);

        renderPage();

        const grid = await screen.findByRole("grid");
        expect(grid).toBeInTheDocument();
    });

    test("renders SEO metadata", async () => {
        vi.spyOn(service, "getCertifications")
            .mockResolvedValueOnce(mockCerts);

        renderPage();

        // Find the title visible on the page
        const title = await screen.findByText(/certifications/i);
        expect(title).toBeInTheDocument();

        // Check SEO
        expect(document.title.toLowerCase()).toContain("certifications");
    });

    test("shows loading first", () => {
        vi.spyOn(service, "getCertifications").mockReturnValue(new Promise(() => {
        })); // never resolves

        renderPage();

        // Search for the loader via role + aria-label
        expect(screen.getByRole("status", {name: /loading/i})).toBeInTheDocument();
    });

    test("shows error state on failure", async () => {
        vi.spyOn(service, "getCertifications")
            .mockRejectedValue(new Error("boom"));

        renderPage();

        expect(await screen.findByText("Generic error")).toBeInTheDocument();
    });
});
