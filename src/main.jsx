import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router";
import App from './App.jsx'
import './index.css'

/**
 * Basename passed to React Router so clean routes work under the GitHub Pages
 * project path configured by Vite.
 *
 * @type {string}
 */
const routerBasename = import.meta.env.BASE_URL === "/"
    ? "/"
    : import.meta.env.BASE_URL.replace(/\/$/, "");

/**
 * Browser entry point for the portfolio SPA.
 *
 * Mounts the React application into `#root` and uses BrowserRouter with the
 * Vite base path. The build step creates static route entry files so GitHub
 * Pages can serve clean portfolio URLs without hash fragments.
 *
 * @module main
 */
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter basename={routerBasename}>
            <App />
        </BrowserRouter>
    </React.StrictMode>
)
