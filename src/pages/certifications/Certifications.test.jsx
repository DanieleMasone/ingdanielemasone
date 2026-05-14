import React from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {vi} from "vitest";
import Certifications, {
    getVisibleRange,
    sortCertificationsByDate
} from "./Certifications";
import * as service from "@/services/portfolioService";

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key, options = {}) => {
            const translations = {
                "certifications_page.title": "Certifications",
                "certifications_page.description": "Professional certifications with official certificates.",
                "certifications_page.view_certificate": "View certificate",
                "certifications_page.issuer": "Issuer",
                "certifications_page.date": "Issued on",
                "certifications_page.results_summary": `Showing ${options.start}-${options.end} of ${options.total} certifications`,
                "certifications_page.empty": "No certifications available.",
                previous: "Prev",
                next: "Next",
                error_generic: "Generic error",
                "cert.desc.0": "Advanced professional communication credential.",
                "cert.desc.1": "Software delivery training credential."
            };

            return translations[key] || key;
        },
    }),
}));

vi.mock("@/components/loading/Loading", () => ({
    Loading: () => <div role="status">loading</div>,
}));

vi.mock("@/components/errorState/ErrorState", () => ({
    ErrorState: ({message, onRetry}) => (
        <div>
            <span>{message}</span>
            <button onClick={onRetry}>retry</button>
        </div>
    ),
}));

const mockCertifications = [
    {
        nameKey: "English CEFR Level B2.2",
        issuer: "Speexx",
        date: "2024",
        descriptionKey: "cert.desc.0",
        link: "https://example.com/b2-2",
    },
    {
        nameKey: "English CEFR Level B2.1",
        issuer: "Speexx",
        date: "2024",
        descriptionKey: "cert.desc.0",
        link: "https://example.com/b2-1",
    },
    {
        nameKey: "English CEFR Level B1.2",
        issuer: "Speexx",
        date: "2024",
        descriptionKey: "cert.desc.0",
        link: "https://example.com/b1-2",
    },
    {
        nameKey: "Academy Trainer",
        issuer: "RGI Group",
        date: "2023",
        descriptionKey: "cert.desc.1",
        link: "/assets/certificate.pdf",
    },
    {
        nameKey: "English CEFR Level B1.1",
        issuer: "Speexx",
        date: "2023",
        descriptionKey: "cert.desc.0",
        link: "https://example.com/b1-1",
    },
    {
        nameKey: "Codemotion Milan",
        issuer: "Codemotion",
        date: "2023",
        descriptionKey: "cert.desc.1",
        link: "https://example.com/codemotion-milan",
    },
    {
        nameKey: "Codemotion Workshop Fest",
        issuer: "Codemotion",
        date: "2023",
        descriptionKey: "cert.desc.1",
        link: "https://example.com/codemotion-workshop",
    },
];

function renderPage() {
    return render(
        <MemoryRouter initialEntries={["/certifications"]}>
            <Certifications/>
        </MemoryRouter>
    );
}

