import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.scss';


<<<<<<< HEAD
import  './i18n.js'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <React.Suspense fallback='loading'>
    <App />
    </React.Suspense>
=======
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
>>>>>>> 295121b620a2d268c1501cd8bf2cc33d3409df5f
  </React.StrictMode>
);
reportWebVitals();
