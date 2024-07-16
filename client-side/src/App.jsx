import React from 'react';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import ManageNotifications from './components/settings/manageNotifications/ManageNotifications.jsx';
import './App.scss';
import RingtoneEditButton from './components/editRingtone.jsx';

function App() {
  return (
    <div className="App">
      <Header/>
      
      <ManageNotifications></ManageNotifications>
      <Footer/>
    </div>
  );
}

export default App;
