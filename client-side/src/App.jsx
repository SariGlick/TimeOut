import { Route, Routes } from 'react-router';
import LabTabs from './stories/tabs/tabs';
import Header from './stories/header/header';
import Footer from './stories/footer/FooterComponent';
import ProfileActivationTimer from './stories/ProfileActivationTimer'

import './App.scss';

function App() {

  const profileActivationTime = 1;

  return (
    <div className="App">
      <Header/> 

      <ProfileActivationTimer profileActivationTime={profileActivationTime} />

      <Footer/>
     

    </div>
  );
}

export default App;
