import React from 'react';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import Settings from './components/settings/manageNotifications/Settings'
import './App.scss';
import ProfileImageEditButton from './components/settings/editUserProfile/ProfileImageEdit.jsx'

function App() {
  return (
    <div className="App">
      <Header/>
      {/* <Settings></Settings> */}
      <ProfileImageEditButton/>
      <Footer/>
    </div>
  );
}

export default App;
