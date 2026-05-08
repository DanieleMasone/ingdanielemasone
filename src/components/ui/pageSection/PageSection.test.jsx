import React from 'react';
import {render, screen} from '@testing-library/react';
import {PageSection} from './PageSection';

describe('PageSection', () => {
    it('renders the title correctly', () => {
        render(<PageSection title="Test Title">Content</PageSection>);
        const heading = screen.getByRole('heading', {level: 1});
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent('Test Title');
    });

    it('supports an explicit heading level for nested sections', () => {
        render(<PageSection title="Nested Title" headingLevel={2}>Content</PageSection>);
        expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('Nested Title');
    });

    it('renders the children content', () => {
        render(
            <PageSection title="Section Title">
                <p>Paragraph content inside the section.</p>
            </PageSection>
        );
        expect(screen.getByText('Paragraph content inside the section.')).toBeInTheDocument();
    });

    it('uses the correct semantic elements and classes', () => {
        const {container} = render(<PageSection title="Title">Content</PageSection>);
        const section = container.querySelector('section');
        const heading = container.querySelector('h1');

        expect(section).toBeInTheDocument();
        expect(section).toHaveAttribute('aria-labelledby', heading.id);
        expect(section).toHaveClass('px-4 sm:px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-6');
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveClass('text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white');
    });
});
