import React from "react";
import {createBrowserRouter } from "react-router-dom";
import ProfilePageComponent from "../components/profileComponents/profilePageComponent.jsx";
import Layout from "./layout.jsx";
<<<<<<< HEAD

=======
import Login from "../login/Login.jsx";
>>>>>>> 74f67f50c8ffb1942092e670a609eb5f84bfac7e
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
<<<<<<< HEAD
                element:<ProfilePageComponent  userId = {'6698da056e5c07ebd3c11ec1'}/>
=======
                element:<ProfileList/>
            },
            {
                path: '/login',
                element: <Login/>
>>>>>>> 74f67f50c8ffb1942092e670a609eb5f84bfac7e
            }
        ]
    },
])