describe("Certifications component", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("shows loading initially", () => {
        vi.spyOn(service, "getCertifications")
            .mockReturnValueOnce(new Promise(() => {}));

        renderPage();

        expect(screen.getByRole("status")).toBeInTheDocument();
    });

    test("renders title, intro, summary and the first compact page", async () => {
        vi.spyOn(service, "getCertifications").mockResolvedValueOnce(mockCertifications);

        renderPage();

        expect(await screen.findByRole("heading", {name: "Certifications"})).toBeInTheDocument();
        expect(screen.getByText("Professional certifications with official certificates.")).toBeInTheDocument();
        expect(screen.getByText("Showing 1-6 of 7 certifications")).toBeInTheDocument();
        expect(screen.getAllByTestId("certification-card")).toHaveLength(6);
    });

    test("renders specific official certificate links", async () => {
        vi.spyOn(service, "getCertifications").mockResolvedValueOnce(mockCertifications);

        renderPage();

        const links = await screen.findAllByRole("link", {name: /view certificate/i});

        expect(links).toHaveLength(6);
        expect(screen.getByRole("link", {name: "View certificate: English CEFR Level B2.2"}))
            .toHaveAttribute("href", "https://example.com/b2-2");

        links.forEach((link) => {
            expect(link).toHaveAttribute("target", "_blank");
            expect(link).toHaveAttribute("rel", "noopener noreferrer");
        });
    });

    test("paginates older certifications", async () => {
        vi.spyOn(service, "getCertifications").mockResolvedValueOnce(mockCertifications);

        renderPage();

        const nextButtons = await screen.findAllByRole("button", {name: "Next"});
        fireEvent.click(nextButtons[0]);

        await waitFor(() => {
            expect(screen.getByText("Showing 7-7 of 7 certifications")).toBeInTheDocument();
            expect(screen.getAllByTestId("certification-card")).toHaveLength(1);
        });
        expect(screen.getByRole("heading", {name: "Codemotion Workshop Fest"})).toBeInTheDocument();
        screen.getAllByTestId("pagination-info")
            .forEach((info) => expect(info).toHaveTextContent("2 / 2"));
    });

    test("sorts certifications from newest to oldest while preserving same-year order", async () => {
        vi.spyOn(service, "getCertifications").mockResolvedValueOnce([...mockCertifications].reverse());

        renderPage();

        await screen.findByRole("heading", {name: "Certifications"});

        const headings = screen.getAllByRole("heading", {level: 2}).map((heading) => heading.textContent);
        expect(headings).toEqual([
            "English CEFR Level B1.2",
            "English CEFR Level B2.1",
            "English CEFR Level B2.2",
            "Codemotion Workshop Fest",
            "Codemotion Milan",
            "English CEFR Level B1.1"
        ]);
    });

    test("renders issuer, date and optional description", async () => {
        vi.spyOn(service, "getCertifications").mockResolvedValueOnce([mockCertifications[0]]);

        renderPage();

        expect(await screen.findByText("Issuer: Speexx")).toBeInTheDocument();
        expect(screen.getByText("Issued on: 2024")).toBeInTheDocument();
        expect(screen.getByText("Advanced professional communication credential.")).toBeInTheDocument();
    });

    test("does not render description when descriptionKey is missing", async () => {
        vi.spyOn(service, "getCertifications").mockResolvedValueOnce([{
            nameKey: "No description certificate",
            issuer: "Issuer",
            date: "2025",
            link: "https://example.com/no-description",
        }]);

        renderPage();

        await screen.findByRole("heading", {name: "No description certificate"});

        expect(screen.queryByText(/credential/i)).not.toBeInTheDocument();
    });

    test("renders SEO metadata", async () => {
        vi.spyOn(service, "getCertifications").mockResolvedValueOnce(mockCertifications);

        renderPage();

        await screen.findByRole("heading", {name: "Certifications"});

        expect(document.title.toLowerCase()).toContain("certifications");
    });

    test("shows error state on failure", async () => {
        vi.spyOn(service, "getCertifications")
            .mockRejectedValueOnce(new Error("boom"));

        renderPage();

        expect(await screen.findByText("Generic error")).toBeInTheDocument();
    });

    test("retry button calls getCertifications again after error", async () => {
        const spy = vi.spyOn(service, "getCertifications")
            .mockRejectedValueOnce(new Error("boom"))
            .mockResolvedValueOnce(mockCertifications);

        renderPage();

        await screen.findByText("Generic error");
        fireEvent.click(screen.getByText("retry"));

        expect(await screen.findByRole("heading", {name: "English CEFR Level B2.2"})).toBeInTheDocument();
        expect(spy).toHaveBeenCalledTimes(2);
    });

    test("handles empty certifications list", async () => {
        vi.spyOn(service, "getCertifications").mockResolvedValueOnce([]);

        renderPage();

        await screen.findByRole("heading", {name: "Certifications"});

        expect(screen.getByText("No certifications available.")).toBeInTheDocument();
        expect(screen.queryAllByTestId("certification-card")).toHaveLength(0);
    });

    test("renders PageGrid as visual layout without ARIA grid semantics", async () => {
        vi.spyOn(service, "getCertifications").mockResolvedValueOnce(mockCertifications);

        const {container} = renderPage();

        await screen.findAllByTestId("certification-card");

        expect(container.querySelector(".grid")).toBeInTheDocument();
        expect(screen.queryByRole("grid")).not.toBeInTheDocument();
    });
});

describe("Certifications helpers", () => {
    test("sorts certifications by year without mutating input", () => {
        const unsorted = [mockCertifications[6], mockCertifications[0], mockCertifications[3]];
        const sorted = sortCertificationsByDate(unsorted);

        expect(sorted.map((cert) => cert.nameKey))
            .toEqual(["English CEFR Level B2.2", "Codemotion Workshop Fest", "Academy Trainer"]);
        expect(unsorted[0].nameKey).toBe("Codemotion Workshop Fest");
    });

    test("calculates visible ranges for paginated certifications", () => {
        expect(getVisibleRange(1, 7, 6)).toEqual({start: 1, end: 6});
        expect(getVisibleRange(2, 7, 6)).toEqual({start: 7, end: 7});
        expect(getVisibleRange(1, 0, 6)).toEqual({start: 0, end: 0});
    });
});
