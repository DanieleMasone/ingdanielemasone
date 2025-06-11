import React from 'react';
import * as icons from 'simple-icons';

function BrandIcon({icon, color, className, size = 24}) {
    if (!icon || !icon.svg) return null;

    return (
        <svg
            role="img"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill={color}
            className={className}
            dangerouslySetInnerHTML={{__html: icon.svg}}
            xmlns="http://www.w3.org/2000/svg"
        />
    );
}

export default function Footer() {
    return (
        <footer className="bg-gray-200 text-gray-900 text-center py-6 dark:bg-gray-900 dark:text-gray-400">
            <div className="flex justify-center space-x-6 mb-4">
                <a
                    href="https://www.linkedin.com/in/daniele-masone"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                >
                    <BrandIcon
                        icon={{
                            svg: `<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.85-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554V9h3.414v1.561h.049c.477-.9 1.637-1.85 3.367-1.85 3.598 0 4.265 2.368 4.265 5.452v6.289zM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126zM6.814 20.452H3.861V9h2.953v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.723v20.549C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.272V1.723C24 .774 23.2 0 22.225 0z"/>`
                        }}
                        color="#0A66C2"
                        className="hover:opacity-80 transition"
                    />
                </a>
                <a
                    href="https://www.instagram.com/tuo_username"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                >
                    <BrandIcon
                        icon={icons.siInstagram}
                        color="#E4405F"
                        className="hover:opacity-80 transition"
                    />
                </a>
                <a
                    href="https://www.facebook.com/tuo_username"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                >
                    <BrandIcon
                        icon={icons.siFacebook}
                        color="#1877F2"
                        className="hover:opacity-80 transition"
                    />
                </a>
                <a
                    href="https://github.com/tuo_username"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                >
                    <BrandIcon
                        icon={icons.siGithub}
                        color="#181717"
                        className="hover:opacity-80 transition"
                    />
                </a>
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-400">© 2025 Daniele Masone. Tutti i diritti
                riservati.</p>
        </footer>
    );
}
