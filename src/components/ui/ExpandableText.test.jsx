import React from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {ExpandableText} from "./ExpandableText";
import {I18nextProvider, initReactI18next} from "react-i18next";
import i18n from "i18next";

// Init i18n
const initTestI18n = () => {
    i18n.use(initReactI18next).init({
        lng: "en",
        fallbackLng: "en",
        resources: {
            en: {
                translation: {
                    showMore: "Show more",
                    showLess: "Show less",
                },
            },
        },
        interpolation: {escapeValue: false},
        react: {useSuspense: false},
    });
};

describe("ExpandableText", () => {
    beforeAll(() => {
        initTestI18n();
    });

    beforeEach(() => {
        Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
            configurable: true,
            get() {
                if (this.textContent && this.textContent.includes("Riga")) {
                    return 100; // Simulate long content
                }
                return 20; // Simulate short content
            },
        });

        Object.defineProperty(HTMLElement.prototype, "clientHeight", {
            configurable: true,
            get() {
                return 50; // Simulate visible height for overflow
            },
        });

        Object.defineProperty(window, "getComputedStyle", {
            value: () => ({
                getPropertyValue: (prop) => {
                    if (prop === "font-size") return "16px";
                    return "";
                },
                fontSize: "16px", // If you log in directly
            }),
        });

    });

    const renderWithI18n = (ui) =>
        render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>);

    const longText = "Riga 1\nRiga 2\nRiga 3\nRiga 4\nRiga 5";
    const shortText = "Breve testo";

    test("renders long text and show toggle button", async () => {
        renderWithI18n(<ExpandableText value={longText} maxLines={2}/>);

        // The text is visible
        expect(screen.getByText(/Riga 1/)).toBeInTheDocument();

        // Need to wait for useLayoutEffect to show the button
        await waitFor(() => {
            expect(screen.getByRole("button", {name: /Show more/i})).toBeInTheDocument();
        });
    });

    test("renders short text and hides toggle button", async () => {
        renderWithI18n(<ExpandableText value={shortText} maxLines={3}/>);

        expect(screen.getByText(shortText)).toBeInTheDocument();

        // Let's wait to make sure the button does NOT appear
        await waitFor(() => {
            expect(screen.queryByRole("button")).not.toBeInTheDocument();
        });
    });

    test("expands and collapses text", async () => {
        renderWithI18n(<ExpandableText value={longText} maxLines={2}/>);

        // Wait for the initial button "Show more"
        const expandButton = await screen.findByRole("button", {name: /show more/i});
        expect(expandButton).toBeInTheDocument();

        // Click to expand
        fireEvent.click(expandButton);

        // Wait for the "Show less" button
        const collapseButton = await screen.findByRole("button", {name: /show less/i});
        expect(collapseButton).toBeInTheDocument();

        // Click to close
        fireEvent.click(collapseButton);

        // Wait for the "Show more" button to come back
        const reExpandButton = await screen.findByRole("button", {name: /show more/i});
        expect(reExpandButton).toBeInTheDocument();
    });

    test("shows fade overlay when collapsed", async () => {
        renderWithI18n(<ExpandableText value={longText} maxLines={2}/>);

        await waitFor(() => {
            const overlay = screen.getByText(/Riga 1/).parentElement?.querySelector("div.absolute");
            expect(overlay).toBeInTheDocument();
        });
    });

    test("hides fade overlay when expanded", async () => {
        renderWithI18n(<ExpandableText value={longText} maxLines={2}/>);
        const button = await screen.findByRole("button", {name: /show more/i});
        fireEvent.click(button);

        await waitFor(() => {
            const overlay = screen.getByText(/Riga 1/).parentElement?.querySelector("div.absolute");
            expect(overlay).not.toBeInTheDocument();
        });
    });

});
