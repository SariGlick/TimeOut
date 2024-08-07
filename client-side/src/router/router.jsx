import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ProfileList from "../components/profileComponent.jsx";
import Settings from "../components/settings/Settings.jsx";
import Layout from "./layout.jsx";
const user = {
    "_id": "66940b051ccb2852370d5a17",
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com",
    "password": "securePassword123",
    "visitsWebsites": [],
    "profiles": [],
    "profileImage": "profile.jpg",
    "preference": {

        "_id": "66930c2e2aad987e24078e12",
        "emailFrequency": "weekly",
        "timeZone": "US/Central",
        "language": "he",
        "sendNotificationTime": 30,
        "soundVoice": "alertSound.mp3",
        "dateFormat": "DD-MM-YYYY",
        "displayBrowsingTimeLimit": true,
        "displayIncomeMessages": true
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