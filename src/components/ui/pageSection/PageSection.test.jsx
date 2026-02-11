import React from 'react';
import {render, screen} from '@testing-library/react';
import {PageSection} from './PageSection';

describe('PageSection', () => {
    it('renders the title correctly', () => {
        render(<PageSection title="Test Title">Content</PageSection>);
        const heading = screen.getByRole('heading', {level: 2});
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent('Test Title');
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
        const heading = container.querySelector('h2');

        expect(section).toBeInTheDocument();
        expect(section).toHaveClass('px-4 sm:px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-6');
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveClass('text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white');
    });
});
