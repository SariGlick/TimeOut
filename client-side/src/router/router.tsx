import React from "react";
import {createBrowserRouter } from "react-router-dom";
import ProfileList from "../components/profile.tsx";
import Layout from "./layout.tsx";
export  const router = createBrowserRouter([
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
                //element:<h1>profiles</h1>
            }
        ]
    },
])







