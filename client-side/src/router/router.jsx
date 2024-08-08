import React from "react";
import {createBrowserRouter } from "react-router-dom";
import ProfilePageComponent from "../components/profileComponents/profilePageComponent.jsx";
import Layout from "./layout.jsx";
import HomePage from "../components/homeComponent/homePageComponent.jsx"
import Login from "../login/Login.jsx";
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
                element: <HomePage />
                
            },
            {
                path: '/profiles',
                element:<ProfilePageComponent  userId = {'6698da056e5c07ebd3c11ec1'}/>
            },
            {
                path: '/login',
                element: <Login/>
            }
        ]
    },
])