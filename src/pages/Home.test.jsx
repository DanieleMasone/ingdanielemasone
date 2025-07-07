import {render, screen} from '@testing-library/react';
import Home from './Home';
import {HelmetProvider} from "react-helmet-async";
import React from "react";

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => {
            const translations = {
                about_title: 'About Me',
                about_intro: 'Hello, I am a software engineer.',
                about_experience: 'I have 10 years of experience in frontend development.',
                showMore: 'Show more',
                showLess: 'Show less',
            };
            return translations[key] || key;
        },
    }),
}));

describe('Home component', () => {
    beforeEach(() => {
        render(
            <HelmetProvider>
                <Home/>
            </HelmetProvider>
        );
    });

    test('renders about title, intro and experience texts', () => {
        expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('About Me');
        expect(screen.getByText('Hello, I am a software engineer.')).toBeInTheDocument();
        expect(screen.getByText('I have 10 years of experience in frontend development.')).toBeInTheDocument();
    });

    test('renders exactly two images with alt text "Daniele Masone" for desktop and mobile', () => {
        const images = screen.getAllByAltText('Daniele Masone');
        expect(images.length).toBe(2);
        images.forEach(img => expect(img).toBeInTheDocument());
    });

    test('mobile avatar container is visible only on small screens (has md:hidden class)', () => {
        const images = screen.getAllByAltText('Daniele Masone');

        // Find the image whose parent has the class md:hidden
        const mobileImage = images.find(img => img.closest('div.md\\:hidden'));

        expect(mobileImage).toBeDefined();

        const mobileAvatarContainer = mobileImage.closest('div.order-2');
        expect(mobileAvatarContainer).toHaveClass('md:hidden');
    });

    test('desktop avatar container is visible only on medium+ screens (has hidden md:flex classes)', () => {
        const images = screen.getAllByAltText('Daniele Masone');

        // Find the image whose parent has the class md:flex
        const desktopImage = images.find(img => img.closest('div.md\\:flex'));

        expect(desktopImage).toBeDefined();

        const desktopAvatarContainer = desktopImage.closest('div.order-2');
        expect(desktopAvatarContainer).toHaveClass('hidden', 'md:flex');
    });

    test('desktop avatar container is hidden on small screens (has hidden md:flex classes)', () => {
        // Take all the pictures
        const images = screen.getAllByAltText('Daniele Masone');

        // Find the one inside the desktop container (has class md:flex)
        const desktopImage = images.find(img => img.closest('div.md\\:flex'));

        expect(desktopImage).toBeDefined();

        const desktopAvatarContainer = desktopImage.closest('div.order-2');
        expect(desktopAvatarContainer).toHaveClass('hidden', 'md:flex');
    });

    test('title is above avatar and description on mobile', () => {
        const title = screen.getByRole('heading', {level: 2});
        const images = screen.getAllByAltText('Daniele Masone');

        // Find mobile avatar image (container has md:hidden)
        const mobileImage = images.find(img => img.closest('div.md\\:hidden'));
        const intro = screen.getByText('Hello, I am a software engineer.');

        expect(title).toBeInTheDocument();
        expect(mobileImage).toBeInTheDocument();
        expect(intro).toBeInTheDocument();

        // Now I only check DOM order classes because you can't test the real layout:
        // // title order-1
        expect(title).toHaveClass('order-1');

        // avatar container order-2 (get mobileImage container)
        const mobileAvatarContainer = mobileImage.closest('div.order-2');
        expect(mobileAvatarContainer).toHaveClass('md:hidden', 'order-2');

        // intro order-3
        expect(intro).toHaveClass('order-3');
    });

});
