import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import './styles/reset.css';

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import { RecoilRoot } from 'recoil';

import Index from 'components/Search';
import Issues from 'components/Issue';
import NotFound from 'components/NotFound';
import Header from 'components/header';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <RecoilRoot>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Issues />} />
                <Route path="issues" element={<Issues />} />
                <Route path="search" element={<Index />} />
                <Route path={"*"} element={<NotFound />}/>
            </Routes>
        </BrowserRouter>
    </RecoilRoot>
);

reportWebVitals();