import React from 'react';
import {ResponsiveAppBar,Footer} from './stories/index';
import './App.scss';

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Footer/>
    </div>
  );
}

export default App;