import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from './redux/auth/auth.selector.js';  
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import Footer from './stories/footer/FooterComponent'
import { useTranslation } from 'react-i18next';
import { SnackbarProvider } from 'notistack';
import './App.scss';


function App() {

  return (

    <>
     <RouterProvider router={router} />
      <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
        <Footer />
      </Provider>
    </SnackbarProvider>
    </>
  );
}
export default App;