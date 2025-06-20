import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import './i18n/i18n';
import i18n from "i18next";
import {I18nextProvider} from "react-i18next";
import {HashRouter} from 'react-router-dom';

i18n.init({
    interpolation: {escapeValue: false},
}).catch(error => {
    console.error('Failed to init i18n:', error);
});

/**
 * @file Entry point of the application.
 * @description This file initializes the React application and mounts it to the DOM.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <HashRouter>
                <App/>
            </HashRouter>
        </I18nextProvider>
    </React.StrictMode>
);
