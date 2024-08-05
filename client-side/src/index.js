import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import './index.scss';
import OAuthProvider from '../src/components/Login/OAuthProvider'
import GoogleLogin from './components/Login/GoogleLogin';
import OTPInput from './components/Login/OTPInput';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <OAuthProvider>
 
<App></App>
    </OAuthProvider>
  </React.StrictMode>
);
reportWebVitals();
