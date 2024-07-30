import React from 'react';
import './App.scss';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import Settings from './components/settings/Settings.jsx';
import VerticalTabss from './stories/verticalTabs/verticalTabss.jsx';
import './App.scss';

function App() {
  const user ={"preference": {
    "_id": "66953d2791606a13857abd26",
    "emailFrequency": "weekly",
    "sendNotificationTime": 20,
    "soundVoice": "seatear.mp3",
    "__v": 0,
    "language": "en"
  }}
    const elements =[
      <p>Acount</p>,
      <p>Notification</p>,
      <Settings currentUser={user}/>,
      <p>Display Setting</p>,
      <p>Message</p>,
            <p>Message</p>,


    ]
  
  return (
    <div className="App">
      <Header/>
      <VerticalTabss className='fdfd' labels={['Acount','Notification','Preference','Display Setting','Message']} elements={elements} />
      <Footer/>
    </div>
  );
}

export default App;
