import React from 'react';
import {render} from '@testing-library/react';
import {waitFor} from '@testing-library/dom';
import {SeoHead} from './SeoHead';
import {vi} from 'vitest';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => {
            const translations = {
                seo: {
                    home: {
                        title: 'Home | Daniele Masone',
                        description: 'Welcome to the portfolio of Daniele Masone, software engineer.'
                    },
                    projects: {
                        title: 'Projects | Daniele Masone',
                        description: 'Discover software projects and case studies by Daniele Masone.'
                    }
                }
            };
            const keys = key.split('.');
            let value = translations;
            for (const k of keys) {
                if (value && typeof value === 'object' && k in value) value = value[k];
                else return key;
            }
            return value;
        }
    })
}));

describe('<SeoHead />', () => {
    const renderSeo = (pageKey, path) => {
        return render(<SeoHead pageKey={pageKey} path={path}/>);
    };

    beforeEach(() => {
        document.head.innerHTML = '';
        document.title = '';
    });

    test('renders correct title and meta for "home"', async () => {
        renderSeo('home', '/');

        await waitFor(() => {
            expect(document.title).toBe('Home | Daniele Masone');
        });

        await waitFor(() => {
            const description = document.querySelector('meta[name="description"]');
            expect(description).toHaveAttribute(
                'content',
                'Welcome to the portfolio of Daniele Masone, software engineer.'
            );
        });

        await waitFor(() => {
            const canonical = document.querySelector('link[rel="canonical"]');
            expect(canonical).toHaveAttribute(
                'href',
                'https://danielemasone.github.io/ingdanielemasone/#/'
            );
        });
    });

    test('renders correct title and meta for "projects"', async () => {
        renderSeo('projects', '/projects');

        await waitFor(() => {
            expect(document.title).toBe('Projects | Daniele Masone');
        });

        await waitFor(() => {
            const description = document.querySelector('meta[name="description"]');
            expect(description).toHaveAttribute(
                'content',
                'Discover software projects and case studies by Daniele Masone.'
            );
        });

        await waitFor(() => {
            const canonical = document.querySelector('link[rel="canonical"]');
            expect(canonical).toHaveAttribute(
                'href',
                'https://danielemasone.github.io/ingdanielemasone/#/projects'
            );
        });
    });

    test('falls back to key name when translation is missing', async () => {
        renderSeo('unknown', '/unknown');

        await waitFor(() => {
            expect(document.title).toBe('seo.unknown.title');
        });

        await waitFor(() => {
            const description = document.querySelector('meta[name="description"]');
            expect(description).toHaveAttribute('content', 'seo.unknown.description');
        });
    });

    test('includes Open Graph and Twitter meta tags', async () => {
        renderSeo('home', '/');

        await waitFor(() => {
            expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute(
                'content',
                'Home | Daniele Masone'
            );
        });

        await waitFor(() => {
            expect(document.querySelector('meta[property="og:type"]')).toHaveAttribute(
                'content',
                'website'
            );
        });

        await waitFor(() => {
            expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute(
                'content',
                'https://danielemasone.github.io/ingdanielemasone/logo.png'
            );
        });

        await waitFor(() => {
            expect(document.querySelector('meta[name="twitter:card"]')).toHaveAttribute(
                'content',
                'summary_large_image'
            );
        });
    });
});
