import React, {lazy, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import './i18n/i18n';
import {Header} from './components/header/Header';
import {Footer} from './components/footer/Footer';
import {NotFound} from './components/notFound/NotFound';
import {CookieBanner} from './components/ui/cookieBanner/CookieBanner';
import {Loading} from "@/components/loading/Loading";

const Home = lazy(() => import('./pages/home/Home'));
const Experience = lazy(() => import('./pages/experience/Experience'));
const Projects = lazy(() => import('./pages/projects/Projects'));
const Courses = lazy(() => import('./pages/courses/Courses'));
const Certifications = lazy(() => import('./pages/certifications/Certifications'));
const Trading = lazy(() => import('./pages/trading/Trading'));
const Testimonials = lazy(() => import('./pages/testimonials/Testimonials'));
const Privacy = lazy(() => import('./pages/privacy/Privacy'));
const CookiePolicy = lazy(() => import('./pages/cookiePolicy/CookiePolicy'));

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
