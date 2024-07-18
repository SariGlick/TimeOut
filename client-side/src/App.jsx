import React from 'react';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import './App.scss';
import RingtoneEditButton from './components/settings/editRingtone.jsx';

function App() {
  return (
    <div className="App">
      <Header/>
       <RingtoneEditButton/>
      <Footer/>
    </div>
  );
}

export default App;
