import React , { useState } from "react";
import { jwtDecode } from "jwt-decode";
import {GoogleLogin, googleLogout } from '@react-oauth/google';
import GenericButton from "../../stories/Button/GenericButton";
import { getUserByGoogleAccount } from "../../axios/login-services";
import Text from "./Text";
export default function () {
  const [userData, setUserData] = useState();
  const GLogin = async(user)=>{
      try {
        const {email,token} = user; 
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
            console.error(Text.LOGIN_FAILED);
          }}
        />
      )}
      {userData && (
        <div>
          <GenericButton
           className="primary"
            label={Text.info.LOG_OUT}
            onClick={logOut}
            size="medium"
          ></GenericButton>

        </div>
      )}
    </div>
  );
}