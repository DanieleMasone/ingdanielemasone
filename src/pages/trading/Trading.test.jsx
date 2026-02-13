import {render, screen} from "@testing-library/react";
import Trading from "./Trading";
import React, {Suspense} from "react";
import {MemoryRouter} from 'react-router-dom';
import {vi} from 'vitest';
import * as service from "@/services/portfolio.service";

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
                trading_signup: "Sign up on eToro",
                error_generic: "Generic error"
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

vi.mock("@/App", () => ({
    Loading: () => <div role="status">loading</div>,
    ErrorState: ({message, onRetry}) => (
        <div>
            <span>{message}</span>
            <button onClick={onRetry}>retry</button>
        </div>
    ),
}));

function renderPage() {
    return render(
        <MemoryRouter initialEntries={["/trading"]}>
            <Suspense fallback={<div>Loading...</div>}>
                <Trading/>
            </Suspense>
        </MemoryRouter>
    );
}

const mockTradingPerformance = {
    startYear: 2022,
    monthlyReturns: Array(12).fill(0)
};

describe("Trading component", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("shows loading initially", () => {
        vi.spyOn(service, "getTradingPerformance").mockReturnValue(new Promise(() => {
        }));
        renderPage();
        expect(screen.getByRole("status", {name: /loading/i})).toBeInTheDocument();
    });

    test("renders the section title and content after async load", async () => {
        vi.spyOn(service, "getTradingPerformance").mockResolvedValueOnce(mockTradingPerformance);
        renderPage();

        // title
        const title = await screen.findByRole("heading", {level: 2, name: /trading performance/i});
        expect(title).toBeInTheDocument();

        // intro, description, disclaimer
        expect(await screen.findByText(/welcome to my trading performance overview/i)).toBeInTheDocument();
        expect(await screen.findByText(/here you can find detailed metrics/i)).toBeInTheDocument();
        expect(await screen.findByText(/trading involves risk/i)).toBeInTheDocument();

        // TradingPerformanceChart
        const chart = await screen.findByTestId("mock-chart");
        expect(chart).toBeInTheDocument();
    });

    test("renders call-to-action and signup links correctly", async () => {
        vi.spyOn(service, "getTradingPerformance").mockResolvedValueOnce(mockTradingPerformance);
        renderPage();

        const cta = await screen.findByRole("link", {name: /my etoro profile/i});
        expect(cta).toHaveAttribute("href", "https://www.etoro.com/people/danielemasone");
        expect(cta).toHaveAttribute("target", "_blank");
        expect(cta).toHaveAttribute("rel", "noopener noreferrer");

        const signup = await screen.findByRole("link", {name: /sign up on etoro/i});
        expect(signup).toHaveAttribute("href", "https://etoro.tw/44k4LJg");
        expect(signup).toHaveAttribute("target", "_blank");
        expect(signup).toHaveAttribute("rel", "noopener noreferrer");
    });

    test("shows error state on fetch failure", async () => {
        vi.spyOn(service, "getTradingPerformance").mockRejectedValueOnce(new Error("boom"));

        renderPage();

        expect(await screen.findByText("Generic error")).toBeInTheDocument();
    });
});
