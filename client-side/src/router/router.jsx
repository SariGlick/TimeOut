import React from "react";
import {createBrowserRouter } from "react-router-dom";
import Report from '../components/Report/report.jsx'
import ProfilePageComponent from "../components/profileComponents/profilePageComponent.jsx";
import Statistics from '../components/statistics.jsx';
import Login from "../login/Login.jsx";
import SignUp from "../components/signUp/signUp.jsx";
import Settings from "../components/settings/Settings.jsx";
import HomePage from "../components/homePageComponent.jsx";
import Layout from "./layout.jsx";

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
                path: '/profilePageComponent',
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
                path: '/reports',
                element:<Report/>
            },
            {
              path: '/settings',
              element: <Settings/>
            },
            {
              path:'/SignUp',
              element:<SignUp/>
            },          
        ]
    },
])
