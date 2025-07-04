import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import LanguageSwitcher from './LanguageSwitcher';
import {I18nextProvider} from 'react-i18next';
import i18n from '../../i18n/i18n';

describe('LanguageSwitcher', () => {
    function renderWithI18n(ui) {
        return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>);
    }

    beforeEach(() => {
        i18n.changeLanguage('en'); // Reset to default language
    });

    test('renders current language button with flag and code', () => {
        renderWithI18n(<LanguageSwitcher/>);
        const button = screen.getByRole('button', {name: /seleziona lingua/i});
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(/EN/i);
        expect(button.querySelector('img')).toBeInTheDocument();
    });

    test('aria-expanded toggles correctly on button click', () => {
        renderWithI18n(<LanguageSwitcher/>);
        const toggleBtn = screen.getByRole('button', {name: /seleziona lingua/i});

        expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
        fireEvent.click(toggleBtn);
        expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
        fireEvent.click(toggleBtn);
        expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
    });

    test('dropdown closes when clicking outside', () => {
        renderWithI18n(
            <>
                <LanguageSwitcher/>
                <div data-testid="outside">Outside area</div>
            </>
        );

        const toggleBtn = screen.getByRole('button', {name: /seleziona lingua/i});

        fireEvent.click(toggleBtn);
        expect(screen.getByRole('menu')).toBeInTheDocument();

        fireEvent.mouseDown(screen.getByTestId('outside'));
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    test('dropdown shows language options with flags and labels', () => {
        renderWithI18n(<LanguageSwitcher/>);
        const toggleBtn = screen.getByRole('button', {name: /seleziona lingua/i});

        fireEvent.click(toggleBtn);

        const enOption = screen.getByRole('menuitem', {name: /english/i});
        const itOption = screen.getByRole('menuitem', {name: /italiano/i});

        expect(enOption).toBeInTheDocument();
        expect(itOption).toBeInTheDocument();

        // Check for the presence of complete labels
        expect(screen.getByText('English')).toBeInTheDocument();
        expect(screen.getByText('Italiano')).toBeInTheDocument();
    });

    test('changes language when selecting a different option', async () => {
        renderWithI18n(<LanguageSwitcher/>);
        const toggleBtn = screen.getByRole('button', {name: /seleziona lingua/i});

        fireEvent.click(toggleBtn);

        const itOption = screen.getByRole('menuitem', {name: /italiano/i});
        fireEvent.click(itOption);

        await waitFor(() => {
            expect(i18n.language).toBe('it');
        });

        // After changing language, it should show "IT"
        const updatedBtn = screen.getByRole('button', {name: /seleziona lingua/i});
        expect(updatedBtn).toHaveTextContent(/IT/i);
    });

    test('active language option is disabled and marked with aria-current', () => {
        renderWithI18n(<LanguageSwitcher/>);
        const toggleBtn = screen.getByRole('button', {name: /seleziona lingua/i});

        fireEvent.click(toggleBtn);

        const activeOption = screen.getByRole('menuitem', {name: /english/i});
        expect(activeOption).toBeDisabled();
        expect(activeOption).toHaveAttribute('aria-current', 'true');
    });

    test('inactive language options are clickable and not marked', () => {
        i18n.changeLanguage('it'); // Set active language to "it"
        renderWithI18n(<LanguageSwitcher/>);
        fireEvent.click(screen.getByRole('button', {name: /seleziona lingua/i}));

        const enOption = screen.getByRole('menuitem', {name: /english/i});
        expect(enOption).not.toBeDisabled();
        expect(enOption).not.toHaveAttribute('aria-current');
    });
});
