import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RouterProvider } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import { router } from './router/router.jsx';
import { selectAuth } from '../src/redux/auth/auth.selector.js';
import Footer from './stories/footer/FooterComponent';

import './App.scss';


function App() {
  const { user } = useSelector(selectAuth);
  const {i18n: localization } = useTranslation();
  
  useEffect(() => {
    if (user && user.preference && user.preference.language) {
      localization.changeLanguage(user.preference.language);
    }
  }, [user, localization]);

  return (
    <>
      <RouterProvider router={router} />
      <SnackbarProvider maxSnack={3}>
        <Footer />
      </SnackbarProvider>
    </>
  );
}
export default App;