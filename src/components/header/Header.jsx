import React, {useState} from 'react';
import {Link, useLocation} from 'react-router';
import {LanguageSwitcher} from '../ui/languageSwitcher/LanguageSwitcher';
import {DarkModeToggle} from '../ui/darkModeToggle/DarkModeToggle';
import {useTranslation} from 'react-i18next';
import {ChevronDown, Menu, X} from 'lucide-react';
import {Disclosure} from '@headlessui/react';

/**
 * Header component with navigation, language switcher, and dark mode toggle.
 * Supports desktop and mobile layouts with responsive menus.
 *
 * @component
 * @module components/header/Header
 * @returns {JSX.Element} The header element with navigation links and controls.
 */
export function Header() {
    const {t} = useTranslation();
    const {pathname} = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [portfolioOpen, setPortfolioOpen] = useState(false);

    const navMain = [
        {to: '/', label: t('home')},
    ];

    const navPortfolio = [
        {to: '/experience', label: t('experience')},
        {to: '/projects', label: t('projects')},
        {to: '/certifications', label: t('certifications')},
        {to: '/courses', label: t('courses')},
        {to: '/testimonials', label: t('testimonials')},
        {to: '/trading', label: t('trading')}
    ];

    return (
        <header className="bg-gray-200/70 dark:bg-gray-900 backdrop-blur-sm sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-6">
                    {navMain.map(item => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`transition font-medium hover:text-blue-600 dark:hover:text-blue-400 ${
                                pathname === item.to ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-900 dark:text-white'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}

                    {/* Portfolio Dropdown */}
                    <div className="relative group">
                        <button
                            onClick={() => setPortfolioOpen(!portfolioOpen)}
                            className={`flex items-center space-x-1 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition ${
                                portfolioOpen ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-900 dark:text-white'
                            }`}
                        >
                            <span>{t("portfolio")}</span>
                            <ChevronDown
                                className={`w-4 h-4 transition-transform ${portfolioOpen ? 'rotate-180' : ''}`}/>
                        </button>

                        {portfolioOpen && (
                            <div
                                className="absolute left-0 mt-2 w-52 bg-white dark:bg-gray-800 shadow-lg rounded-lg border dark:border-gray-700 z-50">
                                {navPortfolio.map(item => (
                                    <Link
                                        key={item.to}
                                        to={item.to}
                                        onClick={() => setPortfolioOpen(false)}
                                        className={`block px-4 py-2 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition ${
                                            pathname === item.to ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-900 dark:text-white'
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>

                {/* Language/DarkMode (Desktop) */}
                <div className="hidden md:flex items-center space-x-4">
                    <LanguageSwitcher/>
                    <DarkModeToggle/>
                </div>

                {/* Mobile menu toggle */}
                <button
                    className="md:hidden p-2 rounded focus:outline-none hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle mobile menu"
                >
                    {menuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div
                    data-testid="mobile-menu"
                    className="md:hidden px-4 pt-4 pb-6 bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 space-y-4">

                    {/* Top row: Home on left, Lang & Theme on right */}
                    <div className="flex justify-between items-center">
                        <Link
                            to="/"
                            onClick={() => setMenuOpen(false)}
                            className={`text-base font-medium transition ${
                                pathname === '/'
                                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                                    : 'text-gray-900 dark:text-white'
                            } hover:text-blue-600 dark:hover:text-blue-400`}
                        >
                            {t("home")}
                        </Link>

                        <div className="flex items-center space-x-4">
                            <LanguageSwitcher/>
                            <DarkModeToggle/>
                        </div>
                    </div>

                    {/* Nav items (escluso home) */}
                    <div className="space-y-2">
                        {navMain
                            .filter(item => item.to !== '/') // evitiamo doppio "home"
                            .map(item => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    onClick={() => setMenuOpen(false)}
                                    className={`block py-2 rounded text-base font-medium transition ${
                                        pathname === item.to
                                            ? 'text-blue-600 dark:text-blue-400 font-semibold'
                                            : 'text-gray-900 dark:text-white'
                                    } hover:bg-gray-200 dark:hover:bg-gray-700`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                    </div>

                    {/* Portfolio in basso a sinistra */}
                    <div className="pt-4">
                        <Disclosure>
                            {({open}) => (
                                <>
                                    <Disclosure.Button
                                        className="flex items-center justify-between w-full py-2 text-base font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                                        <span>{t("portfolio")}</span>
                                        <ChevronDown
                                            className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`}/>
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="pl-4 space-y-1">
                                        {navPortfolio.map(item => (
                                            <Link
                                                key={item.to}
                                                to={item.to}
                                                onClick={() => setMenuOpen(false)}
                                                className={`block py-1 text-sm font-normal transition ${
                                                    pathname === item.to
                                                        ? 'text-blue-600 dark:text-blue-400 font-semibold'
                                                        : 'text-gray-900 dark:text-white'
                                                } hover:text-blue-600 dark:hover:text-blue-400`}
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                </div>
            )}
        </header>
    );
}
