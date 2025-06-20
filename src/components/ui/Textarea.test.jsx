import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {Textarea} from "./Textarea";

describe("Textarea", () => {
    const shortText = "Short text";
    const longText = "This is a very long text\n".repeat(20); // ensure overflow

    it("renders textarea with given value", () => {
        render(<Textarea value={shortText}/>);
        const textarea = screen.getByRole("textbox");
        expect(textarea).toBeInTheDocument();
        expect(textarea).toHaveValue(shortText);
        expect(textarea).toHaveAttribute("readOnly");
    });

    it("does not show toggle button if content is short (not overflowing)", () => {
        render(<Textarea value={shortText}/>);
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
});
