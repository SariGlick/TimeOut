import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root'));
const outh=  process.env.REACT_APP_CLIENT_ID
root.render(
  <GoogleOAuthProvider clientId={outh}>
  <React.StrictMode>
  </React.StrictMode>
  <App />
  </GoogleOAuthProvider>
  
);