// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import App from '../../App';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// const outh=  process.env.REACT_APP_CLIENT_ID
// root.render(
//   <GoogleOAuthProvider clientId={outh}>
//   <React.StrictMode>
//   <App />
//   </React.StrictMode>
//   </GoogleOAuthProvider>
  
// );

// OAuthProvider.jsx
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = process.env.REACT_APP_CLIENT_ID;

const OAuthProvider = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      {/* {children} */}
    </GoogleOAuthProvider>
  );
};

export default OAuthProvider;
