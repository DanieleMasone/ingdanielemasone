import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {CookieBanner} from './CookieBanner';

describe('CookieBanner', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it('shows banner if no cookie consent in localStorage', async () => {
        render(<CookieBanner />);

        // Wait for useEffect to display the banner
        await waitFor(() => {
            expect(screen.getByText(/questo sito utilizza cookie/i)).toBeInTheDocument();
        });

        expect(screen.getByRole('button', { name: /accetta/i })).toBeInTheDocument();
    });

    it('does not show banner if cookie consent is set', () => {
        // Test with both timestamp and boolean value
        localStorage.setItem('cookieConsent', '2026-02-04T09:47:52.401Z');
        render(<CookieBanner />);

        expect(screen.queryByText(/questo sito utilizza cookie/i)).not.toBeInTheDocument();
    });

    it('accept button sets cookieConsent timestamp and hides banner', async () => {
        // Spy on PROTOTYPE Storage, not on localStorage directly
        const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

        render(<CookieBanner />);

        // Wait for the banner to be visible (useEffect)
        await waitFor(() => {
            expect(screen.getByRole('button', { name: /accetta/i })).toBeInTheDocument();
        });

        const button = screen.getByRole('button', { name: /accetta/i });
        fireEvent.click(button);

        // Verify that setItem was called with an ISO timestamp
        expect(setItemSpy).toHaveBeenCalledWith(
            'cookieConsent',
            expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
        );

        // Make sure the banner disappears
        expect(screen.queryByText(/questo sito utilizza cookie/i)).not.toBeInTheDocument();

        // Cleanup
        setItemSpy.mockRestore();
    });
});
