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

  const  { i18n } = useTranslation();

   useEffect(()=>{
    const user={
      "preference": {
      "timeZone": "UTC",
      "dateFormat": "DD-MM-YYYY",
      "inboxMessages":'group by date',
      "messageDisplay":'title only',
      "messageDisplay":0,
      "displayIncomeMessages": false,
      "displayBrowsingTimeLimit": false,
      "_id": "66aa0b58ba3d93dba635d414",
      "emailFrequency": "weekly",
      "sendNotificationTime": 20,
      "soundVoice": "seatear.mp3",
      "__v": 0,
        "language": "es"
      }
    }


    i18n.changeLanguage(user.preference.language)

   },[])

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