import React from "react";
import {createBrowserRouter } from "react-router-dom";
import ProfilePageComponent from "../components/profileComponents/profilePageComponent.jsx";
import Layout from "./layout.jsx";
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
                element:<ProfilePageComponent  userId = {'66a0ccd1649ed11c91d9b688'}/>
            }
        ]
    },
])