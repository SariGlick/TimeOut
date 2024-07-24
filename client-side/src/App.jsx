import React from 'react';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import './App.scss';

function App() {

  //const {emailFrequency,sendNotificationTime,_id,soundVoice}= currentUser.preferences

  
  return (
    <div className="App">
      <Header/>
      <Footer/>
    </div>
  );
}

export default App;
