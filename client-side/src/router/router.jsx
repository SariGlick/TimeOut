import React from "react";
import {createBrowserRouter } from "react-router-dom";
import ProfileList from "../components/profileComponent.jsx";
import Layout from "./layout.jsx";
import Login from "../login/Login.jsx";
import HomePage from "../components/homePageComponent.jsx";
export  const router = createBrowserRouter([
    {
        path: '',
        element: <Layout/>,
        children: [
            {
                path: '/home',
                element: <HomePage/>
            },
            {
                path: '/home',
                element: <HomePage/>
            },
            {
                path: '/profiles',
                element:<ProfileList/>
            },
            {
                path: '/login',
                element: <Login/>
            }
        ]
    },
])