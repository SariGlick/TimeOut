import React from "react";
import {createBrowserRouter } from "react-router-dom";
import ProfileList from "../components/profileComponent.jsx";
import Report from '../components/Report/report.jsx'
import ProfilePageComponent from "../components/profileComponents/profilePageComponent.jsx";
import Statistics from '../components/statistics.jsx';
import Layout from "./layout.jsx";
import Login from "../login/Login.jsx";

import SignUp from "../components/signUp/signUp.jsx";

import HomePage from "../components/homePageComponent.jsx";
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
                path: '/profiles',
                element:<ProfileList/>
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
              path:'/SignUp',
              element:<SignUp/>
            },          
        ]
    },
])