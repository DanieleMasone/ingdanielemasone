import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import './i18n/i18n';
import i18n from "i18next";
import {I18nextProvider} from "react-i18next";
import {createHashRouter, RouterProvider} from 'react-router-dom';
import {HelmetProvider} from "react-helmet-async";

const router = createHashRouter([
    {
        path: '/*',
        element: <App/>
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <HelmetProvider>
                <RouterProvider router={router}/>
            </HelmetProvider>
        </I18nextProvider>
    </React.StrictMode>
);
