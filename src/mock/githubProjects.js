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
        id: "spring-modulith-order-platform",
        name: "Spring Modulith Order Platform",
        category: "backend",
        year: "2026",
        summaryKey: "github_projects_page.projects.spring_modulith_order_platform.summary",
        highlightsKeys: [
            "github_projects_page.projects.spring_modulith_order_platform.highlights.architecture",
            "github_projects_page.projects.spring_modulith_order_platform.highlights.contract",
            "github_projects_page.projects.spring_modulith_order_platform.highlights.quality"
        ],
        tech: "Java 21, Spring Boot 4.x, Spring Modulith 2.x, Spring Web MVC, Spring Data JPA, PostgreSQL 17, Flyway, OpenAPI Generator, RFC 7807 ProblemDetail, Testcontainers, JUnit 5, JaCoCo, Javadoc, Maven, Docker, Docker Compose, GitHub Actions, GitHub Pages",
        links: [
            {
                type: "repository",
                href: "https://github.com/DanieleMasone/spring-modulith-order-platform"
            },
            {
                type: "live",
                href: "https://danielemasone.github.io/spring-modulith-order-platform/"
            },
            {
                type: "documentation",
                href: "https://danielemasone.github.io/spring-modulith-order-platform/javadoc/"
            },
            {
                type: "coverage",
                href: "https://danielemasone.github.io/spring-modulith-order-platform/jacoco/"
            }
        ]
    },
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
        tech: "Java 21, Spring Boot 4.x, Spring Web MVC, Spring Data JPA, Hibernate, PostgreSQL, Redis, Flyway, Maven multi-module, JUnit 5, AssertJ, Testcontainers, ArchUnit, MapStruct, springdoc-openapi, JaCoCo, Maven JavaDoc, Docker Compose, GitHub Actions, GitHub Pages",
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
        tech: "Java 21, Spring Boot 4.0.6, Spring Web MVC, Spring Data JPA, Hibernate, PostgreSQL, Flyway, OpenAPI Generator, MapStruct, RFC 7807 ProblemDetail, Testcontainers, Docker Compose, JaCoCo, Maven, GitHub Actions, GitHub Pages",
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
                href: "https://danielemasone.github.io/identity-service/openapi/"
            },
            {
                type: "coverage",
                href: "https://danielemasone.github.io/identity-service/coverage/"
            }
        ]
    },
    {
        id: "order-events-service",
        name: "Order Events Service",
        category: "backend",
        year: "2026",
        summaryKey: "github_projects_page.projects.order_events_service.summary",
        highlightsKeys: [
            "github_projects_page.projects.order_events_service.highlights.event_flow",
            "github_projects_page.projects.order_events_service.highlights.idempotency",
            "github_projects_page.projects.order_events_service.highlights.quality"
        ],
        tech: "Java 21, Spring Boot, Spring Web MVC, Spring Data JPA, PostgreSQL, Flyway, Kafka, Spring Kafka, Maven Wrapper, Docker Compose, JUnit 5, Mockito, Spring Boot Test, Testcontainers, JaCoCo, OpenAPI Generator, GitHub Actions, GitHub Pages",
        links: [
            {
                type: "repository",
                href: "https://github.com/DanieleMasone/order-events-service"
            },
            {
                type: "live",
                href: "https://danielemasone.github.io/order-events-service/"
            },
            {
                type: "documentation",
                href: "https://danielemasone.github.io/order-events-service/openapi/"
            },
            {
                type: "coverage",
                href: "https://danielemasone.github.io/order-events-service/jacoco/"
            }
        ]
    },
    {
        id: "react-bff-gateway",
        name: "React BFF Gateway",
        category: "backend",
        year: "2026",
        summaryKey: "github_projects_page.projects.react_bff_gateway.summary",
        highlightsKeys: [
            "github_projects_page.projects.react_bff_gateway.highlights.bff_boundary",
            "github_projects_page.projects.react_bff_gateway.highlights.security_resilience",
            "github_projects_page.projects.react_bff_gateway.highlights.quality"
        ],
        tech: "Java 21, Spring Boot WebFlux, WebClient, Spring Security JWT Resource Server, Resilience4j, Springdoc OpenAPI 3, Actuator, JUnit 5, WebTestClient, Reactor Test, MockWebServer, WireMock, ArchUnit, JaCoCo, Javadoc, Docker Compose, GitHub Actions, GitHub Pages",
        links: [
            {
                type: "repository",
                href: "https://github.com/DanieleMasone/react-bff-gateway"
            },
            {
                type: "live",
                href: "https://danielemasone.github.io/react-bff-gateway/"
            },
            {
                type: "documentation",
                href: "https://danielemasone.github.io/react-bff-gateway/swagger-ui/"
            },
            {
                type: "coverage",
                href: "https://danielemasone.github.io/react-bff-gateway/coverage/"
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
        tech: "Next.js 16, React 19, TypeScript, TanStack Query, Recharts, Tailwind CSS 4, Vitest, Testing Library, Playwright, V8 coverage, TypeDoc, ESLint, GitHub Actions, GitHub Pages",
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
        tech: "Next.js App Router, React, strict TypeScript, Tailwind CSS, localStorage, Vitest, React Testing Library, Playwright, TypeDoc, ESLint, Prettier, GitHub Actions, GitHub Pages",
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
        id: "enterprise-data-workbench",
        name: "Enterprise Data Workbench",
        category: "frontend",
        year: "2026",
        summaryKey: "github_projects_page.projects.enterprise_data_workbench.summary",
        highlightsKeys: [
            "github_projects_page.projects.enterprise_data_workbench.highlights.local_first",
            "github_projects_page.projects.enterprise_data_workbench.highlights.workspace_ux",
            "github_projects_page.projects.enterprise_data_workbench.highlights.delivery"
        ],
        tech: "React, TypeScript, Vite, Zustand, Dexie, IndexedDB, Vitest, Testing Library, Playwright, V8 coverage, TypeDoc, ESLint, Prettier, GitHub Actions, GitHub Pages",
        links: [
            {
                type: "repository",
                href: "https://github.com/DanieleMasone/enterprise-data-workbench"
            },
            {
                type: "live",
                href: "https://danielemasone.github.io/enterprise-data-workbench/"
            },
            {
                type: "documentation",
                href: "https://danielemasone.github.io/enterprise-data-workbench/docs/"
            },
            {
                type: "coverage",
                href: "https://danielemasone.github.io/enterprise-data-workbench/coverage/"
            }
        ]
    },
    {
        id: "portfolio-online-cv",
        name: "Portfolio & Online CV",
        category: "frontend",
        year: "2026",
        summaryKey: "github_projects_page.projects.portfolio.summary",
        highlightsKeys: [
            "github_projects_page.projects.portfolio.highlights.positioning",
            "github_projects_page.projects.portfolio.highlights.seo",
            "github_projects_page.projects.portfolio.highlights.documentation"
        ],
        tech: "React 19, Vite 8, React Router 7, Tailwind CSS, i18next, Chart.js, Vitest, Testing Library, Playwright, V8 coverage, JSDoc, Docdash, GitHub Actions, GitHub Pages",
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
                href: "https://danielemasone.github.io/ingdanielemasone/docs/"
            },
            {
                type: "coverage",
                href: "https://danielemasone.github.io/ingdanielemasone/test-coverage/"
            }
        ]
    }
];
