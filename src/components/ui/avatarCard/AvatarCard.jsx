import React from "react";
import danielePhoto from '../../../assets/daniele.jpg';
import {useTranslation} from "react-i18next";

/**
 * AvatarCard component
 *
 * Displays the user's avatar with name and role.
 *
 * @component
 * @module components/ui/avatarCard/AvatarCard
 * @returns {JSX.Element} A card showing the avatar, name, and role of the user.
 */
export function AvatarCard() {
    const {t} = useTranslation();

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6 w-full max-w-xs sm:max-w-sm">
            <img
                src={danielePhoto}
                alt={t("avatar.name")}
                className="rounded-full w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-4 sm:mb-6 object-cover shadow-md hover:scale-105 transition-transform duration-300"
            />
            <h3 className="text-lg sm:text-xl font-semibold text-center text-gray-900 dark:text-white mb-1 sm:mb-2">
                {t("avatar.name")}
            </h3>
            <p className="text-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                {t("avatar.role")}
            </p>
        </div>
    );
}