import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import './styles/reset.css';

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import SearchForm from './components/searchForm';
import Issues from './components/Issues';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Issues />} />
                <Route path="issues" element={<Issues />} />
                <Route path="searchForm" element={<SearchForm />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();