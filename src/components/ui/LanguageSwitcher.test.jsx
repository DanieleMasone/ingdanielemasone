import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import LanguageSwitcher from './LanguageSwitcher';
import {I18nextProvider} from 'react-i18next';
import i18n from '../../i18n/i18n';

describe('LanguageSwitcher', () => {
    // Helper for rendering with i18n context
    function renderWithI18n(ui) {
        return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>);
    }

    test('renders current language button with flag and code', () => {
        renderWithI18n(<LanguageSwitcher/>);
        const button = screen.getByRole('button', {name: /seleziona lingua/i});
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(/EN|IT/i);
        expect(button.querySelector('img')).toBeInTheDocument();
    });

    test('opens dropdown on button click and shows language options', () => {
        renderWithI18n(<LanguageSwitcher/>);
        const toggleBtn = screen.getByRole('button', {name: /seleziona lingua/i});

        // Dropdown closed at the beginning
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();

        // Click to open dropdown
        fireEvent.click(toggleBtn);
        expect(screen.getByRole('menu')).toBeInTheDocument();

        const optionsText = screen.getAllByRole('menuitem').map(el => el.textContent);
        expect(optionsText).toEqual(expect.arrayContaining(["En", "Ita"]));
        expect(optionsText.length).toBe(2);
    });

    test('changes language when clicking on different language and closes dropdown', async () => {
        renderWithI18n(<LanguageSwitcher/>);
        const toggleBtn = screen.getByRole('button', {name: /seleziona lingua/i});

        // Open dropdown
        fireEvent.click(toggleBtn);

        // Calculate current language and alternate language in code
        const currentLang = i18n.language;
        const newLang = currentLang === 'en' ? 'it' : 'en';

        // Find button with alternative language, using text "En" or "Ita"
        const optionText = newLang === 'en' ? 'En' : 'Ita';
        const option = screen.getByText(optionText);
        fireEvent.click(option);

        // Wait for the language to actually change
        await waitFor(() => {
            expect(i18n.language).toBe(newLang);
        });

        // Dropdown must be closed
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();

        // Button now shows new language (uppercase)
        const btnAfter = screen.getByRole('button', {name: /seleziona lingua/i});
        expect(btnAfter).toHaveTextContent(newLang.toLowerCase());
    });

    test('dropdown closes when clicking outside', () => {
        renderWithI18n(
            <>
                <LanguageSwitcher/>
                <div data-testid="outside">Outside area</div>
            </>
        );
        const toggleBtn = screen.getByRole('button', {name: /seleziona lingua/i});

        // Open dropdown
        fireEvent.click(toggleBtn);
        expect(screen.getByRole('menu')).toBeInTheDocument();

        // Click out dropdown
        fireEvent.mouseDown(screen.getByTestId('outside'));
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    test('disables current language option and marks aria-current', () => {
        renderWithI18n(<LanguageSwitcher/>);
        const toggleBtn = screen.getByRole('button', {name: /seleziona lingua/i});

        fireEvent.click(toggleBtn);

        const options = screen.getAllByRole('menuitem');
        const currentOption = options.find(
            (btn) => btn.getAttribute('aria-current') === 'true'
        );

        expect(currentOption).toBeDefined();
        expect(currentOption).toBeDisabled();
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

});
