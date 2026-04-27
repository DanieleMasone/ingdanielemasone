import React from 'react';
import App from './App.jsx';
import './index.css';
import './i18n/i18n';
import {MemoryRouter} from "react-router-dom";
import {render} from "@testing-library/react";

/**
 * Test rendering helper kept for local test utilities.
 *
 * Wraps App with MemoryRouter so route-specific tests can render the portfolio
 * without depending on the browser HashRouter used in production.
 *
 * @module index
 */
const renderWithRouter = (initialEntries = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <App />
        </MemoryRouter>
    );
};
