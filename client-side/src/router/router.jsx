import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Settings from "../components/settings/Settings.jsx";
import Login from "../login/Login.jsx";
import HomePage from "../components/homePageComponent.jsx";

import Layout from "./layout.jsx";


 


export  const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <HomePage/>
      },
      {
        path: '/home',
        element: <HomePage/>
      },
     
      {
        path: '/manageNotifications',
        element: <Settings />
       
      },
      {
        path: '/login',
        element: <Login/>
      }
    ]
  },
 
])
