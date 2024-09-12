import React from "react";
import Settings from "../components/settings/Settings.jsx";
import Login from "../login/Login.jsx";
import {createBrowserRouter } from "react-router-dom";
import Report from '../components/Report/report.jsx'
import ProfilePageComponent from "../components/profileComponents/profilePageComponent.jsx";
import Statistics from '../components/statistics.jsx';
import Layout from "./layout.jsx";
import SignUp from "../components/signUp/signUp.jsx";
import HomePage from "../components/homePageComponent.jsx";


 


export  const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage/>
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
        path: '/manageNotifications',
        element: <Settings />
       
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path:'/statistics',
        element: <Statistics></Statistics>
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
 
]);
