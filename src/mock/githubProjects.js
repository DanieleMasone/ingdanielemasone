/**
 * Public GitHub repositories highlighted by the portfolio.
 *
 * The data mirrors a real remote payload: page components load it through the
 * portfolio service, while translated copy keeps the same project list reusable
 * across every supported locale.
 *
 * @module mock/githubProjects
 */

/**
 * Inspectable GitHub portfolio projects.
 *
 * @type {Array<{
 *   id: string,
 *   name: string,
 *   category: "backend" | "frontend",
 *   year: string,
 *   summaryKey: string,
 *   highlightsKeys: string[],
 *   tech: string,
 *   links: Array<{type: "repository" | "live" | "documentation" | "coverage", href: string}>
 * }>}
 */
export const githubProjects = [
    {
        id: "modular-monolith-ecommerce",
        name: "Modular Monolith E-commerce",
        category: "backend",
        year: "2026",
        summaryKey: "github_projects_page.projects.modular_monolith_ecommerce.summary",
        highlightsKeys: [
            "github_projects_page.projects.modular_monolith_ecommerce.highlights.architecture",
            "github_projects_page.projects.modular_monolith_ecommerce.highlights.integration",
            "github_projects_page.projects.modular_monolith_ecommerce.highlights.quality"
        ],
        tech: "Java 21, Spring Boot 4.0.6, Spring Web MVC, Spring Data JPA, Hibernate, PostgreSQL, Redis, Flyway, Testcontainers, ArchUnit, MapStruct, springdoc-openapi, JaCoCo, Maven JavaDoc, Docker Compose, GitHub Actions, GitHub Pages",
        links: [
            {
                type: "repository",
                href: "https://github.com/DanieleMasone/modular-monolith-ecommerce"
            },
            {
                type: "live",
                href: "https://danielemasone.github.io/modular-monolith-ecommerce/"
            },
            {
                type: "documentation",
                href: "https://danielemasone.github.io/modular-monolith-ecommerce/docs/"
            },
            {
                type: "coverage",
                href: "https://danielemasone.github.io/modular-monolith-ecommerce/coverage/"
            }
        ]
    },
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
        tech: "Java 21, Spring Boot 4.0.6, PostgreSQL, Flyway, OpenAPI Generator, MapStruct, Testcontainers, Docker Compose, JaCoCo, Maven, GitHub Actions, GitHub Pages",
        links: [
            {
                type: "repository",
                href: "https://github.com/DanieleMasone/identity-service"
            },
            {
                type: "live",
                href: "https://danielemasone.github.io/identity-service/"
            },
            {
                type: "documentation",
                href: "https://danielemasone.github.io/identity-service/maven-site/"
            },
            {
                type: "coverage",
                href: "https://danielemasone.github.io/identity-service/coverage/"
            }
        ]
    },
    {
        id: "saas-analytics-dashboard",
        name: "SaaS Analytics Dashboard",
        category: "frontend",
        year: "2026",
        summaryKey: "github_projects_page.projects.saas_analytics_dashboard.summary",
        highlightsKeys: [
            "github_projects_page.projects.saas_analytics_dashboard.highlights.product",
            "github_projects_page.projects.saas_analytics_dashboard.highlights.data",
            "github_projects_page.projects.saas_analytics_dashboard.highlights.delivery"
        ],
        tech: "Next.js 16, React 19, TypeScript, TanStack Query, Recharts, Tailwind CSS, Vitest, TypeDoc, GitHub Actions, GitHub Pages",
        links: [
            {
                type: "repository",
                href: "https://github.com/DanieleMasone/saas-analytics-dashboard"
            },
            {
                type: "live",
                href: "https://danielemasone.github.io/saas-analytics-dashboard/"
            },
            {
                type: "documentation",
                href: "https://danielemasone.github.io/saas-analytics-dashboard/reference/"
            },
            {
                type: "coverage",
                href: "https://danielemasone.github.io/saas-analytics-dashboard/coverage/"
            }
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
        tech: "Next.js App Router, React, TypeScript, Tailwind CSS, localStorage, Vitest, Playwright, TypeDoc, ESLint, Prettier, GitHub Actions, GitHub Pages",
        links: [
            {
                type: "repository",
                href: "https://github.com/DanieleMasone/headless-commerce"
            },
            {
                type: "live",
                href: "https://danielemasone.github.io/headless-commerce/"
            },
            {
                type: "documentation",
                href: "https://danielemasone.github.io/headless-commerce/docs/"
            },
            {
                type: "coverage",
                href: "https://danielemasone.github.io/headless-commerce/coverage/"
            }
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
        tech: "React 19, Vite 8, React Router 7, Tailwind CSS, i18next, Chart.js, Vitest, JSDoc, GitHub Actions, GitHub Pages",
        links: [
            {
                type: "repository",
                href: "https://github.com/DanieleMasone/ingdanielemasone"
            },
            {
                type: "live",
                href: "https://danielemasone.github.io/ingdanielemasone/"
            },
            {
                type: "documentation",
                href: "https://danielemasone.github.io/ingdanielemasone/docs"
            },
            {
                type: "coverage",
                href: "https://danielemasone.github.io/ingdanielemasone/test-coverage"
            }
        ]
    }
];
