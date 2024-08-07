import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = process.env.REACT_APP_CLIENT_ID;

const OAuthProvider = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default OAuthProvider;
