import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Footer from './stories/footer/FooterComponent';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import { SnackbarProvider } from 'notistack';
import './App.scss';
import GoogleLogin from './components/Login/GoogleLogin.jsx';
import OAuthProvider from './components/Login/OAuthProvider.jsx';

function App() {
  return (
    <>
      <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
        <RouterProvider router={router} />
        <Footer />
      </Provider>
    </SnackbarProvider>
    <OAuthProvider>
<GoogleLogin></GoogleLogin>
</OAuthProvider> 


    </>
  );
}
export default App;
