import React from "react";
import {createBrowserRouter } from "react-router-dom";
import ProfileList from "../components/profileComponent.jsx";
import Settings from "../components/settings/Settings.jsx";
import Layout from "./layout.jsx";

const user =     {
    "visitsWebsites": [],
    "profiles": [],
    "_id": "669cf7185d41f78095882762",
    "name": "Gad",
    "profileImage": "20230615_194953.jpg"
}
export const router = createBrowserRouter([
    
    {
        path: '',
        element: <Layout/>,
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
                element:<ProfileList/>
            },
            {
                path: '/settings',
                element: <Settings user={user}/>
            },
        ]
    },
])