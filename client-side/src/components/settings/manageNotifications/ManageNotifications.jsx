import React from 'react';
import EmailFrequency from './EmailFrequency';
import RingtoneEditButton from '../../editRingtone.jsx'
const ManageNotifications = () => {
  return (
    <div className="manage-notifications">
      <h2>Manage Notifications</h2>
      <RingtoneEditButton/>
      <EmailFrequency></EmailFrequency>
    </div>
  );
};

export default ManageNotifications;
