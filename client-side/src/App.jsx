import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Footer from './stories/footer/FooterComponent';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import { SnackbarProvider } from 'notistack';
import './App.scss';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = "1074410346984-b9bsnokpb84s4afiim9t9d797k6orsvk.apps.googleusercontent.com";

function App() {

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <SnackbarProvider maxSnack={3}>
        <Provider store={store}>
          <RouterProvider router={router} />
          <Footer />
        </Provider>
      </SnackbarProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
