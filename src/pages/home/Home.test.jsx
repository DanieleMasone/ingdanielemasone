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
                home_subtitle: 'Senior Software Engineer, Front-End Architect, and Technical Team Leader.',
                home_description: 'I build frontend architectures and enterprise platforms.',
                home_cta_projects: 'View projects',
                home_cta_experience: 'Experience',
                home_metric_years_value: '10+',
                home_metric_years_label: 'years of experience',
                home_metric_projects_value: '20+',
                home_metric_projects_label: 'enterprise projects',
                home_metric_testimonials_value: '25+',
                home_metric_testimonials_label: 'testimonials',
                home_focus_label: 'Focus areas',
                home_focus_frontend: 'Front-end architecture',
                home_focus_enterprise: 'Enterprise & regulated domains',
                home_focus_training: 'Mentoring and training',
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
        expect(screen.getByText('Senior Software Engineer, Front-End Architect, and Technical Team Leader.')).toBeInTheDocument();
        expect(screen.getByText('I build frontend architectures and enterprise platforms.')).toBeInTheDocument();
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
        expect(screen.getByText('Front-end architecture')).toBeInTheDocument();
        expect(screen.getByText('Enterprise & regulated domains')).toBeInTheDocument();
        expect(screen.getByText('Mentoring and training')).toBeInTheDocument();
    });

    test('renders avatar section with AvatarCard', () => {
        const avatarSection = screen.getByTestId('page-grid');

        expect(avatarSection).toBeInTheDocument();
        expect(avatarSection).toContainElement(screen.getByTestId('avatar-card'));
    });

});
