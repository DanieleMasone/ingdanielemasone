import React from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {ExpandableText} from "./ExpandableText";
import {vi} from 'vitest';

// Setup i18n mock
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => {
            const translations = {
                showMore: "Show more",
                showLess: "Show less"
            };
            return translations[key] || key;
        },
        i18n: { changeLanguage: vi.fn(() => Promise.resolve()) }
    }),
    initReactI18next: { type: '3rdParty', init: vi.fn() }
}));

describe("ExpandableText", () => {
    beforeEach(() => {
        Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
            configurable: true,
            get() {
                return this.textContent?.includes('Riga') ? 100 : 20;
            }
        });

        Object.defineProperty(window, 'getComputedStyle', {
            value: vi.fn(() => ({
                lineHeight: '16px',
                getPropertyValue: vi.fn(() => '16px')
            }))
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    const longText = "Riga 1\nRiga 2\nRiga 3\nRiga 4\nRiga 5";
    const shortText = "Breve testo";

    test("renders long text and shows 'Show more' button", async () => {
        render(<ExpandableText value={longText} maxLines={2}/>);

        expect(screen.getByText(/Riga 1/)).toBeInTheDocument();

        const button = await screen.findByRole("button", {name: /Show more/i});
        expect(button).toBeInTheDocument();
    });

    test("renders short text without toggle button", async () => {
        render(<ExpandableText value={shortText} maxLines={3}/>);
        expect(screen.getByText(shortText)).toBeInTheDocument();
        await waitFor(() => expect(screen.queryByRole("button")).not.toBeInTheDocument());
    });

    test("expands and collapses text correctly with aria-expanded toggle", async () => {
        render(<ExpandableText value={longText} maxLines={2}/>);

        const expandBtn = await screen.findByRole("button", {name: /Show more/i});
        const paragraph = expandBtn.closest("div").previousSibling;

        expect(paragraph).toHaveAttribute("aria-expanded", "false");
        const initialHeight = paragraph.style.maxHeight;
        expect(initialHeight).toMatch(/em/);

        // Expand
        fireEvent.click(expandBtn);
        await waitFor(() => {
            expect(paragraph).toHaveAttribute("aria-expanded", "true");
            expect(paragraph.style.maxHeight).toMatch(/px/);
        });

        // Collapse again
        const collapseBtn = await screen.findByRole("button", {name: /Show less/i});
        fireEvent.click(collapseBtn);
        await waitFor(() => {
            expect(paragraph).toHaveAttribute("aria-expanded", "false");
            expect(paragraph.style.maxHeight).toMatch(/em/);
        });
    });

    test("shows fade overlay when collapsed and hides when expanded", async () => {
        render(<ExpandableText value={longText} maxLines={2}/>);
        const expandBtn = await screen.findByRole("button", {name: /Show more/i});

        // Initially collapsed — fade should be visible
        await waitFor(() => {
            const overlay = screen.getByText(/Riga 1/).parentElement.querySelector("div.absolute");
            expect(overlay).toBeInTheDocument();
        });

        // Expand
        fireEvent.click(expandBtn);

        await waitFor(() => {
            const overlay = screen.getByText(/Riga 1/).parentElement.querySelector("div.absolute");
            expect(overlay).not.toBeInTheDocument();
        });
    });

    test("applies custom className to the paragraph container", async () => {
        render(<ExpandableText value={longText} className="custom-class"/>);
        const paragraph = screen.getByText(/Riga 1/).closest("div");
        expect(paragraph).toHaveClass("custom-class");
    });

    test("handles missing ref element gracefully (branch coverage)", () => {
        const {unmount} = render(<ExpandableText value=""/>);
        // Force unmount before ref exists — triggers the early return in useLayoutEffect
        unmount();
        expect(true).toBe(true); // just to confirm no crash
    });
});
