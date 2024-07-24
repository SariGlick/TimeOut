import React from 'react';
import './App.scss';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import Setting from './components/settings/Settings.jsx';

function App() {


  
  return (
    <div className="App">
      <Header/>
       <Setting currentUser={{preferences:{_id:'fdfsd',emailFrequency:'never'}}}/>
      <Footer/>
    </div>
  );
}

export default App;
