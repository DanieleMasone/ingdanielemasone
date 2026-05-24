import React from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {vi} from "vitest";
import GithubProjects from "./GithubProjects";
import * as service from "@/services/portfolioService";
import {githubProjects} from "@/mock/githubProjects";

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key, options = {}) => {
            const translations = {
                "github_projects_page.title": "GitHub Projects",
                "github_projects_page.intro": "Inspectable repositories with code, tests and documentation.",
                "github_projects_page.filter_label": "Filter GitHub projects by category",
                "github_projects_page.highlights_label": `Highlights for ${options.project}`,
                "github_projects_page.results_summary": `Showing ${options.start}-${options.end} of ${options.total} repositories`,
                "github_projects_page.categories.all": "All",
                "github_projects_page.categories.frontend": "Frontend",
                "github_projects_page.categories.backend": "Backend",
                "github_projects_page.links.repository": "Repository",
                "github_projects_page.links.live": "Live",
                "github_projects_page.links.documentation": "Docs",
                "github_projects_page.links.coverage": "Coverage",
                "github_projects_page.projects.identity_service.summary": "Identity backend summary.",
                "github_projects_page.projects.identity_service.highlights.contract": "OpenAPI contract.",
                "github_projects_page.projects.identity_service.highlights.architecture": "Layered Spring architecture.",
                "github_projects_page.projects.identity_service.highlights.quality": "Testcontainers quality.",
                "github_projects_page.projects.headless_commerce.summary": "Static commerce frontend summary.",
                "github_projects_page.projects.headless_commerce.highlights.static_export": "Static GitHub Pages export.",
                "github_projects_page.projects.headless_commerce.highlights.commerce_ux": "Accessible cart UX.",
                "github_projects_page.projects.headless_commerce.highlights.quality": "Playwright and TypeDoc quality.",
                "github_projects_page.projects.portfolio.summary": "Portfolio summary.",
                "github_projects_page.projects.portfolio.highlights.positioning": "Portfolio positioning.",
                "github_projects_page.projects.portfolio.highlights.seo": "GitHub Pages SEO.",
                "github_projects_page.projects.portfolio.highlights.documentation": "Published docs.",
                "seo.githubProjects.title": "GitHub Projects - Daniele Masone",
                "seo.githubProjects.description": "Public GitHub repositories.",
                show_technologies: "Show technologies",
                previous: "Previous",
                next: "Next",
                error_generic: "Generic error"
            };

            return translations[key] || key;
        },
        i18n: {resolvedLanguage: "en"}
    })
}));

vi.mock("simple-icons", () => ({
    siGithub: {
        title: "GitHub",
        slug: "github",
        hex: "181717",
        path: "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387"
    },
    siUdemy: ({className}) => <svg aria-hidden="true" className={className}/>,
    siX: ({className}) => <svg aria-hidden="true" className={className}/>,
    siInstagram: ({className}) => <svg aria-hidden="true" className={className}/>,
    siFacebook: ({className}) => <svg aria-hidden="true" className={className}/>
}));

