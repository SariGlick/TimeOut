import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ProfileList from "../components/profileComponent.jsx";
import Settings from "../components/settings/Settings.jsx";
import Layout from "./layout.jsx";
  const user ={
    _id:'66b0bebd6069279e60d06cc4',
    "preference": {
    "timeZone": "UTC",
    "dateFormat": "DD-MM-YYYY",
    "displayIncomeMessages": false,
    "displayBrowsingTimeLimit": false,
    "_id": "66953d2791606a13857abd26",
    "emailFrequency": "weekly",
    "sendNotificationTime": 20,
    "soundVoice": "alertSound.mp3",
    "__v": 0,
    "language": "en"
  }
  }

export const router = createBrowserRouter([
 
    {
        path: '',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <h1>home</h1>
            },
            {
                path: '/home',
                element: <h1>home</h1>
            },
            {
                path: '/profiles',
                element: <ProfileList />
            },
            {
                path: '/settings',
                element: <Settings user={user}/>
            }
        ]
    },
    
])
