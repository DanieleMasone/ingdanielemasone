import React from "react";
import danielePhoto from '../../../assets/daniele.jpg';
import {useTranslation} from "react-i18next";
import {siteIdentity} from "@/config/siteIdentity";

/**
 * Personal profile card shown on the portfolio home page.
 *
 * Displays a described profile photo, tagline, skills, and short bio without
 * repeating the full-name heading owned by the Home hero.
 *
 * @component
 * @module components/ui/avatarCard/AvatarCard
 * @returns {JSX.Element} Profile card for Daniele Masone.
 */
export function AvatarCard() {
    const {t} = useTranslation();
    const skills = t("avatar.skills", {returnObjects: true});

    return (
        <div
            className="w-full max-w-xs overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800 sm:max-w-sm">

            <div className="flex justify-center pt-6 sm:pt-8">
                <img
                    src={danielePhoto}
                    alt={siteIdentity.name}
                    className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-md dark:border-gray-800 sm:h-40 sm:w-40"
                />
            </div>

            <div className="mx-auto mt-4 max-w-2xl px-4 pb-5 text-center sm:px-6 md:px-8">
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-1">
                    {t("avatar.tagline")}
                </p>
                <ul
                    className="mb-2 flex flex-wrap justify-center gap-x-2 text-xs text-gray-500 dark:text-gray-400 sm:text-sm"
                    aria-label={t("avatar.skills_label")}
                >
                    {skills.map((skill) => (
                        <li
                            key={skill}
                            className="flex items-center after:ml-2 after:content-['•'] last:after:content-none"
                        >
                            {skill}
                        </li>
                    ))}
                </ul>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                    {t("avatar.bio")}
                </p>
            </div>
        </div>
    );
}
