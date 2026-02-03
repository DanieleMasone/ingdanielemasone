import {render, screen} from "@testing-library/react";
import {AvatarCard} from "./AvatarCard";
import React from "react";
import {vi} from 'vitest';

// Mock of react-i18next
vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key, options) => {
            const translations = {
                "avatar.name": "Daniele Masone",
                "avatar.tagline": "Senior Software Engineer | Technical Architect | Teacher",
                "avatar.skills": ["Java", "JavaScript", "Angular", "C", "MySQL"],
                "avatar.bio": "Expert in software architecture, front-end & back-end development, and developer training."
            };
            if (options?.returnObjects) return translations[key] || [];
            return translations[key] || key;
        },
    }),
}));

describe("AvatarCard", () => {
    test("renders avatar image with correct alt text", () => {
        render(<AvatarCard/>);
        const img = screen.getByAltText("Daniele Masone");
        expect(img).toBeInTheDocument();
        expect(img).toHaveClass("hover:scale-105");
        expect(img).toHaveClass("transition-transform");
    });

    test("renders name, tagline, skills, and bio from translation", () => {
        render(<AvatarCard/>);

        // Tagline
        expect(screen.getByText("Senior Software Engineer | Technical Architect | Teacher")).toBeInTheDocument();

        // Skills joined
        expect(screen.getByText("Java • JavaScript • Angular • C • MySQL")).toBeInTheDocument();

        // Bio
        expect(screen.getByText("Expert in software architecture, front-end & back-end development, and developer training.")).toBeInTheDocument();
    });
});
