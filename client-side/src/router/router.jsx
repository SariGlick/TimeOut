import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ProfileList from "../components/profileComponent.jsx";
import Settings from "../components/settings/Settings.jsx";
import Layout from "./layout.jsx";

// const user = {
//     "_id": "66ab55c006621cb2275dd0e5",
//     "name": "John Doe",
//     "email": "john.doe@example.com",
//     "password": "$2b$10$sAZbxlruFR6lKqic1d5iJOM.hi7myTMv.4.bpUmxMNENNFfQuC3nm",
//     "googleId": "1234567890abcdef",
//     "profileImage": "profile.jpg",
//     "visitsWebsites": [],
//     "profiles": [],
//     "preference": {
//         "_id": "66ab4e53b963bc0a3eef026f",
//         "emailFrequency": "daily",
//         "sendNotificationTime": 20,
//         "soundVoice": "×××ª ××¢× ×¢×©×",
//         "messageDisplay":"title_only",
//         "formatedDate": "yyyy-MM-dd",
//         "__v": 0
//     }
//   }
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
                element: <h1>home</h1>
                // element: <ProfileList />
            },
            {
                path: '/settings',
                element: <Settings />
            }
        ]
    },
    
])