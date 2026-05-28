import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {CookieBanner} from './CookieBanner';
import {MemoryRouter} from "react-router-dom";

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => ({
            "cookie_banner.label": "Cookie consent",
            "cookie_banner.message_prefix": "This site uses cookies to improve the user experience. By continuing, you accept our",
            "cookie_banner.privacy_link": "Privacy Policy",
            "cookie_banner.accept": "Accept",
        })[key] || key,
    }),
}));

const renderBanner = () => render(
    <MemoryRouter>
        <CookieBanner/>
    </MemoryRouter>
);

describe('CookieBanner', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it('shows banner if no cookie consent in localStorage', async () => {
        renderBanner();

        // Wait for useEffect to display the banner
        await waitFor(() => {
            expect(screen.getByText(/this site uses cookies/i)).toBeInTheDocument();
        });

        expect(screen.getByRole('button', {name: /accept/i})).toBeInTheDocument();
    });

    it('does not show banner if cookie consent is set', () => {
        // Test with both timestamp and boolean value
        localStorage.setItem('cookieConsent', '2026-02-04T09:47:52.401Z');
        renderBanner();

        expect(screen.queryByText(/this site uses cookies/i)).not.toBeInTheDocument();
    });

    it('accept button sets cookieConsent timestamp and hides banner', async () => {
        // Spy on PROTOTYPE Storage, not on localStorage directly
        const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

        renderBanner();

        // Wait for the banner to be visible (useEffect)
        await waitFor(() => {
            expect(screen.getByRole('button', {name: /accept/i})).toBeInTheDocument();
        });

        const button = screen.getByRole('button', {name: /accept/i});
        fireEvent.click(button);

        // Verify that setItem was called with an ISO timestamp
        expect(setItemSpy).toHaveBeenCalledWith(
            'cookieConsent',
            expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
        );

        // Make sure the banner disappears
        expect(screen.queryByText(/this site uses cookies/i)).not.toBeInTheDocument();

        // Cleanup
        setItemSpy.mockRestore();
    });

    it('renders the privacy policy link with correct href', async () => {
        renderBanner();

        await waitFor(() => {
            const link = screen.getByText(/Privacy Policy/i);
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute('href', '/privacy/');
        });
    });

    it('banner has proper ARIA attributes', async () => {
        renderBanner();

        await waitFor(() => {
            const banner = screen.getByRole('region', {name: /cookie consent/i});
            expect(banner).toHaveAttribute('aria-live', 'polite');
            expect(banner).toHaveAttribute('aria-label', 'Cookie consent');
        });
    });

    it('handles non-standard localStorage values gracefully', () => {
        localStorage.setItem('cookieConsent', 'not-a-timestamp');
        renderBanner();

        // The banner should still be hidden if the key exists
        expect(screen.queryByText(/this site uses cookies/i)).not.toBeInTheDocument();
    });

});
