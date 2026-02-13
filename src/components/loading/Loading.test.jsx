import {render} from "@testing-library/react";
import {Loading} from "./Loading";
import React from "react";

describe("Loading component", () => {
    test("renders without crashing", () => {
        const {container} = render(<Loading/>);
        expect(container).toBeInTheDocument();
    });

    test("renders a full-screen centered container", () => {
        const {container} = render(<Loading/>);
        const wrapper = container.firstChild;

        expect(wrapper).toHaveClass("flex");
        expect(wrapper).toHaveClass("items-center");
        expect(wrapper).toHaveClass("justify-center");
        expect(wrapper).toHaveClass("min-h-screen");
    });

    test("renders a spinner element", () => {
        const {container} = render(<Loading/>);
        const spinner = container.querySelector(".animate-spin");

        expect(spinner).toBeInTheDocument();
    });

    test("spinner has expected visual classes", () => {
        const {container} = render(<Loading/>);
        const spinner = container.querySelector(".animate-spin");

        expect(spinner).toHaveClass("w-12");
        expect(spinner).toHaveClass("h-12");
        expect(spinner).toHaveClass("border-4");
        expect(spinner).toHaveClass("rounded-full");
    });
});
