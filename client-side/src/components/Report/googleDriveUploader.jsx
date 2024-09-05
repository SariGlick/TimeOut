import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';
import GenericButton from '../../stories/Button/GenericButton'; 

const CLIENT_ID = '1074410346984-b9bsnokpb84s4afiim9t9d797k6orsvk.apps.googleusercontent.com';

const GoogleDriveUploader = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/drive.file',
      }).then(() => {
        console.log('GAPI client initialized');
      }).catch(error => {
        console.error('Error initializing GAPI client:', error);
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const handleAuthClick = async () => {
    try {
      await gapi.auth2.getAuthInstance().signIn({
        prompt: 'select_account'
      });
      console.log('Successfully signed in');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignoutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  return (
    <div>
      <GenericButton
        label="Sign in with Google"
        onClick={handleAuthClick}
        className="signInButton"
        size="large"
      />
      <GenericButton
        label="Sign out"
        onClick={handleSignoutClick}
        className="signOutButton"
        size="large"  
      />
    </div>
  );
};

export default GoogleDriveUploader;
