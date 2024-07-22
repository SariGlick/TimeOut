import React from 'react';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import './App.scss';

function App() {
  const user ={
    "visitsWebsites": [],
      "profiles": [],
        "_id": "669cf7185d41f78095882762",
          "name": "Gad",
            "profileImage": "jjkjklj.jpg"
  }
  return (
    <div className="App">
      <Footer />
    </div>
  );
}

export default App;
