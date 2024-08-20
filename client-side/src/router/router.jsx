import React from "react";
import {createBrowserRouter } from "react-router-dom";
import ProfileList from "../components/profileComponent.jsx";
import Layout from "./layout.jsx";
import Login from "../login/Login.jsx";
import SignUp from "../components/signUp/signUp.jsx";
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
                path: '/login',
                element: <Login/>
            },
            {
              path:'/SignUp',
              element:<SignUp/>
            }
          
        ]
    },
])