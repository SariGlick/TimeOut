import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import GenericButton from "../../stories/Button/GenericButton";
import { getUserByGoogleAccount } from "../../services/login-services";
import Text from "./Text";

// to call this component you need to call it :
{/* <OAuthProvider>
<GoogleLogin></GoogleLogin>
</OAuthProvider> */}

const handleLoginSuccess = async (credentialResponse, GLogin, setUserData) => {
  try {
    const details = jwtDecode(credentialResponse.credential);
    const userData = {
      ...details, 
      token: credentialResponse.credential
    };
    await GLogin(userData);
    setUserData(userData);
  } catch (error) {
    console.error('Error in handleLoginSuccess:', error);
  }
};

export default function MyComponent() {
  const [userData, setUserData] = useState();

  const GLogin = async(user) => {
    try {
      const { email, token } = user;
      const response = await getUserByGoogleAccount(token, email);
      if (response) {
        setUserData({
          ...user,
          ...response 
        });
      }
    } catch (error) {
      console.error('Error in GLogin:', error);
    }
  };

  const logOut = () => {
    googleLogout();
    setUserData(null);
  };

  return (
    <div className='App'>
      {!userData && (
        <GoogleLogin
          className="sign"
          onSuccess={(credentialResponse) => handleLoginSuccess(credentialResponse, GLogin, setUserData)}
          onError={() => {
            console.error(Text.LOGIN_FAILED);
          }}
        />
      )}
      {userData && (
        <div>
          <GenericButton
            className="primary"
            label="Log out"
            onClick={logOut}
            size="medium"
          />
        </div>
      )}
    </div>
  );
}
