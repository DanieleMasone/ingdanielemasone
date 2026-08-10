import {describe, expect, test} from "vitest";
import seoConfig from "../config/seo.json";
import {
    buildPersonStructuredData,
    buildStructuredData,
    buildWebPageStructuredData,
    buildWebsiteStructuredData,
    getPersonId,
    getWebsiteId
} from "./structuredData.mjs";

const pageInput = {
    config: seoConfig,
    title: "Daniele Masone - Portfolio",
    description: "Portfolio and online CV of Daniele Masone.",
    url: `${seoConfig.siteUrl}/`,
    language: "en"
};

describe("structured data builders", () => {
    test("uses stable identifiers for the owner and website", () => {
        expect(getPersonId(seoConfig)).toBe(`${seoConfig.siteUrl}/#person`);
        expect(getWebsiteId(seoConfig)).toBe(`${seoConfig.siteUrl}/#website`);
    });

    test("builds a source-backed and privacy-conscious Person entity", () => {
        const person = buildPersonStructuredData(seoConfig);

        expect(person).toMatchObject({
            "@type": "Person",
            "@id": `${seoConfig.siteUrl}/#person`,
            "name": "Daniele Masone",
            "url": `${seoConfig.siteUrl}/`,
            "description": expect.any(String),
            "jobTitle": "Technical Architect and Senior Software Engineer",
            "image": {
                "@type": "ImageObject",
                "url": seoConfig.image.url,
                "width": 1200,
                "height": 630
            },
            "worksFor": {
                "@type": "Organization",
                "name": "Intesa Sanpaolo"
            },
            "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "Politecnico di Milano"
            }
        });
        expect(person.knowsAbout).toEqual(expect.arrayContaining([
            "Software Architecture",
            "Regulated Financial Systems",
            "Legacy Modernization",
            "TypeScript"
        ]));
        expect(person.sameAs).toEqual(expect.arrayContaining([
            "https://www.linkedin.com/in/ingdanielemasone/",
            "https://github.com/DanieleMasone",
            "https://www.udemy.com/user/daniele-masone/",
            "https://twitter.com/masone_daniele"
        ]));
        expect(person).not.toHaveProperty("email");
        expect(person).not.toHaveProperty("telephone");
        expect(person).not.toHaveProperty("address");
        expect(person).not.toHaveProperty("birthDate");
        expect(person).not.toHaveProperty("nationality");
        expect(person).not.toHaveProperty("gender");
        expect(person).not.toHaveProperty("salary");
        expect(person.knowsAbout.join(" ")).not.toMatch(/trading|etoro|invest/i);
    });

    test("links WebSite and WebPage entities to the same Person", () => {
        const website = buildWebsiteStructuredData(pageInput);
        const webpage = buildWebPageStructuredData(pageInput);

        expect(website.publisher).toEqual({"@id": `${seoConfig.siteUrl}/#person`});
        expect(webpage.about).toEqual({"@id": `${seoConfig.siteUrl}/#person`});
        expect(webpage.isPartOf).toEqual({"@id": `${seoConfig.siteUrl}/#website`});
        expect(webpage.primaryImageOfPage).toMatchObject({
            "@type": "ImageObject",
            "url": seoConfig.image.url
        });
    });

    test("builds one graph containing Person, WebSite, and WebPage", () => {
        const structuredData = buildStructuredData(pageInput);

        expect(structuredData["@context"]).toBe("https://schema.org");
        expect(structuredData["@graph"].map((entry) => entry["@type"]))
            .toEqual(["Person", "WebSite", "WebPage"]);
    });

    test("keeps person fields grouped under the person configuration", () => {
        expect(seoConfig.person).toBeDefined();
        expect(seoConfig).not.toHaveProperty("author");
        expect(seoConfig).not.toHaveProperty("jobTitle");
        expect(seoConfig).not.toHaveProperty("sameAs");
    });
});
