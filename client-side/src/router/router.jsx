import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ProfileList from "../components/profileComponent.jsx";
import Statistics from '../components/statistics.jsx'
import Layout from "./layout.jsx";
import Login from "../login/Login.jsx";
export const router = createBrowserRouter([
    {
        path: '',
        element: <Layout />,
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
                element: <ProfileList />
            },
            {
                path: '/statistics',
                element: <Statistics />
            },
            {
                path: '/login',
                element: <Login />
            }
        ]
    },
])