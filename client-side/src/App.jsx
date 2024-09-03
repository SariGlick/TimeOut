import React, { useEffect } from 'react';
import './App.scss';
import { Provider } from 'react-redux';

import { HashRouter, Routes, Route } from 'react-router-dom';
import { store } from './redux/store.jsx';
import Footer from './stories/footer/FooterComponent'
import { useTranslation } from 'react-i18next';
import { SnackbarProvider } from 'notistack';
import { selectAuth } from './redux/auth/auth.selector';
import { useSelector } from 'react-redux';
import Layout from './router/layout.jsx';
import './App.scss';


function App() {
  

  const  { i18n } = useTranslation();
   const user = useSelector(selectAuth)
   useEffect(()=>{

    if(user.preference)
      i18n.changeLanguage(user.preference.language)
     
   },[])
  return (

    <SnackbarProvider maxSnack={3}>
    {/* // TODO insert the real routings */}
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<h1>home</h1>} />
            <Route path="home" element={<h1>home</h1>} />
            <Route path="profiles" element={<h1>ProfileList</h1>} />
            <Route path="reports" element={<h1>reports</h1>} />
            <Route path="statistics" element={<h1>statistics</h1>} />
            <Route path="*" element={<h1>home</h1>} />
          </Route>
        </Routes>
        <Footer />
      </HashRouter>
    </Provider>
   </SnackbarProvider>

  );
}

export default App;


