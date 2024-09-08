import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Settings from "../components/settings/Settings.jsx";
import Statistics from '../components/statistics.jsx';
import Login from "../login/Login.jsx";
import HomePage from "../components/homePageComponent.jsx";

import Layout from "./layout.jsx";
export  const router = createBrowserRouter([

  {
    path: '/',
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
        path: '/settings',
        element: <Settings/>
      },
      {
        path: '/statistics',
        element: <Statistics />
      },
      {
        path: '/login',
        element: <Login/>

      }
    ]
  },
    
]);
