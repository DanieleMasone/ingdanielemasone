import {render, screen, waitFor} from "@testing-library/react";
import {NotFound} from "./NotFound";
import React from "react";
import {vi} from "vitest";
import {MemoryRouter} from "react-router-dom";

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        i18n: {
            language: "it",
            resolvedLanguage: "it"
        },
        t: (key) => {
            const translations = {
                notfound_title: "Pagina non trovata",
                notfound_description: "La pagina che stai cercando non esiste o è stata rimossa.",
                go_home: "Torna alla Home",
                "seo.notFound.title": "Pagina non trovata - Daniele Masone",
                "seo.notFound.description": "La pagina richiesta non è disponibile."
            };

            return translations[key] || key;
        }
    })
}));

const renderNotFound = () => render(
    <MemoryRouter initialEntries={["/missing"]}>
        <NotFound/>
    </MemoryRouter>
);

describe("NotFound Component", () => {
    test("renders localized content and a router-managed home link", () => {
        renderNotFound();

        expect(screen.getByRole("heading", {level: 1, name: "404 - Pagina non trovata"})).toBeInTheDocument();
        expect(screen.getByText(/La pagina che stai cercando non esiste/i)).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "Torna alla Home"})).toHaveAttribute("href", "/");
    });

    test("marks the fallback route as noindex", async () => {
        renderNotFound();

        await waitFor(() => {
            expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
        });
    });
});
