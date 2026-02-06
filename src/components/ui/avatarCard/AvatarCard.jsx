import React from "react";
import danielePhoto from '../../../assets/daniele.jpg';
import cover from '../../../assets/cover.png';
import {useTranslation} from "react-i18next";

/**
 * AvatarCard component
 *
 * Displays a personal avatar card with a branded cover, photo, name, tagline, skills, and a short bio.
 * Supports dark mode and responsive design for mobile and desktop.
 *
 * @component
 * @module components/ui/avatarCard/AvatarCard
 * @returns {JSX.Element} A card showing the avatar, name, and role of the user.
 */
export function AvatarCard() {
    const {t} = useTranslation();

    return (
        <section
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-xs sm:max-w-sm overflow-hidden">

            {/* Cover brand */}
            <div className="h-16 sm:h-20 w-full relative">
                <img
                    src={cover}
                    alt="Cover"
                    className="w-full h-full object-cover"
                />
                {/* Overlay only on the cover */}
                <div className="absolute inset-0 bg-black/20 z-0"></div>
            </div>

            {/* Avatar container above the cover */}
            <div className="flex justify-center -mt-2 sm:-mt-4 z-10 relative">
                <img
                    src={danielePhoto}
                    alt={t("avatar.name")}
                    className="rounded-full w-32 h-32 sm:w-40 sm:h-40 object-cover shadow-md border-4 border-white dark:border-gray-800 hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="mt-4 pb-4 relative z-10 px-4 sm:px-6 md:px-8 max-w-2xl mx-auto text-center">
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-1">
                    {t("avatar.tagline")}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-2">
                    {t("avatar.skills", {returnObjects: true}).join(" • ")}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                    {t("avatar.bio")}
                </p>
            </div>
        </section>
    );
}
