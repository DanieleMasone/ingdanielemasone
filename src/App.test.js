import {render, screen} from '@testing-library/react';
import App from './App';
import {MemoryRouter} from 'react-router-dom';

const renderWithRouter = (initialEntries = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <App/>
        </MemoryRouter>
    );
};

describe("App.js", () => {
    test('renders Home page by default', () => {
        renderWithRouter(['/']);
        expect(screen.getByRole('heading', {name: 'Introducing myself', level: 2})).toBeInTheDocument();
    });

    test('renders Experience page', () => {
        renderWithRouter(['/experience']);
        expect(screen.getByRole('heading', {name: 'Experience', level: 2})).toBeInTheDocument();
    });

    test('renders Projects page', () => {
        renderWithRouter(['/projects']);
        expect(screen.getByRole('heading', {name: 'Projects', level: 2})).toBeInTheDocument();
    });

    test('renders Courses page', () => {
        renderWithRouter(['/courses']);
        expect(screen.getByRole('heading', {name: 'My Online Courses', level: 2})).toBeInTheDocument();
    });

    test('renders Trading page', () => {
        renderWithRouter(['/trading']);
        expect(screen.getByRole('heading', {name: 'My Trading Activity', level: 2})).toBeInTheDocument();
    });

    test('renders Testimonials page', () => {
        renderWithRouter(['/testimonials']);
        expect(screen.getByRole('heading', {name: 'Testimonials', level: 2})).toBeInTheDocument();
    });

    test('renders Privacy Policy page', () => {
        renderWithRouter(['/privacy']);
        expect(screen.getByRole('heading', {name: 'Privacy Policy', level: 1})).toBeInTheDocument();
    });

    test('renders Cookie Policy page', () => {
        renderWithRouter(['/cookie-policy']);
        expect(screen.getByRole('heading', {name: 'Cookie Policy', level: 1})).toBeInTheDocument();
    });
});
