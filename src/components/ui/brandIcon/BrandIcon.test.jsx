import {render, screen} from "@testing-library/react";
import {describe, test, expect} from "vitest";
import {BrandIcon} from "./BrandIcon";

const mockIcon = {
    svg: '<path d="M0 0h24v24H0z" />',
};

describe("BrandIcon", () => {

    test("renders nothing if icon is missing", () => {
        const {container} = render(<BrandIcon/>);
        expect(container.firstChild).toBeNull();
    });

    test("renders nothing if icon.svg is missing", () => {
        const {container} = render(<BrandIcon icon={{}}/>);
        expect(container.firstChild).toBeNull();
    });

    test("renders svg element when icon is valid", () => {
        render(<BrandIcon icon={mockIcon} color="#ff0000"/>);

        const svg = screen.getByRole("img", {hidden: true});
        expect(svg).toBeInTheDocument();
        expect(svg.tagName).toBe("svg");
    });

    test("applies size prop to width and height", () => {
        render(<BrandIcon icon={mockIcon} color="black" size={32}/>);

        const svg = screen.getByRole("img", {hidden: true});
        expect(svg).toHaveAttribute("width", "32");
        expect(svg).toHaveAttribute("height", "32");
    });

    test("uses default size when not provided", () => {
        render(<BrandIcon icon={mockIcon} color="black"/>);

        const svg = screen.getByRole("img", {hidden: true});
        expect(svg).toHaveAttribute("width", "24");
        expect(svg).toHaveAttribute("height", "24");
    });

    test("applies fill color", () => {
        render(<BrandIcon icon={mockIcon} color="#00ff00"/>);

        const svg = screen.getByRole("img", {hidden: true});
        expect(svg).toHaveAttribute("fill", "#00ff00");
    });

    test("applies custom className", () => {
        render(
            <BrandIcon
                icon={mockIcon}
                color="black"
                className="my-icon-class"
            />
        );

        const svg = screen.getByRole("img", {hidden: true});
        expect(svg).toHaveClass("my-icon-class");
    });

    test("sets accessible title when provided", () => {
        render(
            <BrandIcon
                icon={mockIcon}
                color="black"
                title="GitHub icon"
            />
        );

        const svg = screen.getByRole("img", {name: /github icon/i});
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveAttribute("aria-label", "GitHub icon");
        expect(svg).not.toHaveAttribute("aria-hidden");
    });

    test("is aria-hidden when title is not provided", () => {
        render(<BrandIcon icon={mockIcon} color="black"/>);

        const svg = screen.getByRole("img", {hidden: true});
        expect(svg).toHaveAttribute("aria-hidden", "true");
        expect(svg).not.toHaveAttribute("aria-label");
    });

    test("injects svg inner markup", () => {
        const {container} = render(
            <BrandIcon icon={mockIcon} color="black"/>
        );

        const path = container.querySelector("path");
        expect(path).toBeInTheDocument();
    });
});
