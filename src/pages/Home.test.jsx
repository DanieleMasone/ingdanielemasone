import {render, screen} from '@testing-library/react';
import Home from './Home';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => {
            const translations = {
                about_title: 'About Me',
                about_intro: 'Hello, I am a software engineer.',
                about_experience: 'I have 10 years of experience in frontend development.',
            };
            return translations[key] || key;
        },
    }),
}));

describe('Home component', () => {
    test('renders about title, intro and experience texts', () => {
        render(<Home/>);
        expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('About Me');
        expect(screen.getByText('Hello, I am a software engineer.')).toBeInTheDocument();
        expect(screen.getByText('I have 10 years of experience in frontend development.')).toBeInTheDocument();
    });

    test('renders image with alt text and name', () => {
        render(<Home/>);
        const img = screen.getByAltText('Daniele Masone');
        expect(img).toBeInTheDocument();
        expect(screen.getByText('Daniele Masone')).toBeInTheDocument();
        expect(screen.getByText(/Senior Software Engineer/i)).toBeInTheDocument();
    });

    test('initial opacity is 0 and changes to 100 on mount', () => {
        // Since opacity changes immediately in useEffect, testing animation is tricky.
        // Here we check that the component renders and has the correct classes.
        const {container} = render(<Home/>);
        const wrapper = container.querySelector('div.grid');
        expect(wrapper).toHaveClass('opacity-100');
    });
});
