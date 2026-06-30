import * as icons from "simple-icons";
import {linkedinIcon} from "@/config/brandIcons";
import {siteIdentity} from "@/config/siteIdentity";

/**
 * Static social and external profile links displayed by the portfolio footer.
 *
 * @module mock/links
 */

/**
 * Public profile links rendered in the Footer.
 *
 * Each entry contains display metadata and an icon definition consumed by
 * BrandIcon.
 *
 * @type {Array<Object>}
 */
export const links = [
    {
        key: "linkedin",
        href: siteIdentity.profiles.linkedin,
        icon: linkedinIcon,
        color: "currentColor",
        label: "LinkedIn",
    },
    {
        key: "github",
        href: siteIdentity.profiles.github,
        icon: icons.siGithub,
        color: "currentColor",
        label: "GitHub",
        className: "text-[#181717] dark:text-gray-200",
    },
    {
        key: "udemy",
        href: siteIdentity.profiles.udemy,
        icon: icons.siUdemy,
        color: "currentColor",
        label: "Udemy",
    },
    {
        key: "x",
        href: siteIdentity.profiles.x,
        icon: icons.siX,
        color: "currentColor",
        label: "X",
        className: "text-black dark:text-white scale-[0.88]"
    },
    {
        key: "instagram",
        href: siteIdentity.profiles.instagram,
        icon: icons.siInstagram,
        color: "currentColor",
        label: "Instagram",
    },
    {
        key: "facebook",
        href: siteIdentity.profiles.facebook,
        icon: icons.siFacebook,
        color: "currentColor",
        label: "Facebook",
    }
];
