import React from 'react';
import {ResponsiveAppBar,Footer, ScrollButton, DateInputs} from './stories/index';
import './App.scss';

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Footer />
      <ScrollButton/>
    </div>
  );
}

export default App;