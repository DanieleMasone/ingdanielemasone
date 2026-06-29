/**
 * Immutable owner identity and public profile destinations shared by the
 * runtime portfolio UI.
 *
 * Localized labels and professional positioning remain in the locale files;
 * personal identity and canonical profile URLs do not vary by language.
 * Static build-time SEO metadata remains in `seo.json` because the publishing
 * script consumes that file without loading the React application.
 *
 * @module config/siteIdentity
 */

const profiles = Object.freeze({
    linkedin: "https://www.linkedin.com/in/ingdanielemasone/",
    github: "https://github.com/DanieleMasone",
    udemy: "https://www.udemy.com/user/daniele-masone/",
    x: "https://twitter.com/masone_daniele",
    instagram: "https://www.instagram.com/ing_daniele_masone/",
    facebook: "https://www.facebook.com/danieleMasone"
});

/**
 * Canonical, non-localized identity values used by visible shell components,
 * accessible labels, profile links, and legal attribution.
 *
 * @type {{name: string, email: string, profiles: Readonly<Record<string, string>>}}
 */
export const siteIdentity = Object.freeze({
    name: "Daniele Masone",
    email: "masone.daniele@gmail.com",
    profiles
});
