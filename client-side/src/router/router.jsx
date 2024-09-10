import React from "react";
import {createBrowserRouter } from "react-router-dom";
import ProfilePageComponent from "../components/profileComponents/profilePageComponent.jsx";
import Statistics from '../components/statistics.jsx';
import Layout from "./layout.jsx";
import Login from "../login/Login.jsx";
import HomePage from "../components/homePageComponent.jsx";
import Statistics from '../components/statistics.jsx'
export  const router = createBrowserRouter([
    {
        path: '',
        element: <Layout/>,
        children: [
            {
                path: '/',
                element:<HomePage/>
            },
            {
                path: '/home',
                element: <HomePage/>
            },
            {
                path: '/profiles',
                element:<ProfilePageComponent  userId = {'6698da056e5c07ebd3c11ec1'}/>
            },
            {
                path: '/statistics',
                element: <Statistics />
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path:'/statistics',
                element: <Statistics></Statistics>
            }
        ]
    },
])