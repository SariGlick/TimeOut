import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Settings from "../components/settings/Settings.jsx";
import Layout from "./layout.jsx";
import Login from "../login/Login.jsx";

export  const router = createBrowserRouter([
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
                path: '/settings',
                element: <Settings />
            },
            {
                path: '/login',
                element: <Login/>
            }
        ]
    },
    
])