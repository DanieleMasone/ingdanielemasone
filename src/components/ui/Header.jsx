import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import DarkModeToggle from './DarkModeToggle';
import {useTranslation} from 'react-i18next';
import {Menu, X} from 'lucide-react';

export default function Header() {
    const {t} = useTranslation();
    const {pathname} = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const navItems = [
        {to: '/', label: t('home')},
        {to: '/experience', label: t('experience')},
        {to: '/projects', label: t('projects')},
        {to: '/courses', label: t('courses')}
    ];

    return (
        <header
            className="bg-gray-200/60 text-gray-900 sticky top-0 z-50 shadow-md backdrop-blur-sm
                       dark:bg-gray-900 dark:text-white"
        >
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Desktop menu */}
                <nav className="hidden md:flex space-x-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`transition
                hover:text-blue-600 dark:hover:text-blue-400
                ${pathname === item.to ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center space-x-4">
                    <LanguageSwitcher/>
                    <DarkModeToggle/>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                </button>
            </div>

            {/* Mobile dropdown */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2 bg-gray-200 border-t border-gray-300
          dark:bg-gray-800 dark:border-gray-700">
                    {navItems.map((item) => (
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
                    <div className="flex items-center justify-between pt-2">
                        <LanguageSwitcher/>
                        <DarkModeToggle/>
                    </div>
                </div>
            )}
        </header>
    );
}