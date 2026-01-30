import {fireEvent, render, screen} from '@testing-library/react';
import {CookieBanner} from './CookieBanner';

describe('CookieBanner', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('shows banner if no cookie consent in localStorage', () => {
        render(<CookieBanner/>);
        expect(
            screen.getByText((content) => content.includes('Questo sito utilizza cookie'))
        ).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /accetta/i})).toBeInTheDocument();
    });

    test('does not show banner if cookie consent is set', () => {
        localStorage.setItem('cookieConsent', 'true');
        render(<CookieBanner/>);
        expect(screen.queryByText(/this site uses cookies/i)).not.toBeInTheDocument();
    });

    test('accept button sets cookieConsent and hides banner', () => {
        render(<CookieBanner/>);
        const button = screen.getByRole('button', {name: /accetta/i});
        fireEvent.click(button);

        expect(localStorage.getItem('cookieConsent')).toBe('true');
        expect(screen.queryByText(/questo sito utilizza cookie/i)).not.toBeInTheDocument();
    });
});
