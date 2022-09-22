import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/reset.css';
import Repos from './components/repositories';
import SearchForm from './components/searchForm';
import reportWebVitals from './reportWebVitals';

import {ApolloProvider} from "@apollo/client";
import apolloClient from "./apollo";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <ApolloProvider client={apolloClient}>
        <React.StrictMode>
            <SearchForm />
        </React.StrictMode>
    </ApolloProvider>
);

reportWebVitals();