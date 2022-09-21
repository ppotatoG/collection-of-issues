import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.css';
import Repos from './components/repositories';
import App from './components/repositories';
import reportWebVitals from './reportWebVitals';

import {ApolloProvider} from "@apollo/client";
import apolloClient from "./apollo";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <ApolloProvider client={apolloClient}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </ApolloProvider>
);

reportWebVitals();