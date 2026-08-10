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
                home_eyebrow: 'Portfolio and online CV',
                home_subtitle: 'Technical Architect, Senior Software Engineer, and Tech Trainer.',
                home_description: 'I design and modernize enterprise systems in regulated domains.',
                home_cta_github_projects: 'Explore GitHub projects',
                home_cta_experience: 'Experience',
                home_metric_years_value: '10+',
                home_metric_years_label: 'Years of experience',
                home_metric_github_value: '13',
                home_metric_github_label: 'Selected GitHub projects',
                home_metric_packages_value: '2',
                home_metric_packages_label: 'Public npm libraries',
                home_metric_courses_value: '15',
                home_metric_courses_label: 'Online programming courses',
                home_focus_label: 'Focus areas',
                home_focus_architecture: 'Enterprise architecture & regulated financial systems',
                home_focus_frontend: 'Front-end architecture & accessible enterprise UI',
                home_focus_modernization: 'Back-end integration & legacy modernization',
                home_focus_quality: 'Code quality, testing, documentation & CI/CD',
                home_focus_training: 'Technical training & public knowledge sharing',
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

    test('renders the professional identity and positioning', () => {
        expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Daniele Masone');
        expect(screen.getAllByText('Daniele Masone')).toHaveLength(1);
        expect(screen.getByText('Technical Architect, Senior Software Engineer, and Tech Trainer.')).toBeInTheDocument();
        expect(screen.getByText('I design and modernize enterprise systems in regulated domains.')).toBeInTheDocument();
    });

    test('renders SeoHead component', () => {
        expect(screen.getByTestId('seo-head')).toBeInTheDocument();
    });

    test('renders the profile card inside its visual region', () => {
        const avatarSection = screen.getByTestId('page-grid');

        expect(avatarSection).toBeInTheDocument();
        expect(avatarSection).toContainElement(screen.getByTestId('avatar-card'));
    });

    test('keeps the narrow-screen reading order focused on identity and actions', () => {
        const copy = screen.getByTestId('home-copy');
        const avatarSection = screen.getByTestId('page-grid');
        const metrics = screen.getByTestId('home-metrics');

        expect(copy.compareDocumentPosition(avatarSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        expect(avatarSection.compareDocumentPosition(metrics) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
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

    test('LinkedIn remains a supporting action rather than the primary CTA', () => {
        const linkedinButton = screen.getByRole('link', {name: /Follow on LinkedIn/i});
        expect(linkedinButton).toHaveClass('text-[#0A66C2]');
        expect(linkedinButton).not.toHaveClass('bg-[#0A66C2]');
    });

    test('prioritizes GitHub proof and keeps experience as the secondary path', () => {
        expect(screen.getByRole('link', {name: /Explore GitHub projects/i})).toHaveAttribute('href', '/github-projects/');
        expect(screen.getByRole('link', {name: /Experience/i})).toHaveAttribute('href', '/experience/');
    });

    test('renders portfolio metrics', () => {
        const metrics = screen.getByTestId('home-metrics');

        expect(metrics).toHaveTextContent('10+');
        expect(metrics).toHaveTextContent('13');
        expect(metrics).toHaveTextContent('2');
        expect(metrics).toHaveTextContent('15');
        expect(metrics).toHaveTextContent('Years of experience');
        expect(metrics).toHaveTextContent('Selected GitHub projects');
        expect(metrics).toHaveTextContent('Public npm libraries');
        expect(metrics).toHaveTextContent('Online programming courses');
    });

    test('renders home eyebrow', () => {
        expect(screen.getByText('Portfolio and online CV')).toBeInTheDocument();
    });

    test('renders focus areas', () => {
        expect(screen.getByText('Enterprise architecture & regulated financial systems')).toBeInTheDocument();
        expect(screen.getByText('Front-end architecture & accessible enterprise UI')).toBeInTheDocument();
        expect(screen.getByText('Back-end integration & legacy modernization')).toBeInTheDocument();
        expect(screen.getByText('Code quality, testing, documentation & CI/CD')).toBeInTheDocument();
        expect(screen.getByText('Technical training & public knowledge sharing')).toBeInTheDocument();
    });

    test('renders focus areas as a semantic list', () => {
        const focusList = screen.getByTestId('home-focus-list');
        expect(focusList).toHaveAttribute('aria-label', 'Focus areas');
        expect(screen.getAllByRole('listitem')).toHaveLength(5);
    });

});
