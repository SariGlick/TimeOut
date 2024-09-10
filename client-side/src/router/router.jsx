import React from "react";
import {createBrowserRouter } from "react-router-dom";
// import ProfileList from "../components/profileComponent.jsx";
import Layout from "./layout.jsx";
import Login from "../login/Login.jsx";
import Statistics from '../components/statistics.jsx'
import HomePage from "../components/homePageComponent.jsx";
import Report from "../components/Report/report.jsx";
export  const router = createBrowserRouter([
    {
        path: '',
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <HomePage/>
            },
            {
                path: '/home',
                element: <HomePage/>
            },
            // {
            //     path: '/profiles',
            //     element:<ProfileList/>
            // },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path:'/statistics',
                element: <Statistics></Statistics>
            },
            {
                path: '/reports',
                element: <Report/>
            }
        ]
    },
])