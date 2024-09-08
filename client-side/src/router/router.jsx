import React from "react";
import {createBrowserRouter } from "react-router-dom";
import Layout from "./layout.jsx";
import Login from "../login/Login.jsx";
import ManagerGoogleDrive from "../components/Report/managerGoogleDrive.jsx";
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
                path: '/login',
                element: <Login/>
            },
            {
                path: '/reports',
                element: <ManagerGoogleDrive/>
            }
        ]
    },
])