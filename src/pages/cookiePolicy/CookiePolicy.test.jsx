import React from 'react';
import {render, screen} from '@testing-library/react';
import CookiePolicy from './CookiePolicy';
import {MemoryRouter} from 'react-router-dom';
import {vi} from 'vitest';

// Mock of react-i18next with t() returning fixed texts
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => {
            const translations = {
                'cookie.title': 'Cookie Policy',
                'cookie.what_title': 'What cookies are',
                'cookie.types_title': 'Types of cookies',
                'cookie.consent_title': 'Consent',
                'cookie.manage_title': 'Manage cookies',
                'cookie.rights_title': 'Your rights',
                'cookie.technical_title': 'Technical cookies',
                'cookie.technical_text': 'Technical cookie description',
                'cookie.analytics_title': 'Analytics cookies',
                'cookie.analytics_text': 'Analytics cookie description',
                'cookie.profiling_title': 'Profiling cookies',
                'cookie.profiling_text': 'Profiling cookie description',
                'cookie.consent_text': 'Consent text here',
                'cookie.manage_text': 'Manage cookies instructions',
                'cookie.rights_text': 'Your rights description',
                'cookie.contact_text': 'Contact us at',
                'cookie.last_updated': 'Last updated',
                'privacy.last_date_updated': 'June 2025',
            };
            return translations[key] || key;
        },
    }),
}));

describe('CookiePolicy component', () => {
    beforeEach(() => {
        render(
            <MemoryRouter initialEntries={['/cookiePolicy']}>
                <CookiePolicy/>
            </MemoryRouter>
        );
    });

    test('renders all major section headings', () => {
        const headings = [
            /what cookies are/i,
            /types of cookies/i,
            /consent/i,
            /manage cookies/i,
            /your rights/i,
        ];
        headings.forEach((headingRegex) => {
            expect(screen.getByRole('heading', {name: headingRegex})).toBeInTheDocument();
        });
    });

    test('renders contact email link', () => {
        const emailLink = screen.getByRole('link', {name: /masone.daniele@gmail.com/i});
        expect(emailLink).toHaveAttribute('href', 'mailto:masone.daniele@gmail.com');
    });

    test('renders last updated footer text', () => {
        const footer = screen.getByRole('contentinfo'); // semantic footer role
        expect(footer.textContent.toLowerCase()).toContain('last updated');
        expect(footer.textContent.toLowerCase()).toContain('june 2025');
    });

});
