import React from "react";
import {render, screen} from "@testing-library/react";
import {PageGrid} from "./PageGrid";
import {vi} from "vitest";

// Mock framer-motion
vi.mock("framer-motion", () => ({
    AnimatePresence: ({ children }) => <>{children}</>,
    motion: {
        div: React.forwardRef(({ children, layout, initial, animate, exit, transition, ...rest }, ref) => (
            <div ref={ref} {...rest}>
                {children}
            </div>
        )),
    },
}));

describe("PageGrid component", () => {
    test("renders children inside the grid", () => {
        render(
            <PageGrid page={1}>
                <div>Card One</div>
                <div>Card Two</div>
            </PageGrid>
        );

        expect(screen.getByText("Card One")).toBeInTheDocument();
        expect(screen.getByText("Card Two")).toBeInTheDocument();
    });

    test("renders grid container with correct role and aria-label", () => {
        render(
            <PageGrid page={2}>
                <div>Item</div>
            </PageGrid>
        );

        const grid = screen.getByRole("grid");
        expect(grid).toBeInTheDocument();
        expect(grid).toHaveAttribute("aria-label", "Page 2");
    });

    test("applies default layout classes", () => {
        const { container } = render(
            <PageGrid page={1}>
                <div>Item</div>
            </PageGrid>
        );

        const wrapper = container.firstChild;
        expect(wrapper).toHaveClass("flex flex-col");
        expect(wrapper).toHaveClass("flex");
        expect(wrapper).toHaveClass("flex-col");
    });

    test("applies custom className to wrapper", () => {
        const { container } = render(
            <PageGrid page={1} className="custom-class">
                <div>Item</div>
            </PageGrid>
        );

        expect(container.firstChild).toHaveClass("custom-class");
    });

    test("spreads extra props on wrapper element", () => {
        const { container } = render(
            <PageGrid page={1} data-testid="pagegrid-wrapper">
                <div>Item</div>
            </PageGrid>
        );

        expect(container.firstChild).toHaveAttribute(
            "data-testid",
            "pagegrid-wrapper"
        );
    });

    test("re-mounts animated grid when page changes (key changes)", () => {
        const { rerender } = render(
            <PageGrid page={1}>
                <div>One</div>
            </PageGrid>
        );

        const firstGrid = screen.getByRole("grid");

        rerender(
            <PageGrid page={2}>
                <div>Two</div>
            </PageGrid>
        );

        const secondGrid = screen.getByRole("grid");

        // different key → new node → triggerable animation
        expect(firstGrid).not.toBe(secondGrid);
    });

    test("handles empty children without crashing", () => {
        render(<PageGrid page={5}>{null}</PageGrid>);
        expect(screen.getByRole("grid")).toBeInTheDocument();
    });

    test("supports page as string identifier", () => {
        render(
            <PageGrid page="alpha">
                <div>Item</div>
            </PageGrid>
        );

        expect(screen.getByRole("grid"))
            .toHaveAttribute("aria-label", "Page alpha");
    });
});
