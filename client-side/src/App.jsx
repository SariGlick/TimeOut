import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import Layout from './router/layout.jsx';

import { router } from './router/router.jsx';
import { selectAuth } from '../src/redux/auth/auth.selector.js';
import Footer from './stories/footer/FooterComponent';

import './App.scss';

function App() {
  const { user } = useSelector(selectAuth);
  const { i18n: localization } = useTranslation();

  useEffect(() => {
    if (user && user.preference && user.preference.language) {
      localization.changeLanguage(user.preference.language);
    }
  }, [user, localization]);
  return (
    <>
      <RouterProvider router={router} />
      <HashRouter>
        {/* <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<h1>home</h1>} />
            <Route path="home" element={<h1>home</h1>} />
            <Route path="profiles" element={<h1>ProfileList</h1>} />
            <Route path="reports" element={<h1>reports</h1>} />
            <Route path="statistics" element={<h1>statistics</h1>} />
            <Route path="*" element={<h1>home</h1>} />
          </Route>
        </Routes> */}
        <Footer />
      </HashRouter>
    </>
  );
}

export default App;


