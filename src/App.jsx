import React, {lazy, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import './i18n/i18n';
import {Header} from './components/header/Header';
import {Footer} from './components/footer/Footer';
import {NotFound} from './components/notFound/NotFound';
import {CookieBanner} from './components/ui/cookieBanner/CookieBanner';

const Home = lazy(() => import('./pages/home/Home'));
const Experience = lazy(() => import('./pages/experience/Experience'));
const Projects = lazy(() => import('./pages/projects/Projects'));
const Courses = lazy(() => import('./pages/courses/Courses'));
const Certifications = lazy(() => import('./pages/certifications/Certifications'));
const Trading = lazy(() => import('./pages/trading/Trading'));
const Testimonials = lazy(() => import('./pages/testimonials/Testimonials'));
const Privacy = lazy(() => import('./pages/privacy/Privacy'));
const CookiePolicy = lazy(() => import('./pages/cookiePolicy/CookiePolicy'));

const Loading = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
    </div>
);

/**
 * Modern App with React 19 + Vite 7 + Lazy Loading
 */
export default function App() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <Header />
            <main className="flex-grow">
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/experience" element={<Experience />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/certifications" element={<Certifications />} />
                        <Route path="/trading" element={<Trading />} />
                        <Route path="/testimonials" element={<Testimonials />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/cookie-policy" element={<CookiePolicy />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </main>
            <Footer />
            <CookieBanner />
        </div>
    );
}
