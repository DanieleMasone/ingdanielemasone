import {useTranslation} from 'react-i18next';
import {SeoHead} from "@/components/seoHead/SeoHead"
import {AvatarCard} from "@/components/ui/avatarCard/AvatarCard";
import {Link} from "react-router-dom";
import {ArrowRight, BriefcaseBusiness, FolderGit2, Sparkles} from "lucide-react";
import {BrandIcon} from "@/components/ui/brandIcon/BrandIcon";
import React from "react";

const LINKEDIN_URL = "https://www.linkedin.com/in/ingdanielemasone/";
const linkedinIcon = {
    svg: `<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.85-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554V9h3.414v1.561h.049c.477-.9 1.637-1.85 3.367-1.85 3.598 0 4.265 2.368 4.265 5.452v6.289zM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126zM6.814 20.452H3.861V9h2.953v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.723v20.549C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.272V1.723C24 .774 23.2 0 22.225 0z"/>`,
};
const heroMetrics = [
    {valueKey: "home_metric_years_value", labelKey: "home_metric_years_label"},
    {valueKey: "home_metric_projects_value", labelKey: "home_metric_projects_label"},
    {valueKey: "home_metric_testimonials_value", labelKey: "home_metric_testimonials_label"},
];

const focusItems = [
    "home_focus_frontend",
    "home_focus_enterprise",
    "home_focus_training",
];

/**
 * Landing page for the portfolio and online CV.
 *
 * Presents the primary professional positioning, calls to action, profile card,
 * credibility metrics, and focus areas shown in the first viewport.
 *
 * @component
 * @module pages/home/Home
 * @returns {JSX.Element} The rendered home page.
 */
export default function Home() {
    const {t} = useTranslation();

    return (
        <>
            <SeoHead pageKey="home" path="/"/>

            <section
                className="relative overflow-hidden px-4 py-10 sm:px-6 md:px-12 lg:py-14"
                aria-labelledby="home-title"
            >
                <div
                    className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
                    <div
                        className="order-2 flex flex-col gap-6 text-center md:text-left lg:order-1"
                        data-testid="home-copy"
                    >
                        <div
                            className="inline-flex w-fit items-center gap-2 self-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800 dark:border-emerald-800/70 dark:bg-emerald-950/50 dark:text-emerald-200 md:self-start">
                            <Sparkles className="h-4 w-4" aria-hidden="true"/>
                            {t("home_eyebrow")}
                        </div>

                        <div className="space-y-4">
                            <h1
                                id="home-title"
                                className="text-4xl font-extrabold leading-tight text-gray-950 dark:text-white sm:text-5xl lg:text-6xl"
                            >
                                {t("avatar.name")}
                            </h1>
                            <p className="text-xl font-semibold text-blue-700 dark:text-blue-300 sm:text-2xl">
                                {t("home_subtitle")}
                            </p>
                            <p className="max-w-3xl text-base leading-8 text-gray-700 dark:text-gray-300 sm:text-lg">
                                {t("home_description")}
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">

                            {/* PRIMARY */}
                            <Link
                                to="/projects"
                                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg
                                           border border-[#0A66C2] bg-[#0A66C2] px-5 py-3
                                           text-base font-semibold text-white shadow-md transition
                                           hover:border-[#004182] hover:bg-[#004182]
                                           active:scale-[0.98]
                                           focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2]
                                           focus-visible:ring-offset-2
                                           dark:border-[#5AA7E8] dark:bg-[#0A66C2]
                                           dark:text-white dark:shadow-blue-950/30
                                           dark:hover:border-[#7DBDF0] dark:hover:bg-[#0B75DD]
                                           dark:focus-visible:ring-[#5AA7E8]
                                           dark:focus-visible:ring-offset-gray-900"
                            >
                                <FolderGit2 className="h-5 w-5"/>
                                {t("home_cta_projects")}
                            </Link>

                            {/* SECONDARY */}
                            <Link
                                to="/experience"
                                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg
                                           border border-gray-300 bg-white px-5 py-3 text-base font-semibold text-gray-900
                                           shadow-sm transition
                                           hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50
                                           active:scale-[0.98]
                                           focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                                           dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100
                                           dark:hover:border-blue-500 dark:hover:text-blue-300 dark:hover:bg-gray-800
                                           dark:focus-visible:ring-offset-gray-900"
                            >
                                <BriefcaseBusiness className="h-5 w-5"/>
                                {t("home_cta_experience")}
                            </Link>

                            {/* LINKEDIN */}
                            <a
                                href={LINKEDIN_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg
                                           border border-[#0A66C2] bg-[#0A66C2] px-5 py-3
                                           text-base font-semibold text-white shadow-md transition
                                           hover:border-[#004182] hover:bg-[#004182]
                                           active:scale-[0.98]
                                           focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2]
                                           focus-visible:ring-offset-2
                                           dark:border-[#5AA7E8] dark:bg-[#0A66C2]
                                           dark:text-white dark:shadow-blue-950/30
                                           dark:hover:border-[#7DBDF0] dark:hover:bg-[#0B75DD]
                                           dark:focus-visible:ring-[#5AA7E8]
                                           dark:focus-visible:ring-offset-gray-900"
                            >
                                <BrandIcon
                                    icon={linkedinIcon}
                                    color="currentColor"
                                    className="h-5 w-5"
                                    size={24}
                                    title="LinkedIn"
                                />
                                {t("follow_linkedin")}
                                <ArrowRight className="h-4 w-4" aria-hidden="true"/>
                            </a>
                        </div>

                        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3" data-testid="home-metrics">
                            {heroMetrics.map(({valueKey, labelKey}) => (
                                <div
                                    key={valueKey}
                                    className="rounded-lg border border-gray-200 bg-white/75 p-4 text-left shadow-sm dark:border-gray-800 dark:bg-gray-900/70"
                                >
                                    <dt className="text-sm text-gray-600 dark:text-gray-400">{t(labelKey)}</dt>
                                    <dd className="mt-1 text-2xl font-bold text-gray-950 dark:text-white">{t(valueKey)}</dd>
                                </div>
                            ))}
                        </dl>

                        <ul
                            className="flex gap-2.5 overflow-x-auto no-scrollbar px-1 pb-2
                                       md:flex-wrap md:justify-start md:overflow-visible md:pb-0"
                            aria-label={t("home_focus_label")}
                        >
                            {focusItems.map((item) => (
                                <li
                                    key={item}
                                    className="inline-flex shrink-0 items-center gap-2 rounded-full
                                               border border-blue-200/80 bg-white/70 px-3.5 py-1.5
                                               text-xs sm:text-sm font-semibold text-blue-900
                                               shadow-sm backdrop-blur-sm transition
                                               hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800
                                               dark:border-blue-400/20 dark:bg-blue-400/10
                                               dark:text-blue-100 dark:hover:border-blue-300/40
                                               dark:hover:bg-blue-400/15"
                                >
                                    <span
                                        className="h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-300"
                                        aria-hidden="true"
                                    />
                                    {t(item)}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="order-1 flex justify-center lg:order-2 lg:justify-end" data-testid="page-grid">
                        <AvatarCard/>
                    </div>
                </div>
            </section>
        </>
    );
}
