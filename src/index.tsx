import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/reset.css';
import Repos from './components/repositories';
import SearchForm from './components/searchForm';
import Issues from './components/Issues';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <SearchForm />
    </React.StrictMode>
);

reportWebVitals();