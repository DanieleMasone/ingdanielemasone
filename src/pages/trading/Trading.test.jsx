import {render, screen} from "@testing-library/react";
import Trading from "./Trading";
import React, {Suspense} from "react";
import {MemoryRouter} from 'react-router-dom';
import {vi} from 'vitest';

// Mock react-i18next
vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => {
            const translations = {
                trading_title: "Trading Performance",
                trading_intro: "Welcome to my trading performance overview.",
                trading_description: "Here you can find detailed metrics about my trading results.",
                disclaimer_text: "Trading involves risk. Past performance is not indicative of future results.",
                trading_cta: "My eToro profile",
                trading_signup: "Sign up on eToro"
            };
            return translations[key] || key;
        },
    }),
}));

vi.mock("../../components/ui/tradingPerformanceChart/TradingPerformanceChart", () => ({
    TradingPerformanceChart: () => (
        <div data-testid="mock-chart">[Mock TradingPerformanceChart]</div>
    ),
}));

// Mock PageSection component
vi.mock("../../components/ui/pageSection/PageSection", () => ({
    PageSection: ({title, children}) => (
        <section>
            <h2>{title}</h2>
            {children}
        </section>
    ),
}));

describe("Trading component", () => {
    beforeEach(() => {
        render(
            <MemoryRouter initialEntries={['/Trading']}>
                <Suspense fallback={<div>Loading...</div>}>
                    <Trading/>
                </Suspense>
            </MemoryRouter>
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
        const link = screen.getByRole("link", {name: /My eToro profile/i});
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "https://www.etoro.com/people/danielemasone");
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    test("renders a signup link with correct href and text", () => {
        const signupLink = screen.getByRole("link", {name: /Sign up on eToro/i});
        expect(signupLink).toBeInTheDocument();
        expect(signupLink).toHaveAttribute("href", "https://etoro.tw/44k4LJg");
        expect(signupLink).toHaveAttribute("target", "_blank");
        expect(signupLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    test("renders the TradingPerformanceChart component", async () => {
        const chart = await screen.findByTestId("mock-chart");
        expect(chart).toBeInTheDocument();
    });
});
