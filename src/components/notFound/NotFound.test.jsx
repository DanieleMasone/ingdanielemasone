import {render, screen} from '@testing-library/react';
import {NotFound} from './NotFound';
import React from 'react';
import {vi} from 'vitest';

// Mock by react-i18next
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => {
            const translations = {
                notfound_title: 'Pagina non trovata',
                notfound_description: 'La pagina che stai cercando non esiste o è stata rimossa.',
                go_home: 'Torna alla Home',
            };
            return translations[key] || key;
        },
    }),
}));

describe('NotFound Component', () => {
    test('renders the NotFound component with translated content', () => {
        render(<NotFound/>);

        // Verify that the translated title is visible
        expect(screen.getByText(/Pagina non trovata/i)).toBeInTheDocument();

        // Make sure the description is visible
        expect(
            screen.getByText(/La pagina che stai cercando non esiste/i)
        ).toBeInTheDocument();

        // Make sure the return to home button is visible
        const link = screen.getByRole('link', {name: /Torna alla Home/i});
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/ingdanielemasone/');
    });

    test('applies fade-in class when component mounts', () => {
        const {container} = render(<NotFound/>);
        const animatedDiv = container.querySelector('div.transition-opacity');
        expect(animatedDiv.className).toMatch(/opacity-100/);
    });
});
