import React from 'react';
import App from './App.jsx';
import './index.css';
import './i18n/i18n';
import {MemoryRouter} from "react-router-dom";
import {render} from "@testing-library/react";

const renderWithRouter = (initialEntries = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <App />
        </MemoryRouter>
    );
};
