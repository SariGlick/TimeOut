import React from "react";
import {createBrowserRouter } from "react-router-dom";
import ProfileList from "../components/profileComponent.jsx";
import Report from '../components/Report/report.jsx'
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
                element:<ProfileList/>
            },
            {
                path: '/reports',
                element:<Report/>
            }
        ]
    },
])