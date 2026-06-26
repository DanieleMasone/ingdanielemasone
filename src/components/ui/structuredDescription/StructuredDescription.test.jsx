import React from "react";
import {render, screen, within} from "@testing-library/react";
import {describe, expect, test, vi} from "vitest";
import {isStructuredDescription, StructuredDescription} from "./StructuredDescription";

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => ({showMore: "Show more", showLess: "Show less"})[key] ?? key
    })
}));

describe("StructuredDescription", () => {
    test("renders plain prose through the shared expandable fallback", () => {
        render(
            <StructuredDescription
                description="Plain project description"
                titleId="project-title"
                maxLines={4}
            />
        );

        expect(screen.getByText("Plain project description")).toBeInTheDocument();
    });

    test("renders paragraphs and labelled semantic lists without literal markers", () => {
        render(
            <StructuredDescription
                description={{
                    paragraphs: ["First paragraph", "Second paragraph"],
                    sections: [
                        {label: "Responsibilities", items: ["Architecture", "Code review"]},
                        {items: ["Unlabelled supporting item"]}
                    ]
                }}
                titleId="experience-title"
                maxLines={4}
            />
        );

        expect(screen.getByText("First paragraph").tagName).toBe("P");
        expect(screen.getByText("Second paragraph").tagName).toBe("P");

        const heading = screen.getByRole("heading", {level: 3, name: "Responsibilities"});
        const section = heading.closest("section");
        expect(within(section).getAllByRole("listitem")).toHaveLength(2);
        expect(within(section).getByText("Architecture")).not.toHaveTextContent(/^-/);
        expect(screen.getByText("Unlabelled supporting item").closest("li")).toBeInTheDocument();
    });

    test("rejects malformed object values without exposing implementation text", () => {
        const {container} = render(
            <StructuredDescription
                description={{paragraphs: ["Paragraph"], sections: [{items: []}]}}
                titleId="invalid-title"
                maxLines={4}
            />
        );

        expect(container).toBeEmptyDOMElement();
        expect(screen.queryByText("[object Object]")).not.toBeInTheDocument();
    });

    test("validates both labelled and unlabelled sections", () => {
        expect(isStructuredDescription({
            paragraphs: ["Paragraph"],
            sections: [{label: "Focus", items: ["Item"]}, {items: ["Other item"]}]
        })).toBe(true);
        expect(isStructuredDescription("Plain text")).toBe(false);
        expect(isStructuredDescription({paragraphs: [], sections: []})).toBe(false);
        expect(isStructuredDescription({paragraphs: ["Paragraph"], sections: [{items: ["- Item"]}]}))
            .toBe(false);
    });
});
