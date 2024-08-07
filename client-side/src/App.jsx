import React, { useEffect } from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import Footer from './stories/footer/FooterComponent'
import { useTranslation } from 'react-i18next';
import { SnackbarProvider } from 'notistack';
import './App.scss';

const user = {
  "_id": "66940b051ccb2852370d5a17",
  "name": "Alice Johnson",
  "email": "alice.johnson@example.com",
  "password": "securePassword123",
  "visitsWebsites": [],
  "profiles": [],
  "profileImage": "profile.jpg",
  "preference": {

      "_id": "66930c2e2aad987e24078e12",
      "emailFrequency": "weekly",
      "timeZone": "US/Central",
      "language": "en",
      "sendNotificationTime": 30,
      "soundVoice": "alertSound.mp3",
      "dateFormat": "DD-MM-YYYY",
      "displayBrowsingTimeLimit": true,
      "displayIncomeMessages": true
  }
}

function App() {
  

  const  { i18n } = useTranslation();
  
   useEffect(()=>{
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
