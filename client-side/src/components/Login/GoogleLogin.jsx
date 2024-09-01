// import React, { useState } from "react";
// import { GoogleLogin, googleLogout } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";
// import GenericButton from "../../stories/Button/GenericButton";
// import { getUserByGoogleAccount } from "../../services/login-services";
// import Text from "./Text";
// // to call this component you need to call it :
// {/* <OAuthProvider>
// <GoogleLogin></GoogleLogin>
// </OAuthProvider> */}

// export default function GLogin1() {
//   const [userData, setUserData] = useState();
//   const [error, setError] = useState(''); 

//   const handleLoginSuccess = async (credentialResponse) => {
//     try {
//       const details = jwtDecode(credentialResponse.credential);
//       const userData = {
//         ...details,
//         token: credentialResponse.credential
//       };
//       await GLogin(userData);
//       setUserData(userData);
//     } catch (error) {
//       setError(Text.LOGIN_FAILED); 
//       console.error(Text.LOGIN_FAILED, error);
//     }
//   };

//   const GLogin = async (user) => {
//     try {
//       const { email, token } = user;
//       console.log(token)
//       const response = await getUserByGoogleAccount(token, email);
      
//       if (response) {
//         setUserData({
//           ...user,
//           ...response 
//         });
//       }
//     } catch (error) {
//       console.error(Text.LOGIN_FAILED, error);
//       setError(Text.SERVER_CONNACTION); 
//     }
//   };

//   const logOut = () => {
//     googleLogout();
//     setUserData(null);
//   };

//   return (
//     <div className='App'>
//       {error && <div className="error-message">{error}</div>} 
//       {!userData && (
//         <GoogleLogin
//           className="sign"
//           onSuccess={(credentialResponse) => handleLoginSuccess(credentialResponse)}
//           onError={() => {
//             setError(Text.LOGIN_FAILED); 
//           }}
//         />
//       )}
//       {!error&&userData &&(
//         <div>
//           <GenericButton
//             className="primary"
//             label={Text.LOG_OUT}
//             onClick={logOut}
//             size="medium"
//           />
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import GenericButton from "../../stories/Button/GenericButton";
import { getUserByGoogleAccount } from "../../services/login-services";
import Text from "./Text";

export default function GLogin1() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(''); 

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const userData = {
        token: credential,
        email: credentialResponse.email  
      };
      await GLogin(userData);
      setUserData(userData);
    } catch (error) {
      setError(Text.LOGIN_FAILED); 
      console.error(Text.LOGIN_FAILED, error);
    }
  };

  const GLogin = async (user) => {
    try {
      const { email, token } = user;
      console.log(token);
      const response = await getUserByGoogleAccount(token, email);
      if (response) {
        setUserData({
          ...user,
          ...response 
        });
      }
    } catch (error) {
      console.error(Text.LOGIN_FAILED, error);
      setError(Text.SERVER_CONNACTION); 
    }
  };

  const logOut = () => {
    googleLogout();
    setUserData(null);
  };

  return (
    <div className='App'>
      {error && <div className="error-message">{error}</div>} 
      {!userData && (
        <GoogleLogin
          className="sign"
          onSuccess={handleLoginSuccess}
          onError={() => {
            setError(Text.LOGIN_FAILED); 
          }}
        />
      )}
      {!error && userData && (
        <div>
          <GenericButton
            className="primary"
            label={Text.LOG_OUT}
            onClick={logOut}
            size="medium"
          />
        </div>
      )}
    </div>
  );
}

