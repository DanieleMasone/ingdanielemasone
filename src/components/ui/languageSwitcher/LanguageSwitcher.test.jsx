import React from 'react';
import {fireEvent, render, screen, waitFor, waitForElementToBeRemoved, within} from '@testing-library/react';
import {LanguageSwitcher} from './LanguageSwitcher';
import {vi} from 'vitest';
import {useTranslation} from "react-i18next";

const mockI18n = {
    language: 'en',
    changeLanguage: vi.fn((lang) => {
        mockI18n.language = lang;
        return Promise.resolve();
    })
};

// Mock i18next completely (replaces I18nextProvider + i18n.changeLanguage)
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => {
            const translations = {
                'language_switcher.select_language': 'Select language',
                'language_switcher.options_label': 'Available languages',
                'language_switcher.current_language': 'Current language',
            };
            return translations[key] || key;
        },
        i18n: mockI18n
    }),
    initReactI18next: {type: '3rdParty', init: vi.fn()}
}));

describe('LanguageSwitcher', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        // Reset current language
        vi.mocked(useTranslation().i18n).language = 'en';
    });

    const openLanguageGroup = () => {
        fireEvent.click(screen.getByRole('button', {name: /select language/i}));
        return screen.getByRole('group', {name: /available languages/i});
    };

    test('renders current language button without remote flag images', () => {
        render(<LanguageSwitcher/>);
        const button = screen.getByRole('button', {name: /select language: english/i});
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(/EN/i);
        expect(button.querySelector('img')).not.toBeInTheDocument();
        expect(button.querySelector('svg')).toBeInTheDocument();
    });

    test('aria-expanded toggles correctly on button click', () => {
        render(<LanguageSwitcher/>);
        const toggleBtn = screen.getByRole('button', {name: /select language/i});

        expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
        expect(toggleBtn).not.toHaveAttribute('aria-haspopup');
        expect(toggleBtn).toHaveAttribute('aria-controls');

        fireEvent.click(toggleBtn);
        const languageGroup = screen.getByRole('group', {name: /available languages/i});
        expect(languageGroup).toHaveAttribute('id', toggleBtn.getAttribute('aria-controls'));
        expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');

        fireEvent.click(toggleBtn);
        expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
    });

    test('dropdown closes when clicking outside', async () => {
        render(
            <>
                <LanguageSwitcher/>
                <div data-testid="outside">Outside area</div>
            </>
        );

        openLanguageGroup();
        fireEvent.mouseDown(screen.getByTestId('outside'));

        await waitForElementToBeRemoved(() => screen.queryByRole('group', {name: /available languages/i}));
    });

    test('dropdown shows local language codes and native labels without images', () => {
        render(<LanguageSwitcher/>);

        const languageGroup = openLanguageGroup();

        const enOption = within(languageGroup).getByRole('button', {name: /english/i});
        const itOption = within(languageGroup).getByRole('button', {name: /italiano/i});
        const frOption = within(languageGroup).getByRole('button', {name: /fran/i});
        const deOption = within(languageGroup).getByRole('button', {name: /deutsch/i});
        const esOption = within(languageGroup).getByRole('button', {name: /espa/i});

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
        expect(languageGroup.querySelector('img')).not.toBeInTheDocument();
    });

    test('unsupported locale falls back to English display', () => {
        vi.mocked(useTranslation().i18n).language = 'pt-BR';

        render(<LanguageSwitcher/>);

        const button = screen.getByRole('button', {name: /select language: english/i});
        expect(button).toHaveTextContent(/EN/i);
    });

    test('changes language when selecting a different option', async () => {
        render(<LanguageSwitcher/>);

        const languageGroup = openLanguageGroup();
        const itOption = within(languageGroup).getByRole('button', {name: /italiano/i});
        fireEvent.click(itOption);

        await waitFor(() => {
            expect(mockI18n.changeLanguage).toHaveBeenCalledWith('it');
            expect(mockI18n.language).toBe('it');
        });

        // Check updated UI (if component uses i18n.language)
        const updatedBtn = screen.getByRole('button', {name: /select language/i});
        expect(updatedBtn).toHaveTextContent(/IT/i);
    });

    test('active language option is visually highlighted but still clickable', async () => {
        render(<LanguageSwitcher/>);

        const languageGroup = openLanguageGroup();
        const activeOption = await within(languageGroup).findByRole('button', {name: /english/i});

        expect(activeOption).not.toBeDisabled();
        expect(activeOption).toHaveAttribute('aria-pressed', 'true');
        expect(activeOption.className).toMatch(/bg-blue-100|dark:bg-blue-900/);
        expect(within(activeOption).getByText('Current language')).toHaveClass('sr-only');
    });

    test('inactive language options are clickable and not marked', () => {
        vi.mocked(useTranslation().i18n).language = 'it';
        render(<LanguageSwitcher/>);

        const languageGroup = openLanguageGroup();
        const enOption = within(languageGroup).getByRole('button', {name: /english/i});
        expect(enOption).not.toBeDisabled();
        expect(enOption).toHaveAttribute('aria-pressed', 'false');
    });

    test('closes dropdown when pressing Escape', async () => {
        render(<LanguageSwitcher/>);

        openLanguageGroup();
        fireEvent.keyDown(document, {key: 'Escape'});

        await waitForElementToBeRemoved(() => screen.queryByRole('group', {name: /available languages/i}));
        expect(screen.getByRole('button', {name: /select language/i})).toHaveAttribute('aria-expanded', 'false');
    });

    test('closes dropdown when clicking outside and cleans up event listener', async () => {
        const addSpy = vi.spyOn(document, 'addEventListener');
        const removeSpy = vi.spyOn(document, 'removeEventListener');

        const {unmount} = render(
            <>
                <LanguageSwitcher/>
                <div data-testid="outside">Outside</div>
            </>
        );

        openLanguageGroup();
        expect(addSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));

        fireEvent.mouseDown(screen.getByTestId('outside'));

        await waitForElementToBeRemoved(() => screen.queryByRole('group', {name: /available languages/i}));

        unmount();
        expect(removeSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));

        addSpy.mockRestore();
        removeSpy.mockRestore();
    });
});
