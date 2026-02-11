import React from 'react';
import {fireEvent, render, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
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
                'select_language': 'seleziona lingua',
                'english': 'English',
                'italiano': 'Italiano',
                'français': 'Français',
                'deutsch': 'Deutsch',
                'español': 'Español'
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

    test('renders current language button with flag and code', () => {
        render(<LanguageSwitcher/>);
        const button = screen.getByRole('button', {name: /seleziona lingua/i});
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(/EN/i);
        expect(button.querySelector('img')).toBeInTheDocument();
    });

    test('aria-expanded toggles correctly on button click', () => {
        render(<LanguageSwitcher/>);
        const toggleBtn = screen.getByRole('button', {name: /seleziona lingua/i});

        expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
        fireEvent.click(toggleBtn);
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

        const toggleBtn = screen.getByRole('button', {name: /seleziona lingua/i});

        fireEvent.click(toggleBtn);
        expect(screen.getByRole('menu')).toBeInTheDocument();

        fireEvent.mouseDown(screen.getByTestId('outside'));

        await waitForElementToBeRemoved(() => screen.queryByRole('menu'));
    });

    test('dropdown shows language options with flags and labels', () => {
        render(<LanguageSwitcher/>);
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
        render(<LanguageSwitcher/>);
        const toggleBtn = screen.getByRole('button', {name: /seleziona lingua/i});
        fireEvent.click(toggleBtn);

        const itOption = screen.getByRole('menuitem', {name: /italiano/i});
        fireEvent.click(itOption);

        await waitFor(() => {
            expect(mockI18n.changeLanguage).toHaveBeenCalledWith('it');
            expect(mockI18n.language).toBe('it');
        });

        // Check updated UI (if component uses i18n.language)
        const updatedBtn = screen.getByRole('button', {name: /seleziona lingua/i});
        expect(updatedBtn).toHaveTextContent(/IT/i);
    });

    test('active language option is visually highlighted but still clickable', async () => {
        render(<LanguageSwitcher/>);
        const toggleBtn = screen.getByRole('button', {name: /seleziona lingua/i});
        fireEvent.click(toggleBtn);

        const activeOption = await screen.findByRole('menuitem', {name: /english/i});

        expect(activeOption).not.toBeDisabled();    // It's not disabled
        expect(activeOption.className).toMatch(/bg-blue-50|dark:bg-blue-900/);  // It's highlighted (specific classes)
    });

    test('inactive language options are clickable and not marked', () => {
        vi.mocked(useTranslation().i18n).language = 'it'; // Set active language to "it"
        render(<LanguageSwitcher/>);
        fireEvent.click(screen.getByRole('button', {name: /seleziona lingua/i}));

        const enOption = screen.getByRole('menuitem', {name: /english/i});
        expect(enOption).not.toBeDisabled();
        expect(enOption).not.toHaveAttribute('aria-current');
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

        const button = screen.getByRole('button', {name: /seleziona lingua/i});

        fireEvent.click(button);
        expect(addSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));

        fireEvent.mouseDown(screen.getByTestId('outside'));

        await waitForElementToBeRemoved(() => screen.queryByRole('menu'));

        unmount();
        expect(removeSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));

        addSpy.mockRestore();
        removeSpy.mockRestore();
    });
});
