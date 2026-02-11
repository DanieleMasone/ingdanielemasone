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

export const Loading = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div
            className="w-12 h-12 border-4 border-t-blue-500 border-gray-300 dark:border-gray-700 rounded-full animate-spin"/>
    </div>
);

export const ErrorState = ({message = "Something went wrong", onRetry}) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
        <div className="text-center">
            <div className="text-5xl mb-4">⚠️</div>

            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Error
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
                {message}
            </p>

            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700
                               text-white font-medium transition-colors
                               focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Retry
                </button>
            )}
        </div>
    </div>
);

/**
 * Modern App with React 19 + Vite 7 + Lazy Loading
 */
export default function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <main className="flex-grow overflow-auto">
                <Suspense fallback={<Loading/>}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/experience" element={<Experience/>}/>
                        <Route path="/projects" element={<Projects/>}/>
                        <Route path="/courses" element={<Courses/>}/>
                        <Route path="/certifications" element={<Certifications/>}/>
                        <Route path="/trading" element={<Trading/>}/>
                        <Route path="/testimonials" element={<Testimonials/>}/>
                        <Route path="/privacy" element={<Privacy/>}/>
                        <Route path="/cookie-policy" element={<CookiePolicy/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </Suspense>
            </main>
            <Footer/>
            <CookieBanner/>
        </div>
    );
}
