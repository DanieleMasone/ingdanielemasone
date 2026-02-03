import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Pagination} from "./Pagination";
import {vi} from 'vitest';

// Mock i18next
vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => {
            const translations = {
                previous: "Previous",
                next: "Next",
            };
            return translations[key] || key;
        },
    }),
}));

describe("Pagination component", () => {
    test("does not render when totalPages <= 1", () => {
        const {container} = render(
            <Pagination page={1} totalPages={1} onPageChange={() => {
            }}/>
        );
        expect(container.firstChild).toBeNull();
    });

    test("renders current page info and buttons", () => {
        render(<Pagination page={2} totalPages={5} onPageChange={() => {
        }}/>);

        expect(screen.getByTestId("pagination-info")).toHaveTextContent("2 / 5");
        expect(screen.getByText(/Previous/i)).toBeInTheDocument();
        expect(screen.getByText(/Next/i)).toBeInTheDocument();
    });

    test("disables 'Previous' button on first page", () => {
        render(<Pagination page={1} totalPages={3} onPageChange={() => {
        }}/>);
        const prevButton = screen.getByText(/Previous/i);
        expect(prevButton).toBeDisabled();
        expect(screen.getByText(/Next/i)).not.toBeDisabled();
    });

    test("disables 'Next' button on last page", () => {
        render(<Pagination page={3} totalPages={3} onPageChange={() => {
        }}/>);
        const nextButton = screen.getByText(/Next/i);
        expect(nextButton).toBeDisabled();
        expect(screen.getByText(/Previous/i)).not.toBeDisabled();
    });

    test("calls onPageChange with previous page when clicking 'Previous'", async () => {
        const user = userEvent.setup();
        const onPageChange = vi.fn();

        render(<Pagination page={3} totalPages={5} onPageChange={onPageChange}/>);

        await user.click(screen.getByText(/Previous/i));
        expect(onPageChange).toHaveBeenCalledWith(2);
    });

    test("calls onPageChange with next page when clicking 'Next'", async () => {
        const user = userEvent.setup();
        const onPageChange = vi.fn();

        render(<Pagination page={2} totalPages={5} onPageChange={onPageChange}/>);

        await user.click(screen.getByText(/Next/i));
        expect(onPageChange).toHaveBeenCalledWith(3);
    });

    test("does not go below page 1 or above totalPages", async () => {
        const user = userEvent.setup();
        const onPageChange = vi.fn();

        render(<Pagination page={1} totalPages={3} onPageChange={onPageChange}/>);

        const prev = screen.getByText(/Previous/i);
        const next = screen.getByText(/Next/i);

        // 'Previous' is disabled → no calls
        await user.click(prev);
        expect(onPageChange).not.toHaveBeenCalled();

        // Go ahead
        await user.click(next);
        expect(onPageChange).toHaveBeenCalledWith(2);
    });
});
