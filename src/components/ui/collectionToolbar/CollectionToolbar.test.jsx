import React, {useState} from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {vi} from "vitest";
import {CollectionToolbar} from "./CollectionToolbar";

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key, options = {}) => {
            const translations = {
                previous: "Previous",
                next: "Next",
                pagination_label: "Pagination",
                "collection.range_summary": `${options.start}–${options.end} of ${options.total} ${options.label}`,
                "collection.range_announcement": `Showing items ${options.start} to ${options.end} of ${options.total} ${options.label}.`
            };

            return translations[key] || key;
        }
    })
}));

function StatefulToolbar({totalItems = 12, pageSize = 6}) {
    const [page, setPage] = useState(1);

    return (
        <CollectionToolbar
            page={page}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setPage}
            itemLabel="item"
            itemLabelPlural="items"
        />
    );
}

describe("CollectionToolbar", () => {
    test("does not render for empty collections", () => {
        const {container} = render(<StatefulToolbar totalItems={0}/>);

        expect(container.firstChild).toBeNull();
    });

    test("renders a concise visible summary and hides pagination for one-page collections", () => {
        render(<StatefulToolbar totalItems={1}/>);

        expect(screen.getByTestId("collection-summary")).toHaveTextContent("1–1 of 1 item");
        expect(screen.queryByRole("navigation", {name: /pagination/i})).not.toBeInTheDocument();
    });

    test("renders pagination with current-page semantics for multi-page collections", () => {
        render(<StatefulToolbar/>);

        expect(screen.getByTestId("collection-summary")).toHaveTextContent("1–6 of 12 items");
        expect(screen.getByRole("navigation", {name: /pagination/i})).toBeInTheDocument();
        expect(screen.getByTestId("pagination-info")).toHaveTextContent("1 / 2");
        expect(screen.getByTestId("pagination-info")).toHaveAttribute("aria-current", "page");
        expect(screen.getByRole("button", {name: /previous/i})).toBeDisabled();
        expect(screen.getByRole("button", {name: /next/i})).not.toBeDisabled();
    });

    test("announces the new range after a page change without initial live text", async () => {
        const user = userEvent.setup();
        render(<StatefulToolbar/>);

        const liveRegion = screen.getByTestId("collection-range-announcement");
        expect(liveRegion).toHaveTextContent("");
        expect(liveRegion).toHaveAttribute("aria-atomic", "true");

        await user.click(screen.getByRole("button", {name: /next/i}));

        expect(screen.getByTestId("collection-summary")).toHaveTextContent("7–12 of 12 items");
        expect(liveRegion).toHaveTextContent("Showing items 7 to 12 of 12 items.");
        expect(screen.getByRole("button", {name: /next/i})).toBeDisabled();
    });

    test("normalizes invalid page input before rendering pagination", () => {
        render(
            <CollectionToolbar
                page={99}
                totalItems={12}
                pageSize={6}
                onPageChange={() => {}}
                itemLabel="item"
                itemLabelPlural="items"
            />
        );

        expect(screen.getByTestId("collection-summary")).toHaveTextContent("7–12 of 12 items");
        expect(screen.getByTestId("pagination-info")).toHaveTextContent("2 / 2");
    });
});
