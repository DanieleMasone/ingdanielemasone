import React from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {ExpandableText} from "./ExpandableText";
import {I18nextProvider, initReactI18next} from "react-i18next";
import i18n from "i18next";

const initTestI18n = () => {
    i18n.use(initReactI18next).init({
        lng: "en",
        fallbackLng: "en",
        resources: {
            en: {
                translation: {
                    showMore: "Show more",
                    showLess: "Show less ▲",
                },
            },
            it: {
                translation: {
                    showMore: "Mostra tutto",
                    showLess: "Mostra meno",
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
        Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
            configurable: true,
            get() {
                // Se contiene testo lungo (esempio "Riga 1\nRiga 2\n...")
                if (this.textContent && this.textContent.includes('Riga')) {
                    return 100; // testo lungo
                }
                return 20; // testo corto
            },
        });

        Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
            configurable: true,
            get() {
                return 50; // altezza visibile fissa
            },
        });
    });

    const renderWithI18n = (ui) => {
        return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>);
    };

    const longText = "Riga 1\nRiga 2\nRiga 3\nRiga 4\nRiga 5";
    const shortText = "Breve testo";

    test("renders full text content", () => {
        renderWithI18n(<ExpandableText value={longText} maxLines={3}/>);
        expect(screen.getByText(/Riga 1/)).toBeInTheDocument();
        expect(screen.getByText(/Riga 5/)).toBeInTheDocument();
    });

    test("does not break on short text", () => {
        renderWithI18n(<ExpandableText value={shortText}/>);
        expect(screen.getByText(shortText)).toBeInTheDocument();
    });

    test("applies custom className", () => {
        const {container} = renderWithI18n(<ExpandableText value={"Test"} className="text-red-500"/>);
        expect(container.querySelector("p")).toHaveClass("text-red-500");
    });


    test("does not show button if text is short and not truncated", async () => {
        renderWithI18n(<ExpandableText value={shortText} maxLines={3}/>);
        // Per testo corto, il bottone non deve esserci
        await waitFor(() => {
            expect(screen.queryByRole("button")).toBeNull();
        });
    });

    test("shows 'Show more' button with ChevronDown icon when collapsed", async () => {
        renderWithI18n(<ExpandableText value={longText} maxLines={3}/>);
        await waitFor(() => {
            const btn = screen.getByRole("button");
            expect(btn).toHaveTextContent("Show more");
            // Verifico presenza dell'icona ChevronDown (svg)
            expect(btn.querySelector("svg")).toBeInTheDocument();
        });
    });

    test("toggles button text and icon on click", async () => {
        renderWithI18n(<ExpandableText value={longText} maxLines={3}/>);
        const btn = await screen.findByRole("button");

        // Bottone iniziale: "Show more" + ChevronDown
        expect(btn).toHaveTextContent("Show more");
        expect(btn.querySelector("svg")).toBeInTheDocument();

        fireEvent.click(btn);

        // Dopo click: "Show less" + ChevronUp
        await waitFor(() => {
            expect(btn).toHaveTextContent("Show less");
            expect(btn.querySelector("svg")).toBeInTheDocument();
        });
    });

});
