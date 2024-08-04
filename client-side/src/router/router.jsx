import React from "react";
import { createHashRouter } from "react-router-dom";  
import ProfileList from "../components/profileComponent.jsx";
import Layout from "./layout.jsx";

export const router = createHashRouter([   
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
            }
        ]
    },
]);