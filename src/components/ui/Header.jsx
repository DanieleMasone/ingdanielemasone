import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import DarkModeToggle from './DarkModeToggle';
import {useTranslation} from 'react-i18next';
import {ChevronDown, Menu, X} from 'lucide-react';
import {Disclosure} from '@headlessui/react';

export default function Header() {
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
        {to: '/courses', label: t('courses')},
        {to: '/testimonials', label: t('testimonials')},
        {to: '/trading', label: t('trading')}
    ];

    return (
        <header
            className="bg-gray-200/60 text-gray-900 sticky top-0 z-50 shadow-md backdrop-blur-sm dark:bg-gray-900 dark:text-white">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6 items-center">
                    {navMain.map(item => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`transition hover:text-blue-600 dark:hover:text-blue-400
                            ${pathname === item.to ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`}
                        >
                            {item.label}
                        </Link>
                    ))}

                    {/* Dropdown menu */}
                    <div className="relative group">
                        <button
                            onClick={() => setPortfolioOpen(!portfolioOpen)}
                            className={`flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition ${portfolioOpen ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`}
                        >
                            <span>{t("portfolio")}</span>
                            <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180"/>
                        </button>

                        {portfolioOpen && (
                            <div
                                className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 z-50">
                                {navPortfolio.map(item => (
                                    <Link
                                        key={item.to}
                                        to={item.to}
                                        className={`block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition
                                        ${pathname === item.to ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-900 dark:text-white'}`}
                                        onClick={() => setPortfolioOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>

                {/* Desktop Extras */}
                <div className="hidden md:flex items-center space-x-4">
                    <LanguageSwitcher/>
                    <DarkModeToggle/>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div
                    className="md:hidden px-4 pb-4 space-y-2 bg-gray-200 border-t border-gray-300 dark:bg-gray-800 dark:border-gray-700">
                    {navMain.map(item => (
                        <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => setMenuOpen(false)}
                            className={`block py-1 text-sm transition
                            hover:text-blue-600 dark:hover:text-blue-400
                            ${pathname === item.to ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-900 dark:text-white'}`}
                        >
                            {item.label}
                        </Link>
                    ))}

                    {/* Disclosure for Portfolio in mobile */}
                    <Disclosure>
                        {({open}) => (
                            <>
                                <Disclosure.Button
                                    className="flex items-center justify-between w-full text-left text-sm text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                                    <span>{t("portfolio")}</span>
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}/>
                                </Disclosure.Button>
                                <Disclosure.Panel className="pl-4 pt-2 space-y-1">
                                    {navPortfolio.map(item => (
                                        <Link
                                            key={item.to}
                                            to={item.to}
                                            onClick={() => setMenuOpen(false)}
                                            className={`block text-sm transition
                                            hover:text-blue-600 dark:hover:text-blue-400
                                            ${pathname === item.to ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-900 dark:text-white'}`}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>

                    <div className="flex items-center justify-between pt-3">
                        <LanguageSwitcher/>
                        <DarkModeToggle/>
                    </div>
                </div>
            )}
        </header>
    );
}
