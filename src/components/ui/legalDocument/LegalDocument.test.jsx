import {render, screen} from "@testing-library/react";
import {LegalDocument, LegalSection} from "./LegalDocument";

describe("LegalDocument", () => {
    test("renders one document title, titled sections, and update metadata", () => {
        render(
            <LegalDocument title="Privacy Policy" lastUpdated="Last updated: June 2026">
                <LegalSection title="Introduction">
                    <p>Policy content</p>
                </LegalSection>
            </LegalDocument>
        );

        expect(screen.getByRole("heading", {level: 1, name: "Privacy Policy"})).toBeInTheDocument();
        expect(screen.getByRole("heading", {level: 2, name: "Introduction"})).toBeInTheDocument();
        expect(screen.getByText("Policy content")).toBeInTheDocument();
        expect(screen.getByText("Last updated: June 2026")).toBeInTheDocument();
    });
});
