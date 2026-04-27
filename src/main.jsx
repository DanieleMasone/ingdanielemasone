import React from 'react'
import ReactDOM from 'react-dom/client'
import {HashRouter} from "react-router";
import App from './App.jsx'
import './index.css'

/**
 * Browser entry point for the portfolio SPA.
 *
 * Mounts the React application into `#root` and uses HashRouter so the site can
 * be hosted safely on GitHub Pages without server-side route rewrites.
 *
 * @module main
 */
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
    </React.StrictMode>
)
