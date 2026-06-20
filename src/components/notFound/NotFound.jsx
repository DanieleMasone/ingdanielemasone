import {useTranslation} from 'react-i18next';
import clsx from "clsx";
import {interactiveClasses} from "@/styles/commonClasses";
import {Link} from "react-router-dom";
import {SeoHead} from "@/components/seoHead/SeoHead";
import {PageSection} from "@/components/ui/pageSection/PageSection";

/**
 * Displays the localized wildcard-route page for unknown portfolio URLs.
 *
 * The content includes:
 * - A title with the error code
 * - A brief error description
 * - A link to return to the home page
 *
 * The route is marked `noindex` through the shared SEO configuration. Its home
 * link is resolved by React Router, so the GitHub Pages basename is preserved
 * without hardcoding the deployment path.
 *
 * @component
 * @module components/notFound/NotFound
 *
 * @returns {React.JSX.Element} The rendered 404 page.
 */
export function NotFound() {
    const {t} = useTranslation();

    return (
        <>
            <SeoHead pageKey="notFound" path="/404"/>

            <PageSection
                title={`404 - ${t("notfound_title")}`}
                className="min-h-[60vh] items-center justify-center text-center"
            >
                <div
                    data-testid="not-found"
                    className="flex max-w-2xl flex-col items-center gap-6"
                >
                    <p className="text-lg leading-8 text-gray-700 dark:text-gray-300 sm:text-xl">
                        {t("notfound_description")}
                    </p>
                    <Link
                        to="/"
                        className={clsx(
                            interactiveClasses.buttonBase,
                            interactiveClasses.selectedButton,
                            interactiveClasses.focusRing,
                            "px-6"
                        )}
                    >
                        {t("go_home")}
                    </Link>
                </div>
            </PageSection>
        </>
    );
}
