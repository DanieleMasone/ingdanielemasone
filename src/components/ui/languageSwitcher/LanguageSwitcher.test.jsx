import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import LanguageSwitcher from './LanguageSwitcher';
import {I18nextProvider} from 'react-i18next';
import i18n from '../../../i18n/i18n';

describe('LanguageSwitcher', () => {
    function renderWithI18n(ui) {
        return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>);
    }

    beforeEach(async () => {
        await i18n.changeLanguage('en'); // wait for the language to be set
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
        const frOption = screen.getByRole('menuitem', {name: /français/i});
        const deOption = screen.getByRole('menuitem', {name: /deutsch/i});
        const esOption = screen.getByRole('menuitem', {name: /español/i});

        expect(enOption).toBeInTheDocument();
        expect(itOption).toBeInTheDocument();
        expect(frOption).toBeInTheDocument();
        expect(deOption).toBeInTheDocument();
        expect(esOption).toBeInTheDocument();

        // Check labels explicitly
        expect(screen.getByText('English')).toBeInTheDocument();
        expect(screen.getByText('Italiano')).toBeInTheDocument();
        expect(screen.getByText('Français')).toBeInTheDocument();
        expect(screen.getByText('Deutsch')).toBeInTheDocument();
        expect(screen.getByText('Español')).toBeInTheDocument();
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

    test('active language option is visually highlighted but still clickable', async () => {
        renderWithI18n(<LanguageSwitcher/>);
        const toggleBtn = screen.getByRole('button', {name: /seleziona lingua/i});
        fireEvent.click(toggleBtn);

        const activeOption = await screen.findByRole('menuitem', {name: /english/i});

        expect(activeOption).not.toBeDisabled();    // It's not disabled
        expect(activeOption.className).toMatch(/bg-blue-50|dark:bg-blue-900/);  // It's highlighted (specific classes)
    });

    test('inactive language options are clickable and not marked', () => {
        i18n.changeLanguage('it'); // Set active language to "it"
        renderWithI18n(<LanguageSwitcher/>);
        fireEvent.click(screen.getByRole('button', {name: /seleziona lingua/i}));

        const enOption = screen.getByRole('menuitem', {name: /english/i});
        expect(enOption).not.toBeDisabled();
        expect(enOption).not.toHaveAttribute('aria-current');
    });

    test('closes dropdown when clicking outside and cleans up event listener', () => {
        const addSpy = jest.spyOn(document, 'addEventListener');
        const removeSpy = jest.spyOn(document, 'removeEventListener');

        renderWithI18n(
            <>
                <LanguageSwitcher/>
                <div data-testid="outside">Outside</div>
            </>
        );

        const button = screen.getByRole('button', {name: /seleziona lingua/i});
        fireEvent.click(button);
        expect(addSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));

        fireEvent.mouseDown(screen.getByTestId('outside'));
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();

        // Unmount to trigger cleanup
        fireEvent.click(button); // reopen
        expect(screen.getByRole('menu')).toBeInTheDocument();
        addSpy.mockClear();
        removeSpy.mockClear();

        fireEvent.click(button); // close manually
        expect(removeSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    });
});
