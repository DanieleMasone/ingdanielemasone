import {render, screen} from '@testing-library/react';
import Home from './Home';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {vi} from 'vitest';

// Mock i18n
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => {
            const translations = {
                about_title: 'About Me',
                about_intro: 'Hello, I am a software engineer.',
                about_experience: 'I have 10 years of experience in frontend development.',
            };
            return translations[key] || key;
        },
    }),
}));

// Mock AvatarCard
vi.mock('../../components/ui/avatarCard/AvatarCard', () => ({
    AvatarCard: () => <div data-testid="avatar-card">Avatar</div>,
}));

// Mock SeoHead to prevent Helmet manipulation
vi.mock('../../components/seoHead/SeoHead', () => ({
    SeoHead: ({ pageKey, path }) => <div data-testid="seo-head" />,
}));

// Mock image import if needed
vi.mock('../../assets/daniele.jpg', () => 'daniele.jpg');

describe('Home component', () => {
    beforeEach(() => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Home />
            </MemoryRouter>
        );
    });

    test('renders about title, intro and experience texts', () => {
        expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('About Me');
        expect(screen.getByText('Hello, I am a software engineer.')).toBeInTheDocument();
        expect(screen.getByText('I have 10 years of experience in frontend development.')).toBeInTheDocument();
    });

    test('renders exactly two avatars (mobile + desktop)', () => {
        const avatars = screen.getAllByTestId('avatar-card');
        expect(avatars.length).toBe(2);
        avatars.forEach((el) => expect(el).toBeInTheDocument());
    });

    test('mobile avatar container has md:hidden class', () => {
        const mobileAvatar = screen.getAllByTestId('avatar-card')[0];
        expect(mobileAvatar.parentElement).toHaveClass('md:hidden');
    });

    test('desktop avatar container has hidden md:flex classes', () => {
        const desktopAvatar = screen.getAllByTestId('avatar-card')[1];
        expect(desktopAvatar.parentElement).toHaveClass('hidden', 'md:flex');
    });

    test('renders SeoHead component', () => {
        expect(screen.getByTestId('seo-head')).toBeInTheDocument();
    });

    test("matches snapshot", () => {
        const {asFragment} = render(
            <MemoryRouter initialEntries={['/']}>
                <Home />
            </MemoryRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
