import React from 'react';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import Settings from './components/settings/Settings';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <Settings></Settings>
      <Footer />
    </div>
  );
}

export default App;
