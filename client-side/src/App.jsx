import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import Settings from './components/settings/Settings.jsx';

function App() {
  const user ={
      "preference": {
        "_id": "66953d2791606a13857abd26",
        "emailFrequency": "monthly",
        "sendNotificationTime": 10,
        "soundVoice": "× ×\u0095×ª×\u0099 ×\u009c×\u0099×\u0091×¨×\u009e×\u009f - ×\u0099×\u009d ×©×\u009c ×\u0093×\u009e×¢×\u0095×ª.mp3",
        "__v": 0,
        "language": "he"
      }
  }
   
  
  return (

    <>
      {/* <RouterProvider router={router} /> */}
      <Provider store={store}>
      <Header/>
      <Settings currentUser={user}/>
        <Footer />
      </Provider>
    </>
  );
}
export default App;
