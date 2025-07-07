import {render, screen} from "@testing-library/react";
import Trading from "./Trading"; // adjust path as needed
import React from "react";
import {HelmetProvider} from "react-helmet-async";

// Mock react-i18next
jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => {
            const translations = {
                trading_title: "Trading Performance",
                trading_intro: "Welcome to my trading performance overview.",
                trading_description: "Here you can find detailed metrics about my trading results.",
                disclaimer_text: "Trading involves risk. Past performance is not indicative of future results.",
                trading_cta: "Visit my eToro profile",
            };
            return translations[key] || key;
        },
    }),
}));

// Mock TradingPerformanceChart component
jest.mock("../components/ui/TradingPerformanceChart", () => () => (
    <div data-testid="mock-chart">[Mock TradingPerformanceChart]</div>
));

// Mock PageSection component
jest.mock("../components/ui/PageSection", () => ({title, children}) => (
    <section>
        <h2>{title}</h2>
        {children}
    </section>
));

describe("Trading component", () => {
    beforeEach(() => {
        render(
            <HelmetProvider>
                <Trading/>
            </HelmetProvider>
        );
    });

    test("renders the section title from translation", () => {
        expect(screen.getByRole("heading", {level: 2})).toHaveTextContent("Trading Performance");
    });

    test("renders intro, description and disclaimer text", () => {
        expect(screen.getByText("Welcome to my trading performance overview.")).toBeInTheDocument();
        expect(screen.getByText("Here you can find detailed metrics about my trading results.")).toBeInTheDocument();
        expect(screen.getByText(/Trading involves risk/i)).toBeInTheDocument();
    });

    test("renders a call-to-action link with correct href and text", () => {
        const link = screen.getByRole("link", {name: /Visit my eToro profile/i});
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "https://www.etoro.com/people/danielemasone");
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    test("renders the TradingPerformanceChart component", () => {
        expect(screen.getByTestId("mock-chart")).toBeInTheDocument();
    });
});