vi.mock("framer-motion", () => ({
    motion: {
        div: ({children, layout, initial, animate, exit, transition, variants, whileHover, whileTap, ...rest}) => (
            <div {...rest}>{children}</div>
        ),
    },
    AnimatePresence: ({children}) => <>{children}</>,
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

const mockGithubProjects = [
    {
        id: "identity-service",
        name: "Identity Service API",
        category: "backend",
        year: "2026",
        summaryKey: "github_projects_page.projects.identity_service.summary",
        highlightsKeys: [
            "github_projects_page.projects.identity_service.highlights.contract",
            "github_projects_page.projects.identity_service.highlights.architecture",
            "github_projects_page.projects.identity_service.highlights.quality"
        ],
        tech: "Java 21, Spring Boot 4, OpenAPI",
        links: [
            {type: "repository", href: "https://github.com/DanieleMasone/identity-service"},
            {type: "live", href: "https://danielemasone.github.io/identity-service/"},
            {type: "documentation", href: "https://danielemasone.github.io/identity-service/maven-site/"},
            {type: "coverage", href: "https://danielemasone.github.io/identity-service/coverage/"}
        ]
    },
    {
        id: "headless-commerce",
        name: "Headless Commerce",
        category: "frontend",
        year: "2026",
        summaryKey: "github_projects_page.projects.headless_commerce.summary",
        highlightsKeys: [
            "github_projects_page.projects.headless_commerce.highlights.static_export",
            "github_projects_page.projects.headless_commerce.highlights.commerce_ux",
            "github_projects_page.projects.headless_commerce.highlights.quality"
        ],
        tech: "Next.js App Router, TypeScript, Playwright",
        links: [
            {type: "repository", href: "https://github.com/DanieleMasone/headless-commerce"},
            {type: "live", href: "https://danielemasone.github.io/headless-commerce/"},
            {type: "documentation", href: "https://danielemasone.github.io/headless-commerce/docs/"},
            {type: "coverage", href: "https://danielemasone.github.io/headless-commerce/coverage/"}
        ]
    },
    {
        id: "portfolio-online-cv",
        name: "Portfolio & Online CV",
        category: "frontend",
        year: "2025",
        summaryKey: "github_projects_page.projects.portfolio.summary",
        highlightsKeys: [
            "github_projects_page.projects.portfolio.highlights.positioning",
            "github_projects_page.projects.portfolio.highlights.seo",
            "github_projects_page.projects.portfolio.highlights.documentation"
        ],
        tech: "React 19, Vite 8, Vitest",
        links: [
            {type: "repository", href: "https://github.com/DanieleMasone/ingdanielemasone"},
            {type: "live", href: "https://danielemasone.github.io/ingdanielemasone/"},
            {type: "coverage", href: "https://danielemasone.github.io/ingdanielemasone/test-coverage"}
        ]
    }
];

function renderGithubProjects() {
    return render(
        <MemoryRouter initialEntries={["/github-projects"]}>
            <GithubProjects/>
        </MemoryRouter>
    );
}

describe("GithubProjects", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("shows loading while repositories are fetched", () => {
        vi.spyOn(service, "getGithubProjects").mockReturnValueOnce(new Promise(() => {
        }));

        renderGithubProjects();

        expect(screen.getByRole("status")).toBeInTheDocument();
    });

    test("renders public repository cards with accessible external links", async () => {
        vi.spyOn(service, "getGithubProjects").mockResolvedValueOnce(mockGithubProjects);

        renderGithubProjects();

        expect(await screen.findByRole("heading", {name: "GitHub Projects"})).toBeInTheDocument();
        const intro = screen.getByText("Inspectable repositories with code, tests and documentation.");
        expect(intro).toBeInTheDocument();
        expect(intro).toHaveClass("max-w-3xl", "text-base", "leading-7");
        expect(screen.getByText("Identity Service API")).toBeInTheDocument();
        expect(screen.getByText("Headless Commerce")).toBeInTheDocument();
        expect(screen.getByText("Portfolio & Online CV")).toBeInTheDocument();

        const repository = screen.getByRole("link", {name: "Repository: Identity Service API"});
        expect(repository).toHaveAttribute("href", "https://github.com/DanieleMasone/identity-service");
        expect(repository).toHaveAttribute("target", "_blank");
        expect(repository).toHaveAttribute("rel", "noopener noreferrer");

        expect(screen.getByRole("link", {name: "Docs: Identity Service API"}))
            .toHaveAttribute("href", "https://danielemasone.github.io/identity-service/maven-site/");
        expect(screen.getByRole("link", {name: "Coverage: Identity Service API"}))
            .toHaveAttribute("href", "https://danielemasone.github.io/identity-service/coverage/");
        expect(screen.getByRole("link", {name: "Live: Headless Commerce"}))
            .toHaveAttribute("href", "https://danielemasone.github.io/headless-commerce/");
        expect(screen.getByRole("link", {name: "Docs: Headless Commerce"}))
            .toHaveAttribute("href", "https://danielemasone.github.io/headless-commerce/docs/");
        expect(screen.getByRole("link", {name: "Coverage: Headless Commerce"}))
            .toHaveAttribute("href", "https://danielemasone.github.io/headless-commerce/coverage/");
    });

    test("keeps public resource links aligned with published repository READMEs", () => {
        const byType = (projectId, type) =>
            githubProjects.find((project) => project.id === projectId)
                ?.links.find((link) => link.type === type)
                ?.href;

        expect(byType("modular-monolith-ecommerce", "live"))
            .toBe("https://danielemasone.github.io/modular-monolith-ecommerce/");
        expect(byType("modular-monolith-ecommerce", "documentation"))
            .toBe("https://danielemasone.github.io/modular-monolith-ecommerce/docs/");
        expect(byType("modular-monolith-ecommerce", "coverage"))
            .toBe("https://danielemasone.github.io/modular-monolith-ecommerce/coverage/");
        expect(byType("headless-commerce", "documentation"))
            .toBe("https://danielemasone.github.io/headless-commerce/docs/");
        expect(byType("headless-commerce", "coverage"))
            .toBe("https://danielemasone.github.io/headless-commerce/coverage/");
        expect(byType("react-bff-gateway", "live"))
            .toBe("https://danielemasone.github.io/react-bff-gateway/");
        expect(byType("react-bff-gateway", "documentation"))
            .toBe("https://danielemasone.github.io/react-bff-gateway/swagger-ui/");
        expect(byType("react-bff-gateway", "coverage"))
            .toBe("https://danielemasone.github.io/react-bff-gateway/coverage/");
        expect(byType("enterprise-data-workbench", "live"))
            .toBe("https://danielemasone.github.io/enterprise-data-workbench/");
        expect(byType("enterprise-data-workbench", "documentation"))
            .toBe("https://danielemasone.github.io/enterprise-data-workbench/docs/");
        expect(byType("enterprise-data-workbench", "coverage"))
            .toBe("https://danielemasone.github.io/enterprise-data-workbench/coverage/");
    });

    test("filters repositories by category", async () => {
        vi.spyOn(service, "getGithubProjects").mockResolvedValueOnce(mockGithubProjects);

        renderGithubProjects();

        await screen.findByText("Identity Service API");

        fireEvent.click(screen.getByRole("button", {name: "Backend"}));

        await waitFor(() => {
            expect(screen.getByText("Identity Service API")).toBeInTheDocument();
            expect(screen.queryByText("Portfolio & Online CV")).not.toBeInTheDocument();
        });
    });

    test("paginates long repository lists and announces the visible range", async () => {
        const longList = [
            ...mockGithubProjects,
            {
                ...mockGithubProjects[1],
                id: "frontend-playground",
                name: "Frontend Playground"
            },
            {
                ...mockGithubProjects[1],
                id: "design-system-lab",
                name: "Design System Lab"
            }
        ];
        vi.spyOn(service, "getGithubProjects").mockResolvedValueOnce(longList);

        renderGithubProjects();

        await screen.findByText("Identity Service API");

        expect(screen.getByText("Showing 1-3 of 5 repositories")).toBeInTheDocument();
        expect(screen.getByText("Portfolio & Online CV")).toBeInTheDocument();
        expect(screen.queryByText("Frontend Playground")).not.toBeInTheDocument();
        expect(screen.queryByText("Design System Lab")).not.toBeInTheDocument();

        fireEvent.click(screen.getAllByRole("button", {name: /next/i})[0]);

        await waitFor(() => {
            expect(screen.getByText("Showing 4-5 of 5 repositories")).toBeInTheDocument();
            expect(screen.getByText("Frontend Playground")).toBeInTheDocument();
            expect(screen.getByText("Design System Lab")).toBeInTheDocument();
            expect(screen.queryByText("Identity Service API")).not.toBeInTheDocument();
        });
    });

    test("resets pagination when changing category", async () => {
        const longList = [
            ...mockGithubProjects,
            {
                ...mockGithubProjects[1],
                id: "frontend-playground",
                name: "Frontend Playground"
            },
            {
                ...mockGithubProjects[1],
                id: "design-system-lab",
                name: "Design System Lab"
            }
        ];
        vi.spyOn(service, "getGithubProjects").mockResolvedValueOnce(longList);

        renderGithubProjects();

        await screen.findByText("Identity Service API");
        fireEvent.click(screen.getAllByRole("button", {name: /next/i})[0]);

        await screen.findByText("Design System Lab");

        fireEvent.click(screen.getByRole("button", {name: "Backend"}));

        await waitFor(() => {
            expect(screen.getByText("Showing 1-1 of 1 repositories")).toBeInTheDocument();
            expect(screen.getByText("Identity Service API")).toBeInTheDocument();
            expect(screen.queryByText("Design System Lab")).not.toBeInTheDocument();
        });
    });

    test("adds future dataset categories to filters with a readable fallback label", async () => {
        vi.spyOn(service, "getGithubProjects").mockResolvedValueOnce([
            ...mockGithubProjects,
            {
                ...mockGithubProjects[1],
                id: "developer-tooling",
                name: "Developer Tooling",
                category: "developer-tools"
            }
        ]);

        renderGithubProjects();

        await screen.findByText("Identity Service API");

        fireEvent.click(screen.getByRole("button", {name: "Developer Tools"}));

        expect(screen.getByText("Developer Tooling")).toBeInTheDocument();
        expect(screen.queryByText("Identity Service API")).not.toBeInTheDocument();
    });

    test("toggles the technology disclosure", async () => {
        vi.spyOn(service, "getGithubProjects").mockResolvedValueOnce(mockGithubProjects);

        renderGithubProjects();

        await screen.findByText("Identity Service API");
        expect(screen.queryByText("Java 21")).not.toBeInTheDocument();

        fireEvent.click(screen.getAllByRole("button", {name: /show technologies/i})[0]);

        expect(await screen.findByText("Java 21")).toBeInTheDocument();
    });

    test("shows retryable error state", async () => {
        const spy = vi.spyOn(service, "getGithubProjects")
            .mockRejectedValueOnce(new Error("boom"))
            .mockResolvedValueOnce(mockGithubProjects);

        renderGithubProjects();

        expect(await screen.findByText("Generic error")).toBeInTheDocument();

        fireEvent.click(screen.getByText("retry"));

        expect(await screen.findByText("Identity Service API")).toBeInTheDocument();
        expect(spy).toHaveBeenCalledTimes(2);
    });

    test("renders repository links with a Simple Icons SVG adapter", async () => {
        vi.spyOn(service, "getGithubProjects").mockResolvedValueOnce(mockGithubProjects);

        renderGithubProjects();

        const repository = await screen.findByRole("link", {
            name: "Repository: Identity Service API"
        });

        const icon = repository.querySelector("svg");
        const path = repository.querySelector("path");

        expect(icon).toBeInTheDocument();
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
        expect(icon).toHaveAttribute("fill", "currentColor");
        expect(path).toBeInTheDocument();
        expect(path).toHaveAttribute("d", expect.stringContaining("M12"));
    });
});
