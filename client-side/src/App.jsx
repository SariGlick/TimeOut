import React from 'react';
import './App.scss';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import Settings from './components/settings/Settings.jsx';
import './App.scss';

function App() {
  const user ={
    preference:{
       "_id": "6694e5010d8e4ee0aab3d15f",
    "emailFrequency": "never",
    "sendNotificationTime": 40,
    "soundVoice": "06×\u009c×\u009b×\u0094 ×\u0093×\u0095×\u0093×\u0099.mp3"
    }
  }
   
  
  return (
    <div className="App">
      <Header/>
      <Settings currentUser={user}/>
      <Footer/>
    </div>
  );
}

export default App;
