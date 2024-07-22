import React from 'react';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import './App.scss';
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
