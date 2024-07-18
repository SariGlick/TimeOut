import React from 'react';
import components from './stories/index'; // Import the default export from index.js
import './App.scss';

function App() {
  return (
    <div className="App">
      <components.Header />
      <components.Footer />
    </div>
  );
}

export default App;