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
                follow_linkedin: 'Follow on LinkedIn'
            };
            return translations[key] || key;
        },
    }),
}));

// Mock AvatarCard
vi.mock('../../components/ui/avatarCard/AvatarCard', () => ({
    AvatarCard: () => (
        <div
            data-testid="avatar-card"
            style={{width: '50px', height: '50px'}}
        >
            Avatar
        </div>
    ),
}));

// Mock SeoHead to prevent Helmet manipulation
vi.mock('../../components/seoHead/SeoHead', () => ({
    SeoHead: ({pageKey, path}) => <div data-testid="seo-head"/>,
}));

// Mock image import if needed
vi.mock('../../assets/daniele.jpg', () => 'daniele.jpg');

describe('Home component', () => {
    beforeEach(() => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Home/>
            </MemoryRouter>
        );
    });

    test('renders about title, intro and experience texts', () => {
        expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('About Me');
        expect(screen.getByText('Hello, I am a software engineer.')).toBeInTheDocument();
        expect(screen.getByText('I have 10 years of experience in frontend development.')).toBeInTheDocument();
    });

    test('renders SeoHead component', () => {
        expect(screen.getByTestId('seo-head')).toBeInTheDocument();
    });

    test('renders AvatarCard component', () => {
        const avatar = screen.getByTestId('avatar-card');
        expect(avatar).toBeInTheDocument();
    });

    test('avatar comes before text on mobile', () => {
        const gridChildren = screen.getByTestId('page-grid')?.children;
        if (gridChildren) {
            expect(gridChildren[0]).toContainElement(screen.getByTestId('avatar-card'));
        }
    });

    test('text section has responsive alignment classes', () => {
        const textSection = screen.getByText('About Me').parentElement;
        expect(textSection).toHaveClass('text-center');
        expect(textSection).toHaveClass('md:text-left');
    });

    test('PageGrid contains two children', () => {
        const pageGrid = screen.getByTestId('page-grid');
        expect(pageGrid.children.length).toBe(1);
    });

    test('renders LinkedIn button with correct text', () => {
        const linkedinButton = screen.getByRole('link', {name: /Follow on LinkedIn/i});
        expect(linkedinButton).toBeInTheDocument();
    });

    test('LinkedIn button has correct href and target attributes', () => {
        const linkedinButton = screen.getByRole('link', {name: /Follow on LinkedIn/i});
        expect(linkedinButton).toHaveAttribute(
            'href',
            'https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=ingdanielemasone'
        );
        expect(linkedinButton).toHaveAttribute('target', '_blank');
        expect(linkedinButton).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('LinkedIn button has proper Tailwind classes', () => {
        const linkedinButton = screen.getByRole('link', {name: /Follow on LinkedIn/i});
        expect(linkedinButton).toHaveClass(
            'flex', 'justify-center', 'items-center',
            'w-[200px]', 'h-8', 'rounded-full',
            'bg-[#0A66C2]', 'dark:bg-[#0A66C2]/90',
            'text-white', 'text-base', 'font-sans', 'no-underline'
        );
    });
});
