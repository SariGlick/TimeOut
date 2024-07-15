import React from "react";
import {createBrowserRouter } from "react-router-dom";
import ProfileList from "../commponent/profileComponent.tsx";
import Layout from "./layout.tsx";
import AddProfilePage from "../commponent/addProfleComponent.tsx";


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
            },
            {
                path: '/add-profile',
                element:<AddProfilePage/>
                //element:<h1>profiles</h1>
            }
        ]  
    },
])


