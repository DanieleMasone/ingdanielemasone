import {render, screen, within} from '@testing-library/react';
import Privacy from './Privacy';
import {MemoryRouter} from 'react-router-dom';
import {vi} from 'vitest';
import React from "react";

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => {
            const translations = {
                'privacy.title': 'Privacy Policy',
                'privacy.intro_title': 'Introduction',
                'privacy.intro_text1': 'Welcome to our privacy policy.',
                'privacy.intro_text2': 'Please read carefully.',
                'privacy.owner_title': 'Data Owner',
                'privacy.address': '123 Privacy St, Data City',
                'privacy.data_types_title': 'Types of Data Collected',
                'privacy.browsing_data': 'Browsing Data',
                'privacy.browsing_data_details': 'Data collected during website visits.',
                'privacy.voluntary_data': 'Voluntary Data',
                'privacy.voluntary_data_details': 'Data you provide voluntarily.',
                'privacy.purpose_title': 'Purposes of Processing',
                'privacy.purpose_1': 'To provide services',
                'privacy.purpose_2': 'To improve user experience',
                'privacy.purpose_3': 'To comply with legal obligations',
                'privacy.legal_basis_title': 'Legal Basis',
                'privacy.legal_1': 'Consent',
                'privacy.legal_2': 'Contract',
                'privacy.legal_3': 'Legal obligation',
                'privacy.recipients_title': 'Recipients of Data',
                'privacy.recipients_text': 'Data is shared with trusted partners.',
                'privacy.transfer_title': 'Data Transfer',
                'privacy.transfer_text': 'Data may be transferred internationally.',
                'privacy.retention_title': 'Data Retention',
                'privacy.retention_text': 'Data is kept as long as necessary.',
                'privacy.rights_title': 'Your Rights',
                'privacy.rights_1': 'Right to access',
                'privacy.rights_2': 'Right to rectification',
                'privacy.rights_3': 'Right to erasure',
                'privacy.rights_exercise': 'To exercise your rights, contact',
                'privacy.cookie_title': 'Cookies',
                'privacy.cookie_text': 'Our website uses cookies. See',
                'privacy.cookie_link': 'Cookie Policy',
                'privacy.changes_title': 'Changes to this policy',
                'privacy.changes_text': 'We may update this policy occasionally.',
                'privacy.last_updated': 'Last updated',
                'privacy.last_date_updated': 'June 2025',
            };
            return translations[key] || key;
        },
    }),
}));

describe('Privacy component', () => {
    beforeEach(() => {
        render(
            <MemoryRouter initialEntries={['/privacy']}>
                <Privacy/>
            </MemoryRouter>
        );
    });

    test('renders main heading and introduction', () => {
        expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Privacy Policy');
        expect(screen.getByRole('heading', {name: /Introduction/i})).toBeInTheDocument();
        expect(screen.getByText(/Welcome to our privacy policy./i)).toBeInTheDocument();
        expect(screen.getByText(/https:\/\/www.ingdanielemasone.com\//i)).toBeInTheDocument();
    });


    test('renders data owner section with address and email link', () => {
        const ownerHeading = screen.getByRole('heading', {name: /Data Owner/i});
        expect(ownerHeading).toBeInTheDocument();

        expect(
            screen.getByText((content, element) =>
                content.includes('123 Privacy St') && content.includes('Data City')
            )
        ).toBeInTheDocument();

        const ownerSection = ownerHeading.parentElement;
        expect(within(ownerSection).getByRole('link', {name: /masone.daniele@gmail.com/i})).toHaveAttribute(
            'href',
            'mailto:masone.daniele@gmail.com'
        );
    });

    test('renders lists of data types, purposes, legal basis, rights, and others', () => {
        // Check some list items from data types
        expect(screen.getByText(/Browsing Data/i)).toBeInTheDocument();
        expect(screen.getByText(/Voluntary Data/i)).toBeInTheDocument();

        // Check a purpose item
        expect(screen.getByText(/To provide services/i)).toBeInTheDocument();

        // Check legal basis item
        expect(screen.getByText(/Consent/i)).toBeInTheDocument();

        // Check rights
        expect(screen.getByText(/Right to access/i)).toBeInTheDocument();

        // Check cookie policy link
        expect(screen.getByRole('link', {name: /Cookie Policy/i})).toHaveAttribute('href', '/cookie-policy');

        // Check footer with last updated
        expect(screen.getByText(/Last updated/i)).toBeInTheDocument();
        expect(screen.getByText(/June 2025/i)).toBeInTheDocument();
    });
});
