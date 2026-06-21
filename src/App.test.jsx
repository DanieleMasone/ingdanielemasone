import {render, screen} from '@testing-library/react';
import App from './App';
import {MemoryRouter} from 'react-router-dom';
import {vi} from 'vitest';

vi.mock('@/components/header/Header', () => ({
    Header: ({children}) => (
        <header data-testid="header" role="banner">
            {children || 'Header Mock'}
        </header>
    )
}));

// Mock Footer and lazy pages
vi.mock('@/components/footer/Footer', () => ({
    Footer: () => <footer data-testid="footer" role="contentinfo">Footer</footer>
}));

vi.mock('@/components/loading/Loading', () => ({
    Loading: () => <div data-testid="loading">Loading</div>
}));

vi.mock('./pages/home/Home', () => ({
    default: () => <div data-testid="home"><h1>About Me</h1></div>
}));

vi.mock('./pages/experience/Experience', () => ({
    default: () => <div data-testid="experience"><h1>Experience</h1></div>
}));

vi.mock('./pages/projects/Projects', () => ({
    default: () => <div data-testid="projects"><h1>Projects</h1></div>
}));

vi.mock('./pages/githubProjects/GithubProjects', () => ({
    default: () => <div data-testid="github-projects"><h1>GitHub Projects</h1></div>
}));

vi.mock('./pages/courses/Courses', () => ({
    default: () => <div data-testid="courses"><h1>My Online Courses</h1></div>
}));

vi.mock('./pages/certifications/Certifications', () => ({
    default: () => <div data-testid="certifications"><h1>Certifications</h1></div>
}));

vi.mock('./pages/trading/Trading', () => ({
    default: () => <div data-testid="trading"><h1>My Trading Activity</h1></div>
}));

vi.mock('./pages/testimonials/Testimonials', () => ({
    default: () => <div data-testid="testimonials"><h1>Testimonials</h1></div>
}));

vi.mock('./pages/privacy/Privacy', () => ({
    default: () => <div data-testid="privacy"><h1>Privacy Policy</h1></div>
}));

vi.mock('./pages/cookiePolicy/CookiePolicy', () => ({
    default: () => <div data-testid="cookie-policy"><h1>Cookie Policy</h1></div>
}));

vi.mock('./components/notFound/NotFound', () => ({
    NotFound: () => <div data-testid="not-found">Not Found</div>
}));

vi.mock('react-chartjs-2', () => ({
    Chart: () => null,
    Line: () => null,
    Bar: () => null,
    Pie: () => null,
    Doughnut: () => null,
}));

const renderWithRouter = (initialEntries = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <App/>
        </MemoryRouter>
    );
};

describe('App.jsx', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    // Core layout (Header and Footer)
    test('renders core layout components', async () => {
        renderWithRouter(['/']);

        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
        expect(screen.getByRole('contentinfo')).toBeInTheDocument();

        await screen.findByTestId('home');
    });

    // Main routes
    test('renders Home page by default', async () => {
        renderWithRouter(['/']);

        expect(await screen.findByTestId('home')).toBeInTheDocument();
    });

    test('renders portfolio routes', async () => {
        const routes = ['/experience', '/projects', '/github-projects', '/courses', '/certifications'];

        for (const route of routes) {
            const {unmount} = renderWithRouter([route]);

            expect(await screen.findByTestId(route.slice(1))).toBeInTheDocument();
            expect(screen.getByRole('banner')).toBeInTheDocument();

            unmount();
        }
    });

    test('renders advanced routes', async () => {
        const routes = ['/trading', '/testimonials', '/privacy', '/cookie-policy'];

        for (const route of routes) {
            const {unmount} = renderWithRouter([route]);

            expect(await screen.findByTestId(route.slice(1))).toBeInTheDocument();

            unmount();
        }
    });

    // 404 test
    test('renders NotFound for unknown routes', async () => {
        renderWithRouter(['/nonexistent']);

        expect(await screen.findByTestId('not-found')).toBeInTheDocument();
    });
});
