import React from 'react';
import {render} from '@testing-library/react';
import {waitFor} from '@testing-library/dom';
import {SeoHead} from './SeoHead';
import {vi} from 'vitest';

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        i18n: {
            language: 'it',
            resolvedLanguage: 'it'
        },
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
                    },
                    githubProjects: {
                        title: 'GitHub Projects | Daniele Masone',
                        description: 'Inspect public GitHub repositories by Daniele Masone.'
                    },
                    privacy: {
                        title: 'Privacy Policy | Daniele Masone',
                        description: 'Privacy information for the portfolio.'
                    },
                    notFound: {
                        title: 'Page Not Found | Daniele Masone',
                        description: 'The requested portfolio page is not available.'
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
                'https://danielemasone.github.io/ingdanielemasone/'
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
                'https://danielemasone.github.io/ingdanielemasone/projects/'
            );
        });
    });

    test('renders correct canonical and robots for "githubProjects"', async () => {
        renderSeo('githubProjects', '/github-projects');

        await waitFor(() => {
            expect(document.title).toBe('GitHub Projects | Daniele Masone');
        });

        await waitFor(() => {
            expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
                'href',
                'https://danielemasone.github.io/ingdanielemasone/github-projects/'
            );
        });

        await waitFor(() => {
            expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
                'content',
                'index, follow'
            );
        });
    });

    test('removes static SEO fallback tags after route metadata is mounted', async () => {
        document.head.innerHTML = `
            <meta name="description" data-static-seo="true" content="Static home description">
            <link rel="canonical" data-static-seo="true" href="https://danielemasone.github.io/ingdanielemasone/">
            <meta property="og:url" data-static-seo="true" content="https://danielemasone.github.io/ingdanielemasone/">
        `;

        renderSeo('projects', '/projects');

        await waitFor(() => {
            expect(document.querySelectorAll('[data-static-seo="true"]')).toHaveLength(0);
        });

        expect(document.querySelectorAll('meta[name="description"]')).toHaveLength(1);
        expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
            'content',
            'Discover software projects and case studies by Daniele Masone.'
        );
        expect(document.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
        expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
            'href',
            'https://danielemasone.github.io/ingdanielemasone/projects/'
        );
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
                'https://danielemasone.github.io/ingdanielemasone/social-preview.png'
            );
        });

        await waitFor(() => {
            expect(document.querySelector('meta[property="og:image:type"]')).toHaveAttribute(
                'content',
                'image/png'
            );
        });

        await waitFor(() => {
            expect(document.querySelector('meta[property="og:image:width"]')).toHaveAttribute(
                'content',
                '1200'
            );
        });

        await waitFor(() => {
            expect(document.querySelector('meta[property="og:image:height"]')).toHaveAttribute(
                'content',
                '630'
            );
        });

        await waitFor(() => {
            expect(document.querySelector('meta[property="og:image:alt"]')).toHaveAttribute(
                'content',
                'Daniele Masone portfolio social preview'
            );
        });

        await waitFor(() => {
            expect(document.querySelector('meta[name="twitter:card"]')).toHaveAttribute(
                'content',
                'summary_large_image'
            );
        });
    });

    test('marks legal pages as noindex', async () => {
        renderSeo('privacy', '/privacy');

        await waitFor(() => {
            expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
                'content',
                'noindex, follow'
            );
        });
    });

    test('marks the configured fallback page as noindex', async () => {
        renderSeo('notFound', '/404');

        await waitFor(() => {
            expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
                'content',
                'noindex, follow'
            );
        });
    });

    test('includes structured data for the portfolio owner and page', async () => {
        renderSeo('projects', '/projects');

        await waitFor(() => {
            const structuredData = JSON.parse(
                document.querySelector('script[type="application/ld+json"]').textContent
            );
            expect(structuredData['@graph']).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        '@type': 'Person',
                        name: 'Daniele Masone'
                    }),
                    expect.objectContaining({
                        '@type': 'WebPage',
                        url: 'https://danielemasone.github.io/ingdanielemasone/projects/'
                    })
                ])
            );
        });
    });
});
