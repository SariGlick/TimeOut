// <<<<<<< HEAD

// import React ,{useEffect}from 'react';
// import { Provider } from 'react-redux';
// import { HashRouter, Routes, Route ,RouterProvider } from 'react-router-dom';
// import { SnackbarProvider } from 'notistack';

// import { store } from './redux/store.jsx';
// import Layout from './router/layout.jsx';
// import { useTranslation } from 'react-i18next';
// import { selectAuth } from './redux/auth/auth.selector';
// import { useSelector } from 'react-redux';
// import {router} from './router/router.jsx'
// import Footer from './stories/footer/FooterComponent';
// =======
import React ,{useEffect} from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Footer from './stories/footer/FooterComponent';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import { SnackbarProvider } from 'notistack';
import { selectAuth } from './redux/auth/auth.selector';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import './App.scss';

function App() {
  

  const  { i18n } = useTranslation();
   const user = useSelector(selectAuth)
   useEffect(()=>{

    if(user.preference)
      i18n.changeLanguage(user.preference.language)
     
   },[])
  

  return (


    <>
      <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
        <RouterProvider router={router} />
        <Footer />
        </Provider>
    </SnackbarProvider>
    </>
  );
}
export default App;
