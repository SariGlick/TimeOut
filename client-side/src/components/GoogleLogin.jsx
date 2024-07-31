import React , { useState } from "react";
import { jwtDecode } from "jwt-decode";
import {GoogleLogin, googleLogout } from '@react-oauth/google';
import GenericButton from "./stories/Button/GenericButton";
import { getUserByGoogleAccount } from "./axios/login-services";

export default function () {
  const [userData, setUserData] = useState();
  const GLogin = async(user)=>{
      try {
        const { email } = user;
        const token = user.token; 
        const response = await getUserByGoogleAccount(token, email);
        if (response) {
          setUserData({
            ...user,
            ...response//if we would get more details
          });
        }
      } catch (error) {
        console.error('Error in GLogin:', error);
      }
  }
      // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setUserData(null)
    };

  return (
    <div className='App'>
      <h2> Google Sign-In</h2>
      {!userData && (
        <GoogleLogin
          className="sign"
          onSuccess={credentialResponse => {
            const details = jwtDecode(credentialResponse.credential);
            const userData = {
              picture: details.picture,
              name: details.name,
              email: details.email,
              token: credentialResponse.credential 
            };
            GLogin(userData)
            setUserData(userData);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      )}
      {userData && (
        <div>
          <h3>Name: {userData.name}</h3>
          <p>Email: {userData.email}</p>
          <GenericButton
           className="primary"
            label="Log out"
            onClick={logOut}
            size="medium"
          ></GenericButton>
        </div>
      )}
    </div>
  );
}