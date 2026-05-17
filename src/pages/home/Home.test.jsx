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
                'avatar.name': 'Daniele Masone',
                home_eyebrow: 'Portfolio and online CV',
                home_subtitle: 'Technical Architect, Senior Software Engineer, and Tech Trainer.',
                home_description: 'I design software solutions for enterprise and regulated domains.',
                home_cta_projects: 'View projects',
                home_cta_experience: 'Experience',
                home_metric_years_value: '10+',
                home_metric_years_label: 'years of experience',
                home_metric_projects_value: '20+',
                home_metric_projects_label: 'enterprise projects',
                home_metric_testimonials_value: '25+',
                home_metric_testimonials_label: 'testimonials',
                home_focus_label: 'Focus areas',
                home_focus_frontend: 'Front-end architecture & enterprise UI',
                home_focus_leadership: 'Technical architecture & team leadership',
                home_focus_enterprise: 'Financial, legacy & regulated domains',
                home_focus_accessibility: 'Code quality, accessibility & performance',
                home_focus_training: 'Tech training, mentoring & career support',
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
        expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Daniele Masone');
        expect(screen.getByText('Technical Architect, Senior Software Engineer, and Tech Trainer.')).toBeInTheDocument();
        expect(screen.getByText('I design software solutions for enterprise and regulated domains.')).toBeInTheDocument();
    });

    test('renders SeoHead component', () => {
        expect(screen.getByTestId('seo-head')).toBeInTheDocument();
    });

    test('renders AvatarCard component', () => {
        const avatar = screen.getByTestId('avatar-card');
        expect(avatar).toBeInTheDocument();
    });

    test('renders avatar section', () => {
        const avatarSection = screen.getByTestId('page-grid');

        expect(avatarSection).toBeInTheDocument();
        expect(avatarSection).toContainElement(screen.getByTestId('avatar-card'));
    });

    test('text section has responsive alignment classes', () => {
        const textSection = screen.getByTestId('home-copy');
        expect(textSection).toHaveClass('text-center');
        expect(textSection).toHaveClass('md:text-left');
    });

    test('avatar wrapper contains AvatarCard', () => {
        expect(screen.getByTestId('page-grid')).toContainElement(
            screen.getByTestId('avatar-card')
        );
    });

    test('renders LinkedIn button with correct text', () => {
        const linkedinButton = screen.getByRole('link', {name: /Follow on LinkedIn/i});
        expect(linkedinButton).toBeInTheDocument();
    });

    test('LinkedIn button has correct href and target attributes', () => {
        const linkedinButton = screen.getByRole('link', {name: /Follow on LinkedIn/i});
        expect(linkedinButton).toHaveAttribute(
            'href',
            'https://www.linkedin.com/in/ingdanielemasone/'
        );
        expect(linkedinButton).toHaveAttribute('target', '_blank');
        expect(linkedinButton).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('LinkedIn button has proper Tailwind classes', () => {
        const linkedinButton = screen.getByRole('link', {name: /Follow on LinkedIn/i});
        expect(linkedinButton).toHaveClass(
            'inline-flex', 'min-h-12', 'items-center', 'justify-center',
            'rounded-lg', 'bg-[#0A66C2]',
            'text-white', 'text-base', 'font-semibold'
        );
    });

    test('renders project and experience calls to action', () => {
        expect(screen.getByRole('link', {name: /View projects/i})).toHaveAttribute('href', '/projects');
        expect(screen.getByRole('link', {name: /Experience/i})).toHaveAttribute('href', '/experience');
    });

    test('renders portfolio metrics', () => {
        expect(screen.getByTestId('home-metrics')).toHaveTextContent('10+');
        expect(screen.getByTestId('home-metrics')).toHaveTextContent('20+');
        expect(screen.getByTestId('home-metrics')).toHaveTextContent('25+');
    });

    test('renders home eyebrow', () => {
        expect(screen.getByText('Portfolio and online CV')).toBeInTheDocument();
    });

    test('renders focus areas', () => {
        expect(screen.getByText('Front-end architecture & enterprise UI')).toBeInTheDocument();
        expect(screen.getByText('Technical architecture & team leadership')).toBeInTheDocument();
        expect(screen.getByText('Financial, legacy & regulated domains')).toBeInTheDocument();
        expect(screen.getByText('Code quality, accessibility & performance')).toBeInTheDocument();
        expect(screen.getByText('Tech training, mentoring & career support')).toBeInTheDocument();
    });

    test('renders focus areas as a mobile-friendly list without horizontal scrolling', () => {
        const focusList = screen.getByTestId('home-focus-list');
        expect(focusList).toHaveClass('grid', 'grid-cols-1', 'gap-2');
        expect(focusList).toHaveClass('md:flex', 'md:flex-wrap');
        expect(focusList).not.toHaveClass('overflow-x-auto');

        const focusItems = screen.getAllByRole('listitem');
        expect(focusItems).toHaveLength(5);
        focusItems.forEach((item) => {
            expect(item).toHaveClass('w-full', 'rounded-lg', 'text-sm', 'leading-snug');
            expect(item).toHaveClass('md:w-auto', 'md:rounded-full');

            const marker = item.querySelector('span[aria-hidden="true"]');
            expect(marker).toHaveClass('mt-[0.42em]', 'md:mt-0');
        });
    });

    test('renders avatar section with AvatarCard', () => {
        const avatarSection = screen.getByTestId('page-grid');

        expect(avatarSection).toBeInTheDocument();
        expect(avatarSection).toContainElement(screen.getByTestId('avatar-card'));
    });

});
