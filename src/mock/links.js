import * as icons from "simple-icons";


const linkedinIcon = {
    svg: `<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.85-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554V9h3.414v1.561h.049c.477-.9 1.637-1.85 3.367-1.85 3.598 0 4.265 2.368 4.265 5.452v6.289zM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126zM6.814 20.452H3.861V9h2.953v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.723v20.549C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.272V1.723C24 .774 23.2 0 22.225 0z"/>`,
};

export const links = [
    {
        key: "linkedin",
        href: "https://www.linkedin.com/in/ingdanielemasone/",
        icon: linkedinIcon,
        color: "#0A66C2",
        label: "LinkedIn",
    },
    {
        key: "instagram",
        href: "https://www.instagram.com/ing_daniele_masone/",
        icon: icons.siInstagram,
        color: "#E4405F",
        label: "Instagram",
    },
    {
        key: "facebook",
        href: "https://www.facebook.com/danieleMasone",
        icon: icons.siFacebook,
        color: "#1877F2",
        label: "Facebook",
    },
    {
        key: "github",
        href: "https://github.com/DanieleMasone",
        icon: icons.siGithub,
        color: "currentColor",
        label: "GitHub",
        className: "text-[#181717] dark:text-gray-200",
    },
    {
        key: "udemy",
        href: "https://www.udemy.com/user/daniele-masone/",
        icon: icons.siUdemy,
        color: "#EC5252",
        label: "Udemy",
    },
];
