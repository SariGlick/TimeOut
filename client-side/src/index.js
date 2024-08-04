import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './index.scss';
import OAuthProvider from '../src/components/Login/OAuthProvider'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <OAuthProvider>
      <App />
    </OAuthProvider>
  </React.StrictMode>
);
reportWebVitals();
