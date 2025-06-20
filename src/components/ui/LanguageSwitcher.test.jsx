import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import LanguageSwitcher from './LanguageSwitcher';
import {I18nextProvider} from 'react-i18next';
import i18n from '../../i18n/i18n';

describe('LanguageSwitcher', () => {
    // Render helper to provide i18n context
    function renderWithI18n(ui) {
        return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>);
    }

    test('renders current language button with flag and code', () => {
        renderWithI18n(<LanguageSwitcher/>);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        // The default language in i18n setup, e.g. "en"
        expect(button).toHaveTextContent(/EN|IT/i);
        expect(button.querySelector('img')).toBeInTheDocument();
    });

    test('toggles language dropdown on button click', () => {
        renderWithI18n(<LanguageSwitcher/>);
        const button = screen.getByRole('button');

        // Dropdown initially hidden
        expect(screen.queryByText('English')).not.toBeInTheDocument();

        // Click to open dropdown
        fireEvent.click(button);
        expect(screen.getByText('English')).toBeInTheDocument();
        expect(screen.getByText('Italiano')).toBeInTheDocument();

        // Click again to close dropdown
        fireEvent.click(button);
        expect(screen.queryByText('English')).not.toBeInTheDocument();
    });

    test('changes language and closes dropdown when selecting a language', async () => {
        renderWithI18n(<LanguageSwitcher/>);
        const button = screen.getByRole('button');
        fireEvent.click(button);

        const italianOption = screen.getByText('Italiano');
        fireEvent.click(italianOption);

        await waitFor(() => {
            expect(i18n.language).toBe('it');
            // Dropdown must close
            expect(screen.queryByText('English')).not.toBeInTheDocument();
        });
    });
});
