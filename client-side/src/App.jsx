import React from 'react';
import './App.scss';
import Header from './stories/header/header'
import Footer from './stories/footer/FooterComponent'
import Settings from './components/settings/Settings.jsx';
import './App.scss';

function App() {
  const user ={
      "_id": "66a5fd6150b61e7a816f812f",
      "name": "shiraA",
      "email": "shiraA@gmail.com",
      "password": "$2b$10$jSG5cL/9PAci4quE61Tnte.Ub4ye0yYPvkIgf5o7oQZJSZ.3IumjG",
      "googleId": "hghgh677",
      "profileImage": "snow.jpeg",
      "visitsWebsites": [
        {
          "_id": "66a21c243652170a94fe421d",
          "websiteId": "669643fbce49127203270a75",
          "visitsTime": [
            {
              "visitDate": "2025-01-16T14:40:03.000Z",
              "activityTime": 45,
              "_id": "66a21c243652170a94fe421e"
            },
            {
              "visitDate": "2025-01-20T19:40:03.000Z",
              "activityTime": 78,
              "_id": "66a21c243652170a94fe421f"
            },
            {
              "visitDate": "2024-01-25T16:40:03.000Z",
              "activityTime": 86,
              "_id": "66a21c243652170a94fe4220"
            },
            {
              "visitDate": "2025-01-25T15:40:03.000Z",
              "activityTime": 78,
              "_id": "66a21c243652170a94fe4221"
            }
          ],
          "__v": 0
        },
        {
          "_id": "66a21c023652170a94fe4211",
          "websiteId": "669643fbce49127203270a75",
          "visitsTime": [
            {
              "visitDate": "2025-02-16T14:40:03.000Z",
              "activityTime": 45,
              "_id": "66a21c023652170a94fe4212"
            },
            {
              "visitDate": "2025-02-20T19:40:03.000Z",
              "activityTime": 55,
              "_id": "66a21c023652170a94fe4213"
            },
            {
              "visitDate": "2024-02-25T16:40:03.000Z",
              "activityTime": 86,
              "_id": "66a21c023652170a94fe4214"
            },
            {
              "visitDate": "2025-02-25T15:40:03.000Z",
              "activityTime": 56,
              "_id": "66a21c023652170a94fe4215"
            }
          ],
          "__v": 0
        },
        {
          "_id": "66a21be43652170a94fe4205",
          "websiteId": "669643fbce49127203270a75",
          "visitsTime": [
            {
              "visitDate": "2025-03-16T14:40:03.000Z",
              "activityTime": 45,
              "_id": "66a21be43652170a94fe4206"
            },
            {
              "visitDate": "2025-03-20T19:40:03.000Z",
              "activityTime": 55,
              "_id": "66a21be43652170a94fe4207"
            },
            {
              "visitDate": "2024-03-25T16:40:03.000Z",
              "activityTime": 86,
              "_id": "66a21be43652170a94fe4208"
            },
            {
              "visitDate": "2025-09-25T15:40:03.000Z",
              "activityTime": 56,
              "_id": "66a21be43652170a94fe4209"
            }
          ],
          "__v": 0
        }
      ],
      "profiles": [
        {
          "statusBlockedSites": {
            "enum": []
          },
          "_id": "66a5fc0650b61e7a816f810d",
          "profileName": "work",
          "listWebsites": [
            {
              "websiteId": "66a0e7f126926163ab807a54",
              "status": "block",
              "limitedTimes": [
                {
                  "start": "2025-09-25T15:40:03.000Z",
                  "end": "2025-09-25T15:40:03.000Z",
                  "_id": "66a5fc0650b61e7a816f810f"
                }
              ],
              "_id": "66a5fc0650b61e7a816f810e"
            },
            {
              "websiteId": "669d07c177f0de67ad260388",
              "status": "block",
              "limitedTimes": [
                {
                  "start": "2025-09-25T15:40:03.000Z",
                  "end": "2025-09-25T15:40:03.000Z",
                  "_id": "66a5fc0650b61e7a816f8111"
                }
              ],
              "_id": "66a5fc0650b61e7a816f8110"
            }
          ],
          "__v": 0
        }
      ],
      "preference": {
        "_id": "66953d2791606a13857abd26",
        "emailFrequency": "monthly",
        "sendNotificationTime": 10,
        "soundVoice": "× ×\u0095×ª×\u0099 ×\u009c×\u0099×\u0091×¨×\u009e×\u009f - ×\u0099×\u009d ×©×\u009c ×\u0093×\u009e×¢×\u0095×ª.mp3",
        "__v": 0,
        "language": "he"
      }
  }
   
  
  return (
    <div className="App">
      <Header/>
      <Settings currentUser={user}/>
      <Footer/>
    </div>
  );
}

export default App;
