import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';
import GenericButton from '../../stories/Button/GenericButton';
import { GOOGLE_API, MESSAGES, BUTTON_LABELS } from '../../constants/googleDriveConstants';

const GoogleDriveUploader = () => {
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: GOOGLE_API.scopes,
      }).then(() => {
        console.log(MESSAGES.gapiClientInitialized);
      }).catch(error => {
        console.error(MESSAGES.gapiInitError, error);
      });
    }

    gapi.load('client:auth2', start);
  }, [CLIENT_ID]);

  const handleAuthClick = async () => {
    try {
      await gapi.auth2.getAuthInstance().signIn({
        prompt: GOOGLE_API.prompt,
      });
      console.log(MESSAGES.gapiSignInSuccess);
    } catch (error) {
      console.error(MESSAGES.signInError, error);
    }
  };

  const handleSignoutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  return (
    <div>
      <GenericButton
        label={BUTTON_LABELS.signIn}
        onClick={handleAuthClick}
        className="signInButton"
        size="large"
      />
      <GenericButton
        label={BUTTON_LABELS.signOut}
        onClick={handleSignoutClick}
        className="signOutButton"
        size="large"  
      />
    </div>
  );
};

export default GoogleDriveUploader;
