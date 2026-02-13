import {render, screen, fireEvent} from "@testing-library/react";
import {ErrorState} from "./ErrorState";
import React from "react";
import {vi} from "vitest";

// mock i18n
vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => {
            const map = {
                error_title: "Errore",
                error_retry: "Riprova",
                error_generic: "Qualcosa è andato storto",
                custom_error: "Errore custom"
            };
            return map[key] || key;
        }
    })
}));

describe("ErrorState", () => {
    test("renders translated title and default message", () => {
        render(<ErrorState/>);

        expect(screen.getByText("Errore")).toBeInTheDocument();
        expect(
            screen.getByText("Qualcosa è andato storto")
        ).toBeInTheDocument();
    });

    test("renders custom translated message key", () => {
        render(<ErrorState message="custom_error"/>);

        expect(screen.getByText("Errore custom")).toBeInTheDocument();
    });

    test("does not render retry button when onRetry is missing", () => {
        render(<ErrorState/>);

        expect(
            screen.queryByRole("button", {name: /Riprova/i})
        ).not.toBeInTheDocument();
    });

    test("renders retry button when onRetry is provided", () => {
        render(<ErrorState onRetry={() => {
        }}/>);

        expect(
            screen.getByRole("button", {name: /Riprova/i})
        ).toBeInTheDocument();
    });

    test("calls onRetry when retry button is clicked", () => {
        const retryMock = vi.fn();
        render(<ErrorState onRetry={retryMock}/>);

        fireEvent.click(screen.getByRole("button", {name: /Riprova/i}));
        expect(retryMock).toHaveBeenCalledTimes(1);
    });
});
