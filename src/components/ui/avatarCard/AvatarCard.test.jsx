import {render, screen, within} from "@testing-library/react";
import {AvatarCard} from "./AvatarCard";
import React from "react";
import {vi} from 'vitest';

// Mock of react-i18next
vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key, options) => {
            const translations = {
                "avatar.tagline": "Senior Software Engineer | Technical Architect | Teacher",
                "avatar.skills": ["Java", "JavaScript", "Angular", "C", "MySQL"],
                "avatar.skills_label": "Core skills",
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
        expect(img).not.toHaveClass("hover:scale-105");
    });

    test("keeps the full name out of visible card copy", () => {
        render(<AvatarCard/>);

        expect(screen.queryByText("Daniele Masone")).not.toBeInTheDocument();
        expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    });

    test("renders tagline, skills, and bio from translation", () => {
        render(<AvatarCard/>);

        // Tagline
        expect(screen.getByText("Senior Software Engineer | Technical Architect | Teacher")).toBeInTheDocument();

        const skills = screen.getByRole("list", {name: "Core skills"});
        expect(within(skills).getAllByRole("listitem")).toHaveLength(5);
        expect(within(skills).getByText("Java")).toBeInTheDocument();

        // Bio
        expect(screen.getByText("Expert in software architecture, front-end & back-end development, and developer training.")).toBeInTheDocument();
    });
});
