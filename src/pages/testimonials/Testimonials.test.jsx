import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import Testimonials from "./Testimonials";
import {MemoryRouter} from 'react-router-dom';
import {vi} from 'vitest';
import * as service from "@/services/portfolioService";

// Minimal translations
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key, options = {}) => {
            const translations = {
                "testimonials_people.mirko.name": "Mirko",
                "testimonials_people.mirko.role": "Developer",
                "testimonials_people.mirko.quote": "Great work!",
                "testimonials_people.alessia.name": "Alessia",
                "testimonials_people.alessia.role": "Designer",
                "testimonials_people.alessia.quote": "Amazing service!",
                "testimonials_people.federico.name": "Federico",
                "testimonials_people.federico.role": "Manager",
                "testimonials_people.federico.quote": "Highly recommend!",
                "testimonials_people.daniela.name": "Daniela",
                "testimonials_people.daniela.role": "QA",
                "testimonials_people.daniela.quote": "Thorough testing.",
                "testimonials_page.title": "Testimonials",
                "testimonials_page.description": "Professional feedback from coworkers and collaborators.",
                "testimonials_page.results_summary": `Showing ${options.start}-${options.end} of ${options.total} testimonials`,
                "testimonials_page.linkedin_label": "LinkedIn profile",
                "previous": "Prev",
                "next": "Next",
                "error_generic": "Generic error"
            };
            return translations[key] || key;
        },
        i18n: {
            changeLanguage: vi.fn(() => Promise.resolve())
        }
    }),
    // Mock to avoid initReactI18next warnings
    initReactI18next: {
        type: '3rdParty',
        init: vi.fn()
    }
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

function renderPage() {
    return render(
        <MemoryRouter initialEntries={['/testimonials']}>
            <Testimonials/>
        </MemoryRouter>
    );
}

const mockTestimonials = Array.from({length: 12}).map((_, i) => ({
    nameKey: `name_${i}`,
    roleKey: `role_${i}`,
    quoteKey: `quote_${i}`,
    linkedinUrl: `https://linkedin.com/${i}`,
}));


describe("Testimonials component with mobile + desktop paginators", () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("shows loading initially", () => {
        vi.spyOn(service, "getTestimonials")
            .mockReturnValueOnce(new Promise(() => {
            }));

        renderPage();

        expect(screen.getByRole("status")).toBeInTheDocument();
    });

    test("renders page title after load", async () => {
        vi.spyOn(service, "getTestimonials")
            .mockResolvedValueOnce(mockTestimonials);

        renderPage();

        expect(
            await screen.findByRole("heading", {name: /testimonials/i})
        ).toBeInTheDocument();
    });

    test("renders the page description for site-wide layout consistency", async () => {
        vi.spyOn(service, "getTestimonials")
            .mockResolvedValueOnce(mockTestimonials);

        renderPage();

        expect(await screen.findByText("Professional feedback from coworkers and collaborators.")).toBeInTheDocument();
    });

    test("renders both paginators", async () => {
        vi.spyOn(service, "getTestimonials")
            .mockResolvedValueOnce(mockTestimonials);

        renderPage();

        await screen.findByRole("heading", {name: /testimonials/i});

        const next = screen.getAllByRole("button", {name: /next/i});
        const prev = screen.getAllByRole("button", {name: /prev/i});

        expect(next).toHaveLength(2);
        expect(prev).toHaveLength(2);
    });

    test("renders 6 testimonial cards per page", async () => {
        vi.spyOn(service, "getTestimonials")
            .mockResolvedValueOnce(mockTestimonials);

        renderPage();

        const cards = await screen.findAllByTestId("testimonial-card");
        expect(cards).toHaveLength(6);
    });

    test("renders a live result summary", async () => {
        vi.spyOn(service, "getTestimonials")
            .mockResolvedValueOnce(mockTestimonials);

        renderPage();

        expect(await screen.findByText("Showing 1-6 of 12 testimonials")).toBeInTheDocument();
    });

    test("next button changes page", async () => {
        vi.spyOn(service, "getTestimonials")
            .mockResolvedValueOnce(mockTestimonials);

        renderPage();

        await screen.findAllByTestId("testimonial-card");

        const next = screen.getAllByRole("button", {name: /next/i})[0];
        fireEvent.click(next);

        const displays = screen.getAllByTestId("pagination-info");
        displays.forEach(el => expect(el.textContent).toMatch(/2/));
        expect(screen.getByText("Showing 7-12 of 12 testimonials")).toBeInTheDocument();
    });

    test("renders accessible linkedin profile links", async () => {
        vi.spyOn(service, "getTestimonials")
            .mockResolvedValueOnce(mockTestimonials);

        renderPage();

        await screen.findAllByTestId("testimonial-card");

        expect(screen.getByRole("link", {name: "LinkedIn profile - name_0"}))
            .toHaveAttribute("href", "https://linkedin.com/0");
    });

    test("uses local initials avatars and semantic quote blocks", async () => {
        vi.spyOn(service, "getTestimonials")
            .mockResolvedValueOnce(mockTestimonials);

        const {container} = renderPage();

        await screen.findAllByTestId("testimonial-card");

        expect(screen.queryByRole("img", {name: /avatar/i})).not.toBeInTheDocument();
        expect(container.querySelectorAll("blockquote")).toHaveLength(6);
    });

    test("shows error state on failure", async () => {
        vi.spyOn(service, "getTestimonials")
            .mockRejectedValueOnce(new Error("boom"));

        renderPage();

        expect(await screen.findByText("Generic error")).toBeInTheDocument();
    });

    test("retry reloads data", async () => {
        const spy = vi.spyOn(service, "getTestimonials")
            .mockRejectedValueOnce(new Error("boom"))
            .mockResolvedValueOnce(mockTestimonials);

        renderPage();

        const retry = await screen.findByRole("button", {name: /retry/i});
        fireEvent.click(retry);

        await screen.findAllByTestId("testimonial-card");

        expect(spy).toHaveBeenCalledTimes(2);
    });
});
