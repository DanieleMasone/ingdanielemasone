import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import './i18n/i18n';
import i18n from "i18next";
import {I18nextProvider} from "react-i18next";
import {BrowserRouter} from 'react-router-dom';



i18n.init({
    interpolation: {escapeValue: false}
}).catch(error => {
    console.error('Failed to init i18n:', error);
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <BrowserRouter basename={'/ingdanielemasone'}>
                <App />
            </BrowserRouter>
        </I18nextProvider>
    </React.StrictMode>
);
