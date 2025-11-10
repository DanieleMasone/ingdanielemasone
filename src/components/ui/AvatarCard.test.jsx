import {render, screen} from "@testing-library/react";
import {AvatarCard} from "./AvatarCard";
import React from "react";

// Mock di react-i18next
jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => {
            const translations = {
                "avatar.name": "Daniele Masone",
                "avatar.role": "Senior Software Engineer / Technical Architect FE",
            };
            return translations[key] || key;
        },
    }),
}));

describe("AvatarCard", () => {
    test("renders avatar image with correct alt text", () => {
        render(<AvatarCard/>);

        const img = screen.getByRole("img");
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("alt", "Daniele Masone");
    });

    test("renders name and role from translation", () => {
        render(<AvatarCard/>);

        expect(screen.getByText("Daniele Masone")).toBeInTheDocument();
        expect(
            screen.getByText("Senior Software Engineer / Technical Architect FE")
        ).toBeInTheDocument();
    });

    test("image has hover and transition classes", () => {
        render(<AvatarCard/>);

        const img = screen.getByRole("img");
        expect(img).toHaveClass("hover:scale-105");
        expect(img).toHaveClass("transition-transform");
    });
});
