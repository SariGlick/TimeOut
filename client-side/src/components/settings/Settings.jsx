import React from 'react';
import EmailFrequency from './EmailFrequency.jsx';
import Localization from './UserLocalization.jsx'
const Settings = () => {
  return (
    <div className="settings">
      <h2>Settings</h2>
      <EmailFrequency></EmailFrequency>
      <Localization></Localization>
    </div>
  );
};

export default Settings;
