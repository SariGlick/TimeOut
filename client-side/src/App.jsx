import React from 'react';
import './App.scss';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import Setting from './components/settings/Settings.jsx';

import './App.scss';

function App() {

  //const {emailFrequency,sendNotificationTime,_id,soundVoice}= currentUser.preferences

 const user= {
  _id:'fdfdfd',
  "preferences": {
    "_id": "66953d2791606a13857abd26",
    "emailFrequency": "weekly",
    "sendNotificationTime": 56,
    "soundVoice": "× ×\u0095×ª×\u0099 ×\u009c×\u0099×\u0091×¨×\u009e×\u009f - ×\u0099×\u009d ×©×\u009c ×\u0093×\u009e×¢×\u0095×ª.mp3",
    "__v": 0
  }} 
  return (
    <div className="App">
      <Header/>
       <Setting currentUser={user}/>
      <Footer/>
    </div>
  );
}

export default App;
