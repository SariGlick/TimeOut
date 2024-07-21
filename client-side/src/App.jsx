import React from 'react';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import './App.scss';
import Setting from './components/settings/Settings.jsx';

function App() {


  const currentUser={
    
    "_id": "66965a8c564fb1e231e9a724",
    "name": "shira",
    "email": "sh3000444@gmail.com",
    "password": "$2b$10$Am.U1AyLaloaPqkmmLljfukcJy0v6Zg2P1Du2lERWj7hl9I4dPvou",
    "googleId": "hghgh677",
    "profileImage": "×¡×\u0095×¡.jpg",
    "visitsWebsites": [
      {
        "_id": "669643fbce49127203270a75",
        "websiteId": "668cf5bfc208464f57155d29",
        "visitsTime": [
          {
            "visitDate": "2024-07-16T09:18:24.000Z",
            "activityTime": 34,
            "_id": "669643fbce49127203270a76"
          }
        ],
        "__v": 0
      }
    ],
    "profiles": [
      {
        "_id": "669625682d5d32a4e340398d",
        "profileName": "personal",
        "blockedSites": [
          "668cf5bfc208464f57155d29"
        ],
        "limitedWebsites": [
          {
            "websiteId": "668cf5bfc208464f57155d29",
            "status": "block",
            "limitedTimes": [
              {
                "start": "2023-07-12T15:00:00.000Z",
                "end": "2023-07-12T15:00:00.000Z",
                "_id": "669625682d5d32a4e340398f"
              }
            ],
            "_id": "669625682d5d32a4e340398e"
          }
        ],
        "__v": 0
      }
    ],
    "preferences": {
      "_id": "66953d2791606a13857abd26",
      "emailFrequency": "weekly",
      "sendNotificationTime": 56,
      "soundVoice": "× ×\u0095×ª×\u0099 ×\u009c×\u0099×\u0091×¨×\u009e×\u009f - ×\u0099×\u009d ×©×\u009c ×\u0093×\u009e×¢×\u0095×ª.mp3",
      "__v": 0
    }
 
  };
  return (
    <div className="App">
      <Header/>
       <Setting   currentUser={currentUser}/>
      <Footer/>
    </div>
  );
}

export default App;
