
import React ,{useEffect} from 'react';
import { Provider ,useSelector} from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { selectAuth } from './redux/auth/auth.selector';
import { useTranslation } from 'react-i18next';
import SignUp from './components/signUp/signUp.jsx';
import Footer from './stories/footer/FooterComponent';
import { store } from './redux/store.jsx';
import {router} from './router/router.jsx'
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
