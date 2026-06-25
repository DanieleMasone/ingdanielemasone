# Privacy, Accessibility and Content Review

This document records the technical compliance baseline reviewed on 21 June 2026. It is an engineering inventory, not a legal opinion or certification. Italian is the reference language for the public legal notices; English, French, German, and Spanish legal copy requires human legal review.

## Scope and official references

The audit covers every application route, the fallback route, GitHub Pages route HTML, `sitemap.xml`, `robots.txt`, Search Console verification, social images, JSDoc, coverage, downloadable assets, storage, network requests, external links, and published claims.

Primary references:

- [EU GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj), especially Articles 5, 6, 12-13, 15-22, 32, 44-49, and 77.
- [EDPB transparency guidance](https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/transparency-under-regulation-2016679_en).
- [Garante cookie and tracking-tool guidance](https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876).
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/).
- [AGID accessibility guidance](https://www.agid.gov.it/it/ambiti-intervento/accessibilita-usabilita), Italian Law 4/2004, Legislative Decree 82/2022, and [Directive (EU) 2019/882](https://eur-lex.europa.eu/eli/dir/2019/882/oj).
- [Market Abuse Regulation](https://eur-lex.europa.eu/eli/reg/2014/596/oj) and [Delegated Regulation (EU) 2016/958](https://eur-lex.europa.eu/eli/reg_del/2016/958/oj).
- [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) and [GitHub General Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).

## Applicability matrix

| Requirement | Classification | Repository evidence | Engineering action | Remaining decision |
| --- | --- | --- | --- | --- |
| GDPR transparency | Mandatory and technically verifiable | GitHub Pages receives requests; visitors may initiate correspondence | Policies now describe actual flows and remain reachable from every route | Controller correspondence practices require legal review |
| Lawful basis and retention | Conditional on owner facts | No form or backend; mail and social links are visitor-initiated | Removed unsupported analytics, marketing, transfer, and fixed-retention claims | Owner and legal counsel must confirm correspondence basis and retention |
| Cookie consent | Not applicable to current runtime | Only `i18nextLng` and optional `theme` local storage; no tracking | Removed consent banner and documented exact storage | Reassess before adding any tracker or embed |
| International transfers | Conditional | GitHub describes its own processing; external services load only after a click | Policy links to provider notice without inventing safeguards | Legal review of controller/provider roles if commercial activity expands |
| Accessibility | Voluntary WCAG 2.2 AA engineering target; statutory scope conditional | Personal portfolio; turnover and covered-service facts are absent | Existing semantic, keyboard, responsive, reduced-motion, and chart fallback checks retained | Owner/legal review of Law 4/2004 and EAA scope |
| Official AGID declaration | Not established | No evidence that the site is an obligated public body or in-scope private provider | No official declaration created | Create one only if legal scope is confirmed |
| Commercial/provider information | Conditional | Udemy referral purchase links and an eToro referral redirect exist | Clear disclosures added near the relevant actions | Confirm business status, VAT/provider information, compensation, and terms |
| Financial content | Requires qualified legal review | Historical percentages and broker/referral links are public | Added period, capital-risk, past-performance, and referral disclosures; removed unsupported safety wording | Confirm source, methodology, net/gross basis, fees, cash flows, currency, taxes, update process, and regulatory classification |
| Testimonials | Requires owner confirmation | Names, roles, quotes, and LinkedIn links are public; initials are generated locally | No authorization is claimed | Confirm exact quote, identity/role, publication authorization, date, and withdrawal channel for every entry |
| Intellectual property | Requires owner confirmation | Personal photo, course covers, certificate PDF, logos, icons, and third-party marks are public | README clarifies that MIT covers software, not portfolio content or third-party rights | Record provenance and display authorization for each non-code asset |
| GitHub Pages use | Pass for technical deployment model | Static artifact, official Pages Actions, project base path | Deployment remains static under `/ingdanielemasone/` | Owner must confirm commercial use against current account/terms if sales promotion grows |

## Runtime processing and storage inventory

| Mechanism | Owner | Purpose and content | Scope and duration | Consent decision |
| --- | --- | --- | --- | --- |
| `i18nextLng` local storage | Portfolio, first party | Detected or selected language code | All routes; persists until site data is cleared | Functional preference; no consent banner |
| `theme` local storage | Portfolio, first party | `light` or `dark` after the visitor uses the control | All routes; persists until changed or cleared | User-requested preference; no consent banner |
| HTTP cookies | None set by the application | Not used | None observed in production-preview browser checks | Not applicable |
| Hosting requests | GitHub Pages | Request and visitor IP data; GitHub states IPs are logged for security | Every published resource; GitHub controls retention | Covered by GitHub's own notice |
| Correspondence | Email/social provider and recipient | Address, account, and message chosen by the visitor | Only after following a link and sending a message | Owner confirmation and legal review |

No application analytics, advertising, pixels, fingerprinting, telemetry, remote fonts, embedded media, iframes, API calls, forms, authentication, IndexedDB, Cache API, or service worker are present. External services are contacted only after a user follows an external link. Language flags are rendered locally and no longer contact Flagcdn.

## Accessibility baseline

WCAG 2.2 AA is the engineering target, not a certification claim. The maintained checks cover route titles and language, landmarks, one page heading, skip navigation, keyboard header/mobile navigation, focus visibility, responsive reflow, pagination, reduced motion, contextual link names, chart table fallback, legal pages, loading/error/empty states, and the fallback route. Generated JSDoc and coverage are third-party report UIs and remain `noindex, nofollow`; manual review remains necessary after generator upgrades.

## Trading and commercial review

The eToro short URL redirects through affiliate parameters (`A=11`, `ref=26113157`, `utm_medium=RAF`) and sets third-party attribution cookies only after the visitor follows it. Udemy purchase URLs contain `referralCode`. Both relationships are disclosed close to their actions. The repository cannot establish compensation terms, contractual relationships, or whether the Trading content is a regulated recommendation. Do not add buy/sell/hold language, target prices, expected returns, urgency, safety claims, copy-trading invitations, or new broker links without qualified review.

The historical dataset begins in January 2022. Before treating it as a performance record, the owner must document its source, calculation formula, update date, whether values are net or gross, and treatment of fees, deposits, withdrawals, currency effects, dividends, and taxes.

## Testimonial governance

No testimonial authorization register belongs in the public repository. Keep any source evidence, authorization records, correction requests, removal requests, contact history, or withdrawal records outside the repository.

Every displayed testimonial must have a traceable source, accurate name and role information, wording that matches the source, and a private owner decision that republication remains appropriate. The public page may identify LinkedIn as the original context for recommendations, but it must not claim formal verification or consent unless the owner has confirmed the evidence privately. Locally generated initials avatars are decorative UI only and are not evidence of authorization.

Support correction and removal requests through the public contact channel. Do not commit private correspondence or per-person review status.

## Asset and claims checklist

Owner confirmation is required for the personal photograph, course-cover artwork, local certificate PDF, certificate/credential links, employer and provider names, testimonials, social-preview artwork, and any third-party trademarks. Verify that each item may be displayed publicly and does not imply endorsement. Simple Icons, Lucide, Boring Avatars, and other packages retain their own licences; the lockfile and upstream licences remain the source for package terms.

| Asset group | Repository source | Public use | Provenance/licence evidence | Required action |
| --- | --- | --- | --- | --- |
| Personal portrait and cover | `src/assets/daniele.jpg`, `src/assets/cover.png` | Home profile card | No written rights record in repository | Owner confirms ownership and intended publication; strip unnecessary image metadata before publishing when safe |
| Portfolio logo and social preview | `public/logo.png`, `public/social-preview.png` | Favicon and social metadata | Project-authored status not recorded | Owner confirms authorship or licence |
| Fifteen course covers | `src/assets/courses/*.png` | Courses | No artwork/licence record in repository | Confirm ownership, Udemy artwork reuse rights, and third-party marks |
| RGI certificate PDF | `src/assets/certifications/Attestato_Masone.pdf` | Certifications download | Public-display authorization not recorded | Confirm employer/provider authorization and that exposed personal data is intentional |
| External credential pages | `src/mock/certifications.js` | Certifications links | Provider-hosted, loaded only after click | Verify titles, dates, credential identifiers, and that wording does not imply provider endorsement |
| Social and technology icons | Simple Icons and Lucide package data | Navigation and controls | Upstream package licences in dependency tree | Keep package attribution/licence terms; marks identify destinations and do not imply endorsement |
| Testimonial avatars | Generated initials | Testimonials | No image asset or remote request | No image licence needed; testimonial text authorization still required |
| System fonts | Browser/OS font stack | Entire site | No remote font | No third-party request or bundled font licence |

The public Google Search Console verification file is intentionally public and is not a secret. The build publishes no source maps, secrets, API keys, private consent records, or user-submitted data.

## Review trigger

Repeat this inventory before adding analytics, remote media, iframes, contact forms, payments, accounts, new referral links, testimonials, broker content, or public assets. Technical tests provide regression evidence only and do not establish legal compliance.
