import React from "react";
import {createBrowserRouter } from "react-router-dom";
// import ProfileList from "../components/profileComponent.jsx";
import Layout from "./layout.jsx";
import Login from "../login/Login.jsx";
import UploadToGoogleDrive from "../components/Report/uploadToGoogleDrive.jsx";
import GoogleDriveUploader from "../components/Report/googleDriveUploader.jsx";
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
                // element:<ProfileList/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/reports',
                element: <><UploadToGoogleDrive/><GoogleDriveUploader/></>
            }
        ]
    },
])