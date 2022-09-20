import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.css';
import Repos from './components/repositories';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Repos />
  </React.StrictMode>
);

reportWebVitals();