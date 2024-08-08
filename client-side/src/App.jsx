import React, { useEffect } from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import Footer from './stories/footer/FooterComponent'
import { useTranslation } from 'react-i18next';
import { SnackbarProvider } from 'notistack';
import { selectAuth } from './redux/auth/auth.selector';
import { useSelector } from 'react-redux';
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
      
      <RouterProvider router={router} />
        <Footer />
    </>
  );
}
export default App;
