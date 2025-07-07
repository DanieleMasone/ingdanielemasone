import {render, screen} from '@testing-library/react';
import App from './App';
import {MemoryRouter} from 'react-router';
import {HelmetProvider} from "react-helmet-async";

jest.mock('react-chartjs-2', () => ({
    Chart: () => null,
    Line: () => null,
    Bar: () => null,
    Pie: () => null,
    Doughnut: () => null,
}));


const renderWithRouter = (initialEntries = ['/']) => {
    return render(
        <HelmetProvider>
            <MemoryRouter initialEntries={initialEntries}>
                <App/>
            </MemoryRouter>
        </HelmetProvider>
    );
};

describe("App.js", () => {
    test("renders Header component", () => {
        renderWithRouter(['/']);
        // Assuming Header renders some recognizable element like a nav or heading
        expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    test("renders Footer component", () => {
        renderWithRouter(['/']);
        // Assuming Footer has role contentinfo or text
        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    test("renders CookieBanner component", () => {
        renderWithRouter(['/']);
        // Assuming CookieBanner shows some cookie consent text or button
        expect(screen.getByText(/cookie/i)).toBeInTheDocument();
    });

    // Page route tests
    test('renders Home page by default', () => {
        renderWithRouter(['/']);
        expect(screen.getByRole('heading', {name: /Introducing myself/i, level: 2})).toBeInTheDocument();
    });

    test('renders Experience page', () => {
        renderWithRouter(['/experience']);
        expect(screen.getByRole('heading', {name: /Experience/i, level: 2})).toBeInTheDocument();
    });

    test('renders Projects page', () => {
        renderWithRouter(['/projects']);
        expect(screen.getByRole('heading', {name: /Projects/i, level: 2})).toBeInTheDocument();
    });

    test('renders Courses page', () => {
        renderWithRouter(['/courses']);
        expect(screen.getByRole('heading', {name: /My Online Courses/i, level: 2})).toBeInTheDocument();
    });

    test('renders Trading page', () => {
        renderWithRouter(['/trading']);
        expect(screen.getByRole('heading', {name: /My Trading Activity/i, level: 2})).toBeInTheDocument();
    });

    test('renders Testimonials page', () => {
        renderWithRouter(['/testimonials']);
        expect(screen.getByRole('heading', {name: /Testimonials/i, level: 2})).toBeInTheDocument();
    });

    test('renders Privacy Policy page', () => {
        renderWithRouter(['/privacy']);
        expect(screen.getByRole('heading', {name: /Privacy Policy/i, level: 1})).toBeInTheDocument();
    });

    test('renders Cookie Policy page', () => {
        renderWithRouter(['/cookie-policy']);
        expect(screen.getByRole('heading', {name: /Cookie Policy/i, level: 1})).toBeInTheDocument();
    });

});
