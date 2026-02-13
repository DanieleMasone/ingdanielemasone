import {render, screen} from "@testing-library/react";
import {describe, test, expect} from "vitest";
import {ButtonLink} from "./ButtonLink";

describe("ButtonLink", () => {
    test("renders anchor element with correct href", () => {
        render(<ButtonLink href="https://example.com" color="green">Click me</ButtonLink>);

        const link = screen.getByRole("link", {name: /click me/i});
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "https://example.com");
    });

    test("opens link in new tab with noopener noreferrer", () => {
        render(<ButtonLink href="https://example.com" color="blue">Go</ButtonLink>);

        const link = screen.getByRole("link", {name: /go/i});
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    test("applies correct base classes", () => {
        render(<ButtonLink href="#" color="green">Button</ButtonLink>);

        const link = screen.getByRole("link", {name: /button/i});
        expect(link.className).toMatch(/flex-1/);
        expect(link.className).toMatch(/rounded-lg/);
        expect(link.className).toMatch(/px-6/);
    });

    test("applies green color classes when color is green", () => {
        render(<ButtonLink href="#" color="green">Green</ButtonLink>);

        const link = screen.getByRole("link", {name: /green/i});
        expect(link.className).toMatch(/bg-green-600/);
        expect(link.className).toMatch(/hover:bg-green-700/);
    });

    test("applies blue color classes when color is blue", () => {
        render(<ButtonLink href="#" color="blue">Blue</ButtonLink>);

        const link = screen.getByRole("link", {name: /blue/i});
        expect(link.className).toMatch(/bg-blue-600/);
        expect(link.className).toMatch(/hover:bg-blue-700/);
    });

    test("renders children content correctly", () => {
        render(<ButtonLink href="#" color="green"><span>Inner</span></ButtonLink>);

        const child = screen.getByText(/inner/i);
        expect(child).toBeInTheDocument();
    });

    test("throws or fails gracefully if invalid color is passed", () => {
        // @ts-expect-error testing invalid color
        render(<ButtonLink href="#" color="red">Red</ButtonLink>);
        const link = screen.getByRole("link", {name: /red/i});
        expect(link.className).not.toMatch(/bg-green-600|bg-blue-600/);
    });
});
