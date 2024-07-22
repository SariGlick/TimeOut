import React from 'react';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import DateTimePicker from './components/report';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header/> 
      <Footer/>
      <DateTimePicker/>
    </div>
  );
}

export default App;
