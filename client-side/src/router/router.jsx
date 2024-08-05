import React from "react";
import {createBrowserRouter } from "react-router-dom";
import ProfileList from "../components/profileComponent.jsx";
import Layout from "./layout.jsx";
import Reset from "../components/Login/Reset.jsx";
import OTPInput from "../components/Login/OTPInput.jsx";

 const MyComponent = () => {
    return <div>Hello</div>;
  };
  
  export default MyComponent;
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
            // {
            //     path: '/reset',
            //     element:<Reset/>
            // },
            // {
            //     path: '/OTPinput',
            //     element:<OTPInput/>
            // }
            
        ]
    },
])