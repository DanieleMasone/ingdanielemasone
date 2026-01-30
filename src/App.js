import React from 'react';
import {Route, Routes} from 'react-router';
import './i18n/i18n';
import Home from './pages/home/Home';
import Experience from './pages/experience/Experience';
import Projects from './pages/projects/Projects';
import {Header} from './components/header/Header';
import {Footer} from './components/footer/Footer';
import Privacy from "./pages/privacy/Privacy";
import CookiePolicy from "./pages/cookiePolicy/CookiePolicy";
import Courses from "./pages/courses/Courses";
import Trading from "./pages/trading/Trading";
import Testimonials from "./pages/testimonials/Testimonials";
import {NotFound} from "./components/notFound/NotFound";
import {CookieBanner} from "./components/ui/cookieBanner/CookieBanner";
import Certifications from "./pages/certifications/Certifications";


/**
 * @file Entry point of the application.
 * @description This file initializes the React application and mounts it to the DOM.
 */
export default function App() {
    return (
        <div
            className="min-h-screen flex flex-col bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <Header/>
            <main className="flex-grow">
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
                    {/* Catch-all route for 404 errors */}
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </main>
            <Footer/>
            <CookieBanner/>
        </div>
    );
}
