import React from 'react';
import EmailFrequency from './EmailFrequency.jsx';
import TimeZone from './TimeZone.jsx'

const Settings = () => {
  return (
    <div className="manage-notifications">
      <h2>Settings</h2>
      <EmailFrequency></EmailFrequency>
      <TimeZone></TimeZone>
    </div>
  );
};

export default Settings;
