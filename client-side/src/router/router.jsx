import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ProfileList from "../components/profileComponent.jsx";
import Settings from "../components/settings/Settings.jsx";
import Layout from "./layout.jsx";

<<<<<<< HEAD
export const router = createBrowserRouter([

=======
const user =     {
    "visitsWebsites": [],
    "profiles": [],
    "_id": "669cf7185d41f78095882762",
    "name": "Gad",
    "profileImage": "20230615_194953.jpg"
}
export const router = createBrowserRouter([
    
>>>>>>> 295121b620a2d268c1501cd8bf2cc33d3409df5f
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
<<<<<<< HEAD
                element: <ProfileList />
            },
            {
                path: '/settings',
                element: <Settings />
            }
=======
                element:<ProfileList/>
            },
            {
                path: '/settings',
                element: <Settings user={user}/>
            },
>>>>>>> 295121b620a2d268c1501cd8bf2cc33d3409df5f
        ]
    },
    
])